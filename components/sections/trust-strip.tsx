async function getRating(): Promise<{ rating: number } | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!apiKey || !placeId) return null;

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}?fields=rating,userRatingCount&languageCode=en`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "rating,userRatingCount",
        },
        next: { revalidate: 86400 },
      },
    );
    if (!res.ok) return null;
    const data: { rating?: number } = await res.json();
    if (typeof data.rating !== "number") return null;
    return { rating: data.rating };
  } catch {
    return null;
  }
}

function formatRating(value: number): string {
  return value.toFixed(1).replace(/\.0$/, ".0");
}

export async function TrustStrip() {
  const review = await getRating();
  const ratingLabel = review
    ? `★ ${formatRating(review.rating)} on Google`
    : "★★★★★ Loved by clients";

  const items: string[] = [
    ratingLabel,
    "Reformer + Mat + Private",
    "Beginner-friendly",
    "5251 Vineland Ave, NoHo",
  ];

  return (
    <section
      aria-label="Studio highlights"
      className="bg-cream-50 border-y border-taupe-300/60"
    >
      <ul className="mx-auto max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-6 px-4 sm:px-6 lg:px-8 py-5 md:py-4 text-center font-sans text-[11px] sm:text-xs md:text-sm tracking-[0.18em] uppercase text-charcoal-800/85">
        {items.map((label) => (
          <li key={label} className="flex items-center justify-center">
            <span className="leading-snug">{label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
