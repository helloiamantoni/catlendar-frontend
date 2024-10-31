import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        black100: "#191C3F",
        black200: "#181C45",
        black300: "#2D315C",
        black400: "#535678",
        black500: "#7C7F99",
        black600: "#A3A5B8",
        black700: "#CBCCD7",
        black800: "#DBDCE9",
        black900: "#F5F6FF",
        primary: "#FF4800",
      },
    },
  },
  plugins: [],
};
export default config;
