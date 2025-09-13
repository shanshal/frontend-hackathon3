/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          500: '#2563eb',
        },
        green: {
          500: '#16a34a',
          100: '#dcfce7',
          800: '#166534',
        },
        red: {
          500: '#dc2626',
        },
        yellow: {
          100: '#fef3c7',
          800: '#92400e',
        },
      },
    },
  },
  plugins: [],
}
