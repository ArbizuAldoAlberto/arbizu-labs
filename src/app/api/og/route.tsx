import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'Arbizu Labs';
  const subtitle = searchParams.get('subtitle') || 'Enterprise Software Agency';

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          background: 'linear-gradient(135deg, #050508 0%, #0a0a0f 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          padding: '80px',
        }}
      >
        <div style={{ fontSize: 80, fontWeight: 'bold', marginBottom: 20 }}>
          Arbizu<span style={{ color: '#1D9E75' }}>Labs</span>
        </div>
        <div style={{ fontSize: 40, opacity: 0.8 }}>{title}</div>
        <div style={{ fontSize: 30, opacity: 0.6, marginTop: 20 }}>{subtitle}</div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
