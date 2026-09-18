import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      boxShadow: {
        soft: '0 20px 60px rgba(15, 23, 42, 0.18)',
      },
      colors: {
        brand: {
          50: '#eef6ff',
          100: '#dfeeff',
          500: '#4f8cff',
          600: '#3d75ff',
          700: '#2d5fe8',
        },
      },
    },
  },
  plugins: [],
};

export default config;
