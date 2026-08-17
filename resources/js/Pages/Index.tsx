import { Head, Link } from "@inertiajs/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SiteLayout, SectionTitle } from "@/components/site/SiteLayout";
import heroImg from "@/assets/hero-dashboard.png";
import mobileAppImg from "@/assets/mobile-app.png";
import googlePlayBadge from "@/assets/google-play-badge.svg";
import appStoreBadge from "@/assets/app-store-badge.svg";
import {
  BadgeCheck,
  CalendarCheck,
  CreditCard,
  GraduationCap,
  LineChart,
  MessageSquare,
  Smartphone,
  Users,
  Wallet,
  ClipboardList,
  BookOpen,
  ShieldCheck,
  ArrowRightCircle,
  ArrowRight,
  Headphones,
  Play,
} from "lucide-react";

const whyCards = [
  {
    icon: Wallet,
    title: "Cost efficient",
    body: "Amarschool has a subscription based pricing model that keeps your monthly charges low — you pay only for what you use.",
    dark: true,
  },
  {
    icon: MessageSquare,
    title: "Dedicated support",
    body: "Our support team is always one call away. Onboarding, training and troubleshooting are included with every plan.",
    dark: false,
  },
  {
    icon: CalendarCheck,
    title: "Proper tracking",
    body: "Track attendance, results, fees and staff performance in real time with automated reports for guardians.",
    dark: false,
  },
  {
    icon: BadgeCheck,
    title: "User friendly",
    body: "A clean interface that teachers and parents can learn in minutes — no technical training required.",
    dark: true,
  },
];

const features = [
  { icon: ClipboardList, title: "Admission Management" },
  { icon: GraduationCap, title: "Student Management" },
  { icon: CalendarCheck, title: "Attendance Management" },
  { icon: BookOpen, title: "Academic Management" },
  { icon: CreditCard, title: "Fees Management" },
  { icon: LineChart, title: "Exam and Result Management" },
  { icon: Users, title: "Teacher and Employee" },
  { icon: Wallet, title: "Payroll Management" },
  { icon: ShieldCheck, title: "Accounts Management" },
  { icon: ClipboardList, title: "Inventory Management" },
  { icon: Smartphone, title: "Student and Teacher App" },
  { icon: MessageSquare, title: "Payment and SMS Gateway" },
];

const faqs = [
  ["What are the benefits of Amarschool?", "You get a single system for academics, accounts and communication — reducing paperwork and manual reporting to almost zero."],
  ["What type of institute can use Amarschool?", "Schools, colleges, madrasas, coaching centres and training institutes of any size."],
  ["How is Amarschool different from other school management systems?", "It is built for local institutions: Bangla support, SMS gateway, voucher generation and affordable monthly pricing."],
  ["Will all the school data remain safe and secure in Amarschool?", "Yes. Data is encrypted, backed up daily and access is controlled by role based permissions."],
  ["Do you offer support services?", "Round the clock support over phone, WhatsApp and email is included."],
  ["Will training be provided regarding the usage of the software?", "Free onboarding training is provided for your teachers and admin staff."],
];

interface IndexProps {
  pageContent?: {
    heroKicker?: string;
    heroHeading?: string;
    heroDescription?: string;
    heroButtonText?: string;
    whyTitle?: string;
    whyDescription?: string;
    appTitle?: string;
    appDescription?: string;
    app_image_url?: string | null;
    google_play_url?: string;
    app_store_url?: string;
    faqTitle?: string;
  };
}

