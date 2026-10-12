import { PageHero } from "@/components/sections/section-heading";

/** Shared layout for /privacy and /terms. */
export function LegalPage({
  title,
  updated,
  intro,
  children,
}: {
  title: string;
  updated: string;
  intro: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} intro={<>{intro}<p className="mt-4 text-sm">Last updated {updated}</p></>} />
      <section className="bg-cream-50 py-16 sm:py-20">
        <div className="prose prose-stone mx-auto max-w-3xl px-4 prose-headings:font-serif prose-headings:font-normal prose-a:text-sage-700 prose-a:underline-offset-4 sm:px-6">
          {children}
        </div>
      </section>
    </>
  );
}
