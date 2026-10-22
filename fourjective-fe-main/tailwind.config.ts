import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#FAF6F0",
        dark: "#18181B",
        orange: "#FF4D00",

        /* ============ DESIGN TOKEN: BRAND BLUE SCALE ============ */
        /* Satu-satunya sumber warna biru di seluruh aplikasi.
           Cooler: #1D4ED8 (primary) · Navy: #0B2054 (dark surface) */
        brand: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E3A8A",
          850: "#123A7A",
          900: "#0F2A6B",
          950: "#0B2054",
          deep: "#0A1F4D",
        },

        /* ============ DESIGN TOKEN: INK / SURFACE ============ */
        ink: {
          soft: "#0B0C0F",
          raised: "#14161C",
          deep: "#111113",
          navy: "#0A1F4D",
        },
        surface: {
          paper: "#FAF6F0",
          cream: "#FFF8F2",
          bright: "#FFFDF9",
          gray: "#F2F2F4",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          yellow: "#FDE047",
          bright: "#FFE500",
          orange: "#FF4D00",
          red: "#E94504",
          wa: "#25D366",
          mint: "#A7F3D0",
          lilac: "#DDD6FE",
          pink: "#FECDD3",
          purple: "#C084FC",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      fontFamily: {
        display: ["var(--font-display-var)", "sans-serif"],
        headline: ["var(--font-headline-var)", "sans-serif"],
        arcade: ['"Press Start 2P"', "monospace"],
        sans: ['"Plus Jakarta Sans"', "sans-serif"],
        poppins: ["var(--font-poppins)"],
        playtimes: ["var(--font-playtimes)"],
        lexendZetta: ["var(--font-lexendZetta)"],
        kronaOne: ["var(--font-kronaOne)"],
        leagueSpartan: ["var(--font-leagueSpartan)"],
      },
      boxShadow: {
        brutal: "4px 4px 0px 0px #18181B",
        "brutal-lg": "8px 8px 0px 0px #18181B",
        "brutal-xl": "12px 12px 0px 0px #18181B",
      },
      strokeWidth: {
        "16": "16",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
