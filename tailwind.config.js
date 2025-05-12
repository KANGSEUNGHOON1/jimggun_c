/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3B71CA",
        white: "#ffffff",
        black: "#111111",
        gray: {
          DEFAULT: "#767676",
          100: "#F4F5F7",
          200: "#999999",
          300: "#505050",
        },
        input: "#E5E5EC",
        warnning: "#FEE2E2",
        error: "#FEF9C3",
        manager: {
          DEFAULT: "#24C76F",
          puple: {
            DEFAULT: "#9F7AEA",
            100: "#8B5CF6",
            200: "#A78BFA",
            300: "#C4B5FD",
            400: "#DC55F7",
          },
          blue: {
            DEFAULT: "#4299E1",
            100: "#BFDBFE",
            200: "#93C5FD",
            300: "#3B82F6",
          },
          green: "#48BB78",
          yellow: {
            DEFAULT: "#ECC94B",
            100: "#FACC15",
          },
          orange: "#ED8936",
          red: "#F56565",
        },
        dark: {
          DEFAULT: "#24263B",
          100: '#3F415A',
          200: '#24263B',
          font: {
            DEFAULT: "#C0C3D1",
            100:'#9FA3B5',
          },
        },
      },
      spacing: {
        "login-container": "400px",
      },
      borderRadius: {
        8: "8px",
        10: '10px',
        50: '50px',
      },
      boxShadow: {
        login: "0 2px 4px rgba(0, 0, 0, 0.1)",
      },
      fontFamily: {
        sans: ['"Pretendard"'],
      },
    },
  },
  plugins: [],
};
