import { NextRequest, NextResponse } from 'next/server';
import { execFile } from 'child_process';
import { CAREER_OPS_DIR, getDb } from '../../../lib/db';
import { verifyWarroomSession } from '@/lib/auth';

const SCRIPTS_CWD = CAREER_OPS_DIR;
const ALLOWED_SCRIPTS = new Set([
  'scripts/interview-prep.mjs',
  'scripts/auto-apply.mjs',
  'scripts/job-scraper.mjs',
]);

function runWhitelistedScript(scriptRelPath: string, args: string[], label: string): void {
  if (!ALLOWED_SCRIPTS.has(scriptRelPath)) {
    throw new Error(`Script not allowed: ${scriptRelPath}`);
  }
  execFile(process.execPath, [scriptRelPath, ...args], { cwd: SCRIPTS_CWD, timeout: 120000 }, (err, stdout) => {
    if (err) {
      console.error(`Error running ${label}:`, err);
    } else {
      console.log(`${label} complete:`, stdout);
    }
  });
}

function checkAuth(req: NextRequest): boolean {
  const cookieValue = req.cookies.get('warroom_session')?.value;
  const authHeader = req.headers.get('x-warroom-auth') || req.headers.get('x-nexus-auth') || req.headers.get('authorization')?.replace('Bearer ', '');
  return verifyWarroomSession(cookieValue, authHeader);
}

export async function GET(req: NextRequest) {
  try {
    if (!checkAuth(req)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const db = getDb();
    
    // Fetch all applications
    const applications = await db.all('SELECT * FROM applications ORDER BY updated_at DESC');
    
    // Fetch last 20 auto-apply logs
    const logs = await db.all('SELECT * FROM auto_apply_logs ORDER BY timestamp DESC LIMIT 20');

    // Ensure sales table exists and fetch all sales
    await db.execute(`
      CREATE TABLE IF NOT EXISTS sales (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product TEXT NOT NULL,
        amount REAL NOT NULL,
        method TEXT NOT NULL,
        customer_email TEXT NOT NULL,
        license_key TEXT,
        download_link TEXT,
        invoice_path TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      );
    `);
    const sales = await db.all('SELECT * FROM sales ORDER BY created_at DESC');

    // Calculate metrics
    const total = applications.length;
    const stages = {
      'Descubierta': applications.filter((a: any) => a.status === 'Descubierta').length,
      'Aplicada': applications.filter((a: any) => a.status === 'Aplicada').length,
      'En Seguimiento': applications.filter((a: any) => a.status === 'En Seguimiento').length,
      'Entrevista': applications.filter((a: any) => a.status === 'Entrevista').length,
      'Oferta': applications.filter((a: any) => a.status === 'Oferta').length,
      'Rechazada': applications.filter((a: any) => a.status === 'Rechazada').length,
    };

    // Calculate conversion rates
    const totalApplied = applications.filter((a: any) => a.status !== 'Descubierta').length;
    const conversion = {
      appliedRate: total > 0 ? ((stages['Aplicada'] + stages['En Seguimiento'] + stages['Entrevista'] + stages['Oferta'] + stages['Rechazada']) / total * 100).toFixed(1) : '0',
      interviewRate: totalApplied > 0 ? ((stages['Entrevista'] + stages['Oferta']) / totalApplied * 100).toFixed(1) : '0',
      offerRate: (stages['Entrevista'] + stages['Oferta']) > 0 ? (stages['Oferta'] / (stages['Entrevista'] + stages['Oferta']) * 100).toFixed(1) : '0',
    };

    // Applications per day
    const appsPerDayRaw = await db.all(`
      SELECT date_applied, COUNT(*) as count 
      FROM applications 
      WHERE date_applied IS NOT NULL AND date_applied != ''
      GROUP BY date_applied 
      ORDER BY date_applied DESC 
      LIMIT 10
    `);
    const appsPerDay = appsPerDayRaw.reverse();

    // Top matches (highest scores)
    const topMatches = await db.all(`
      SELECT company, role, score 
      FROM applications 
      WHERE score IS NOT NULL 
      ORDER BY score DESC 
      LIMIT 5
    `);

    // Projections
    const last30DaysApplies = await db.get(`
      SELECT COUNT(*) as count FROM applications 
      WHERE date_applied >= date('now', '-30 days')
    `) as any;
    
    const applyRatePerDay = (last30DaysApplies?.count || 0) / 30;
    const interviewCount = stages['Entrevista'] + stages['Oferta'] + applications.filter((a: any) => a.status === 'Rechazada' && a.interview_stage_reached).length;
    
    const totalProcessed = applications.filter((a: any) => a.status !== 'Descubierta').length;
    const appToInterviewRatio = totalProcessed > 0 ? (interviewCount / totalProcessed) : 0.1;
    
    const projectedInterviews30Days = Math.round(applyRatePerDay * 30 * appToInterviewRatio);
    const daysToNextInterview = applyRatePerDay > 0 && appToInterviewRatio > 0 ? Math.round(1 / (applyRatePerDay * appToInterviewRatio)) : 14;

    return NextResponse.json({
      success: true,
      applications,
      logs,
      sales,
      metrics: {
        total,
        stages,
        conversion,
        appsPerDay,
        topMatches,
        projections: {
          applyRatePerDay: applyRatePerDay.toFixed(2),
          projectedInterviews30Days,
          daysToNextInterview
        }
      }
    });

  } catch (error: any) {
    console.error('Error fetching war room data:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!checkAuth(req)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { id, status, date_applied, followup_stage } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'Missing id or status' }, { status: 400 });
    }

    const numericId = Number(id);
    if (!Number.isInteger(numericId) || numericId <= 0 || typeof status !== 'string') {
      return NextResponse.json({ error: 'Invalid id or status' }, { status: 400 });
    }

    const db = getDb();
    const current = await db.get('SELECT status, company, role FROM applications WHERE id = ?', [numericId]);
    
    await db.execute(`
      UPDATE applications 
      SET status = ?, 
          date_applied = COALESCE(?, date_applied),
          followup_stage = COALESCE(?, followup_stage),
          updated_at = CURRENT_TIMESTAMP 
      WHERE id = ?
    `, [status, date_applied || null, followup_stage !== undefined ? followup_stage : null, numericId]);

    // Trigger interview prep script in background if status changed to 'Entrevista'
    if (status === 'Entrevista' && current && current.status !== 'Entrevista') {
      console.log(`Moving ${current.company} to Entrevista. Launching interview-prep.mjs via execFile.`);
      runWhitelistedScript('scripts/interview-prep.mjs', ['--job-id', String(numericId)], 'interview-prep');
    }

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('Error updating application status:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    if (!checkAuth(req)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { action, batch, minScore } = body;

    if (action === 'trigger-apply') {
      const batchSize = Math.min(Math.max(Math.trunc(Number(batch) || 10), 1), 50);
      const scoreCutoff = Math.min(Math.max(Number(minScore) || 4.0, 0), 10);
      runWhitelistedScript(
        'scripts/auto-apply.mjs',
        ['--batch', String(batchSize), '--min-score', String(scoreCutoff)],
        'auto-apply'
      );

      return NextResponse.json({ success: true, message: 'Auto-apply process triggered in background.' });
    }

    if (action === 'trigger-scraper') {
      runWhitelistedScript(
        'scripts/job-scraper.mjs',
        ['--sources', 'all', '--limit', '50'],
        'job-scraper'
      );

      return NextResponse.json({ success: true, message: 'Scraper triggered in background.' });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

  } catch (error: any) {
    console.error('Error executing action:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
