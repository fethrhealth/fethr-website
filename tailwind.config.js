/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'Inter Fallback', 'sans-serif'],
        'inter-display': ['Inter Display', 'Inter Display Fallback', 'sans-serif'],
      },
      spacing: {
        '11.5': '2.875rem', // 46px
        '30': '7.5rem',     // 120px
        '25': '6.25rem',    // 100px
        '20': '5rem',       // 80px
      },
      height: {
        '11.5': '2.875rem', // 46px
      },
      colors: {
        // Exact Attio colors
        primary: {
          background: '#FFFFFF',
          foreground: '#1C1D1F',
        },
        secondary: {
          background: '#FBFBFB',
          foreground: '#232529',
        },
        tertiary: {
          foreground: '#505967',
        },
        caption: {
          foreground: '#505967',
        },
        'black': {
          0: '#000000',
          50: '#0A0B0D',
          100: '#1A1B1F',
          500: '#3B3D44',
          700: '#717A88',
        },
        'white': {
          100: '#FFFFFF',
          200: '#FAFAFA',
        },
        'blue': {
          300: '#D6E5FF',
          450: '#266DF0',
          500: '#407FF2',
        },
        'subtle': {
          stroke: '#EAEDF1',
        },
        'weak': {
          stroke: '#E6E7EA',
        },
        'strong': {
          stroke: '#D1D3D6',
        },
        'green': {
          primary: '#0FC27B',
        }
      },
      fontSize: {
        // Typography system matching Attio exactly
        'hero': ['64px', { lineHeight: '64px', fontWeight: '600' }],
        'hero-sub': ['20px', { lineHeight: '26px', fontWeight: '500' }],
        'button': ['16px', { lineHeight: '22px', fontWeight: '500' }],
        'navbar': ['15px', { lineHeight: '23px', fontWeight: '400' }],
        'footer-category': ['14px', { lineHeight: '20px', fontWeight: '500' }],
        'footer-item': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'legal': ['12px', { lineHeight: '18px', fontWeight: '400' }],
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          '2xl': '1400px',
        },
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'slide-up': 'slide-up 0.4s ease-out forwards',
      },
      backdropBlur: {
        'md': '12px',
      },
      backgroundImage: {
        'linear-to-b': 'linear-gradient(to bottom, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}