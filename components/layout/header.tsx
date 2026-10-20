"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { CtaLink } from "@/components/ui/cta-link";
import { FIRST_CLASS_CTA, introBookingHref } from "@/lib/site";
import { cn } from "@/lib/utils";

// Official round logo, used exactly as supplied (1342x1376). Rendered at a
// fixed height with width auto so it is never stretched or cropped. The light
// version sits on the sage header band, as on the old site.
const LOGO = { src: "/images/bodies-and-pilates-logo-round-light.png", width: 1342, height: 1376 };
const LOGO_DARK = { src: "/images/bodies-and-pilates-logo-round.png", width: 1342, height: 1376 };
const LOGO_ALT = "Bodies and Pilates logo";

// Old-site labels for the old site's pages (Booking, Pricing, FAQs), in its
// order, then the pages the rebuild added. Every href is unchanged.
export const NAV_LINKS = [
  { label: "Booking", href: "/schedule" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQs", href: "/faq" },
  { label: "Classes", href: "/classes" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

/** Blog posts open on plain text, so the header is solid there from the first paint. */
const startsOverHero = (path: string) => !/^\/blog\/(?!page\/)[^/]+$/.test(path);

/**
 * The old site's header: the round logo with the nav beside it, set straight
 * on the hero or banner photo. Pages whose first section carries [data-hero]
 * slide under it; once that section scrolls away the header turns solid.
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [overHero, setOverHero] = useState(() => startsOverHero(pathname));
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const bookHref = introBookingHref();

  useEffect(() => {
    const update = () => {
      const hero = document.querySelector<HTMLElement>("[data-hero]");
      if (!hero) return setOverHero(false);
      setOverHero(hero.getBoundingClientRect().bottom > 96);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 h-[var(--header-h)] w-full text-wix-cream transition-colors duration-300",
        overHero ? "bg-transparent" : "bg-wix-footer shadow-[0_1px_0_rgba(0,0,0,0.08)]"
      )}
    >
      <div className="mx-auto flex h-full max-w-[1100px] items-center justify-between gap-3 px-4 sm:px-6 xl:grid xl:grid-cols-[1fr_auto_1fr] xl:gap-5">
        <span aria-hidden="true" className="hidden xl:block" />
        <Link
          href="/"
          className="flex shrink-0 items-center py-1 transition-opacity hover:opacity-80"
          aria-label="Bodies and Pilates, home"
        >
          <Image
            src={LOGO.src}
            alt={LOGO_ALT}
            width={LOGO.width}
            height={LOGO.height}
            sizes="(min-width: 1280px) 88px, 56px"
            className="h-14 w-auto object-contain xl:h-[5.5rem]"
            loading="eager"
          />
        </Link>

        <nav className="hidden items-center gap-6 xl:flex" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={cn(
                "banner-text whitespace-nowrap font-accent text-[15px] text-wix-cream underline-offset-[6px] transition-opacity duration-200 hover:opacity-80",
                isActive(link.href) && "underline decoration-wix-cream/70 decoration-1"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3 xl:hidden">
          <div>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                aria-label="Open navigation menu"
                className="inline-flex h-11 w-11 items-center justify-center text-wix-cream transition-colors hover:bg-wix-footer/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wix-cream"
              >
                <Menu className="size-5" />
              </SheetTrigger>

              <SheetContent side="right" className="w-72 bg-cream-50 px-0 pt-20" showCloseButton>
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="absolute left-6 top-4 transition-opacity hover:opacity-80"
                  aria-label="Bodies and Pilates, home"
                >
                  <Image src={LOGO_DARK.src} alt={LOGO_ALT} width={LOGO_DARK.width} height={LOGO_DARK.height} sizes="48px" className="h-12 w-auto object-contain" />
                </Link>
                <nav className="flex flex-col px-6" aria-label="Mobile navigation">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive(link.href) ? "page" : undefined}
                      className={cn(
                        "block border-b border-taupe-300/40 py-4 font-accent text-base transition-colors duration-150",
                        isActive(link.href) ? "text-sage-700" : "text-charcoal-800 hover:text-sage-700"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="pt-6" onClick={() => setOpen(false)}>
                    <CtaLink href={bookHref} className="w-full">
                      {FIRST_CLASS_CTA}
                    </CtaLink>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
