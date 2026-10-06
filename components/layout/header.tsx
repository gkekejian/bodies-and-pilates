"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { CtaLink } from "@/components/ui/cta-link";
import { FIRST_CLASS_CTA, introBookingHref } from "@/lib/site";
import { cn } from "@/lib/utils";

// Logo source. To use a different file, save it in public/images/ and update this path.
const LOGO_SRC = "/images/logo.svg";

export const NAV_LINKS = [
  { label: "Classes", href: "/classes" },
  { label: "Pricing", href: "/pricing" },
  { label: "Schedule", href: "/schedule" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const bookHref = introBookingHref();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-taupe-300/30 bg-cream-50/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:h-20 sm:px-6 lg:px-10">
        <Link
          href="/"
          className="flex shrink-0 items-center transition-opacity hover:opacity-80"
          aria-label="Bodies and Pilates, home"
        >
          <Image src={LOGO_SRC} alt="Bodies and Pilates logo" width={48} height={48} className="h-10 w-10 sm:h-11 sm:w-11" priority />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={cn(
                "font-sans text-[11px] font-medium uppercase tracking-[0.18em] transition-colors duration-200",
                isActive(link.href) ? "text-sage-700" : "text-charcoal-800/80 hover:text-sage-700"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <CtaLink
            href={bookHref}
            className="hidden min-h-[40px] px-4 py-2.5 text-[10px] tracking-[0.14em] min-[360px]:inline-flex sm:px-5 sm:text-[11px] sm:tracking-[0.18em]"
          >
            {FIRST_CLASS_CTA}
          </CtaLink>

          <div className="lg:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                aria-label="Open navigation menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md text-charcoal-800 transition-colors hover:bg-cream-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-500"
              >
                <Menu className="size-5" />
              </SheetTrigger>

              <SheetContent side="right" className="w-72 bg-cream-50 px-0 pt-14" showCloseButton>
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <nav className="flex flex-col px-6" aria-label="Mobile navigation">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive(link.href) ? "page" : undefined}
                      className={cn(
                        "block border-b border-taupe-300/30 py-4 font-sans text-base transition-colors duration-150",
                        isActive(link.href) ? "text-sage-700" : "text-charcoal-800 hover:text-sage-700"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    href="/blog"
                    onClick={() => setOpen(false)}
                    className="block border-b border-taupe-300/30 py-4 font-sans text-base text-charcoal-800 hover:text-sage-700"
                  >
                    Blog
                  </Link>
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
