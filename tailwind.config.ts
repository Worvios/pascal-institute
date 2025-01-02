import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        SoftBlue: "#93c5fd",
        SoftGreen: "#d1fae5",
        LightPink: "#fbcfe8",
        DarkGray: "#4b5563",
        LightGray: "#e5e7eb",
        AccentOrange: "#fdba74",
        AccentBlue: "#3b82f6",
        pascalPurple: "#A5A3FF",
        pascalYellow: "#FAE27C",
        pascalBlue: "#7CCFFA",
        pascalGreen: "#A8D695",
        pascalRed: "#F5A3A3",
        pascalGold: "#E8C547",
        pascalPink: "#F9C6D3",
        pascalBlueLight: "#B8E3FF",
        pascalYellowLight: "#FDF1A8",
        pascalPurpleLight: "#DDD9FF",
        pascalMintGreen: "#ddf6e5",
        pascalPeachLight: "#fdd8d8",
        pascalLightLavender: " #f9d7ff",
        pascalSalmonLight: "#ffe4da",
        pascalSkyBlueLight: "#d8f3ff",
        pascalPinkLight: "#ffe9f5 ",
        pascalLimeGreenLight: "#e9ffdc",
        pascalLilacLight: "#f4efff",
      },
    },
  },
  plugins: [],
};
export default config;
