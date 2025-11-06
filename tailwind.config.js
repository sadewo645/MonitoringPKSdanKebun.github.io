/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        midnight: '#0f172a',
        royal: '#312e81',
        orchid: '#6d28d9',
        aurora: '#7c3aed',
      },
      boxShadow: {
        soft: '0 10px 30px rgba(99, 102, 241, 0.15)',
      },
      backgroundImage: {
        'gradient-aurora': 'linear-gradient(135deg, #0f172a 0%, #312e81 45%, #7c3aed 100%)',
        'gradient-card': 'linear-gradient(145deg, rgba(30, 64, 175, 0.9) 0%, rgba(109, 40, 217, 0.85) 100%)',
      },
    },
  },
  plugins: [],
};
