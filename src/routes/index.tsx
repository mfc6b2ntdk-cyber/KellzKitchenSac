import { createFileRoute } from "@tanstack/react-router";
import { CateringCalculator } from "@/components/catering-calculator";
import { ContactForm } from "@/components/contact-form";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { JamaicaBg } from "@/components/jamaica-bg";
import { MenuSection } from "@/components/menu-section";
import { Navbar } from "@/components/navbar";
import { Services } from "@/components/services";
import { Story } from "@/components/story";
import { Testimonials } from "@/components/testimonials";
import { SITE } from "@/lib/data";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: SITE.fullName,
    servesCuisine: "Jamaican",
    telephone: "+1-916-220-4281",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.addressLine,
      addressLocality: "Sacramento",
      addressRegion: "CA",
      postalCode: "95841",
    },
    url: SITE.instagram,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <JamaicaBg />
      <div className="grain" aria-hidden="true" />
      <a
        href="#menu"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-fg focus:px-3 focus:py-2 focus:text-bg"
      >
        Skip to menu
      </a>
      <div className="relative z-[1]">
        <Navbar />
        <main>
          <Hero />
          <Services />
          <MenuSection />
          <CateringCalculator />
          <Story />
          <Testimonials />
          <ContactForm />
        </main>
        <Footer />
      </div>
    </>
  );
}
