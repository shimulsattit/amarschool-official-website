import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function PageHero({
  title,
  breadcrumb,
  subtitle,
}: {
  title: string;
  breadcrumb: string;
  subtitle?: string;
}) {
  return (
    <section className="hero-band">
      <div className="relative z-10 mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-16 md:py-24">
        <div>
          <h1 className="text-4xl font-bold md:text-5xl">{title}</h1>
          {subtitle && <p className="mt-3 max-w-xl text-sm opacity-80">{subtitle}</p>}
        </div>
        <p className="rounded-full border border-navy-foreground/25 px-5 py-2 text-xs font-semibold uppercase tracking-widest">
          Home <span className="opacity-50">/</span> {breadcrumb}
        </p>
      </div>
    </section>
  );
}

export function SectionTitle({ children, kicker }: { children: ReactNode; kicker?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {kicker && (
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">{kicker}</p>
      )}
      <h2 className="mt-3 text-3xl font-bold text-brand-deep md:text-4xl">{children}</h2>
      <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-accent" />
    </div>
  );
}

export function BookMeetingBar() {
  return (
    <div className="flex justify-center">
      <div className="flex items-center overflow-hidden rounded-md shadow-[var(--shadow-card)]">
        <span className="bg-accent px-6 py-3 text-sm font-bold text-accent-foreground">
          Book Meeting
        </span>
        <span className="bg-primary px-6 py-3 text-sm font-bold text-primary-foreground">
          01738737668
        </span>
      </div>
    </div>
  );
}