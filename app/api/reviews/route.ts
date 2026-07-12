import { NextResponse } from 'next/server'

export const revalidate = 86400 // 24 hours

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  const placeId = process.env.GOOGLE_PLACE_ID

  if (!apiKey || !placeId) {
    return NextResponse.json({ error: 'API credentials not configured' }, { status: 503 })
  }

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}?fields=displayName,rating,userRatingCount,reviews&languageCode=en`,
      {
        headers: {
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': 'displayName,rating,userRatingCount,reviews',
        },
        next: { revalidate: 86400 },
      }
    )

    if (!res.ok) throw new Error(`Places API error: ${res.status}`)

    interface PlacesReview {
      authorAttribution?: { displayName?: string }
      rating?: number
      text?: { text?: string }
      relativePublishTimeDescription?: string
    }
    const data: {
      rating?: number
      userRatingCount?: number
      reviews?: PlacesReview[]
    } = await res.json()

    // Pass through only what the UI needs
    return NextResponse.json({
      rating: data.rating,
      userRatingCount: data.userRatingCount,
      reviews: (data.reviews ?? []).slice(0, 6).map((r) => ({
        author: r.authorAttribution?.displayName,
        rating: r.rating,
        text: r.text?.text,
        relativeTime: r.relativePublishTimeDescription,
      })),
    })
  } catch (err) {
    console.error('Reviews fetch failed:', err)
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 })
  }
}
