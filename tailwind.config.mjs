/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        floresta: {
          950: '#0d1a0d',
          900: '#1a2e1a',
          800: '#233823',
          700: '#2e4a2e',
          600: '#3a5c3a',
          500: '#4a7a4a',
        },
        pergaminho: {
          50: '#faf8f2',
          100: '#f5f0e8',
          200: '#ede3cc',
          300: '#ddd0ad',
        },
        terracota: {
          400: '#d97050',
          500: '#c45c2a',
          600: '#a84a20',
        },
        dado: {
          verde: '#4ade80',
          amarelo: '#fbbf24',
          vermelho: '#f87171',
          azul: '#60a5fa',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Source Serif 4"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        data: ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
