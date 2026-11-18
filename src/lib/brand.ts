export const BRAND = {
  // Axiom Sovereign Industrial (v3.0-SOVEREIGN Bi-Luminance Tokens)
  colors: {
    void: '#060709',
    chassis: '#0B0D12',
    elevated: '#11151D',
    paper: '#F2F0EA',
    inkOnPaper: '#07080A',
    primary: '#FF4F00', // International Signal Orange (CTAs & Field Signals)
    secondary: '#D4AF37', // Precision Oxide Gold (Authority)
    accent: '#00E599', // Live Telemetry Emerald (Nodes Online / WAL Sync)
    dark: '#060709',
    light: '#F2F0EA',
    success: '#00E599',
    warning: '#D4AF37',
    error: '#F43F5E',
  },

  // Tipografía Unificada (Geist Sans + JetBrains Mono)
  fonts: {
    heading: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
    body: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
    mono: 'var(--font-jetbrains), ui-monospace, SFMono-Regular, Menlo, monospace',
  },

  // Grilla Suiza Industrial Exposta
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
  },

  shadows: {
    sm: '0 1px 2px 0 rgba(6, 7, 9, 0.35)',
    md: '0 8px 24px -4px rgba(6, 7, 9, 0.55)',
    lg: '0 24px 64px -12px rgba(6, 7, 9, 0.85)',
  },

  borderRadius: {
    sm: '2px',
    md: '2px',
    lg: '4px',
    xl: '6px',
    full: '9999px',
  },
} as const;
