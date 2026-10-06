import { HOURS } from "@/lib/site";
import { cn } from "@/lib/utils";

export function HoursList({ className }: { className?: string }) {
  return (
    <dl className={cn("divide-y divide-taupe-300/60 font-sans text-sm", className)}>
      {HOURS.map((h) => (
        <div key={h.day} className="flex justify-between gap-4 py-2.5">
          <dt className="font-medium text-charcoal-800">{h.day}</dt>
          <dd className="text-charcoal-800/75">{h.label}</dd>
        </div>
      ))}
    </dl>
  );
}
