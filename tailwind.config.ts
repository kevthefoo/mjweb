import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        landingBackground: "url('/inter.svg')",
      },
      screens: {
        sm_mobile: "320px",
        rg_mobile: "480px",
        lg_mobile: "576px",
        sm_tablet: "640px",
        rg_tablet: "768px",
        lg_tablet: "992px",
        sm_desktop: "1024px",
        rg_desktop: "1280px",
        lg_desktop: "1536px",
      },
    },
  },
  plugins: [],
} satisfies Config;
