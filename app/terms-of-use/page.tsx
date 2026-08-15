export const metadata = {
  title: "Terms of Use — TinyURL",
  description: "Terms of use for the TinyURL link shortening service.",
};

export default function TermsOfUsePage() {
  return (
    <main className="relative min-h-screen overflow-hidden pt-24 pb-8 px-4 flex items-center justify-center">
      <div className="absolute inset-0 bg-[hsl(var(--background))]" />
      <div className="absolute -top-64 -left-32 w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-64 -right-32 w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl mx-auto glass-card p-6 sm:p-10 rounded-3xl">
        <h1 className="hero-gradient-text text-2xl sm:text-3xl font-bold mb-6 text-center">
          Terms of Use
        </h1>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 leading-relaxed text-[13.5px]"
          style={{ color: "hsl(var(--muted-foreground))" }}
        >
          <section>
            <h2
              className="text-base font-semibold mb-1.5"
              style={{ color: "hsl(var(--foreground))" }}
            >
              Introduction
            </h2>
            <p>
              Welcome to TinyURL. These terms of use govern the use of our link
              shortening services. By using our platform, you agree to these terms.
            </p>
          </section>

          <section>
            <h2
              className="text-base font-semibold mb-1.5"
              style={{ color: "hsl(var(--foreground))" }}
            >
              Service Description
            </h2>
            <p>
              TinyURL is a URL shortening platform that allows users to create short,
              custom, and trackable links. We offer detailed analytics, campaign
              management, and advanced features to optimize your digital marketing
              strategies.
            </p>
          </section>

          <section>
            <h2
              className="text-base font-semibold mb-1.5"
              style={{ color: "hsl(var(--foreground))" }}
            >
              User Responsibilities
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Do not use the service for illegal or harmful activities.</li>
              <li>Do not create links to malicious content, spam, or phishing.</li>
              <li>Respect third-party intellectual property rights.</li>
              <li>Maintain the security of your access credentials.</li>
            </ul>
          </section>

          <section>
            <h2
              className="text-base font-semibold mb-1.5"
              style={{ color: "hsl(var(--foreground))" }}
            >
              Privacy
            </h2>
            <p>
              We respect your privacy and protect your personal data in accordance
              with our Privacy Policy. We collect only the information necessary to
              provide our services.
            </p>
          </section>

          <section>
            <h2
              className="text-base font-semibold mb-1.5"
              style={{ color: "hsl(var(--foreground))" }}
            >
              Limitation of Liability
            </h2>
            <p>
              TinyURL is not responsible for direct or indirect damages resulting from
              the use of the platform. We provide the service &apos;as is&apos; and do not
              guarantee uninterrupted availability.
            </p>
          </section>

          <section>
            <h2
              className="text-base font-semibold mb-1.5"
              style={{ color: "hsl(var(--foreground))" }}
            >
              Contact
            </h2>
            <p>
              For questions about these terms, contact me via LinkedIn:{" "}
              <a
                href="https://www.linkedin.com/in/mihiran-thilakarathna"
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-500 hover:text-violet-400 transition-colors font-medium whitespace-nowrap"
              >
                Mihiran Thilakarathna
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
