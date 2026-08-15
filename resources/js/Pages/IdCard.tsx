import { Head } from "@inertiajs/react";
import { SiteLayout, PageHero, SectionTitle, BookMeetingBar } from "@/components/site/SiteLayout";
import idImg from "@/assets/id-cards.png";
import { QrCode, Printer, Palette, ShieldCheck } from "lucide-react";

const palettes = [
  ["oklch(0.5 0.16 250)", "oklch(0.7 0.14 200)"],
  ["oklch(0.45 0.15 300)", "oklch(0.65 0.16 330)"],
  ["oklch(0.45 0.14 155)", "oklch(0.68 0.15 140)"],
  ["oklch(0.5 0.18 25)", "oklch(0.68 0.16 55)"],
  ["oklch(0.3 0.08 262)", "oklch(0.55 0.14 245)"],
  ["oklch(0.5 0.12 200)", "oklch(0.72 0.12 175)"],
  ["oklch(0.48 0.16 15)", "oklch(0.66 0.14 350)"],
  ["oklch(0.42 0.12 275)", "oklch(0.62 0.14 290)"],
  ["oklch(0.44 0.13 130)", "oklch(0.7 0.15 110)"],
];

const perks = [
  [Palette, "500+ ready designs", "Pick a template and we customise it with your institute logo and colours."],
  [QrCode, "QR & barcode ready", "Every card can carry a scannable code linked with the attendance system."],
  [ShieldCheck, "Biometric / RFID", "Optional RFID chip for gate attendance and library access."],
  [Printer, "Bulk printing", "PVC printing with lanyard, delivered to your campus."],
] as const;

export default function IdCard() {
  return (
    <SiteLayout>
      <Head>
        <title>School ID Card Design & Printing — Amar School</title>
        <meta
          name="description"
          content="Ready made school and college ID card designs with QR code, barcode and biometric support. Bulk design and printing from Amar School."
        />
      </Head>

      <PageHero
        title="ID Card"
        breadcrumb="Pages"
        subtitle="Professional student, teacher and staff ID card design for your institute."
      />

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
          <img
            src={idImg}
            alt="Sample school ID cards with lanyard and QR code"
            width={1000}
            height={750}
            loading="lazy"
            className="w-full"
          />
          <div>
            <h2 className="text-3xl font-bold text-primary">ID Card Design Service</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              An ID card is the identity of your institute. Amarschool designs and prints student,
              teacher and staff cards that match your branding — and connects them to attendance,
              library and gate access through QR, barcode or RFID.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {perks.map(([Icon, title, body]) => (
                <div key={title} className="card-elevated p-5">
                  <Icon className="h-5 w-5 text-primary" />
                  <h3 className="mt-3 text-sm font-bold text-brand-deep">{title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary/50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionTitle kicker="Gallery">ID Card Designs</SectionTitle>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {palettes.map(([a, b], i) => (
              <article
                key={i}
                className="card-elevated overflow-hidden transition-transform hover:-translate-y-1"
              >
                <div
                  className="h-28"
                  style={{ backgroundImage: `linear-gradient(135deg, ${a}, ${b})` }}
                />
                <div className="-mt-10 px-6 pb-6">
                  <div className="mx-auto h-20 w-20 rounded-full border-4 border-card bg-muted" />
                  <p className="mt-3 text-center font-display text-sm font-bold text-brand-deep">
                    Student Name
                  </p>
                  <p className="text-center text-[11px] uppercase tracking-widest text-muted-foreground">
                    Class {i + 1} · Roll {100 + i}
                  </p>
                  <dl className="mt-4 space-y-1 text-[11px] text-muted-foreground">
                    <div className="flex justify-between">
                      <dt>ID No</dt>
                      <dd className="font-semibold text-foreground">AS-2026-{1000 + i}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Blood Group</dt>
                      <dd className="font-semibold text-foreground">O+</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Session</dt>
                      <dd className="font-semibold text-foreground">2025 – 2026</dd>
                    </div>
                  </dl>
                  <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                    <QrCode className="h-8 w-8 text-brand-deep" />
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                      Amar School
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-12">
            <BookMeetingBar />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
