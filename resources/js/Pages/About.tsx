import { Head } from "@inertiajs/react";
import { SiteLayout, PageHero, SectionTitle } from "@/components/site/SiteLayout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import aboutTopImg from "@/assets/about-top.png";
import aboutBottomImg from "@/assets/about-bottom.png";
import trustedCustomersImg from "@/assets/trusted-customers.png";
import { BadgeCheck, Phone, MessageCircle, Target, Eye } from "lucide-react";

const points = [
  ["1. Unique & Best Quality", "Amarschool offers the best school management system on the market, with the most unique and modern software available."],
  ["2. Fast & Responsive", "Optimised pages and lightweight modules keep the system fast even on slow connections."],
  ["3. User Flexibility", "Role based dashboards for admin, teachers, students and guardians."],
  ["4. Easy Maintenance", "Cloud hosted, auto updated — nothing to install on your school computers."],
  ["5. Safe & Secured Data", "Encrypted storage with daily automatic backups."],
  ["6. Life Time Support", "Support does not expire with your onboarding period."],
  ["7. Affordable & cost effective", "Monthly subscription designed for small and large institutions alike."],
];

export default function About() {
  return (
    <SiteLayout>
      <Head>
        <title>About Amar School — Complete Education Solution</title>
        <meta
          name="description"
          content="Learn about Amar School: 8+ years building online school management systems trusted by 150+ institutions in Bangladesh."
        />
      </Head>

      <PageHero title="About Us" breadcrumb="Pages" />

      <section className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
          {/* Left Column Overlapping Images */}
          <div className="relative flex justify-center lg:justify-start">
            {/* Background blue dots & wave graphics */}
            <div className="absolute -left-12 top-12 h-64 w-64 opacity-25 pointer-events-none">
              <svg viewBox="0 0 200 200" className="h-full w-full text-blue-500 fill-current">
                <defs>
                  <pattern id="about-dots" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
                    <circle cx="3" cy="3" r="2.5" />
                  </pattern>
                </defs>
                <rect width="200" height="200" fill="url(#about-dots)" />
              </svg>
            </div>

            <div className="relative w-full max-w-[480px]">
              {/* Top Image */}
              <div className="relative z-10 w-[78%] rounded-2xl shadow-lg overflow-hidden bg-white">
                <img
                  src={aboutTopImg}
                  alt="Online Classroom Solution"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Bottom Image (Overlapping bottom right) */}
              <div className="relative z-20 -mt-20 ml-[22%] w-[78%] rounded-2xl shadow-2xl overflow-hidden bg-white border-4 border-white">
                <img
                  src={aboutBottomImg}
                  alt="Amar School Dashboard Solution"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Floating Experience Badge (Center Right) */}
              <div className="absolute right-0 sm:right-[-20px] top-[25%] sm:top-[30%] z-30 rounded-2xl bg-white p-3.5 sm:p-5 md:p-6 shadow-2xl border border-slate-100/80 text-center min-w-[140px] sm:min-w-[160px] md:min-w-[180px]">
                <p className="text-base sm:text-lg md:text-xl font-bold text-[#0B63E5] leading-tight">
                  08 Years Of
                </p>
                <p className="text-base sm:text-lg md:text-xl font-bold text-[#0B63E5] leading-tight">
                  Experience
                </p>
              </div>
            </div>
          </div>

          {/* Right Column Content */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0B63E5] leading-tight">
              Completed Educational Solution
            </h2>
            <p className="mt-4 text-xs md:text-sm leading-relaxed text-slate-600">
              Amar School Management System is a comprehensive online school management system that
              enables educators to manage their schools from a single, central location. It offers a
              wide range of features for both individual and group classrooms, as well as an
              extensive reporting system that makes it easy to track student progress.
            </p>
            <Accordion type="single" collapsible defaultValue="p-0" className="mt-6 space-y-1">
              {points.map(([q, a], i) => (
                <AccordionItem key={q} value={`p-${i}`} className="border-b border-slate-200">
                  <AccordionTrigger className="text-left text-xs md:text-sm font-bold text-slate-800 hover:text-[#0B63E5] py-3.5 no-underline">
                    {q}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs leading-relaxed text-slate-500 pb-4">
                    {a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section className="bg-brand-light/50 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Works about</p>
            <h2 className="mt-3 text-3xl font-bold text-brand-deep">
              Trusted by 150+ Happy Customers
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Our school management system is designed to provide a secure and efficient learning
              experience for all students. Amarschool removes administrative work from your
              students and provides a secure learning environment.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-primary" /> 100% Client Satisfaction
              </li>
              <li className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-primary" /> World Class Worker
              </li>
            </ul>
            <button className="mt-8 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
              Talk To A Consultant
            </button>
          </div>
          <div className="flex justify-center items-center">
            <img
              src={trustedCustomersImg}
              alt="150+ Institutions trusted Amar School Management System"
              className="w-full h-auto max-w-full rounded-2xl shadow-lg border border-slate-100 object-contain"
            />
          </div>
        </div>
      </section>

      <section className="grid lg:grid-cols-2">
        <div className="bg-brand-light grid place-items-center px-6 py-20">
          <div className="flex gap-6">
            <div className="rounded-xl bg-accent px-8 py-10 text-center text-accent-foreground">
              <Target className="mx-auto h-10 w-10" />
              <p className="mt-3 font-semibold">Our Mission</p>
            </div>
            <div className="rounded-xl bg-navy px-8 py-10 text-center text-navy-foreground">
              <Eye className="mx-auto h-10 w-10" />
              <p className="mt-3 font-semibold">Our Vision</p>
            </div>
          </div>
        </div>
        <div className="grid gap-8 bg-navy px-6 py-20 text-navy-foreground sm:grid-cols-2 sm:px-12">
          <div>
            <h3 className="text-xl font-bold">Our Mission</h3>
            <p className="mt-3 text-sm opacity-80">
              We at Amarschool are committed to providing the best possible educational experience
              for our students. Our mission is to provide a user friendly and intuitive educational
              management system for schools — reaching 3000 schools by 2030.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold">Our Vision</h3>
            <p className="mt-3 text-sm opacity-80">
              We envision bringing equality to the education industry. No matter how big or small an
              institute is, it should have the right to simplify its administration and focus on its
              core function: educating students.
            </p>
          </div>
        </div>
      </section>

      <section className="band-gradient py-20">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] opacity-80">Why choose us</p>
          <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-bold md:text-4xl">
            Completed School Management System — Manage School Easily
          </h2>
          <div className="mt-12 grid gap-6 text-left md:grid-cols-2">
            <div className="card-elevated p-6 text-foreground">
              <h3 className="text-lg font-semibold text-primary">24/7 Customer support</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                You can count on our professional big sales team to handle all of your big sales and
                subscription base solutions, whenever you encounter a problem.
              </p>
              <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-brand-deep">
                <Phone className="h-4 w-4 text-primary" /> +88 01716 282 884
              </p>
            </div>
            <div className="card-elevated p-6 text-foreground">
              <h3 className="text-lg font-semibold text-primary">Text us via WhatsApp</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                The Amarschool team is ready to assist you through WhatsApp and Messenger whenever
                necessary.
              </p>
              <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-accent">
                <MessageCircle className="h-4 w-4" /> Chat now
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="py-16">
        <SectionTitle kicker="Since 2016">Built with local institutions, for them</SectionTitle>
      </div>
    </SiteLayout>
  );
}
