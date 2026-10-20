import Link from "next/link";
import { cn } from "@/lib/utils";
import { isExternal } from "@/lib/site";

type Variant = "primary" | "outline" | "light" | "ghost-light" | "cocoa" | "text";

const base =
  "inline-flex items-center justify-center text-center transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown-500 focus-visible:ring-offset-2";

// The old site's buttons, from the captures: solid "Book Now" bars set in a
// letter-spaced serif, and a thin outlined "BOOK A SESSION" in caps.
const solid = "min-h-[48px] rounded-none px-8 py-3 font-accent text-[15px] tracking-[0.12em]";
const outlined = "min-h-[48px] rounded-none px-12 py-3 font-sans text-[13px] font-medium uppercase tracking-[0.06em]";

const variants: Record<Variant, string> = {
  primary: cn(solid, "border border-theme-dark bg-theme-dark text-theme-white hover:border-charcoal-900 hover:bg-charcoal-900"),
  outline: cn(outlined, "border border-theme-dark text-theme-dark hover:bg-theme-dark hover:text-theme-white"),
  light: cn(solid, "border border-theme-white bg-theme-white text-theme-dark hover:bg-theme-cream"),
  "ghost-light": cn(outlined, "border border-theme-white text-theme-white hover:bg-theme-white hover:text-theme-dark"),
  cocoa: cn(solid, "border border-theme-dark bg-theme-dark text-theme-white hover:border-charcoal-900 hover:bg-charcoal-900"),
  text: "font-sans font-medium uppercase border-b border-theme-dark pb-1 pt-1.5 text-xs tracking-[0.12em] text-theme-dark hover:border-brown-700 hover:text-brown-700",
};

interface CtaLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  /** Open in a new tab (external links only). */
  newTab?: boolean;
  "aria-label"?: string;
}

/** Link styled as a CTA. Uses next/link internally, a plain anchor otherwise. */
export function CtaLink({ href, children, variant = "primary", className, newTab, ...rest }: CtaLinkProps) {
  const classes = cn(base, variants[variant], className);
  if (isExternal(href)) {
    const tab = newTab ? { target: "_blank", rel: "noopener noreferrer" } : {};
    return (
      <a href={href} className={classes} {...tab} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}
