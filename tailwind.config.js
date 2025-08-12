/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        charcoal: "#0b0d12",
        panel: "#121722",
        ink: "#e6ecf5",
        muted: "#9db2ce",
        primary: "#5ec2ef",
        accent: "#3ee0a4"
      },
      borderRadius: { "2xl": "1rem" },
      boxShadow: { soft: "0 8px 24px rgba(0,0,0,.25)" }
    },
  },
  plugins: [],
};
