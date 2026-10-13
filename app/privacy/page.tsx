import Link from "next/link";
import { LegalPage } from "@/components/sections/legal-page";
import { pageMetadata } from "@/lib/metadata";
import { ADDRESS, EMAIL, PHONE, SITE_NAME } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Privacy Policy | Bodies and Pilates North Hollywood",
  description:
    "How Bodies and Pilates in North Hollywood collects, uses, and protects your information, your California privacy rights, and how to contact us.",
  path: "/privacy",
});

// TODO(owner): have this policy reviewed by a lawyer before launch. It
// describes only what this website actually does. The site has no forms at
// launch; if a form is added later, add what it collects back here.
const UPDATED = "October 13, 2026";

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      path="/privacy"
      updated={UPDATED}
      intro={
        <p>
          This policy explains what information {SITE_NAME} collects through this website, how we use it, and the
          choices you have.
        </p>
      }
    >
      <h2>Who we are</h2>
      <p>
        {SITE_NAME} is a reformer Pilates studio at {ADDRESS.oneLine}. Contact us at{" "}
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a> or <a href={PHONE.tel}>{PHONE.display}</a>.
      </p>

      <h2>What we collect</h2>
      <h3>Information you give us</h3>
      <p>
        This website has no forms. If you call, text, or email us, we receive the details you choose to share, such as
        your name, phone number, email address, and message.
      </p>
      <p>
        Please do not send health or medical details by text or email. Tell your instructor about injuries or
        conditions in person before class.
      </p>

      <h3>Analytics and advertising tags</h3>
      <p>
        We use the Meta Pixel and, where enabled, Google tags to measure visits to this site and the results of our
        ads. These tools set cookies and receive information about your visit, such as pages viewed, booking links
        clicked, device and browser type, and approximate location. You can turn them off for your browser at any
        time with <strong>Your privacy choices</strong> in the site footer. If your browser sends a Global Privacy
        Control signal, we treat it as an opt-out and the tags never load.
      </p>

      <h3>Technical information</h3>
      <p>
        Our hosting provider processes standard server logs, such as IP address, browser type, and pages requested,
        to deliver the site and keep it secure.
      </p>

      <h2>Booking, maps, and other services</h2>
      <p>
        Class booking, purchases, and account login are handled by MindBody, including the schedule and login widgets
        on this site. Bookings made through ClassPass are handled by ClassPass. The map on our contact page is provided
        by Google Maps. When you use these services they collect information under their own privacy policies, which we
        encourage you to read.
      </p>

      <h2>How we use your information</h2>
      <ul>
        <li>To reply to your calls, texts, emails, and questions.</li>
        <li>To understand how the site is used and to measure our advertising, unless you opt out.</li>
        <li>To operate, secure, and improve the website.</li>
      </ul>

      <h2>Sharing</h2>
      <p>
        We share information only with service providers that help us run the site and respond to you, such as our
        hosting and email providers, and our analytics and advertising providers.{" "}
        <strong>We do not sell your personal information.</strong> Meta receives information about your visit to measure our
        ads, which may count as &ldquo;sharing&rdquo; under California law. You can opt out at any time with Your
        privacy choices in the footer or a Global Privacy Control signal.
      </p>
      <p>We do not send information you share with us to AI or large language model services.</p>

      <h2>How long we keep it</h2>
      <p>
        We keep your messages only as long as we need them to respond to you, or until you ask us to delete them.
      </p>

      <h2>Your choices and rights</h2>
      <p>
        You can turn analytics and advertising tags off at any time using <strong>Your privacy choices</strong> in the
        site footer.
        California residents have the right to know what personal information we hold about them, to correct it, to
        delete it, and to opt out of its sale or sharing, and we will not discriminate against you for using these
        rights. To make a request, email <a href={`mailto:${EMAIL}`}>{EMAIL}</a> or call{" "}
        <a href={PHONE.tel}>{PHONE.display}</a>. We may need to confirm your identity before acting on a request.
      </p>

      <h2>Children</h2>
      <p>
        This website is not directed to children under 13, and we do not knowingly collect their information online.
      </p>

      <h2>Changes</h2>
      <p>
        If we change this policy, we will update the date above. See also our <Link href="/terms">Terms of Use</Link>.
      </p>
    </LegalPage>
  );
}
