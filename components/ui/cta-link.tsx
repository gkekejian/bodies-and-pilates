import Link from "next/link";
import { cn } from "@/lib/utils";
import { isExternal } from "@/lib/site";

type Variant = "primary" | "outline" | "light" | "ghost-light" | "cocoa" | "text";

const base =
  "inline-flex items-center justify-center text-center transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-500 focus-visible:ring-offset-2";

// The old site's buttons, from the captures: solid "Book Now" bars set in a
// letter-spaced serif, and a thin outlined "BOOK A SESSION" in caps.
const solid = "min-h-[48px] rounded-none px-8 py-3 font-accent text-[15px] tracking-[0.12em]";
const outlined = "min-h-[48px] rounded-none px-12 py-3 font-sans text-[13px] font-medium uppercase tracking-[0.06em]";

const variants: Record<Variant, string> = {
  primary: cn(solid, "border border-wix-footer bg-wix-footer text-wix-offwhite hover:border-charcoal-900 hover:bg-charcoal-900"),
  outline: cn(outlined, "border border-wix-footer text-wix-footer hover:bg-wix-footer hover:text-wix-offwhite"),
  light: cn(solid, "border border-wix-offwhite bg-wix-offwhite text-wix-footer hover:bg-wix-pricing"),
  "ghost-light": cn(outlined, "border border-wix-offwhite text-wix-offwhite hover:bg-wix-offwhite hover:text-wix-footer"),
  cocoa: cn(solid, "border border-wix-cocoa bg-wix-cocoa text-wix-offwhite hover:border-charcoal-900 hover:bg-charcoal-900"),
  text: "font-sans font-medium uppercase border-b border-wix-footer pb-1 pt-1.5 text-xs tracking-[0.12em] text-wix-footer hover:border-sage-700 hover:text-sage-700",
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
