import { useState, FormEvent } from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import { Lock, Mail, GraduationCap, ArrowRight } from "lucide-react";

export default function Login() {
  const { data, setData, post, processing, errors } = useForm({
    email: "",
    password: "",
    remember: false,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    post("/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-light/30 px-4 py-12">
      <Head>
        <title>Admin Login — Amar School</title>
      </Head>

      <div className="w-full max-w-md space-y-8 rounded-2xl border border-border/50 bg-card p-8 shadow-[var(--shadow-float)]">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground shadow-md">
              <GraduationCap className="h-6 w-6" />
            </span>
            <span className="font-display text-2xl font-bold tracking-tight text-brand-deep">
              Amar<span className="text-primary">School</span>
            </span>
          </Link>
          <h2 className="mt-6 text-2xl font-bold text-brand-deep">Backend Admin Access</h2>
          <p className="mt-2 text-xs text-muted-foreground">
            Sign in with your credentials to manage lead requests & institution details.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Email Address
              </label>
              <div className="relative mt-1.5">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  required
                  value={data.email}
                  onChange={(e) => setData("email", e.target.value)}
                  placeholder="admin@amarschool.com"
                  className="w-full rounded-lg border border-input bg-background py-2.5 pl-10 pr-4 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-destructive">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Password
              </label>
              <div className="relative mt-1.5">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type="password"
                  required
                  value={data.password}
                  onChange={(e) => setData("password", e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-input bg-background py-2.5 pl-10 pr-4 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-destructive">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={data.remember}
                  onChange={(e) => setData("remember", e.target.checked)}
                  className="rounded border-input text-primary focus:ring-primary"
                />
                Remember me
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={processing}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-md transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {processing ? "Signing in..." : "Sign in to Dashboard"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="rounded-lg bg-secondary/50 p-4 text-center text-xs text-muted-foreground">
          Default Admin Login: <strong className="text-foreground">admin@amarschool.com</strong> / <strong className="text-foreground">password</strong>
        </div>
      </div>
    </div>
  );
}
