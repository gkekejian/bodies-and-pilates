import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Design system palette. Every value is a CSS variable defined in
        // app/globals.css (the old Wix site's theme palette, read from the Wix
        // editor 2026-10-19), so the whole site re-themes from one place.
        cream: {
          50: "rgb(var(--bp-cream-50) / <alpha-value>)",
          100: "rgb(var(--bp-cream-100) / <alpha-value>)",
          200: "rgb(var(--bp-cream-200) / <alpha-value>)",
        },
        brown: {
          300: "rgb(var(--bp-brown-300) / <alpha-value>)",
          500: "rgb(var(--bp-brown-500) / <alpha-value>)",
          700: "rgb(var(--bp-brown-700) / <alpha-value>)",
          900: "rgb(var(--bp-brown-900) / <alpha-value>)",
        },
        tan: {
          300: "rgb(var(--bp-tan-300) / <alpha-value>)",
        },
        charcoal: {
          800: "rgb(var(--bp-charcoal-800) / <alpha-value>)",
          900: "rgb(var(--bp-charcoal-900) / <alpha-value>)",
        },
        // The six theme colors by name (app/globals.css).
        theme: Object.fromEntries(
          ["white", "dark", "tan", "brown", "sand", "cream", "ink"].map((k) => [k, `rgb(var(--theme-${k}) / <alpha-value>)`])
        ),
        // shadcn compat
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
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      fontFamily: {
        // Display serif: Fraunces, the old site's own display face (Wix editor:
        // Fraunces 120 Semi Bold).
        serif: ["var(--font-display)", "Georgia", "serif"],
        // The old theme's paragraph font, Times New Roman: nav, buttons, reviews,
        // footer rows, small-caps headings. A system font, so nothing to download.
        accent: ["var(--font-accent)"],
        // Light sans for body text.
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        // Poppins ExtraLight: offer names, prices, intro lines.
        poppins: ["var(--font-light)", "var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [typography],
};
export default config;
