import { createClient } from '@libsql/client';
// @ts-ignore
import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const DEFAULT_CAREER_OPS_DIR = path.resolve(process.cwd(), '../../nexus/nexus/career-ops');
export const CAREER_OPS_DIR = process.env.NEXUS_CAREER_OPS_DIR || DEFAULT_CAREER_OPS_DIR;
const DB_PATH = process.env.WARROOM_DB_PATH || path.join(CAREER_OPS_DIR, 'data', 'warroom.db');

export interface DbClient {
  execute(sql: string, params?: any[]): Promise<any>;
  all(sql: string, params?: any[]): Promise<any[]>;
  get(sql: string, params?: any[]): Promise<any>;
}

class SQLiteAdapter implements DbClient {
  private db: any;

  constructor() {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    this.db = new Database(DB_PATH);
    this.db.pragma('journal_mode = WAL');
    this.db.pragma('synchronous = NORMAL');
    this.db.pragma('busy_timeout = 5000');
    this.db.pragma('foreign_keys = ON');
  }

  async execute(sql: string, params: any[] = []): Promise<any> {
    const stmt = this.db.prepare(sql);
    const res = stmt.run(...params);
    return { lastInsertRowid: res.lastInsertRowid, changes: res.changes };
  }

  async all(sql: string, params: any[] = []): Promise<any[]> {
    return this.db.prepare(sql).all(...params);
  }

  async get(sql: string, params: any[] = []): Promise<any> {
    return this.db.prepare(sql).get(...params);
  }
}

class TursoAdapter implements DbClient {
  private client: any;

  constructor(url: string, token: string) {
    this.client = createClient({ url, authToken: token });
  }

  async execute(sql: string, params: any[] = []): Promise<any> {
    const res = await this.client.execute({ sql, args: params });
    const lastRowId = res.lastInsertRowid !== undefined ? Number(res.lastInsertRowid) : undefined;
    return { lastInsertRowid: lastRowId, changes: res.rowsAffected };
  }

  async all(sql: string, params: any[] = []): Promise<any[]> {
    const res = await this.client.execute({ sql, args: params });
    return res.rows.map((row: any) => {
      const obj: any = {};
      res.columns.forEach((col: string, idx: number) => {
        const val = row[idx];
        obj[col] = typeof val === 'bigint' ? Number(val) : val;
      });
      return obj;
    });
  }

  async get(sql: string, params: any[] = []): Promise<any> {
    const rows = await this.all(sql, params);
    return rows[0] || null;
  }
}

export function getDb(): DbClient {
  const url = process.env.TURSO_DATABASE_URL;
  const token = process.env.TURSO_AUTH_TOKEN;
  if (url) {
    return new TursoAdapter(url, token || '');
  }
  return new SQLiteAdapter();
}
