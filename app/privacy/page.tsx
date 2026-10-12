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

// TODO(owner): have this policy reviewed by a lawyer before launch, and
// update the "Service providers" list once the form webhooks and email
// platform are connected. It describes only what this website actually does.
const UPDATED = "October 12, 2026";

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
      <ul>
        <li>
          <strong>First-timer&apos;s guide form:</strong> your email address and, if you choose, your phone number.
        </li>
        <li>
          <strong>Contact form:</strong> your name, email address, and message.
        </li>
      </ul>
      <p>
        Please do not send health or medical details through website forms. Tell your instructor about injuries or
        conditions in person before class.
      </p>

      <h3>Analytics, only with your consent</h3>
      <p>
        If you click Accept on our cookie banner, we load Google Analytics to understand how the site is used and,
        where enabled, the Meta Pixel to measure our ads. These tools set cookies and receive information about your
        visit, such as pages viewed, device and browser type, and approximate location. Nothing is loaded before you
        accept. If your browser sends a Global Privacy Control signal, we treat it as a decline.
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
        <li>To reply to your messages and questions.</li>
        <li>To send the first-timer&apos;s guide and studio news you asked for. You can unsubscribe at any time.</li>
        <li>With your consent, to understand how the site is used and to measure our advertising.</li>
        <li>To operate, secure, and improve the website.</li>
      </ul>

      <h2>Sharing</h2>
      <p>
        We share information only with service providers that help us run the site and respond to you, such as our
        hosting, form delivery, and email providers, and, with your consent, our analytics providers.{" "}
        <strong>We do not sell your personal information.</strong> If you accept cookies and the Meta Pixel is enabled,
        Meta receives information about your visit to measure our ads, which may count as &ldquo;sharing&rdquo; under
        California law. You can decline or withdraw consent at any time.
      </p>
      <p>We do not send information you submit through this website to AI or large language model services.</p>

      <h2>How long we keep it</h2>
      <p>
        We keep form submissions only as long as we need them to respond to you and to send the information you asked
        for, or until you ask us to delete them.
      </p>

      <h2>Your choices and rights</h2>
      <p>
        You can change your cookie choice at any time using <strong>Cookie settings</strong> in the site footer.
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
