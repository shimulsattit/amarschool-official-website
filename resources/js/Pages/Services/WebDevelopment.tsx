import { Head } from "@inertiajs/react";
import { SiteLayout, PageHero, SectionTitle, BookMeetingBar } from "@/components/site/SiteLayout";
import devImg from "@/assets/web-dev.png";
import { CheckCircle2 } from "lucide-react";

const promises = [
  "Delivery after several quality checks",
  "Premium images & graphics, flawless texts",
  "Free basic on-page SEO",
  "Best price in the market",
  "Fast delivery of your project",
  "Training for your people who will manage",
  "Free 3 months support after delivery",
  "New feature or add page at min. price",
  "We're not freelancers, we're a company",
];

const stack = ["Next.js", "Node.js", "React", "Laravel"];

const types = [
  "eCommerce Website Development",
  "Django Website Development",
  "WordPress Theme Development",
  "Custom Website Development",
  "WooCommerce Website Development",
  "Business Website Development",
  "Webflow Web Design",
  "PHP Website Development",
  "Website Management Service",
  "Shopify Web Development",
  "Wix Web Development",
  "Laravel Web Development",
];

const works = [
  "Education Consultancy",
  "Heavy Equipment Trading Agency",
  "Online Grocery Ecommerce",
  "Travel Booking Portal",
  "Restaurant Ordering Site",
  "Real Estate Listing",
];

export default function WebDevelopment() {
  return (
    <SiteLayout>
      <Head>
        <title>Web Development Service — Amar School</title>
        <meta
          name="description"
          content="Custom website, eCommerce and WordPress development with Next.js, Node, React and Laravel. Fast delivery, on-page SEO and 3 months free support."
        />
      </Head>

      <PageHero
        title="Web Development"
        breadcrumb="Pages"
        subtitle="Websites and web applications built by a team, not freelancers."
      />

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-primary">Why Choose Us</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              You'll find plenty of companies offering web development at a cheap price, promising
              all the fluffy stuff and delivering really poor products. We only promise what we are
              capable of delivering.
            </p>
            <img
              src={devImg}
              alt="Web development team illustration"
              width={1000}
              height={750}
              loading="lazy"
              className="mt-8 w-full"
            />
          </div>
          <ul className="space-y-3">
            {promises.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm text-muted-foreground">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {p}
              </li>
            ))}
            <li className="pt-6">
              <BookMeetingBar />
            </li>
          </ul>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-5xl px-6">
          <SectionTitle>Technologies We Use</SectionTitle>
          <div className="card-elevated mt-10 grid grid-cols-2 gap-6 p-8 md:grid-cols-4">
            {stack.map((s) => (
              <p
                key={s}
                className="text-center font-display text-xl font-bold text-brand-deep opacity-80"
              >
                {s}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="band-gradient py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-3xl font-bold">Types Of Website We Offer</h2>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {types.map((t) => (
              <p
                key={t}
                className="rounded-md bg-navy/50 px-5 py-3 text-center text-sm font-medium ring-1 ring-navy-foreground/15"
              >
                {t}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionTitle kicker="Portfolio">Recent Works</SectionTitle>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {works.map((w, i) => (
              <article key={w} className="card-elevated overflow-hidden">
                <div
                  className="h-40"
                  style={{
                    backgroundImage: `linear-gradient(140deg, oklch(0.45 0.15 ${240 + i * 18}), oklch(0.68 0.14 ${200 + i * 20}))`,
                  }}
                />
                <div className="p-5">
                  <h3 className="text-sm font-bold text-brand-deep">{w}</h3>
                  <p className="text-xs text-muted-foreground">Website Developed</p>
                  <span className="mt-3 inline-block rounded bg-accent px-3 py-1 text-[11px] font-semibold text-accent-foreground">
                    View Demo
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary/60 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-brand-deep">Lets Talk</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Still wondering? Let's discuss your project over a cup of coffee via an online video
              conference at your convenience. You may also book a meeting at your place. We'll
              explain and clarify all of your confusions and queries.
            </p>
            <div className="mt-8 flex justify-start">
              <BookMeetingBar />
            </div>
          </div>
          <div className="band-gradient grid h-56 place-items-center rounded-xl text-center text-sm font-semibold">
            Online video meeting · 20 minutes · Free
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
