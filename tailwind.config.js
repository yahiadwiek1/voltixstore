/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'Arial', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#2563eb',
        primaryHover: '#1e40af',
        secondary: '#facc15',
        grayLight: '#f3f4f6',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        card: '0 4px 12px rgba(0,0,0,0.08)',
        hover: '0 8px 20px rgba(0,0,0,0.12)',
      },
      screens: {
        'xs': '475px',
      }
    },
  },
  plugins: [],
};
