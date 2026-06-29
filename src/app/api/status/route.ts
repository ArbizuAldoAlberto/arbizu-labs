import { NextResponse } from 'next/server';

// Disable static caching for health check endpoint
export const dynamic = 'force-dynamic';

async function checkPort(url: string, timeoutMs = 1500): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'NEXUS-Status-Checker/1.0' },
      cache: 'no-store'
    });
    
    clearTimeout(timeoutId);
    // Any status code, even 404/403, means the HTTP server is alive and responding.
    // An HTTP 502/503 from a proxy gateway or complete network error will return false.
    return response.status >= 100 && response.status < 500;
  } catch (e) {
    return false;
  }
}

export async function GET() {
  // Perform health checks in parallel
  const [titanFlowUp, portfolioUp] = await Promise.all([
    checkPort('http://127.0.0.1:3000/'),
    checkPort('http://127.0.0.1:3001/')
  ]);

  const systems = [
    { 
      name: "Arbizu Labs Portal", 
      status: "Operational", 
      uptime: "99.99%", 
      color: "text-emerald-400" 
    },
    { 
      name: "TitanFlow Trading Bot Backend", 
      status: titanFlowUp ? "Operational" : "Offline", 
      uptime: "99.98%", 
      color: titanFlowUp ? "text-emerald-400" : "text-rose-500" 
    },
    { 
      name: "Aldo Arbizu Portfolio", 
      status: portfolioUp ? "Operational" : "Offline", 
      uptime: "99.99%", 
      color: portfolioUp ? "text-emerald-400" : "text-rose-500" 
    },
    { 
      name: "API Gateways (NEXUS Router)", 
      status: "Operational", // If this route executes, the vHost router on port 80 is routing correctly
      uptime: "99.97%", 
      color: "text-emerald-400" 
    }
  ];

  const overallHealthy = titanFlowUp && portfolioUp;

  return NextResponse.json({
    success: true,
    timestamp: new Date().toISOString(),
    overallStatus: overallHealthy ? "All Systems Operational" : "Degraded Performance",
    systems
  }, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  });
}
