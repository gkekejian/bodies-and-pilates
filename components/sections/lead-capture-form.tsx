"use client";

import { useId, useState } from "react";
import { PHONE } from "@/lib/site";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "sent" | "error";

const input =
  "w-full rounded-full border border-taupe-300 bg-cream-50 px-5 py-3 font-sans text-sm text-charcoal-800 placeholder:text-charcoal-800/45 focus:border-sage-500 focus:outline-none focus:ring-2 focus:ring-sage-500/40";

/**
 * First-timer's guide sign-up. Posts to /api/lead, which forwards to the
 * owner's integration (see lib/forms.ts). Shows success only on a real 2xx.
 *
 * TODO(owner): the guide itself (what to wear, where to park, which class to
 * take) is sent by your email platform; write it there once it is connected.
 */
export function LeadCaptureForm({ source, layout = "stacked" }: { source: string; layout?: "stacked" | "inline" }) {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.get("email"),
          phone: data.get("phone") ?? "",
          website: data.get("website") ?? "",
          source,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p role="status" className="font-sans text-sm leading-relaxed text-sage-700">
        Thank you. We will email your first-timer&apos;s guide shortly.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3" aria-describedby={`${id}-note`}>
      <div className={cn("grid gap-3", layout === "inline" && "sm:grid-cols-[1.4fr_1fr_auto]")}>
        <div>
          <label htmlFor={`${id}-email`} className="sr-only">
            Email
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Email"
            className={input}
          />
        </div>
        <div>
          <label htmlFor={`${id}-phone`} className="sr-only">
            Phone (optional)
          </label>
          <input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="Phone (optional)"
            className={input}
          />
        </div>
        {/* Honeypot, hidden from people and assistive tech. */}
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
        <button
          type="submit"
          disabled={status === "sending"}
          className="min-h-[48px] rounded-full border border-charcoal-900 bg-charcoal-900 px-6 py-3 font-sans text-xs font-medium uppercase tracking-[0.2em] text-cream-50 transition-colors hover:bg-charcoal-800 disabled:opacity-60"
        >
          {status === "sending" ? "Sending" : "Send Me the Guide"}
        </button>
      </div>
      <p id={`${id}-note`} className="font-sans text-xs text-charcoal-800/70">
        We will only use your details to send the guide and studio news. Unsubscribe anytime.
      </p>
      {status === "error" && (
        <p role="alert" className="font-sans text-sm text-red-700">
          Sorry, we could not send that just now. Call or text{" "}
          <a href={PHONE.tel} className="underline underline-offset-2">
            {PHONE.display}
          </a>{" "}
          and we will help you get started.
        </p>
      )}
    </form>
  );
}
