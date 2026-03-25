import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './context/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ─── DESIGN.md: Colors ──────────────────────────────────────────────
      colors: {
        'surface-bright':             '#f9f9f9',
        'primary-fixed-dim':          '#ffb4ac',
        'on-primary-container':       '#ffe0dd',
        'on-primary-fixed-variant':   '#93000e',
        'error':                      '#ba1a1a',
        'tertiary-container':         '#006e9d',
        'surface-container':          '#eeeeee',
        'on-secondary-container':     '#75221e',
        'on-primary':                 '#ffffff',
        'surface-container-highest':  '#e2e2e2',
        'outline':                    '#8f706c',
        'on-background':              '#1a1c1c',
        'surface-dim':                '#dadada',
        'on-primary-fixed':           '#410003',
        'surface-container-low':      '#f3f3f3',
        'on-surface-variant':         '#5b403d',
        'surface-tint':               '#b91d20',
        'on-secondary':               '#ffffff',
        'on-error':                   '#ffffff',
        'error-container':            '#ffdad6',
        'inverse-on-surface':         '#f1f1f1',
        'on-tertiary':                '#ffffff',
        'inverse-primary':            '#ffb4ac',
        'primary':                    '#a20513',
        'inverse-surface':            '#2f3131',
        'on-surface':                 '#1a1c1c',
        'surface-container-high':     '#e8e8e8',
        'secondary-fixed':            '#ffdad6',
        'primary-container':          '#c62828',
        'surface-container-lowest':   '#ffffff',
        'surface':                    '#f9f9f9',
        'background':                 '#f9f9f9',
        'outline-variant':            '#e4beba',
        'on-error-container':         '#93000a',
        'secondary-container':        '#fe8a80',
        'secondary':                  '#9e403a',
        'tertiary':                   '#00557a',
        'primary-fixed':              '#ffdad6',
      },
      // ─── DESIGN.md: Typography ──────────────────────────────────────────
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        headline: ['Inter', 'sans-serif'],
      },
      // ─── DESIGN.md: Elevation ───────────────────────────────────────────
      boxShadow: {
        'ambient': '0 20px 40px rgba(26, 28, 28, 0.06)',
        'primary': '0 8px 24px rgba(162, 5, 19, 0.20)',
        'none': 'none',
      },
      // ─── DESIGN.md: Corner radius ("approachable" feel, no sm/none) ─────
      borderRadius: {
        'DEFAULT': '0.25rem',
        'md':      '0.75rem',   // standard components
        'lg':      '1rem',
        'xl':      '1.5rem',
        '2xl':     '2rem',
        '3xl':     '3rem',
        'full':    '9999px',
      },
      // ─── DESIGN.md: Typography scale ────────────────────────────────────
      fontSize: {
        'display-md': ['2.75rem', { lineHeight: '1.1', letterSpacing: '-0.03em', fontWeight: '800' }],
        'title-lg':   ['1.5rem',  { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],
        'title-md':   ['1.25rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
        'body-lg':    ['1.125rem',{ lineHeight: '1.75', letterSpacing: '0'      }],
        'body-md':    ['1rem',    { lineHeight: '1.625', letterSpacing: '0'     }],
        'label-md':   ['0.875rem',{ lineHeight: '1.5', letterSpacing: '0.01em' }],
      },
      backgroundImage: {
        // DESIGN.md: "The Pulse Gradient"
        'pulse-gradient': 'linear-gradient(135deg, #a20513 0%, #c62828 100%)',
      },
      letterSpacing: {
        tight: '-0.02em',
      },
      backdropBlur: {
        md: '12px',
      },
    },
  },
  plugins: [],
};

export default config;
