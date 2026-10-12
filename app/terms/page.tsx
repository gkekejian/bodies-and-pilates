import Link from "next/link";
import { LegalPage } from "@/components/sections/legal-page";
import { pageMetadata } from "@/lib/metadata";
import { EMAIL, PHONE, SITE_NAME } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Website Terms of Use | Bodies and Pilates North Hollywood",
  description:
    "Terms for using the Bodies and Pilates website in North Hollywood: bookings through MindBody and ClassPass, health information, and your use of our content.",
  path: "/terms",
});

// TODO(owner): have these terms reviewed by a lawyer before launch. They cover
// use of the website only; studio participation terms (waiver, studio rules)
// are separate.
const UPDATED = "October 12, 2026";

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      path="/terms"
      updated={UPDATED}
      intro={<p>By using this website you agree to these terms. If you do not agree, please do not use the site.</p>}
    >
      <h2>About this website</h2>
      <p>
        This website shares information about {SITE_NAME}, our classes, pricing, and schedule. We work to keep it
        accurate, but details such as class times, instructors, and prices can change.
      </p>

      <h2>Bookings and purchases</h2>
      <p>
        Bookings, purchases, memberships, and account management happen through MindBody, or through ClassPass if you
        book there. Those transactions are governed by the provider&apos;s terms and by our studio policies, including
        our cancellation and membership terms on the <Link href="/pricing">pricing page</Link> and in our{" "}
        <Link href="/faq">FAQ</Link>. The price shown at checkout is the price that applies.
      </p>

      <h2>Health information</h2>
      <p>
        Content on this site, including our blog, is general information and is not medical advice. Pilates is
        physical exercise. Check with your doctor before starting, especially if you are pregnant, injured, or have a
        medical condition, and tell your instructor about any injuries or conditions before class.
      </p>

      <h2>Our content</h2>
      <p>
        Text, photos, video, logos, and design on this site belong to {SITE_NAME} or its licensors. You may view and
        share links to our pages for personal use. Please do not copy or reuse our content commercially without
        permission.
      </p>

      <h2>Acceptable use</h2>
      <p>
        Do not misuse the site, including by submitting false information, attempting to disrupt or gain unauthorized
        access to it, or sending spam through our forms.
      </p>

      <h2>Third-party links and services</h2>
      <p>
        The site links to and embeds services we do not control, such as MindBody, ClassPass, Google Maps, and
        Instagram. Your use of those services is governed by their own terms and privacy policies.
      </p>

      <h2>No warranties and limitation of liability</h2>
      <p>
        The website is provided &ldquo;as is.&rdquo; To the fullest extent permitted by law, {SITE_NAME} is not liable
        for indirect or consequential damages arising from your use of the website.
      </p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of the State of California.</p>

      <h2>Changes and contact</h2>
      <p>
        We may update these terms and will change the date above when we do. Questions? Email{" "}
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a> or call <a href={PHONE.tel}>{PHONE.display}</a>. See also our{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </p>
    </LegalPage>
  );
}
