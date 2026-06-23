module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./public/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        rosalesBlue: '#4682B4',
        rosalesLight: '#639BCA',
        greyText: '#5E5E5E',
        rosalesDark: '#3B6D97',
        veryLight: '#dbefff',
        coral: '#FF6B6B'
      },
      fontFamily: {
        // This overrides Tailwind's default 'font-sans' stack
        sans: [
          '"Segoe UI"',
          '-apple-system',
          'BlinkMacSystemFont',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}

// 4682B4