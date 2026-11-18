import { ImageResponse } from 'next/og';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'Arbizu Labs // Sovereign Systems';
  const subtitle = searchParams.get('subtitle') || 'Offline-First · SQLite WAL · 60/60 RLS · Sub-10ms Quant';

  return new ImageResponse(
    (
      <div
        style={{
          background: '#060709',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          color: '#F2F0EA',
          padding: '64px 72px',
          border: '2px solid #1B202B',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1B202B', paddingBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                background: '#0B0D12',
                border: '2px solid #F2F0EA',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FF4F00',
                fontSize: '24px',
                fontWeight: 900,
              }}
            >
              A
            </div>
            <div style={{ fontSize: '30px', fontWeight: 800, letterSpacing: '-0.03em', display: 'flex' }}>
              ARBIZU <span style={{ color: '#FF4F00', marginLeft: '10px' }}>LABS</span>
            </div>
          </div>
          <div
            style={{
              fontSize: '18px',
              fontFamily: 'monospace',
              color: '#00E599',
              fontWeight: 700,
              letterSpacing: '0.12em',
            }}
          >
            LIVE TELEMETRY // 60 FPS
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ fontSize: '20px', fontFamily: 'monospace', color: '#D4AF37', fontWeight: 700, letterSpacing: '0.1em' }}>
            AXIOM SOVEREIGN INDUSTRIAL · SYS-01..12
          </div>
          <div style={{ fontSize: '58px', fontWeight: 800, lineHeight: 1.08, color: '#F6F7F9', letterSpacing: '-0.03em' }}>
            {title}
          </div>
          <div style={{ fontSize: '28px', color: '#C2C8D4', fontFamily: 'monospace' }}>
            {subtitle}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #1B202B', paddingTop: '24px', fontSize: '20px', fontFamily: 'monospace', color: '#8A93A6' }}>
          <span>arbizulabs.com · aldo@arbizulabs.com</span>
          <span style={{ color: '#FF4F00', fontWeight: 700 }}>CUIT 20-38362060-1</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
