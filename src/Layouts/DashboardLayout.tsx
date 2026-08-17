import { ReactNode } from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import {
  GraduationCap,
  LayoutDashboard,
  FileText,
  Menu as MenuIcon,
  Settings as SettingsIcon,
  LogOut,
  ExternalLink,
} from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Props {
  children: ReactNode;
  title: string;
}

export default function DashboardLayout({ children, title }: Props) {
  const { url, props } = usePage();
  const user = (props.auth?.user as User) || (props.user as User);

  const navItems = [
    {
      name: "Dashboard & Leads",
      href: "/dashboard",
      icon: LayoutDashboard,
      active: url === "/dashboard",
    },
    {
      name: "Pages Management",
      href: "/dashboard/pages",
      icon: FileText,
      active: url.startsWith("/dashboard/pages"),
    },
    {
      name: "Menu Management",
      href: "/dashboard/menu",
      icon: MenuIcon,
      active: url.startsWith("/dashboard/menu"),
    },
    {
      name: "Site Settings",
      href: "/dashboard/settings",
      icon: SettingsIcon,
      active: url.startsWith("/dashboard/settings"),
    },
  ];

  const handleLogout = () => {
    router.post("/logout");
  };

  return (
    <div className="flex min-h-screen bg-brand-light/30">
      <Head>
        <title>{`${title} — Amar School Admin`}</title>
      </Head>

      {/* Sidebar Navigation */}
      <aside className="w-64 shrink-0 border-r border-border bg-card shadow-sm">
        <div className="flex h-full flex-col justify-between p-4">
          <div>
            {/* Brand Logo */}
            <div className="mb-6 flex items-center gap-2 px-2 pt-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                <GraduationCap className="h-5 w-5" />
              </span>
              <div>
                <span className="font-display text-xl font-bold tracking-tight text-brand-deep">
                  Amar<span className="text-primary">School</span>
                </span>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-accent">
                  Admin Panel
                </p>
              </div>
            </div>

            {/* Navigation Menu */}
            <div className="space-y-1">
              <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Main Sections
              </p>
              <nav className="mt-2 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-semibold transition-colors ${
                      item.active
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-foreground hover:bg-secondary hover:text-primary"
                    }`}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="space-y-3 border-t border-border pt-4">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-between rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <span>Visit Live Website</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>

            <div className="flex items-center justify-between px-2 text-xs">
              <div className="truncate">
                <p className="truncate font-semibold text-foreground">{user?.name || "Shimul Admin"}</p>
                <p className="truncate text-[11px] text-muted-foreground">{user?.email || "shimul.amarschool@gmail.com"}</p>
              </div>
              <button
                onClick={handleLogout}
                className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header */}
        <header className="flex h-16 items-center justify-between border-b border-border bg-card px-8">
          <h1 className="text-lg font-bold text-brand-deep">{title}</h1>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-600">
              System Active
            </span>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  );
}
