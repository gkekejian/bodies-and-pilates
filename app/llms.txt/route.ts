const BODY = `# Bodies and Pilates

> Boutique Pilates studio in North Hollywood, CA offering small-group reformer,
> mat, full-body, and flexibility classes plus private and duet sessions.
> Tagline: "Empower Your Essence."

## Key Facts

- Address: 5251 Vineland Ave, Suite 6, North Hollywood, CA 91601
- Phone: (818) 653-3883
- Email: Naira@bodiesandpilates.com
- Website: https://www.bodiesandpilates.com
- Hours: Mon & Wed 7:00am-8:00pm; Tue & Thu 8:30am-8:30pm; Fri 7:30am-11:30am; Sat & Sun 9:00am-12:00pm
- Serves: North Hollywood, Toluca Lake, Valley Village, Studio City, Burbank, Glendale, Hollywood
- Parking: free street parking on Weddington St; metered on Vineland Ave and McCormick St
- Booking: online via Mindbody (grip socks required in every class)

## Pricing

- First class (new clients): $25
- 1 week unlimited (intro): $105
- Single class: $36
- 5-class pack: $160 · 10-class pack: $300 (packs valid 3 months)
- Memberships: 5 classes $130/mo · 8 classes $170/mo · 12 classes $220/mo · unlimited $280/mo
- Private session (55 min): $100 · Duet session: $140
- Cancellation: 12-hour notice required; no-show fee $35

## Pages

- [Classes](https://www.bodiesandpilates.com/classes): Reformer, Beginner, Full-Body, Flexibility, Private/Duet
- [Schedule & Booking](https://www.bodiesandpilates.com/schedule)
- [Pricing](https://www.bodiesandpilates.com/pricing)
- [FAQ](https://www.bodiesandpilates.com/faq): policies, parking, what to bring
- [Locations we serve](https://www.bodiesandpilates.com/locations)
- [Instructors](https://www.bodiesandpilates.com/instructors)
- [Blog](https://www.bodiesandpilates.com/blog): guides on reformer Pilates, pricing, and getting started
- [Contact](https://www.bodiesandpilates.com/contact)
`;

export function GET() {
  return new Response(BODY, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
