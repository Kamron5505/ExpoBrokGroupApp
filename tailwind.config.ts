import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '1.5rem',
        lg: '2rem',
      },
      screens: {
        '2xl': '1200px',
      },
    },
    extend: {
      colors: {
        // Coca-Cola inspired system. Accent used ONLY for action/state.
        brand: {
          DEFAULT: '#DA291C', // Coca-Cola red (PMS 484)
          50: '#FEF2F1',
          100: '#FDE0DE',
          200: '#FBC0BC',
          300: '#F79890',
          400: '#EF5A4E',
          500: '#DA291C',
          600: '#C01F14',
          700: '#9E1810',
          800: '#7C1310',
          900: '#5E0F0C',
        },
        ink: {
          DEFAULT: '#0A0A0B',
          soft: '#18181B',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        hero: ['clamp(2.75rem, 6vw, 5.25rem)', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
        display: ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.05', letterSpacing: '-0.025em' }],
        title: ['clamp(1.5rem, 2.4vw, 2.25rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
      },
      maxWidth: {
        container: '1200px',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(10,10,11,0.04), 0 8px 24px -12px rgba(10,10,11,0.12)',
        lift: '0 2px 4px rgba(10,10,11,0.04), 0 24px 48px -20px rgba(10,10,11,0.24)',
        glow: '0 20px 60px -20px rgba(218,41,28,0.45)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both',
        marquee: 'marquee 32s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
