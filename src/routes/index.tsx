import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SiteLayout, SectionTitle } from "@/components/site/SiteLayout";
import heroImg from "@/assets/hero-dashboard.png";
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
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Amar School — Online School Management Software" },
      {
        name: "description",
        content:
          "Amar School is a complete online school management system for admission, attendance, fees, exams, payroll and parent communication.",
      },
      { property: "og:title", content: "Amar School — Online School Management Software" },
      {
        property: "og:description",
        content: "Manage admission, attendance, fees, exams and payroll from one dashboard.",
      },
    ],
  }),
  component: Index,
});

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

function Index() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden bg-brand-light/40">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 md:py-24 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-accent">
              Manage School Easily
            </p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight text-brand-deep md:text-5xl">
              Amar School
              <span className="block text-primary">Education Management System</span>
            </h1>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground">
              Amar School is a completely online school management software. It is a one stop
              solution to manage students, teachers, guardians, academics and accounts of your
              institute.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/features"
                className="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-card)] transition-opacity hover:opacity-90"
              >
                Request A Demo
              </Link>
              <Link
                to="/about"
                className="rounded-md border border-primary/30 px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-secondary"
              >
                Learn More
              </Link>
            </div>
          </div>
          <img
            src={heroImg}
            alt="Amar School management dashboard illustration"
            width={1200}
            height={900}
            className="w-full"
          />
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
                Why choose us
              </p>
              <h2 className="mt-3 text-3xl font-bold text-brand-deep md:text-4xl">
                Completed School Management System
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                Amarschool is a cloud based school management software that helps you to manage
                all your school work easily. It is designed with the latest technology and can be
                accessed from any device, providing monthly reports and automated summaries.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                {["08+ years of experience", "150+ happy institutions", "100% client satisfaction"].map(
                  (t) => (
                    <li key={t} className="flex items-center gap-2">
                      <BadgeCheck className="h-4 w-4 text-primary" /> {t}
                    </li>
                  ),
                )}
              </ul>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {whyCards.map((c) => (
                <div
                  key={c.title}
                  className={`rounded-xl p-6 ${
                    c.dark
                      ? "band-gradient shadow-[var(--shadow-float)]"
                      : "card-elevated text-foreground"
                  } ${c.dark ? "sm:translate-y-4" : ""}`}
                >
                  <c.icon className={`h-7 w-7 ${c.dark ? "" : "text-primary"}`} />
                  <h3 className="mt-4 text-lg font-semibold">{c.title}</h3>
                  <p className={`mt-2 text-sm ${c.dark ? "opacity-85" : "text-muted-foreground"}`}>
                    {c.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary/50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionTitle kicker="Core features">Everything your institute needs</SectionTitle>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div key={f.title} className="card-elevated p-6 transition-transform hover:-translate-y-1">
                <f.icon className="h-6 w-6 text-primary" />
                <h3 className="mt-4 text-sm font-bold text-brand-deep">{f.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Complete control with role based access, printable reports and instant
                  notifications for guardians.
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Link
              to="/features"
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
              Stay connected with everyone! Try our Mobile App
            </h2>
            <p className="mt-4 max-w-lg text-sm opacity-85">
              Parents, students and teachers stay connected through the mobile app. Attendance,
              results, notices and fee payments in one place.
            </p>
            <ul className="mt-6 grid gap-2 text-sm opacity-90 sm:grid-cols-2">
              {["Attendance report", "Class routine", "Automatic payment notification", "Leave application", "Notification & messaging", "Much more"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4" /> {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {["Google Play", "App Store"].map((s) => (
              <div
                key={s}
                className="rounded-lg border border-navy-foreground/25 bg-navy/40 px-5 py-4 text-center text-sm font-semibold"
              >
                Download on {s}
              </div>
            ))}
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
