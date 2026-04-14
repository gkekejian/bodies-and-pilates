import dynamic from 'next/dynamic'

// Client component loaded only on the browser — avoids SSR for the
// custom element and the @behold/widget dynamic import inside it.
const InstagramFeed = dynamic(() => import('@/components/instagram-feed'), {
  ssr: false,
})

export default function InstagramSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl text-stone-800 mb-3">
            Follow Us on Instagram
          </h2>
          <a
            href="https://www.instagram.com/bodiesandpilates"
            target="_blank"
            rel="noopener noreferrer"
            className="text-taupe-500 hover:text-stone-800 transition-colors text-sm tracking-wide"
          >
            @bodiesandpilates
          </a>
        </div>

        <InstagramFeed />
      </div>
    </section>
  )
}
