import { Link, usePage } from "@inertiajs/react";
import { Facebook, Twitter, Linkedin, Mail, MapPin, Clock, Phone, Menu, ChevronDown } from "lucide-react";
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
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const { url, props } = usePage<{ menuItems?: MenuItem[]; siteSettings?: SiteSettings }>();

  const siteSettings = props.siteSettings || {};

  const servicesSubmenu = [
    { label: "ID Card", to: "/id_card" },
    { label: "Web Development", to: "/web-development" },
    { label: "Graphics Design", to: "/graphics-design-service" },
  ];

  const mainNav = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Features", to: "/features" },
    { label: "OMR", to: "https://omr.amarschool.co/", isBadge: true, isExternal: true },
  ];

  const isServicesActive =
    url === "/id_card" ||
    url === "/id-card" ||
    url === "/web-development" ||
    url === "/graphics-design-service" ||
    url.startsWith("/services/");

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
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-2">
          <Link href="/" className="flex items-center gap-2">
            {siteSettings.logo_url ? (
              <img
                src={siteSettings.logo_url}
                alt={siteSettings.site_name || "Amar School Logo"}
                className="h-9 sm:h-10 md:h-11 w-auto max-w-[220px] md:max-w-[260px] object-contain"
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

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 lg:flex">
            {mainNav.map((item) => {
              const isActive = url === item.to || (item.to !== "/" && url.startsWith(item.to));
              if (item.isBadge) {
                if (item.isExternal) {
                  return (
                    <a
                      key={item.label}
                      href={item.to}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded bg-[#E52D27] px-3.5 py-1 text-xs font-bold text-white uppercase tracking-wider hover:bg-red-700 transition-colors shadow-xs"
                    >
                      {item.label}
                    </a>
                  );
                }
                return (
                  <Link
                    key={item.label}
                    href={item.to}
                    className="rounded bg-[#E52D27] px-3.5 py-1 text-xs font-bold text-white uppercase tracking-wider hover:bg-red-700 transition-colors shadow-xs"
                  >
                    {item.label}
                  </Link>
                );
              }
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

            {/* Services Dropdown */}
            <div className="relative group py-3">
              <button
                type="button"
                className={`flex items-center gap-1.5 text-[13px] font-semibold uppercase tracking-wide transition-colors group-hover:text-primary ${
                  isServicesActive ? "text-primary font-bold" : "text-muted-foreground"
                }`}
              >
                <span>Services</span>
                <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
              </button>

              {/* Dropdown Menu Box */}
              <div className="absolute top-full left-0 hidden group-hover:block w-56 rounded-xl bg-white p-2 shadow-2xl border border-slate-100/90 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                {servicesSubmenu.map((sub) => {
                  const isSubActive = url === sub.to;
                  return (
                    <Link
                      key={sub.to}
                      href={sub.to}
                      className={`block rounded-lg px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                        isSubActive
                          ? "bg-[#EBF3FF] text-[#0B63E5] font-bold"
                          : "text-slate-700 hover:bg-slate-50 hover:text-primary"
                      }`}
                    >
                      {sub.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Contact Us */}
            <Link
              href="/contact-us"
              className={`text-[13px] font-semibold uppercase tracking-wide transition-colors hover:text-primary ${
                url === "/contact-us" ? "text-primary font-bold" : "text-muted-foreground"
              }`}
            >
              Contact Us
            </Link>
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

        {/* Mobile Navigation */}
        {open && (
          <nav className="grid gap-1 border-t border-border px-6 py-3 lg:hidden">
            {mainNav.map((item) => {
              if (item.isExternal) {
                return (
                  <a
                    key={item.to}
                    href={item.to}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setOpen(false)}
                    className="rounded-md px-2 py-2 text-sm font-bold text-[#E52D27] hover:bg-secondary"
                  >
                    {item.label} ↗
                  </a>
                );
              }
              return (
                <Link
                  key={item.to}
                  href={item.to}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-2 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-primary"
                >
                  {item.label}
                </Link>
              );
            })}

            {/* Mobile Services Accordion */}
            <div className="py-1">
              <button
                onClick={() => setMobileServicesOpen((v) => !v)}
                className="flex w-full items-center justify-between rounded-md px-2 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-primary"
              >
                <span>Services</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileServicesOpen && (
                <div className="ml-4 mt-1 grid gap-1 border-l-2 border-primary/30 pl-3">
                  {servicesSubmenu.map((sub) => (
                    <Link
                      key={sub.to}
                      href={sub.to}
                      onClick={() => setOpen(false)}
                      className={`rounded-md px-2 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                        url === sub.to ? "text-primary font-bold" : "text-muted-foreground hover:text-primary"
                      }`}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Contact Us */}
            <Link
              href="/contact-us"
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-primary"
            >
              Contact Us
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}