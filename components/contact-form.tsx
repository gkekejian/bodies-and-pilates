'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { EMAIL, PHONE } from '@/lib/site';

// No runtime code generation: zod otherwise probes with Function(), which a
// strict Content-Security-Policy (no 'unsafe-eval') reports or blocks.
z.config({ jitless: true });

const schema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(120, 'Please keep your name under 120 characters'),
  email: z.string().trim().min(1, 'Email is required').email('Please enter a valid email address').max(200),
  message: z
    .string()
    .trim()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Please keep your message under 5,000 characters'),
  // Honeypot: hidden from people, filled by bots. The API drops those.
  website: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [sendError, setSendError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  // Posts to /api/contact, which forwards to the owner's destination
  // (see lib/forms.ts). Success is shown only after a real 2xx response.
  async function onSubmit(values: FormValues) {
    setSendError(false);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error(String(res.status));
      setSubmitted(true);
      reset();
    } catch {
      setSendError(true);
    }
  }

  if (submitted) {
    return (
      <div className="bg-sage-500/10 border border-sage-500/30 rounded-xl px-6 py-8 text-center space-y-2">
        <p className="font-serif text-xl text-charcoal-800">Message sent.</p>
        <p className="font-sans text-sm text-charcoal-800/70">
          Thank you for reaching out. We&apos;ll get back to you as soon as possible.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-2 font-sans text-sm text-sage-700 underline underline-offset-2 hover:text-sage-500"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-5"
    >
      {/* Name */}
      <div>
        <label
          htmlFor="contact-name"
          className="block font-sans text-sm font-medium text-charcoal-800 mb-1.5"
        >
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          placeholder="Your name"
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
          maxLength={120}
          {...register('name')}
          className="w-full bg-cream-50 border border-taupe-300 rounded-lg px-4 py-2.5 font-sans text-sm text-charcoal-800 placeholder-charcoal-800/40 focus:outline-none focus:ring-2 focus:ring-sage-500/50 focus:border-sage-500 transition"
        />
        {errors.name && (
          <p id="contact-name-error" className="mt-1 font-sans text-xs text-red-700">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="contact-email"
          className="block font-sans text-sm font-medium text-charcoal-800 mb-1.5"
        >
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
          {...register('email')}
          className="w-full bg-cream-50 border border-taupe-300 rounded-lg px-4 py-2.5 font-sans text-sm text-charcoal-800 placeholder-charcoal-800/40 focus:outline-none focus:ring-2 focus:ring-sage-500/50 focus:border-sage-500 transition"
        />
        {errors.email && (
          <p id="contact-email-error" className="mt-1 font-sans text-xs text-red-700">{errors.email.message}</p>
        )}
      </div>

      <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" {...register('website')} />

      {/* Message */}
      <div>
        <label
          htmlFor="contact-message"
          className="block font-sans text-sm font-medium text-charcoal-800 mb-1.5"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          rows={5}
          placeholder="How can we help you?"
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          maxLength={5000}
          {...register('message')}
          className="w-full bg-cream-50 border border-taupe-300 rounded-lg px-4 py-2.5 font-sans text-sm text-charcoal-800 placeholder-charcoal-800/40 focus:outline-none focus:ring-2 focus:ring-sage-500/50 focus:border-sage-500 transition resize-none"
        />
        {errors.message && (
          <p id="contact-message-error" className="mt-1 font-sans text-xs text-red-700">{errors.message.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="min-h-[48px] w-full rounded-full border border-sage-700 bg-sage-700 px-7 py-3.5 font-sans text-xs font-medium uppercase tracking-[0.2em] text-cream-50 transition-colors duration-300 hover:border-sage-500 hover:bg-sage-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-500 focus-visible:ring-offset-2 disabled:opacity-60"
      >
        {isSubmitting ? 'Sending' : 'Send message'}
      </button>

      {sendError && (
        <p role="alert" className="font-sans text-sm text-red-700">
          Sorry, your message could not be sent just now. Call or text{' '}
          <a href={PHONE.tel} className="underline underline-offset-2">
            {PHONE.display}
          </a>
          , or email{' '}
          <a href={`mailto:${EMAIL}`} className="underline underline-offset-2">
            {EMAIL}
          </a>
          .
        </p>
      )}
    </form>
  );
}
