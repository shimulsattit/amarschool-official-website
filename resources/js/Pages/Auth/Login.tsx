import { useState, FormEvent } from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import { GraduationCap, ArrowRight } from "lucide-react";

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
    <div className="flex min-h-screen items-center justify-center bg-slate-100/80 px-4 py-12">
      <Head>
        <title>Admin Login — Amar School</title>
      </Head>

      <div className="w-full max-w-md space-y-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
        <div className="text-center pb-2">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#0B63E5] text-white shadow-md">
              <GraduationCap className="h-6 w-6" />
            </span>
            <span className="font-display text-2xl font-bold tracking-tight text-[#0C1E38]">
              Amar<span className="text-[#0B63E5]">School</span>
            </span>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 focus:border-[#0B63E5] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B63E5]/20 transition-all shadow-xs"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500 font-medium">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={data.password}
                onChange={(e) => setData("password", e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 focus:border-[#0B63E5] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B63E5]/20 transition-all shadow-xs"
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-500 font-medium">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-xs font-medium text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={data.remember}
                  onChange={(e) => setData("remember", e.target.checked)}
                  className="rounded border-slate-300 text-[#0B63E5] focus:ring-[#0B63E5]"
                />
                Remember me
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={processing}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B63E5] py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-[#094BB4] hover:shadow-lg disabled:opacity-50 cursor-pointer"
          >
            <span>{processing ? "Signing in..." : "Sign in to Dashboard"}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
