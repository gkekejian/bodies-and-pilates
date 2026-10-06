import { cn } from "@/lib/utils";

/**
 * Clearly labeled stand-in for content the owner has not supplied yet
 * (policy text, bios, attributions). Search the codebase for
 * data-placeholder or "TODO(owner)" to find every open item.
 */
export function OwnerPlaceholder({
  label,
  children,
  className,
  tone = "light",
}: {
  label: string;
  children?: React.ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <div
      data-placeholder="content"
      className={cn(
        "rounded-sm border border-dashed px-4 py-3",
        tone === "light"
          ? "border-taupe-500/60 bg-cream-100/70 text-charcoal-800/70"
          : "border-cream-50/40 bg-cream-50/5 text-cream-100/80",
        className
      )}
    >
      <p
        className={cn(
          "font-sans text-[10px] font-medium uppercase tracking-[0.2em]",
          tone === "light" ? "text-taupe-700" : "text-sage-300"
        )}
      >
        Placeholder: {label}
      </p>
      {children && <p className="mt-1 font-sans text-sm leading-relaxed">{children}</p>}
    </div>
  );
}
