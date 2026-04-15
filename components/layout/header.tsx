"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// Logo source — SVG recreation at /images/logo.svg. To use your own
// PNG/SVG, save it at public/images/logo.png (or .svg) and update LOGO_SRC.
const LOGO_SRC = "/images/logo.svg";

const navLinks = [
  { label: "Classes", href: "/classes" },
  { label: "Schedule", href: "/schedule" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const navItemVariants: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.07, duration: 0.28, ease: "easeOut" as const },
  }),
};

function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-3 transition-opacity hover:opacity-80"
      aria-label="Bodies and Pilates — Home"
    >
      <Image
        src={LOGO_SRC}
        alt="Bodies and Pilates"
        width={48}
        height={48}
        className="h-11 w-11"
        priority
      />
      <span className="sr-only">Bodies and Pilates</span>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-taupe-300/30 bg-cream-50/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10">
        {/* Logo */}
        <Logo />

        {/* Desktop nav — tracked caps, editorial feel */}
        <nav className="hidden items-center gap-9 md:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={[
                "font-sans text-[11px] font-medium tracking-[0.18em] uppercase transition-colors duration-200",
                isActive(link.href)
                  ? "text-sage-700"
                  : "text-charcoal-800/80 hover:text-sage-700",
              ].join(" ")}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right: Book Now + hamburger */}
        <div className="flex items-center gap-3">
          <Link
            href="/pricing"
            className="inline-flex h-10 items-center justify-center rounded-full border border-sage-700 bg-sage-700 px-5 font-sans text-[11px] font-medium tracking-[0.18em] uppercase text-cream-50 transition-all duration-200 hover:bg-cream-50 hover:text-sage-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-500 focus-visible:ring-offset-2"
          >
            Book Now
          </Link>

          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                aria-label="Open navigation menu"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md text-charcoal-800 transition-colors hover:bg-cream-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-500"
              >
                <Menu className="size-5" />
              </SheetTrigger>

              <SheetContent side="right" className="w-72 bg-cream-50 px-0 pt-16" showCloseButton>
                <nav className="flex flex-col px-6" aria-label="Mobile navigation">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.href}
                      custom={i}
                      initial="hidden"
                      animate="visible"
                      variants={navItemVariants}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={[
                          "block border-b border-taupe-300/30 py-4 font-sans text-base transition-colors duration-150",
                          isActive(link.href)
                            ? "text-sage-500 underline decoration-sage-500 underline-offset-4"
                            : "text-charcoal-800 hover:text-sage-500",
                        ].join(" ")}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}

                  <motion.div
                    custom={navLinks.length}
                    initial="hidden"
                    animate="visible"
                    variants={navItemVariants}
                    className="pt-6"
                  >
                    <Link
                      href="/pricing"
                      onClick={() => setOpen(false)}
                      className="flex w-full items-center justify-center rounded-lg bg-sage-700 py-3 font-sans text-sm font-medium text-cream-50 transition-colors hover:bg-sage-500"
                    >
                      Book Now
                    </Link>
                  </motion.div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
