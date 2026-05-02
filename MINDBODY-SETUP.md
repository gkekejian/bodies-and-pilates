# Mindbody Setup — Trigger Emails & First-Month Offer

One-time setup. Once these are configured, they run themselves forever.

---

## The two-tier offer

The studio runs two new-client offers. They are intentionally separate:

| Tier | Channel | Price | Who sees it |
|---|---|---|---|
| First class | Public (website, search, social) | **$25** | Everyone |
| First month unlimited | Private (Mindbody trigger email after first class) | **$99** | Only clients who already took their first class |

The $25 lives on the website. The $99 does not appear on the website anywhere — it only goes out by automated email after someone has already attended their first class. That asymmetry is the point: new clients have a tangible reason to convert from one class to a month.

---

## Setting up the $99 first-month-unlimited contract in Mindbody

This creates the membership product the trigger email will sell.

1. In Mindbody, navigate to **Settings → Pricing Options → Add New** (or **Manager Tools → Pricing Options** depending on your interface — verify the exact label in your Mindbody admin).
2. Create a new **Contract / Membership** with these terms:
   - Name: `New Client First Month Unlimited`
   - Price: **$99**
   - Duration: **30 days**
   - Type: **Unlimited classes** for the duration
   - Auto-renews into your standard `$280/month Unlimited` membership at the end of the 30-day window unless cancelled
   - Restrict to clients with **0 or 1 prior visits** at time of purchase (this is the new-client gate — without it, returning clients could buy the offer)
3. Once saved, copy the **Buy Now URL** for this contract — you'll need it for the trigger email button. The URL looks like:
   ```
   https://clients.mindbodyonline.com/classic/ws?studioid=5739427&stype=40&prodid=XXXXX
   ```
   Replace `XXXXX` with the actual prodid Mindbody gives this contract.

> **TODO for Naira:** verify the exact menu labels in your Mindbody admin and confirm the auto-renew logic with Mindbody support — different Mindbody plans expose contract setup slightly differently.

---

## Trigger email 1 — post-first-class

The headline offer. Goes out **2 hours after** a new client checks out of their first class.

**In Mindbody:** Marketing → Automated Emails → Add New (or **Email Campaigns**, depending on your version).

- **Trigger:** 2 hours after class checkout
- **Audience filter:** clients with **exactly 1 visit**
- **Subject:** `How was your first class?`
- **Body** (paste this directly):

  > Hi [First Name],
  >
  > Thank you for trying your first class at Bodies and Pilates. We hope you felt welcomed, challenged, and a little stronger walking out than you did walking in.
  >
  > Ready to make it a habit? For new clients only, your first month of unlimited classes is **$99**. That's reformer, mat, and group classes — as many as you want for 30 days.
  >
  > **[Button: Claim Your $99 First Month]**
  >
  > See you on the mat,
  > Naira

- **Button link:** the Mindbody Buy Now URL for the $99 contract (from the section above).

---

## Trigger email 2 — post-second-class reminder

If they came back for a second class but haven't bought the $99 yet, this is the gentle nudge.

- **Trigger:** after second class checkout
- **Audience filter:** clients with exactly 2 visits, **AND** who have not yet purchased the `New Client First Month Unlimited` contract
- **Subject:** `Your $99 first month is still waiting`
- **Body** (paste this directly):

  > Hi [First Name],
  >
  > Two classes in. We're glad you came back.
  >
  > Your new-client offer for **$99 unlimited classes for 30 days** is still available — but only while you're new. Lock it in before your trial window closes.
  >
  > **[Button: Get $99 Unlimited Month]**
  >
  > See you soon,
  > Naira

- **Button link:** same $99 Buy Now URL from the contract setup above.

---

## Setting up the review request email

The compounding-growth move. Every class checkout becomes a chance for a Google review.

- **Trigger:** 4 hours after class checkout
- **Audience filter:** all clients (no restriction)
- **Subject:** `Quick favor?`
- **Body** (paste this directly):

  > Hi [First Name],
  >
  > If you enjoyed today's class, would you leave us a quick Google review? It takes 30 seconds and means the world to a small studio.
  >
  > **[Button: Leave a Google Review]**
  >
  > Thank you,
  > The Bodies and Pilates team

- **Button link:** your Google Business Profile direct review URL. To get it:
  1. Sign in to [business.google.com](https://business.google.com).
  2. Open the Bodies and Pilates profile.
  3. Click **"Get more reviews"** → **"Share review form"**.
  4. Copy the link (looks like `https://g.page/r/...../review`).

---

## Once it's set up

- These three emails run automatically forever. Nothing more to do.
- To **pause or edit** any email later: Mindbody → **Marketing → Automated Emails**.
- To **see how they're performing**: Mindbody's automated email reporting will show open and click rates per campaign. Check once a quarter alongside the rest of the site review (see [OWNER-GUIDE.md](./OWNER-GUIDE.md)).

That's it. One afternoon of setup. Compounds forever.
