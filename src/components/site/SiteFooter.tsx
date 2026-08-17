import { Link, usePage } from "@inertiajs/react";
import { MapPin, Mail, Phone } from "lucide-react";

interface SiteSettings {
  site_name?: string;
  tagline?: string;
  support_phone?: string;
  support_email?: string;
  address?: string;
  facebook_url?: string;
  whatsapp_number?: string;
  logo_url?: string | null;
  footer_logo_url?: string | null;
}

export function SiteFooter() {
  const { props } = usePage<{ siteSettings?: SiteSettings }>();
  const siteSettings = props.siteSettings || {};

  const logoSrc = siteSettings.footer_logo_url || siteSettings.logo_url;

  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-navy-foreground/15 p-6">
          {logoSrc ? (
            <img
              src={logoSrc}
              alt={siteSettings.site_name || "Amar School Footer Logo"}
              className="h-12 w-auto max-w-[240px] object-contain mb-4"
            />
          ) : (
            <p className="font-display text-xl font-bold">
              Amar <span className="text-accent">School</span>
            </p>
          )}
          <p className="mt-4 text-sm opacity-70">
            {siteSettings.tagline || "Amar School is a completely online school management software."}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Company</h3>
          <ul className="mt-4 space-y-2 text-sm opacity-75">
            <li>
              <Link href="/about" className="hover:opacity-100">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/features" className="hover:opacity-100">
                Software Core Features
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:opacity-100">
                Privacy Policy
              </Link>
            </li>
            <li>Sample Reports (Image)</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Services</h3>
          <ul className="mt-4 space-y-2 text-sm opacity-75">
            <li>
              <Link href="/id_card" className="hover:opacity-100">
                ID Card
              </Link>
            </li>
            <li>
              <Link href="/graphics-design-service" className="hover:opacity-100">
                Graphics Design
              </Link>
            </li>
            <li>
              <Link href="/web-development" className="hover:opacity-100">
                Web Development
              </Link>
            </li>
            <li>Digital Marketing</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Contact Info</h3>
          <ul className="mt-4 space-y-3 text-sm opacity-75">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              {siteSettings.address || "House #192, Road #2, Avenue #3, Mirpur DOHS, Dhaka 1216"}
            </li>
            <li className="flex gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0" />
              {siteSettings.support_email || "info@amarschool.co"}
            </li>
            <li className="flex gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0" />
              {siteSettings.support_phone || "+88 01716 282 884"}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-navy-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-4 text-xs opacity-70">
          <p>© Copyright 2026, {siteSettings.site_name || "Amarschool"}. All Rights Reserved.</p>
          <p className="flex gap-5">
            <Link href="/privacy-policy" className="hover:underline hover:opacity-100">
              Privacy Policy
            </Link>
            <span>Support</span>
            <span>Terms &amp; Condition</span>
          </p>
        </div>
      </div>
    </footer>
  );
}