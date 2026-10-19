import Link from "next/link";

const STATUS_BADGES: Record<string, { bg: string; text: string }> = {
  pending: { bg: "bg-amber-500/15", text: "text-amber-500" },
  dispatched: { bg: "bg-blue-500/15", text: "text-blue-500" },
  in_progress: { bg: "bg-emerald-500/15", text: "text-emerald-500" },
  completed: { bg: "bg-slate-500/15", text: "text-slate-400" },
  cancelled: { bg: "bg-rose-500/15", text: "text-rose-500" },
  scheduled: { bg: "bg-indigo-500/15", text: "text-indigo-400" },
  low: { bg: "bg-slate-500/15", text: "text-slate-400" },
  normal: { bg: "bg-blue-500/15", text: "text-blue-400" },
  high: { bg: "bg-amber-500/15", text: "text-amber-400" },
  emergency: { bg: "bg-rose-500/15", text: "text-rose-500" },
};

export default function RecentActivity({
  title,
  items,
  viewAllHref,
}: {
  title: string;
  items: {
    id: string;
    title: string;
    subtitle: string;
    status?: string;
    priority?: string;
    date: Date;
  }[];
  viewAllHref: string;
}) {
  return (
    <div
      className="border rounded-2xl p-6 transition-colors shadow-sm"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border)",
      }}
    >
      <div className="flex items-center justify-between mb-5">
        <h3
          className="text-base font-bold uppercase tracking-wider"
          style={{ color: "var(--text-primary)" }}
        >
          {title}
        </h3>
        <Link
          href={viewAllHref}
          className="text-xs font-bold uppercase tracking-wider transition-opacity hover:opacity-75"
          style={{ color: "var(--accent)" }}
        >
          View All &rarr;
        </Link>
      </div>

      <div className="space-y-2.5">
        {items.length === 0 ? (
          <p className="text-sm py-4 text-center" style={{ color: "var(--text-muted)" }}>
            No recent activity recorded.
          </p>
        ) : (
          items.map((item) => {
            const badge = item.status ? STATUS_BADGES[item.status] : null;
            return (
              <div
                key={item.id}
                className="flex items-center justify-between p-3.5 rounded-xl border transition-colors"
                style={{
                  backgroundColor: "var(--bg-input)",
                  borderColor: "var(--border)",
                }}
              >
                <div className="flex-1 min-w-0 pr-3">
                  <p
                    className="text-sm font-semibold truncate"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {item.title}
                  </p>
                  <p className="text-xs truncate mt-0.5" style={{ color: "var(--text-muted)" }}>
                    {item.subtitle}
                  </p>
                </div>
                <div className="flex items-center gap-2.5 shrink-0">
                  {badge && (
                    <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider ${badge.bg} ${badge.text}`}>
                      {item.status?.replace("_", " ")}
                    </span>
                  )}
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {new Date(item.date).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
