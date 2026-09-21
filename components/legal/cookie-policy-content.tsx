import Link from "next/link";

/** Shared by the full `/cookie-policy` page and the cookie banner's policy modal — one source of truth for the copy. */
export function CookiePolicyContent() {
  return (
    <>
      <p className="text-sm text-muted-foreground">Last updated: August 8, 2026</p>

      <p>
        This Cookie Policy explains how Pearly Sky Cleaning Services Pvt. Ltd. (“Pearly Sky”,
        “we”, “us”, or “our”) uses cookies and similar technologies on{" "}
        <a
          href="https://www.pearlyskyglobalclean.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2"
        >
          www.pearlyskyglobalclean.com
        </a>
        . By continuing to use our website, you consent to our use of cookies as described in this
        policy.
      </p>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-bold tracking-tight sm:text-2xl">1. What Are Cookies</h2>
        <p className="text-muted-foreground">
          Cookies are small text files placed on your device when you visit a website. They are
          widely used to make websites work, work more efficiently, and provide information to the
          site owner.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-bold tracking-tight sm:text-2xl">2. How We Use Cookies</h2>
        <p className="text-muted-foreground">We use the following categories of cookies:</p>
        <ol className="list-inside list-decimal text-muted-foreground">
          <li>Essential cookies — required for the website and booking flow to function</li>
          <li>Performance cookies — help us understand how visitors use the site so we can improve it</li>
          <li>Functional cookies — remember your preferences, such as country and language</li>
          <li>Advertising cookies — used to measure the effectiveness of our marketing campaigns</li>
        </ol>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-bold tracking-tight sm:text-2xl">3. Third-Party Cookies</h2>
        <p className="text-muted-foreground">
          Some cookies are placed by third-party services that appear on our pages, such as our
          live chat provider and analytics tools. We do not control these cookies — please refer to
          the relevant third party’s own privacy policy for more information.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-bold tracking-tight sm:text-2xl">4. Managing Cookies</h2>
        <p className="text-muted-foreground">
          You can accept or reject non-essential cookies at any time using the cookie banner on our
          site, or manage cookies directly through your browser settings. For general information
          about cookies, see{" "}
          <a
            href="https://www.allaboutcookies.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
          >
            All About Cookies
          </a>
          .
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-bold tracking-tight sm:text-2xl">5. Your Privacy Rights</h2>
        <p className="text-muted-foreground">
          Depending on where you live, you may have rights under data protection laws such as the
          EU/UK General Data Protection Regulation (GDPR) or the California Consumer Privacy Act
          (CCPA), as well as other applicable regional regulations. See our{" "}
          <Link href="/privacy-policy" className="underline underline-offset-2">
            Privacy Policy
          </Link>{" "}
          for details on how to exercise these rights.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-bold tracking-tight sm:text-2xl">6. Changes to This Policy</h2>
        <p className="text-muted-foreground">
          We may update this Cookie Policy from time to time. Any changes will be posted on this
          page with an updated revision date.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-bold tracking-tight sm:text-2xl">7. Contact Us</h2>
        <p className="text-muted-foreground">
          If you have any questions about this Cookie Policy, please contact us at{" "}
          <a href="mailto:info@pearlyskyglobalclean.com" className="underline underline-offset-2">
            info@pearlyskyglobalclean.com
          </a>
          .
        </p>
        <ul className="list-inside list-disc text-muted-foreground">
          <li>Headquarters (France): 15 Rue Des Halles, 75001 Paris, France</li>
          <li>Sri Lanka: No. 188/2, Kandy Road, Pahala Imbulgoda, Imbulgoda, Sri Lanka</li>
          <li>United Kingdom: 60 Tottenham Court Road, Office 775, Fitzrovia, London, W1T 2EW, United Kingdom</li>
        </ul>
      </section>
    </>
  );
}
