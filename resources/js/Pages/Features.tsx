import { Head } from "@inertiajs/react";
import { SiteLayout, PageHero, SectionTitle } from "@/components/site/SiteLayout";
import heroImg from "@/assets/hero-dashboard.png";
import convenientImg from "@/assets/features-convenient.png";
import googlePlayBadge from "@/assets/google-play-badge.svg";
import appStoreBadge from "@/assets/app-store-badge.svg";
import * as LucideIcons from "lucide-react";

interface ModuleItem {
  id?: number;
  icon?: string;
  title: string;
  body?: string;
  description?: string;
}

interface Props {
  pageContent?: {
    heroHeading?: string;
    heroDescription?: string;
    google_play_url?: string;
    app_store_url?: string;
    modules?: ModuleItem[];
  };
  modules?: ModuleItem[];
}

const defaultModulesList: ModuleItem[] = [
  {
    icon: "ClipboardList",
    title: "Admission Management",
    body: "You can keep track of the admission procedure for your school. You can record all the new students who are enrolling in your school and make sure their admission is accepted. It allows you to view the details of each student such as their name, age, address, class and grade level among others.",
  },
  {
    icon: "GraduationCap",
    title: "Student Management",
    body: "Track and control each student information of where they stand in their schooling life. Update status with one click of a button in unique cases. Like when you want to donate a student due to weakness in understanding curricula. Or when you want to give a double promotion against exceptional performance.",
  },
  {
    icon: "CalendarCheck",
    title: "Attendance Management",
    body: "Amarschool allows you to record attendance for your students. You can record for attendance distance and delays. Amarschool also offers a quick view of the overall class attendance in real time so that you will be aware when one of your student is absent or delayed.",
  },
  {
    icon: "BookOpen",
    title: "Academic Management",
    body: "Schools no longer need to spend extra hours and human resources to maintain various academic activities. Because all academic work can be done very easily through Amarschool. Amarschool is the easiest to use to conduct complete paperless academic activities.",
  },
  {
    icon: "CreditCard",
    title: "Fees Management",
    body: "Keep track of the school fees and other payments made by your students. You can even send reminders when a student is due for payment. The software also allows you to create a list of students who have paid their fees so that you will know which student needs further attention.",
  },
  {
    icon: "LineChart",
    title: "Exam and Result Management",
    body: "The software allows you to record your students' test results for each subject. This will help you monitor the progress of each student and identify those who need further attention and help them improve.",
  },
  {
    icon: "Users",
    title: "Parent Management",
    body: "The software allows you to manage the parents of each student. It allows you to keep track of their contact information, as well as their payment details if they have paid for any service.",
  },
  {
    icon: "Wallet",
    title: "Payroll Management",
    body: "You can record the salary of your employees and make sure they receive their pay on time. It is essential to keep track of all the financial transactions that are made by your school.",
  },
  {
    icon: "UserCog",
    title: "Teacher and Employee Management",
    body: "Amarschool allows you to manage your teacher, employee and their records. It helps you keep track of their attendance, performance and even personal information like contact details, birth date etc. You can also generate reports for each teacher as well as for the whole team.",
  },
  {
    icon: "MessageSquare",
    title: "Payment and SMS Gateway",
    body: "Amarschool provides SMS gateways so that you can send SMS alerts for important events, such as when a student submits their homework or if they are absent from class. This feature can be very useful in ensuring that parents are aware of what is taking place at school. With payment gateway guardians and students can make payments for school fees right from their home.",
  },
  {
    icon: "School",
    title: "Class Management",
    body: "Amarschool helps you create a class schedule, which is easy to manage and will help you keep track of your students' activities. You can also set up a weekly routine for each subject so that the students will know what is expected of them when they enter class.",
  },
  {
    icon: "Smartphone",
    title: "Student and Teacher App",
    body: "Connecting with guardians is at your fingertips. Mobile apps for iOS & Android connected to School Management software for your school. With the mobile app for your institute, stay in touch with parents, teachers, and students.",
  },
  {
    icon: "Percent",
    title: "Promotion Management",
    body: "Amarschool helps you manage the promotion of students from one grade to another. Based on their performance easily shift all student profile from one grade to another.",
  },
  {
    icon: "NotebookPen",
    title: "Lesson Planning",
    body: "Now teachers don't need to take separate hassle for lesson planning. With Amarschool, teachers can easily do it and publish it for students.",
  },
  {
    icon: "PlaneTakeoff",
    title: "Leave Management",
    body: "Manage the leave of all the teachers and staffs with ease. You can keep track of how many days are left for each teacher to take their vacation and when they will be back at work. Also, it allows you to record any absence from school due to sickness or emergency as well as any other reason that needs attention.",
  },
  {
    icon: "Home",
    title: "Homework Management",
    body: "Class Students can be given day by day homework effectively and avoid the propensity of understudies to disregard homework. The facility of giving daily class / homework / assignments to the students through Home work management. Is a working facility through homework management which is linked to the original test result as per the need of the school.",
  },
  {
    icon: "Calculator",
    title: "Accounts Management",
    body: "The software allows you to manage the accounts of your school. It allows you to keep track of all the payments that are made by parents and students, as well as any fees that are charged for any service. Also keep track of expenses that are incurred by the school and how much money is left in your account. Amarschool provides dynamic accounting module to calculate all the income and expenses with multiple reports.",
  },
  {
    icon: "FileText",
    title: "Document Management",
    body: "Schools have a variety of documents that need to be maintained and shared with students and teachers as needed. Manually saving these documents leads to fear of loss or corruption, and it is not possible to easily share them with everyone. Organizations can do this very easily through document management and there is no fear of losing documents.",
  },
  {
    icon: "CreditCard",
    title: "Online Payment",
    body: "Guardians no longer need to go to the school to pay all the school fees and schools also don't need separate manpower for fee collection. Now all the fees can be easily paid by the guardians at home through the payment gateway and the school can easily collect and keep track of them.",
  },
  {
    icon: "BookOpen",
    title: "Library Management",
    body: "Manage the books that are in your library. It allows you to keep track of each student's book details, including their current grade level and subject. You can also record the status of each book for each student and see which ones have been lent out to students so that they can be returned on time.",
  },
  {
    icon: "Bell",
    title: "Notice Management",
    body: "Amarschool allows you to create notices for students, teachers and parents. You can send notice directly to their phone via SMS. Or integrated with email clients to send the notice to multiple recipients at once.",
  },
  {
    icon: "Fingerprint",
    title: "Bio-Metric / RFID",
    body: "Amarschool ERP comes with easy integration with biometric device for employee/student attendance. Our push technology makes it easy for device to directly update school information system.",
  },
];

