import Link from "next/link";
import { CLASSES, type ClassSlug } from "@/lib/classes";

const link = "font-medium text-brown-700 underline underline-offset-4 hover:text-brown-900";

/**
 * Reading that fits each class, so every post sits two clicks from the
 * homepage (home, class page, post) now that the blog is out of the nav.
 */
const READING: Record<ClassSlug, React.ReactNode> = {
  beginner: (
    <>
      Before your first class, read{" "}
      <Link href="/blog/your-first-pilates-class-minute-by-minute" className={link}>
        what happens in your first class, minute by minute
      </Link>
      ,{" "}
      <Link href="/blog/what-to-wear-to-pilates" className={link}>
        what to wear to Pilates
      </Link>
      ,{" "}
      <Link href="/blog/5-most-common-reformer-mistakes-beginners" className={link}>
        the five reformer mistakes beginners make
      </Link>{" "}
      and{" "}
      <Link href="/blog/pilates-for-beginners-north-hollywood" className={link}>
        where beginners in North Hollywood should start
      </Link>
      .
    </>
  ),
  fullbody: (
    <>
      Planning your week? Read{" "}
      <Link href="/blog/how-often-should-you-do-pilates" className={link}>
        how often to do Pilates for results
      </Link>
      ,{" "}
      <Link href="/blog/is-reformer-pilates-good-for-weight-loss" className={link}>
        whether reformer Pilates helps with weight loss
      </Link>{" "}
      and{" "}
      <Link href="/blog/pilates-for-men" className={link}>
        reformer Pilates for men
      </Link>
      .
    </>
  ),
  flexibility: (
    <>
      Related reading:{" "}
      <Link href="/blog/is-pilates-good-for-back-pain" className={link}>
        is Pilates good for back pain?
      </Link>{" "}
      and{" "}
      <Link href="/blog/reformer-pilates-vs-yoga" className={link}>
        how reformer Pilates compares with yoga
      </Link>
      .
    </>
  ),
  private: (
    <>
      Deciding between one-on-one and a class? Read{" "}
      <Link href="/blog/private-vs-group-pilates" className={link}>
        private vs group Pilates
      </Link>{" "}
      and{" "}
      <Link href="/blog/how-much-does-reformer-pilates-cost-north-hollywood" className={link}>
        what reformer Pilates costs in North Hollywood
      </Link>
      .
    </>
  ),
};

/** The same block on every class page: reading for this class, then the other classes. */
export function ClassNext({ slug }: { slug: ClassSlug }) {
  const others = CLASSES.filter((c) => c.slug !== slug);
  return (
    <section aria-labelledby="explore-classes" className="bg-cream-50 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="max-w-3xl font-sans text-base leading-[1.75] text-charcoal-800/85">{READING[slug]}</p>
        <h2 id="explore-classes" className="mt-12 font-serif text-3xl font-light text-brown-900 sm:text-4xl">
          Explore the other classes
        </h2>
        <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3 font-sans text-base">
          {others.map((c) => (
            <li key={c.slug}>
              <Link href={`/classes/${c.slug}`} className={link}>
                {c.slug === "private" ? `${c.name} sessions` : `${c.name} class`}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/classes" className={link}>
              All reformer Pilates classes
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
