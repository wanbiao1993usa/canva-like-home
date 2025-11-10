import type { Config } from "tailwindcss";

const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./docs/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      /**
       * 2025-11-10 11:20: Primary 仅保留默认纯色与渐变背景两类视觉资产；accent 为渐变终点纯色
       */
      colors: {
        primary: {
          DEFAULT: "#AE89FF",
          accent: "#414BFF",
        },
        secondary: {
          950: "#111111",
          900: "#191919",
          800: "#2C2C2C",
          700: "#3E3C3C",
          600: "#929292",
        },
      },
      /**
       * 2025-11-10 11:20: Primary 渐变背景专用工具类
       */
      backgroundImage: {
        "primary-gradient": "linear-gradient(107deg, #AE89FF 11.55%, #414BFF 88.45%)",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