export default function Features({ pageContent, modules: propsModules }: Props) {
  const activeModules = propsModules && propsModules.length > 0
    ? propsModules
    : (pageContent?.modules && pageContent.modules.length > 0 ? pageContent.modules : defaultModulesList);

  const heroHeading = pageContent?.heroHeading || "Core Modules/ Features";

  const renderIcon = (iconName?: string) => {
    if (!iconName) return <LucideIcons.BookOpen className="h-7 w-7 text-[#0B63E5] group-hover:text-white transition-colors duration-300" />;
    // @ts-ignore
    const Component = LucideIcons[iconName] || LucideIcons.BookOpen;
    return <Component className="h-7 w-7 text-[#0B63E5] group-hover:text-white transition-colors duration-300" />;
  };

  return (
    <SiteLayout>
      <Head>
        <title>Core Modules & Features — Amar School Software</title>
        <meta
          name="description"
          content="Explore 20+ modules of Amar School: admission, attendance, fees, exams, payroll, SMS gateway, biometric attendance and mobile apps."
        />
      </Head>

      <PageHero title="Features" breadcrumb="Pages" />

      <section style={{ backgroundColor: "#0C1E38", paddingTop: "70px", paddingBottom: "110px", color: "#ffffff" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <h2
              className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-wider uppercase"
              style={{ color: "#ffffff", marginBottom: "14px" }}
            >
              {heroHeading}
            </h2>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <span className="rounded-full bg-[#0B63E5]" style={{ width: "80px", height: "4px", display: "inline-block" }} />
            </div>
          </div>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            {activeModules.map((item, idx) => (
              <div
                key={item.id || item.title || idx}
                className="group relative flex items-start gap-5 rounded-2xl bg-white p-6 md:p-8 text-slate-800 shadow-xl border border-slate-100/90 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:bg-gradient-to-r hover:from-[#094BB4] hover:to-[#2378F5] hover:border-transparent cursor-pointer"
              >
                <div className="flex-shrink-0 grid h-14 w-14 md:h-16 md:w-16 place-items-center rounded-full bg-[#EBF3FF] text-[#0B63E5] transition-all duration-300 group-hover:bg-white/20 group-hover:text-white shadow-xs">
                  {renderIcon(item.icon)}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg md:text-xl text-slate-900 leading-tight mb-2 group-hover:text-white transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm leading-relaxed text-slate-600 group-hover:text-white/90 transition-colors duration-300">
                    {item.body || item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-light/50 py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-primary md:text-3xl">
              Amarschool — School Management Made Convenient
            </h2>
            <p
              className="mt-4 text-sm md:text-base text-slate-600"
              style={{ textAlign: "justify", lineHeight: "2", textJustify: "inter-word" }}
            >
              Education is the backbone of the nation. Educational institutions play a leading role in
              imparting this education. Modernization of educational institutions is therefore a
              challenge and important. For this purpose, we have created Amarschool. It is designed in
              such a way that it can handle all the A to Z tasks of an institution very easily and
              complete paperless operation is possible. Also, the distance between the Guardian and
              the school is reduced and Teachers can be more attentive to teaching by doing other
              tasks easily.
            </p>
          </div>
          <div className="flex items-center justify-center py-6 md:py-10">
            <img
              src={convenientImg}
              alt="Amarschool — School Management Made Convenient"
              width={1000}
              height={750}
              loading="lazy"
              className="w-full h-auto max-h-[420px] max-w-md md:max-w-lg object-contain rounded-2xl drop-shadow-xl"
            />
          </div>
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
          <div className="mt-10 flex flex-wrap justify-center gap-4 items-center">
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
      </section>
    </SiteLayout>
  );
}
