import { Head, useForm } from "@inertiajs/react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { MapPin, Mail, Phone, Send, CheckCircle2 } from "lucide-react";
import { useState, FormEvent } from "react";

export default function ContactUs() {
  const [activeTab, setActiveTab] = useState<"address" | "maps">("address");

  const { data, setData, post, processing, errors, recentlySuccessful, reset } = useForm({
    name: "",
    phone: "",
    email: "",
    institution_name: "",
    message: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    post("/demo-request", {
      onSuccess: () => reset(),
    });
  };

  return (
    <SiteLayout>
      <Head>
        <title>Contact Us — Amar School</title>
        <meta
          name="description"
          content="Reach out to Amar School team. Call us, email us or visit our office at Mirpur DOHS, Dhaka 1216."
        />
      </Head>

      <section className="py-16 md:py-24 bg-white text-slate-800">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-start">
            
            {/* Left Column: Form & Heading */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-[#0C1E38] tracking-tight">
                  Need Help?
                </h1>
                <p className="mt-3 text-sm md:text-base text-slate-500">
                  Reach out to the world's most reliable IT services.
                </p>
              </div>

              {recentlySuccessful && (
                <div className="flex items-center gap-3 rounded-2xl bg-emerald-50 p-4 text-sm font-semibold text-emerald-800 border border-emerald-200 shadow-xs">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                  <span>আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে! আমাদের প্রতিনিধি অতি দ্রুত আপনার সাথে যোগাযোগ করবে।</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={data.name}
                      onChange={(e) => setData("name", e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 focus:border-[#0B63E5] focus:bg-white focus:outline-none transition-all shadow-xs"
                    />
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="text"
                      required
                      value={data.phone}
                      onChange={(e) => setData("phone", e.target.value)}
                      placeholder="Enter your phone number"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 focus:border-[#0B63E5] focus:bg-white focus:outline-none transition-all shadow-xs"
                    />
                    {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={data.email}
                      onChange={(e) => setData("email", e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 focus:border-[#0B63E5] focus:bg-white focus:outline-none transition-all shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      School / Institution Name
                    </label>
                    <input
                      type="text"
                      value={data.institution_name}
                      onChange={(e) => setData("institution_name", e.target.value)}
                      placeholder="Enter institution name"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 focus:border-[#0B63E5] focus:bg-white focus:outline-none transition-all shadow-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Your Message / Inquiry
                  </label>
                  <textarea
                    rows={4}
                    value={data.message}
                    onChange={(e) => setData("message", e.target.value)}
                    placeholder="Type your message here..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 focus:border-[#0B63E5] focus:bg-white focus:outline-none transition-all shadow-xs"
                  />
                </div>

                <button
                  type="submit"
                  disabled={processing}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#0B63E5] px-8 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-[#094BB4] hover:shadow-xl disabled:opacity-50 cursor-pointer"
                >
                  <Send className="h-4 w-4" />
                  <span>{processing ? "Sending..." : "Submit Message"}</span>
                </button>
              </form>
            </div>

            {/* Right Column: Address / Google Maps Tabs */}
            <div className="space-y-8">
              
              {/* Tab Header Buttons */}
              <div className="flex items-center gap-8 border-b border-slate-200 pb-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("address")}
                  className={`text-2xl font-bold transition-all relative pb-2 ${
                    activeTab === "address"
                      ? "text-[#0B63E5] font-display"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  Address
                  {activeTab === "address" && (
                    <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#0B63E5] rounded-full" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("maps")}
                  className={`text-2xl font-bold transition-all relative pb-2 ${
                    activeTab === "maps"
                      ? "text-[#0B63E5] font-display"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  Google Maps
                  {activeTab === "maps" && (
                    <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#0B63E5] rounded-full" />
                  )}
                </button>
              </div>

              {/* Address Tab Content */}
              {activeTab === "address" && (
                <div className="space-y-8 pt-4">
                  {/* Location */}
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 grid h-16 w-16 place-items-center rounded-full bg-slate-50 border border-slate-100/80 shadow-sm text-[#0B63E5]">
                      <MapPin className="h-7 w-7" />
                    </div>
                    <div className="pt-1">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-slate-800 mb-1">
                        OUR LOCATION
                      </h3>
                      <p className="text-sm font-medium text-slate-600 leading-relaxed">
                        House #192, Road #2, Avenue #3, Mirpur DOHS, Dhaka 1216
                      </p>
                    </div>
                  </div>

                  {/* Mail */}
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 grid h-16 w-16 place-items-center rounded-full bg-slate-50 border border-slate-100/80 shadow-sm text-[#0B63E5]">
                      <Mail className="h-7 w-7" />
                    </div>
                    <div className="pt-1">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-slate-800 mb-1">
                        SEND US MAIL
                      </h3>
                      <a href="mailto:hello.amarschool@gmail.com" className="text-sm font-medium text-slate-600 hover:text-[#0B63E5] transition-colors">
                        hello.amarschool@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Call */}
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 grid h-16 w-16 place-items-center rounded-full bg-slate-50 border border-slate-100/80 shadow-sm text-[#0B63E5]">
                      <Phone className="h-7 w-7" />
                    </div>
                    <div className="pt-1">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-slate-800 mb-1">
                        CALL US
                      </h3>
                      <p className="text-sm font-medium text-slate-600">
                        +88 01716 282 884 , +88 01738 737 668
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Google Maps Tab Content */}
              {activeTab === "maps" && (
                <div className="pt-4 animate-in fade-in duration-300">
                  <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-lg">
                    <iframe
                      title="Amar School Office Map"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3649.717552127786!2d90.3690551!3d23.828640800000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c1d110ea715d%3A0x2d009700c60ed15e!2sAmar%20School!5e0!3m2!1sen!2sbd!4v1786975881781!5m2!1sen!2sbd"
                      width="100%"
                      height="380"
                      style={{ border: 0 }}
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
