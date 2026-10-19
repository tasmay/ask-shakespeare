import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        parchment: {
          50: '#FDFBF7',
          100: '#F9F5EC',
          200: '#F3ECDA',
          300: '#E7DCBE',
        },
        honey: {
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
        },
        plum: {
          700: '#581C53',
          800: '#42123E',
          900: '#2A0028',
          950: '#1D001C',
        },
        herb: {
          500: '#10B981',
          600: '#059669',
        },
      },
      boxShadow: {
        'warm': '0 10px 30px -10px rgba(66, 18, 62, 0.1), 0 4px 10px -2px rgba(217, 119, 6, 0.05)',
        'warm-hover': '0 20px 40px -15px rgba(66, 18, 62, 0.18), 0 8px 16px -4px rgba(217, 119, 6, 0.1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;
