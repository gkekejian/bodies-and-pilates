import Link from "next/link";

/**
 * Slim, server-rendered studio-facts band. Doubles as the plain-HTML
 * "key facts" block that answer engines quote — keep it factual.
 */
const facts = [
  {
    label: "Studio",
    value: "5251 Vineland Ave, Suite 6, North Hollywood",
    href: "https://www.google.com/maps/search/?api=1&query=Bodies%20and%20Pilates%205251%20Vineland%20Ave%20Suite%206%20North%20Hollywood%20CA%2091601",
    external: true,
  },
  {
    label: "First Class",
    value: "$25 for new clients",
    href: "/pricing",
    external: false,
  },
  {
    label: "Open Today",
    value: "See studio hours",
    href: "/schedule",
    external: false,
  },
  {
    label: "Call Us",
    value: "(818) 653-3883",
    href: "tel:+18186533883",
    external: true,
  },
] as const;

export function KeyFactsStrip() {
  return (
    <section
      aria-label="Studio quick facts"
      className="bg-charcoal-900 text-cream-100"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 divide-cream-100/10 lg:divide-x lg:divide-cream-100/10">
          {facts.map((fact) => {
            const inner = (
              <>
                <dt className="font-sans text-[10px] tracking-[0.28em] uppercase text-taupe-300 mb-1">
                  {fact.label}
                </dt>
                <dd className="font-sans text-sm text-cream-100/90 group-hover:text-cream-50 transition-colors">
                  {fact.value}
                </dd>
              </>
            );
            return (
              <div key={fact.label} className="py-5 lg:px-8 first:lg:pl-0">
                {fact.external ? (
                  <a
                    href={fact.href}
                    className="group block"
                    {...(fact.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {inner}
                  </a>
                ) : (
                  <Link href={fact.href} className="group block">
                    {inner}
                  </Link>
                )}
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
