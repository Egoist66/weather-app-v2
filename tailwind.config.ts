type Config = import("tailwindcss").Config;

export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "weather-primary": "#00668A",
        "weather-secondary": "#004E71",
      }
    },
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
    },
    container: {
      center: true,
      screens: {
        lg: "100vw",
        xl: "100vw",
        "2xl": "100vw",
      },
      padding: "2rem",
    },
    screens: {
      sm: "640px",
      md: "768px",
      
    },
  },
  plugins: [],
} as Config
