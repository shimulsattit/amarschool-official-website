import { Link, usePage } from "@inertiajs/react";
import { Facebook, Twitter, Linkedin, Mail, MapPin, Clock, Phone, Menu } from "lucide-react";
import { useState } from "react";

interface MenuItem {
  id?: number;
  title?: string;
  label?: string;
  url?: string;
  to?: string;
  location?: string;
  active?: boolean;
}

interface SiteSettings {
  site_name?: string;
  tagline?: string;
  support_phone?: string;
  support_email?: string;
  address?: string;
  facebook_url?: string;
  whatsapp_number?: string;
  logo_url?: string | null;
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { url, props } = usePage<{ menuItems?: MenuItem[]; siteSettings?: SiteSettings }>();

  const defaultNav = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Features", to: "/features" },
    { label: "ID Card", to: "/id-card" },
    { label: "Web Development", to: "/services/web-development" },
    { label: "Graphics Design", to: "/services/graphics-design" },
  ];

  const siteSettings = props.siteSettings || {};
  const rawMenuItems = props.menuItems || defaultNav;

  const nav = rawMenuItems
    .filter((item) => item.active !== false && item.location !== "Footer Only")
    .map((item) => ({
      label: item.title || item.label || "",
      to: item.url || item.to || "/",
    }));

  return (
    <header className="sticky top-0 z-50">
      <div className="band-gradient hidden text-xs md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
          <div className="flex items-center gap-6 opacity-95">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" /> {siteSettings.address || "Mirpur DOHS, Dhaka 1216"}
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" /> {siteSettings.support_email || "hello.amarschool@gmail.com"}
            </span>
          </div>
          <div className="flex items-center gap-6 opacity-95">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" /> Office Hours: 8:00 AM – 7:45 PM
            </span>
            <span className="flex items-center gap-3">
              {siteSettings.facebook_url ? (
                <a href={siteSettings.facebook_url} target="_blank" rel="noreferrer">
                  <Facebook className="h-3.5 w-3.5 hover:opacity-80" />
                </a>
              ) : (
                <Facebook className="h-3.5 w-3.5" />
              )}
              <Twitter className="h-3.5 w-3.5" />
              <Linkedin className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </div>

      <div className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
          <Link href="/" className="flex items-center gap-2">
            {siteSettings.logo_url ? (
              <img
                src={siteSettings.logo_url}
                alt={siteSettings.site_name || "Amar School Logo"}
                className="h-12 sm:h-14 md:h-16 w-auto max-w-[280px] md:max-w-[340px] object-contain"
              />
            ) : (
              <>
                <span className="grid h-9 w-9 place-items-center rounded-md bg-primary font-display text-lg font-bold text-primary-foreground">
                  A
                </span>
                <span className="font-display text-lg font-bold text-brand-deep">
                  Amar <span className="text-accent">School</span>
                </span>
              </>
            )}
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {nav.map((item) => {
              const isActive = url === item.to || (item.to !== '/' && url.startsWith(item.to));
              return (
                <Link
                  key={item.to}
                  href={item.to}
                  className={`text-[13px] font-semibold uppercase tracking-wide transition-colors hover:text-primary ${
                    isActive ? "text-primary font-bold" : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 sm:flex">
              <Phone className="h-5 w-5 text-primary" />
              <div className="leading-tight">
                <p className="text-[11px] text-muted-foreground">Call us today!</p>
                <p className="text-sm font-bold text-brand-deep">
                  {siteSettings.support_phone || "+8801716282884"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="grid h-9 w-9 place-items-center rounded-md border border-border lg:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>

        {open && (
          <nav className="grid gap-1 border-t border-border px-6 py-3 lg:hidden">
            {nav.map((item) => (
              <Link
                key={item.to}
                href={item.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}