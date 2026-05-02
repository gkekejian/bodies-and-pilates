"use client";

import { trackBeginCheckout } from "@/lib/analytics";

export interface TrackedBuyLinkProps {
  href: string;
  itemName: string;
  price: number;
  className?: string;
  children: React.ReactNode;
}

/**
 * External Mindbody Buy Now link that fires GA4 begin_checkout before
 * navigating. Use anywhere a server component needs a tracked outbound link.
 */
export function TrackedBuyLink({
  href,
  itemName,
  price,
  className,
  children,
}: TrackedBuyLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackBeginCheckout(itemName, price)}
      className={className}
    >
      {children}
    </a>
  );
}
