import { Head } from "@inertiajs/react";
import { SiteLayout, PageHero, SectionTitle, BookMeetingBar } from "@/components/site/SiteLayout";
import devImg from "@/assets/web-dev.png";
import workUftcTextile from "@/assets/work-uftc-textile.png";
import workPanchagarhNews from "@/assets/work-panchagarh-news.png";
import workArabianKhebso from "@/assets/work-arabian-khebso.png";
import workKurigramCollege from "@/assets/work-kurigram-college.png";
import workSavarCantonment from "@/assets/work-savar-cantonment.png";
import workSwapnochariSchool from "@/assets/work-swapnochari-school.jpg";
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

const recentWorksList = [
  {
    title: "United Fabrics & Textile Corp.",
    category: "Corporate Textile Website",
    image: workUftcTextile,
  },
  {
    title: "Panchagarh News Portal",
    category: "Online News Portal Website",
    image: workPanchagarhNews,
  },
  {
    title: "Arabian Khebso House",
    category: "Restaurant Ordering Website",
    image: workArabianKhebso,
  },
  {
    title: "Savar Cantonment Public School & College",
    category: "School & College Website",
    image: workSavarCantonment,
  },
  {
    title: "Swapnochari Ideal School & College",
    category: "Educational Institution Website",
    image: workSwapnochariSchool,
  },
  {
    title: "Dept. of Accounting — Kurigram Govt. College",
    category: "College Department Portal",
    image: workKurigramCollege,
  },
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

      <section className="py-20 bg-slate-50/60">
        <div className="mx-auto max-w-7xl px-6">
          <SectionTitle kicker="Portfolio">Recent Works</SectionTitle>
          <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {recentWorksList.map((item, i) => (
              <article
                key={i}
                className="group card-elevated overflow-hidden rounded-2xl bg-white border border-slate-200/80 shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl flex flex-col justify-between"
              >
                <div className="relative overflow-hidden bg-slate-100 h-64 sm:h-72 border-b border-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-6">
                    <span className="rounded-full bg-[#0B63E5] px-4 py-2 text-xs font-semibold text-white shadow-lg">
                      View Demo Site
                    </span>
                  </div>
                </div>
                <div className="p-6 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-base md:text-lg text-slate-900 group-hover:text-[#0B63E5] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">{item.category}</p>
                  </div>
                  <button className="shrink-0 rounded-lg bg-primary/10 px-4 py-2 text-xs font-bold text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    View Demo
                  </button>
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
