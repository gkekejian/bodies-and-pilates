'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormValues = z.infer<typeof schema>;

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  function onSubmit(_: FormValues) {
    // Simulate async submission
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setSubmitted(true);
        reset();
        resolve();
      }, 600);
    });
  }

  if (submitted) {
    return (
      <div className="bg-sage-500/10 border border-sage-500/30 rounded-xl px-6 py-8 text-center space-y-2">
        <p className="font-serif text-xl text-charcoal-800">Message sent!</p>
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
          {...register('name')}
          className="w-full bg-cream-50 border border-taupe-300 rounded-lg px-4 py-2.5 font-sans text-sm text-charcoal-800 placeholder-charcoal-800/40 focus:outline-none focus:ring-2 focus:ring-sage-500/50 focus:border-sage-500 transition"
        />
        {errors.name && (
          <p className="mt-1 font-sans text-xs text-red-600">{errors.name.message}</p>
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
          {...register('email')}
          className="w-full bg-cream-50 border border-taupe-300 rounded-lg px-4 py-2.5 font-sans text-sm text-charcoal-800 placeholder-charcoal-800/40 focus:outline-none focus:ring-2 focus:ring-sage-500/50 focus:border-sage-500 transition"
        />
        {errors.email && (
          <p className="mt-1 font-sans text-xs text-red-600">{errors.email.message}</p>
        )}
      </div>

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
          {...register('message')}
          className="w-full bg-cream-50 border border-taupe-300 rounded-lg px-4 py-2.5 font-sans text-sm text-charcoal-800 placeholder-charcoal-800/40 focus:outline-none focus:ring-2 focus:ring-sage-500/50 focus:border-sage-500 transition resize-none"
        />
        {errors.message && (
          <p className="mt-1 font-sans text-xs text-red-600">{errors.message.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-sage-700 hover:bg-sage-500 disabled:opacity-60 text-cream-50 font-sans font-medium py-3 px-6 rounded-lg transition-colors duration-200"
      >
        {isSubmitting ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}
