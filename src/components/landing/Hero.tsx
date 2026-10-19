import Image from "next/image";
import { COMPANY } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-14 md:py-20 lg:py-24">
      {/* Subtle radial ambient background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, var(--accent) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-5">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Typography matching user prompt */}
          <div className="lg:col-span-7 space-y-6">
            {/* Tagline / Subtitle in Green */}
            <div className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-emerald-500 dark:text-emerald-400 font-extrabold tracking-wider text-xs md:text-sm uppercase">
                KD GREEN MULTISERVICES
              </p>
            </div>

            {/* Main Title: White / Light Primary */}
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-[1.05]"
              style={{ color: "var(--text-primary)" }}
            >
              Truck Repair &amp;
              <br />
              Roadside Assistance
            </h1>

            {/* Punchline in Yellow */}
            <div className="pt-1">
              <span className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-amber-400 dark:text-yellow-400 block drop-shadow-sm">
                WE COME TO YOU.
              </span>
            </div>

            <p
              className="text-base md:text-lg max-w-xl leading-relaxed pt-2"
              style={{ color: "var(--text-secondary)" }}
            >
              24/7 mobile commercial truck &amp; heavy-duty vehicle repair, emergency roadside dispatch, and on-site diagnostics across South Florida. Fast response, zero towing hassle.
            </p>

            {/* Call to actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={`tel:${COMPANY.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 text-white font-bold text-base px-7 py-3.5 rounded-xl transition-transform hover:scale-[1.02] shadow-lg shadow-green-600/20"
                style={{ backgroundColor: "var(--accent)" }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Call {COMPANY.phone}
              </a>
              <a
                href="#book-now"
                className="inline-flex items-center justify-center font-bold text-base px-7 py-3.5 rounded-xl border transition-colors hover:opacity-80"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text-primary)",
                  backgroundColor: "var(--bg-card)",
                }}
              >
                Request Service
              </a>
            </div>

            {/* Badges */}
            <div
              className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-3 text-xs md:text-sm font-medium"
              style={{ color: "var(--text-muted)" }}
            >
              <span className="flex items-center gap-1.5">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                24/7 Rapid Response
              </span>
              <span className="flex items-center gap-1.5">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Licensed &amp; Insured
              </span>
              <span className="flex items-center gap-1.5">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {COMPANY.usdot}
              </span>
            </div>
          </div>

          {/* Right Column: High Quality Generated Roadside Truck Image */}
          <div className="lg:col-span-5 relative">
            <div
              className="relative rounded-2xl overflow-hidden border shadow-2xl transition-all"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--bg-card)",
              }}
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/hero-truck.jpg"
                  alt="KD Green Mobile Truck Repair & Roadside Assistance Service"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                
                {/* Floating overlay tag */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-semibold px-3.5 py-2.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    Mobile Service Unit
                  </span>
                  <span className="text-emerald-400 font-bold">On-Site Dispatch</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
