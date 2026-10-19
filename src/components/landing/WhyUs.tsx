import { WHY_US, SITE } from "@/lib/constants";

export default function WhyUs() {
  return (
    <section className="section-padding bg-[#0a0e14]">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800/50 shadow-2xl">
              <img
                alt="KD Green Multiservices certified heavy truck diesel mechanic"
                className="w-full h-[500px] object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3iLxmVrC_KDyUFExdoftWokHaci4anO5TOd8itms6dekwDnjcKGl3JqEq26K9hQDU_rwBoCVn0JJTDGeZug9s5jpvwvyw0laGE5Wp_GcX31iNK6ITWZeaQVIj4_g0FdZTYWehupEjsyq2sk4fIvdexKGx3819a43WOBerI9nOJamoBdh-abZCIc7CUHkzhAKs83IMdDD_8m6nrCvyB6xmMJL7KAh0Ov1m_ZzC4UBLdISpeQ55SkE"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e14]/80 via-transparent to-transparent" />
              
              {/* Overlay badge */}
              <div className="absolute top-6 left-6 bg-[#0f172a]/90 backdrop-blur-md border border-slate-800 rounded-xl px-4 py-3 flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                <span className="font-mono-xs text-white">Field Repair in Action</span>
              </div>

              {/* Bottom card */}
              <div className="absolute bottom-6 left-6 right-6 bg-[#0f172a]/95 backdrop-blur-md border border-slate-800 rounded-xl p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-chivo text-sm font-bold text-white">Wheel Hub &amp; Brake Assembly</p>
                    <p className="font-mono-xs text-slate-500 mt-1">Completed in 42 minutes</p>
                  </div>
                  <span className="material-symbols-outlined text-green-500 text-2xl">verified</span>
                </div>
              </div>
            </div>

            {/* Decorative */}
            <div className="absolute -z-10 -top-8 -right-8 w-48 h-48 bg-green-500/10 rounded-full blur-3xl" />
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="font-mono-xs text-green-500">Why Choose Us</span>
              <h2 className="font-h1 text-white uppercase">
                Why Commercial Fleets
                <br />
                <span className="gradient-text">Count On KD Green</span>
              </h2>
              <p className="font-body-lg">
                Towing a loaded Class 8 semi easily costs $1,500 to $3,500 before shop repairs even
                begin. We fix 88% of breakdowns right where the truck stands.
              </p>
            </div>

            <div className="space-y-4">
              {WHY_US.map((item) => (
                <div key={item.title} className="flex items-start gap-4 p-5 rounded-xl bg-[#0f172a] border border-slate-800/50 transition-all duration-300 hover:border-green-500/30">
                  <div className="w-12 h-12 rounded-xl bg-[#0a0e14] border border-slate-800 flex items-center justify-center text-green-500 shrink-0">
                    <span className="material-symbols-outlined text-xl">{item.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-h3 text-white mb-2">{item.title}</h3>
                    <p className="font-body-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <a href={SITE.phoneHref} className="btn-primary">
              <span className="material-symbols-outlined text-xl">phone</span>
              Speak to Dispatch: {SITE.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
