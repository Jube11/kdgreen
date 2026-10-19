import { COMPANY } from "@/lib/constants";

export function Footer() {
  return (
    <footer
      className="border-t py-12"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--bg-secondary)",
      }}
    >
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
          <div>
            <div className="flex flex-col leading-none mb-2">
              <span
                className="text-lg font-black tracking-wider uppercase"
                style={{ color: "var(--text-primary)" }}
              >
                KD GREEN
              </span>
              <span className="text-xs font-black tracking-[0.2em] uppercase text-emerald-500 dark:text-emerald-400 mt-1">
                MULTISERVICES
              </span>
            </div>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              {COMPANY.tagline}
            </p>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm" style={{ color: "var(--text-secondary)" }}>
            <a href={`tel:${COMPANY.phoneTel}`} className="hover:opacity-70 transition-opacity">
              {COMPANY.phone}
            </a>
            <a href={`mailto:${COMPANY.email}`} className="hover:opacity-70 transition-opacity">
              {COMPANY.email}
            </a>
            <span>{COMPANY.usdot}</span>
          </div>
        </div>

        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8 border-t text-xs"
          style={{
            borderColor: "var(--border)",
            color: "var(--text-muted)",
          }}
        >
          <p>© {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:opacity-70 transition-opacity">Privacy</a>
            <a href="#" className="hover:opacity-70 transition-opacity">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
