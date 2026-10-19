import { SITE } from "@/lib/constants";

export default function EmergencyTicker() {
  return (
    <section className="bg-gradient-to-r from-amber-500 to-amber-400 text-black py-3 px-4">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-2xl font-bold animate-bounce">warning</span>
          <div>
            <span className="font-chivo text-sm font-bold uppercase block leading-tight">
              STRANDED ON THE HIGHWAY OR SHOULDER?
            </span>
            <span className="font-body-sm font-medium text-black/70">
              Average emergency technician dispatch time: 15 to 30 minutes across all major corridors.
            </span>
          </div>
        </div>
        <a
          className="inline-flex items-center gap-2 bg-black text-amber-400 px-6 py-2.5 rounded-lg font-chivo text-sm font-bold uppercase tracking-wide hover:bg-slate-900 transition-colors"
          href={SITE.phoneHref}
        >
          <span className="material-symbols-outlined text-lg">call</span>
          <span>{SITE.phone}</span>
        </a>
      </div>
    </section>
  );
}
