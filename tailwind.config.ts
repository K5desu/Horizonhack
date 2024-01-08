import type { Config } from 'tailwindcss'

const defaultTheme = require('tailwindcss/defaultTheme')

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      xs: '475px',
      ...defaultTheme.screens,
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontSize: '1.875rem',
              lineHeight: '2.25rem',
              fontWeight: '700',
              paddingBottom: '0.5rem',
              borderBottom: '1px solid #e2e8f0',
            },
            h2: {
              fontWeight: '600',
              paddingBottom: '0.5rem',
              borderBottom: '1px solid #e2e8f0',
            },
            h3: {
              fontWeight: '600',
            },
            h4: {
              fontWeight: '600',
            },
            h5: {
              fontWeight: '600',
            },
            table: {
              width: 'auto',
              'border-collapse': 'collapse',
              'overflow-x': 'auto',
            },
            pre: {
              position: 'relative',
            },
            a: {
              color: '#3182ce',
              '&:hover': {
                color: '#2c5282',
              },
            },
            code: {
              padding: '0.2em 0.4em',
              background: '#e2e8f0',
              borderRadius: '0.25rem',
            },
            'code::before': {
              content: 'none',
            },
            'code::after': {
              content: 'none',
            },
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
export default config
