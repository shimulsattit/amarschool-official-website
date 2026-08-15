import { useState, FormEvent, ChangeEvent } from "react";
import { useForm } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Save, CheckCircle, Upload, Image as ImageIcon, Trash2 } from "lucide-react";

interface SettingsData {
  site_name: string;
  tagline: string;
  support_phone: string;
  support_email: string;
  address: string;
  facebook_url: string;
  whatsapp_number: string;
  logo_url?: string | null;
  footer_logo_url?: string | null;
}

interface Props {
  settings: SettingsData;
}

export default function Settings({ settings }: Props) {
  const [logoPreview, setLogoPreview] = useState<string | null>(settings.logo_url || null);
  const [footerLogoPreview, setFooterLogoPreview] = useState<string | null>(settings.footer_logo_url || null);

  const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
    site_name: settings.site_name || "Amar School",
    tagline: settings.tagline || "Education Management System",
    support_phone: settings.support_phone || "+88 01716 282 884",
    support_email: settings.support_email || "support@amarschool.com",
    address: settings.address || "Dhaka, Bangladesh",
    facebook_url: settings.facebook_url || "https://facebook.com/amarschool",
    whatsapp_number: settings.whatsapp_number || "+8801716282884",
    logo_url: settings.logo_url || "",
    footer_logo_url: settings.footer_logo_url || "",
    logo: null as File | null,
    footer_logo: null as File | null,
  });

  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setData("logo", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFooterLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setData("footer_logo", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFooterLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setData("logo", null);
    setData("logo_url", "");
    setLogoPreview(null);
  };

  const handleRemoveFooterLogo = () => {
    setData("footer_logo", null);
    setData("footer_logo_url", "");
    setFooterLogoPreview(null);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    post("/dashboard/settings", {
      forceFormData: true,
    });
  };

  return (
    <DashboardLayout title="Site Settings">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-brand-deep">General Settings</h2>
          <p className="text-xs text-muted-foreground">
            Configure header & footer logos, site title, contact numbers, support email & social links.
          </p>
        </div>

        {recentlySuccessful && (
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-600">
            <CheckCircle className="h-4 w-4" />
            Header & Footer Logos saved successfully!
          </span>
        )}
      </div>

      <div className="mx-auto max-w-4xl">
        <form onSubmit={handleSubmit} className="card-elevated space-y-6 p-8">
          {/* Identity & Branding */}
          <div className="border-b border-border pb-4">
            <h3 className="text-base font-bold text-brand-deep">Identity & Branding Logos</h3>
            <p className="text-xs text-muted-foreground">Header & Footer Logo images displayed across website.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {/* Header Logo Upload */}
            <div className="rounded-xl border border-dashed border-border bg-background p-4 space-y-3">
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                1. Header Logo Image
              </label>

              <div className="flex h-20 w-full items-center justify-center rounded-lg border border-border bg-card p-2">
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt="Header Logo Preview"
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <ImageIcon className="h-5 w-5 text-muted-foreground/60" />
                    <span>No Header Logo</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-sm hover:opacity-90">
                  <Upload className="h-3.5 w-3.5" />
                  Upload Header Logo
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/svg+xml,image/webp"
                    onChange={handleLogoChange}
                    className="hidden"
                  />
                </label>

                {logoPreview && (
                  <button
                    type="button"
                    onClick={handleRemoveLogo}
                    className="flex items-center gap-1 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs font-semibold text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Remove
                  </button>
                )}
              </div>
            </div>

            {/* Footer Logo Upload */}
            <div className="rounded-xl border border-dashed border-border bg-background p-4 space-y-3">
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                2. Footer Logo Image
              </label>

              <div className="flex h-20 w-full items-center justify-center rounded-lg border border-border bg-navy/90 p-2">
                {footerLogoPreview ? (
                  <img
                    src={footerLogoPreview}
                    alt="Footer Logo Preview"
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <div className="flex items-center gap-2 text-xs text-navy-foreground/70">
                    <ImageIcon className="h-5 w-5" />
                    <span>No Footer Logo</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground shadow-sm hover:opacity-90">
                  <Upload className="h-3.5 w-3.5" />
                  Upload Footer Logo
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/svg+xml,image/webp"
                    onChange={handleFooterLogoChange}
                    className="hidden"
                  />
                </label>

                {footerLogoPreview && (
                  <button
                    type="button"
                    onClick={handleRemoveFooterLogo}
                    className="flex items-center gap-1 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs font-semibold text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Site Name
              </label>
              <input
                type="text"
                required
                value={data.site_name}
                onChange={(e) => setData("site_name", e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-input bg-background py-2 px-3 text-xs text-foreground focus:border-primary focus:outline-none"
              />
              {errors.site_name && <p className="mt-1 text-xs text-destructive">{errors.site_name}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Tagline / Subtitle
              </label>
              <input
                type="text"
                required
                value={data.tagline}
                onChange={(e) => setData("tagline", e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-input bg-background py-2 px-3 text-xs text-foreground focus:border-primary focus:outline-none"
              />
              {errors.tagline && <p className="mt-1 text-xs text-destructive">{errors.tagline}</p>}
            </div>
          </div>

          {/* Contact Details */}
          <div className="border-b border-border pb-4 pt-4">
            <h3 className="text-base font-bold text-brand-deep">Contact & Support Details</h3>
            <p className="text-xs text-muted-foreground">Phone number and email shown in header and footer.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Support Phone Number
              </label>
              <input
                type="text"
                required
                value={data.support_phone}
                onChange={(e) => setData("support_phone", e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-input bg-background py-2 px-3 text-xs text-foreground focus:border-primary focus:outline-none"
              />
              {errors.support_phone && <p className="mt-1 text-xs text-destructive">{errors.support_phone}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Support Email Address
              </label>
              <input
                type="email"
                required
                value={data.support_email}
                onChange={(e) => setData("support_email", e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-input bg-background py-2 px-3 text-xs text-foreground focus:border-primary focus:outline-none"
              />
              {errors.support_email && <p className="mt-1 text-xs text-destructive">{errors.support_email}</p>}
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Office Address
              </label>
              <input
                type="text"
                required
                value={data.address}
                onChange={(e) => setData("address", e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-input bg-background py-2 px-3 text-xs text-foreground focus:border-primary focus:outline-none"
              />
              {errors.address && <p className="mt-1 text-xs text-destructive">{errors.address}</p>}
            </div>
          </div>

          {/* Social Media Links */}
          <div className="border-b border-border pb-4 pt-4">
            <h3 className="text-base font-bold text-brand-deep">Social Media & Communication</h3>
            <p className="text-xs text-muted-foreground">Direct WhatsApp & Facebook page links.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Facebook Page URL
              </label>
              <input
                type="url"
                value={data.facebook_url}
                onChange={(e) => setData("facebook_url", e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-input bg-background py-2 px-3 text-xs text-foreground focus:border-primary focus:outline-none"
              />
              {errors.facebook_url && <p className="mt-1 text-xs text-destructive">{errors.facebook_url}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                WhatsApp Number
              </label>
              <input
                type="text"
                value={data.whatsapp_number}
                onChange={(e) => setData("whatsapp_number", e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-input bg-background py-2 px-3 text-xs text-foreground focus:border-primary focus:outline-none"
              />
              {errors.whatsapp_number && <p className="mt-1 text-xs text-destructive">{errors.whatsapp_number}</p>}
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={processing}
              className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-xs font-semibold text-primary-foreground shadow-md hover:opacity-90 disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              {processing ? "Uploading & Saving..." : "Save Settings & Logos"}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
