import { SITE } from "@/lib/constants";

const AREAS = [
  { title: "I-4 & I-75", subtitle: "Corridors" },
  { title: "Logistics Yards", subtitle: "On-Site PM" },
  { title: "Truck Stops", subtitle: "Fuel & Scales" },
  { title: "24/7/365", subtitle: "All Holidays" },
];

export default function ServiceArea() {
  return (
    <section className="section-padding bg-[#0f172a]">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="font-mono-xs text-green-500">Regional Coverage</span>
              <h2 className="font-h1 text-white uppercase">
                Interstates, Corridors
                <br />
                <span className="gradient-text">&amp; Freight Hubs</span>
              </h2>
              <p className="font-body-lg">
                We maintain ready-to-roll units staged along primary trucking routes, logistics
                corridors, shipping yards, weigh stations, and truck stops. Wherever your rig stopped,
                our service trucks have road clearance.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {AREAS.map((area) => (
                <div key={area.title} className="bg-[#0a0e14] border border-slate-800/50 rounded-xl p-5 text-center transition-all duration-300 hover:border-green-500/30">
                  <p className="font-chivo text-xl font-bold text-white">{area.title}</p>
                  <p className="font-mono-xs text-slate-500 mt-1">{area.subtitle}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Card */}
          <div className="bg-[#0a0e14] border border-slate-800/50 rounded-2xl p-8 space-y-6">
            <span className="font-mono-xs text-green-500">Verified Commercial Registration</span>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-slate-800/50">
                <span className="font-body-sm text-slate-500">USDOT Number:</span>
                <span className="font-mono text-white font-bold">{SITE.usdot}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-slate-800/50">
                <span className="font-body-sm text-slate-500">Entity Status:</span>
                <span className="font-mono text-green-500 font-bold">ACTIVE &amp; COMPLIANT</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-slate-800/50">
                <span className="font-body-sm text-slate-500">Insurance:</span>
                <span className="font-mono text-white font-bold">Commercial Liability</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="font-body-sm text-slate-500">Fleet Payment Systems:</span>
                <span className="font-mono text-amber-400 font-bold">Comcheck / EFS</span>
              </div>
            </div>

            <a
              href={SITE.phoneHref}
              className="btn-primary w-full"
            >
              <span className="material-symbols-outlined text-xl">bolt</span>
              Direct Dispatch Hotline
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
