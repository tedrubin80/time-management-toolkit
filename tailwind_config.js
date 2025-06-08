/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 2s infinite',
      },
      transitionDuration: {
        '3000': '3000ms',
      },
      colors: {
        'gradient-start': '#667eea',
        'gradient-end': '#764ba2',
        'secondary-start': '#4facfe',
        'secondary-end': '#00f2fe',
      },
      fontFamily: {
        'sans': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
      },
    },
  },
  plugins: [],
}