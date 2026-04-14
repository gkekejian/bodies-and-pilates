'use client'

import { useEffect } from 'react'

// Behold.so Instagram widget
// Docs: https://behold.so/docs/widget/
// Package: @behold/widget (installed)
export default function InstagramFeed({ feedId }: { feedId?: string }) {
  const id = feedId ?? process.env.NEXT_PUBLIC_BEHOLD_FEED_ID

  useEffect(() => {
    if (!id) return
    // Dynamically import to avoid SSR issues — the package registers
    // the <behold-widget> custom element on the client only.
    import('@behold/widget').catch(() => {
      // Silently ignore if the package fails to load in a given env.
    })
  }, [id])

  if (!id) {
    return (
      <div className="text-center py-12 bg-cream-100 rounded-lg">
        <p className="text-taupe-500 text-sm">Instagram feed coming soon.</p>
        <p className="text-xs text-taupe-500 mt-1">
          Configure NEXT_PUBLIC_BEHOLD_FEED_ID to display posts.
        </p>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* @ts-expect-error — behold-widget is a custom element, no JSX types */}
      <behold-widget feed-id={id} />
    </div>
  )
}
