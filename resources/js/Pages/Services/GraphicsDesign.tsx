import { Head } from "@inertiajs/react";
import { SiteLayout, PageHero, SectionTitle } from "@/components/site/SiteLayout";
import graphicsImg from "@/assets/graphics-team.png";
import { useState } from "react";

const tabs = ["Logo", "Business Card", "T-Shirt Design", "Social Media Design", "Brand Design", "Brochure Design"];

const swatches = [
  ["oklch(0.5 0.17 250)", "oklch(0.72 0.13 210)"],
  ["oklch(0.55 0.2 25)", "oklch(0.85 0.05 30)"],
  ["oklch(0.35 0.05 90)", "oklch(0.78 0.16 85)"],
  ["oklch(0.3 0.06 260)", "oklch(0.68 0.18 55)"],
  ["oklch(0.6 0.18 45)", "oklch(0.9 0.04 60)"],
  ["oklch(0.55 0.19 35)", "oklch(0.75 0.14 70)"],
  ["oklch(0.5 0.14 145)", "oklch(0.8 0.13 130)"],
  ["oklch(0.45 0.13 300)", "oklch(0.75 0.12 320)"],
  ["oklch(0.4 0.1 220)", "oklch(0.72 0.12 190)"],
];

export default function GraphicsDesign() {
  const [active, setActive] = useState(tabs[0]);

  return (
    <SiteLayout>
      <Head>
        <title>Graphics Design Service — Amar School</title>
        <meta
          name="description"
          content="Logo, business card, brochure, t-shirt and social media design for brands in Bangladesh. Custom graphics that convert."
        />
      </Head>

      <PageHero
        title="Graphics Design Service"
        breadcrumb="Pages"
        subtitle="Visual assets that make your brand impossible to ignore."
      />

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold text-primary">Graphic Design Agency In Bangladesh</h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              "Content is king" — nowadays most internet users are attracted by visual content, so
              most companies and business owners are used to creating visual content for their
              business. The increased variety of visual content has also changed today's content
              marketing strategies to a great extent.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              If you are looking for a graphic design company to create visual assets focused on
              customer engaging designs, you have come to the right place. We hope our dynamic
              graphics designs will matter greatly to your company's outperform, marketing success
              and customer conversion.
            </p>
          </div>
          <img
            src={graphicsImg}
            alt="Graphic designers collaborating"
            width={1000}
            height={750}
            loading="lazy"
            className="w-full"
          />
        </div>
      </section>

      <section className="bg-secondary/50 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
          <div className="band-gradient grid h-64 place-items-center rounded-xl font-display text-3xl font-bold">
            LOGO
          </div>
          <div>
            <h2 className="text-2xl font-bold text-primary">Logo Design</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              A perfect logo with the right combination of fonts, shapes and colors helps you to
              define your brand best. We offer custom logo design service to create a strong brand
              identity for your business.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Whether you need a media company logo or a facebook logo for business cards, our
              versatile and creative designers can design high quality authentic logos that connect
              every aspect of your business.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-primary">Infographics Design</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Data becomes memorable when it is designed. We turn reports, results and processes
              into clean infographics that your audience actually reads and shares.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              From annual school reports to social campaign visuals, our team keeps every layout on
              brand and easy to follow.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {swatches.slice(0, 9).map(([a, b], i) => (
              <div
                key={i}
                className="aspect-square rounded-lg"
                style={{ backgroundImage: `linear-gradient(135deg, ${a}, ${b})` }}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-light/50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionTitle>Choose your exact design following your specific requirements</SectionTitle>
          <div className="mt-10 flex flex-wrap justify-center overflow-hidden rounded-md border border-border">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setActive(t)}
                className={`px-5 py-3 text-xs font-semibold transition-colors ${
                  active === t
                    ? "bg-accent text-accent-foreground"
                    : "bg-primary/90 text-primary-foreground hover:bg-primary"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {swatches.map(([a, b], i) => (
              <figure key={i} className="card-elevated overflow-hidden">
                <div
                  className="h-52"
                  style={{ backgroundImage: `linear-gradient(150deg, ${a}, ${b})` }}
                />
                <figcaption className="px-5 py-4 text-sm font-semibold text-brand-deep">
                  {active} — Sample {i + 1}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
