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
        // app/globals.css (the old Wix site's palette, restyle 2026-10-16), so
        // the whole site re-themes from one place.
        cream: {
          50: "rgb(var(--bp-cream-50) / <alpha-value>)",
          100: "rgb(var(--bp-cream-100) / <alpha-value>)",
          200: "rgb(var(--bp-cream-200) / <alpha-value>)",
        },
        sage: {
          300: "rgb(var(--bp-sage-300) / <alpha-value>)",
          500: "rgb(var(--bp-sage-500) / <alpha-value>)",
          700: "rgb(var(--bp-sage-700) / <alpha-value>)",
          900: "rgb(var(--bp-sage-900) / <alpha-value>)",
        },
        taupe: {
          300: "rgb(var(--bp-taupe-300) / <alpha-value>)",
          500: "rgb(var(--bp-taupe-500) / <alpha-value>)",
          700: "rgb(var(--bp-taupe-700) / <alpha-value>)",
        },
        blush: {
          500: "rgb(var(--bp-blush-500) / <alpha-value>)",
        },
        olive: {
          800: "rgb(var(--bp-olive-800) / <alpha-value>)",
        },
        mauve: {
          600: "rgb(var(--bp-mauve-600) / <alpha-value>)",
        },
        cocoa: {
          700: "rgb(var(--bp-cocoa-700) / <alpha-value>)",
        },
        charcoal: {
          800: "rgb(var(--bp-charcoal-800) / <alpha-value>)",
          900: "rgb(var(--bp-charcoal-900) / <alpha-value>)",
        },
        // The old Wix site's colors by where it used them (app/globals.css).
        wix: Object.fromEntries(
          ["footer", "sage", "olive", "beige", "mauve", "pricing", "offwhite", "blush", "intro", "cocoa", "duet", "cream", "icon", "rule", "ink", "wash-warm"].map(
            (k) => [k, `rgb(var(--wix-${k}) / <alpha-value>)`]
          )
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
        // Display serif: Fraunces, the old site's working serif (The Seasons is
        // a commercial face with no web license on file).
        serif: ["var(--font-display)", "Georgia", "serif"],
        // Serif body accents: nav, reviews, footer rows, small-caps headings.
        accent: ["var(--font-accent)", "Georgia", "serif"],
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