export default function Index({ pageContent }: IndexProps) {
  return (
    <SiteLayout>
      <Head>
        <title>Amar School — Online School Management Software</title>
        <meta
          name="description"
          content="Amar School is a complete online school management system for admission, attendance, fees, exams, payroll and parent communication."
        />
      </Head>

      <section className="relative overflow-hidden bg-[#F2F7FF] py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-2">
          <div>
            <p className="text-xl font-bold text-[#F58220] md:text-2xl tracking-tight">
              {pageContent?.heroKicker || "Manage School Easily"}
            </p>
            <h1 className="mt-2 text-3xl font-bold leading-tight text-black md:text-4xl lg:text-[44px]">
              {pageContent?.heroHeading ? (
                <>
                  {pageContent.heroHeading.split(" ").slice(0, 2).join(" ")}
                  <span className="block text-[#0B63E5] mt-1 font-bold">
                    {pageContent.heroHeading.split(" ").slice(2).join(" ")}
                  </span>
                </>
              ) : (
                <>
                  Amar School
                  <span className="block text-[#0B63E5] mt-1 font-bold">
                    Education Management System
                  </span>
                </>
              )}
            </h1>
            <p className="mt-4 max-w-lg text-xs leading-relaxed text-[#666666] sm:text-sm">
              {pageContent?.heroDescription || "Amar school is a completely online school management software it has more school management features than any other online school management system in the market."}
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
              <Link
                href="/lead-form"
                className="inline-flex items-center gap-3 rounded-full bg-[#0B63E5] px-7 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-all hover:bg-[#0052cc] hover:shadow-lg"
              >
                <span>{pageContent?.heroButtonText || "Request A Demo"}</span>
                <span className="grid h-6 w-6 place-items-center rounded-full bg-white text-[#0B63E5]">
                  <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
                </span>
              </Link>
            </div>
          </div>
          <div className="relative flex justify-center items-center">
            {/* Soft blue circular background swirl glow */}
            <div className="absolute inset-0 m-auto h-[350px] w-[350px] rounded-full bg-blue-400/20 blur-3xl pointer-events-none sm:h-[400px] sm:w-[400px]" />
            <img
              src={heroImg}
              alt="Amar School Education Management System"
              className="relative z-10 max-h-[380px] sm:max-h-[440px] w-auto object-contain transition-transform duration-300 hover:scale-102"
            />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-16 md:py-24">
        {/* Decorative background waves */}
        <div className="absolute right-0 top-0 h-full w-1/3 opacity-10 pointer-events-none">
          <svg viewBox="0 0 200 400" className="h-full w-full">
            <path fill="none" stroke="currentColor" strokeWidth="2" d="M10,0 Q100,100 10,200 T10,400 M50,0 Q140,100 50,200 T50,400 M90,0 Q180,100 90,200 T90,400" />
          </svg>
        </div>

        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Left Content */}
            <div className="space-y-4">
              <p className="text-xs md:text-sm font-bold uppercase tracking-wider text-[#1A202C]">
                — WHY CHOOSE US
              </p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0B63E5] leading-tight">
                {pageContent?.whyTitle || "Completed School Management System"}
              </h2>
              <p className="max-w-md text-xs md:text-sm text-slate-500 leading-relaxed pt-2">
                {pageContent?.whyDescription || "Amarschool is a cloud-based school management software that helps you to manage all your school tasks easily. It is designed with the latest technology and can be accessed on any device, including mobile phones and laptops. Uncomplicated user experience and designed for remote access. This software is easy to use and has an intuitive interface that makes it suitable for anyone who wants to run or start their own school."}
              </p>

              <div className="pt-4 flex items-center gap-3">
                <a
                  href="/lead-form"
                  className="group flex items-center gap-3 text-left focus:outline-none"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-[#0B63E5] text-white shadow-md shadow-blue-500/30 transition-transform group-hover:scale-105">
                    <Play className="h-5 w-5 fill-white ml-0.5" />
                  </div>
                  <span className="text-xs font-bold tracking-wider text-[#0B63E5] uppercase group-hover:underline">
                    INTRO VIDEO
                  </span>
                </a>
              </div>
            </div>

            {/* Right Cards (Staggered 2-Column Grid) */}
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Column 1 */}
              <div className="space-y-6">
                {/* Card 1: Cost efficient (Dark Blue) */}
                <div className="rounded-2xl bg-[#0B3D7E] p-6 text-white shadow-lg space-y-3 transition-transform hover:-translate-y-1">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-white">
                    <Wallet className="h-5 w-5" />
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-white">Cost efficient</h3>
                  <p className="text-xs leading-relaxed text-white/80">
                    Amarschool has a subscription based pricing model. That means no upfront huge installation charges. You can pay as you go. The monthly payment is very negligible compared to the value you would receive. All you need to do is login and get started.
                  </p>
                </div>

                {/* Card 3: Proper training (White) */}
                <div className="rounded-2xl bg-white p-6 text-slate-800 shadow-xl border border-slate-100/80 space-y-3 transition-transform hover:-translate-y-1">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-[#0B63E5]">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-slate-900">Proper training</h3>
                  <p className="text-xs leading-relaxed text-slate-500">
                    Amarschool provides a specialized training team. They provide extensive training to all customers. Guidebooks and instruction videos are provided for basic training. The training team is constantly working day and night to make using Amarschool a walk in the park for our customers.
                  </p>
                </div>
              </div>

              {/* Column 2 (Staggered offset) */}
              <div className="space-y-6 md:mt-8">
                {/* Card 2: Dedicated support (White) */}
                <div className="rounded-2xl bg-white p-6 text-slate-800 shadow-xl border border-slate-100/80 space-y-3 transition-transform hover:-translate-y-1">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-[#0B63E5]">
                    <Headphones className="h-5 w-5" />
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-slate-900">Dedicated support</h3>
                  <p className="text-xs leading-relaxed text-slate-500">
                    Amarschool software offers a dedicated support option that makes it easier for customers to get help with their software installations. This allows customers to get the help they need quickly and easily, and can help them resolve any issues that may arise.
                  </p>
                </div>

                {/* Card 4: User friendly (Dark Blue) */}
                <div className="rounded-2xl bg-[#0B3D7E] p-6 text-white shadow-lg space-y-3 transition-transform hover:-translate-y-1">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-white">
                    <Smartphone className="h-5 w-5" />
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-white">User friendly</h3>
                  <p className="text-xs leading-relaxed text-white/80">
                    Amarschool is a user-friendly software. It is simple to use and easy to navigate, making it easy to understand without ever significant training. With Amarschool, students can track their progress and make the most of their education.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionTitle kicker="Core features">Everything your institute needs</SectionTitle>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="card-elevated flex items-start gap-4 p-5 transition-transform hover:-translate-y-0.5"
              >
                <div className="rounded-xl bg-primary/10 p-3 text-primary">
                  <f.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-brand-deep">{f.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Automated tracking and management.
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Link
              href="/features"
              className="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
            >
              Know More
            </Link>
          </div>
        </div>
      </section>

      <section className="band-gradient py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">
              {pageContent?.appTitle || "Stay connected with everyone! Try our Mobile App"}
            </h2>
            <p className="mt-4 max-w-lg text-sm opacity-85">
              {pageContent?.appDescription || "Parents, students and teachers stay connected through the mobile app. Attendance, results, notices and fee payments in one place."}
            </p>
            <ul className="mt-6 grid gap-2 text-sm opacity-90 sm:grid-cols-2">
              {["Attendance report", "Class routine", "Automatic payment notification", "Leave application", "Notification & messaging", "Much more"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4" /> {t}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-4 items-center">
              <a
                href={pageContent?.google_play_url || "https://play.google.com/store"}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-105 inline-block"
              >
                <img
                  src={googlePlayBadge}
                  alt="Get it on Google Play"
                  className="h-12 w-auto object-contain"
                />
              </a>
              <a
                href={pageContent?.app_store_url || "https://apple.com/app-store"}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-105 inline-block"
              >
                <img
                  src={appStoreBadge}
                  alt="Download on the App Store"
                  className="h-12 w-auto object-contain"
                />
              </a>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <img
              src={pageContent?.app_image_url || mobileAppImg}
              alt="Amar School Mobile App Mockup"
              className="max-h-[460px] w-auto object-contain drop-shadow-2xl transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">FAQ</p>
            <h2 className="mt-3 text-3xl font-bold text-brand-deep">
              Most common question about our services
            </h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map(([q, a], i) => (
              <AccordionItem key={q} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-sm font-semibold text-brand-deep">
                  {i + 1}. {q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </SiteLayout>
  );
}
