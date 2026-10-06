import { cn } from "@/lib/utils";

export const eyebrowClass = "font-sans text-xs uppercase tracking-[0.25em] text-sage-700";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "light",
  id,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  id?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-10 max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className={cn(eyebrowClass, "mb-5", tone === "dark" && "text-sage-300")}>{eyebrow}</p>
      )}
      <h2
        id={id}
        className={cn(
          "font-serif text-3xl leading-[1.15] sm:text-4xl lg:text-5xl",
          tone === "dark" ? "text-cream-50" : "text-charcoal-900"
        )}
      >
        {title}
      </h2>
      <div
        aria-hidden="true"
        className={cn("my-7 h-px w-12", align === "center" && "mx-auto", tone === "dark" ? "bg-sage-300" : "bg-sage-500")}
      />
      {intro && (
        <div
          className={cn(
            "font-sans text-base leading-[1.75] sm:text-lg",
            tone === "dark" ? "text-cream-100/85" : "text-charcoal-800/85"
          )}
        >
          {intro}
        </div>
      )}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="bg-cream-200 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {eyebrow && <p className={cn(eyebrowClass, "mb-5")}>{eyebrow}</p>}
          <h1 className="font-serif text-4xl leading-[1.1] text-charcoal-900 sm:text-5xl lg:text-6xl">{title}</h1>
          <div aria-hidden="true" className="my-7 h-px w-12 bg-sage-500" />
          {intro && <div className="font-sans text-base leading-[1.75] text-charcoal-800/85 sm:text-lg">{intro}</div>}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  );
}
