import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero, SectionTitle } from "@/components/site/SiteLayout";
import heroImg from "@/assets/hero-dashboard.png";
import {
  ClipboardList,
  GraduationCap,
  CalendarCheck,
  BookOpen,
  CreditCard,
  LineChart,
  Users,
  Wallet,
  UserCog,
  MessageSquare,
  School,
  Smartphone,
  Percent,
  NotebookPen,
  PlaneTakeoff,
  Home,
  Calculator,
  Banknote,
  Bell,
  Fingerprint,
} from "lucide-react";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Core Modules & Features — Amar School Software" },
      {
        name: "description",
        content:
          "Explore 20+ modules of Amar School: admission, attendance, fees, exams, payroll, SMS gateway, biometric attendance and mobile apps.",
      },
      { property: "og:title", content: "Core Modules & Features — Amar School" },
      {
        property: "og:description",
        content: "20+ modules covering academics, accounts and communication.",
      },
    ],
  }),
  component: Features,
});

const modules: [typeof ClipboardList, string, string][] = [
  [ClipboardList, "Admission Management", "Keep track of the admission procedure for your school. Record every detail of each student such as their name, age, address, class and grade from arrival."],
  [GraduationCap, "Student Management", "Track and unfold each student information of where they stand in their scholarship, and update status with one click of a button."],
  [CalendarCheck, "Attendance Management", "Monitor daily attendance for students and staff, with distance and delays, and generate a quick view of the overall class attendance."],
  [BookOpen, "Academic Management", "Schools no longer need to spend extra hours and human resources to maintain various academic activities."],
  [CreditCard, "Fees Management", "Keep track of the school fees and other payments made by your students. You can even send reminders when a student is due for payment."],
  [LineChart, "Exam and Result Management", "The software allows you to record your students' test results for each subject and helps them improve."],
  [Users, "Parent Management", "This software allows you to manage the parents of each student. You can keep track of their contact information as well as their payment details."],
  [Wallet, "Payroll Management", "You can round the salary of your employees and make sure they receive them pay on time. It is essential to keep track of all financial transactions."],
  [UserCog, "Teacher and Employee Management", "Amarschool allows you to manage your teacher, employee and their records. It helps you keep track of their attendance, performance and leave."],
  [MessageSquare, "Payment and SMS Gateway", "Amarschool provides SMS gateways so that you can send SMS alerts for important events, and an online payment collection option."],
  [School, "Class Management", "Amarschool helps you create a class schedule, which is easy to manage and will help you keep track of your students' activities."],
  [Smartphone, "Student and Teacher App", "Connecting with guardians is at your fingertips. Mobile apps for iOS and Android connected to School Management software."],
  [Percent, "Promotion Management", "Amarschool helps you manage the promotion of students from one grade to another, based on their performance."],
  [NotebookPen, "Lesson Planning", "Now teachers don't need to make separate manual full lesson planning. With Amarschool, teachers can easily do it and publish it for students."],
  [PlaneTakeoff, "Leave Management", "Manage the leave of all the teachers and staffs with ease. You can keep track of how many days are left for each teacher."],
  [Home, "Homework Management", "Once students can be given day by day homework effectively and avoid the impossibility of unfamiliarities to changed movement."],
  [Calculator, "Accounts Management", "This software allows you to manage the accounts of your school. It allows you to keep track of all the payments that are made by parents and students."],
  [Banknote, "Online Payment", "Guardians no longer need to go to the school to pay all the school fees and vouchers — they can collect and pay online."],
  [Bell, "Notice Management", "Amarschool allows you to create notices for students, teachers and parents and send notices to multiple recipients at once."],
  [Fingerprint, "Bio-Metric / RFID", "Amarschool ERP comes with easy integration with biometric device for employee/student attendance."],
];

function Features() {
  return (
    <SiteLayout>
      <PageHero title="Features" breadcrumb="Pages" />

      <section className="bg-navy py-20 text-navy-foreground">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center font-display text-2xl font-bold uppercase tracking-widest">
            Core Modules / Features
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {modules.map(([Icon, title, body]) => (
              <div
                key={title}
                className="flex gap-4 rounded-lg bg-card p-6 text-foreground shadow-[var(--shadow-float)]"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-brand-light">
                  <Icon className="h-5 w-5 text-primary" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-brand-deep">{title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-light/50 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-primary md:text-3xl">
              Amarschool — School Management Made Convenient
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Education is the backbone of the nation. Educational institutions play a leading role
              in imparting this education. Modernisation of educational institutions is therefore a
              challenge and important. For this purpose we have created Amarschool: designed in such
              a way that it can handle all the A to Z tasks of an institution very easily and
              complete paperless operation.
            </p>
          </div>
          <img
            src={heroImg}
            alt="Teacher managing classes with Amar School"
            width={1200}
            height={900}
            loading="lazy"
            className="w-full"
          />
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionTitle kicker="Mobile">
            We offer mobile applications for parents, students and teachers
          </SectionTitle>
          <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-muted-foreground">
            Integrate the complete operation of your school at your fingertips. iOS and Android apps
            connected with Amarschool bring the most stable connection to parents, teachers and
            students through the mobile app for your institute.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {["Get it on Google Play", "Download on the App Store"].map((t) => (
              <span
                key={t}
                className="rounded-md bg-navy px-6 py-3 text-sm font-semibold text-navy-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}