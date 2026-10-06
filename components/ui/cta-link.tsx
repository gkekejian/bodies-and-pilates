import Link from "next/link";
import { cn } from "@/lib/utils";
import { isExternal } from "@/lib/site";

type Variant = "primary" | "outline" | "light" | "ghost-light" | "text";

const base =
  "inline-flex items-center justify-center text-center font-sans font-medium uppercase transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-500 focus-visible:ring-offset-2";

const button = "min-h-[48px] rounded-full px-7 py-3.5 text-xs tracking-[0.2em]";

const variants: Record<Variant, string> = {
  primary: cn(button, "border border-sage-700 bg-sage-700 text-cream-50 hover:border-sage-500 hover:bg-sage-500"),
  outline: cn(button, "border border-sage-700 text-sage-700 hover:bg-sage-700 hover:text-cream-50"),
  light: cn(button, "border border-cream-50 bg-cream-50 text-sage-700 hover:bg-cream-200"),
  "ghost-light": cn(button, "border border-cream-50/70 text-cream-50 hover:bg-cream-50/10"),
  text: "border-b border-sage-700 pb-1 text-xs tracking-[0.2em] text-sage-700 hover:border-sage-500 hover:text-sage-500",
};

interface CtaLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  "aria-label"?: string;
}

/** Link styled as a CTA. Uses next/link internally, a plain anchor otherwise. */
export function CtaLink({ href, children, variant = "primary", className, ...rest }: CtaLinkProps) {
  const classes = cn(base, variants[variant], className);
  if (isExternal(href)) {
    return (
      <a href={href} className={classes} {...rest}>
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
