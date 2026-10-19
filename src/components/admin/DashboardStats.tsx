export default function DashboardStats({
  totalRequests,
  pendingRequests,
  activeOperations,
  lowStockItems,
  totalExpenses,
}: {
  totalRequests: number;
  pendingRequests: number;
  activeOperations: number;
  lowStockItems: number;
  totalExpenses: number;
}) {
  const stats = [
    {
      label: "Total Requests",
      shortLabel: "Requests",
      value: totalRequests,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
        </svg>
      ),
      color: "text-emerald-500 dark:text-emerald-400",
      bg: "bg-emerald-500/10 dark:bg-emerald-400/10",
      accentBg: "from-emerald-500/10 via-emerald-500/5 to-transparent",
    },
    {
      label: "Pending Dispatch",
      shortLabel: "Pending",
      value: pendingRequests,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      color: "text-amber-500 dark:text-amber-400",
      bg: "bg-amber-500/10 dark:bg-amber-400/10",
      accentBg: "from-amber-500/10 via-amber-500/5 to-transparent",
    },
    {
      label: "Active Operations",
      shortLabel: "Active Ops",
      value: activeOperations,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 8" />
          <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      ),
      color: "text-blue-500 dark:text-blue-400",
      bg: "bg-blue-500/10 dark:bg-blue-400/10",
      accentBg: "from-blue-500/10 via-blue-500/5 to-transparent",
    },
    {
      label: "Low Stock Items",
      shortLabel: "Low Stock",
      value: lowStockItems,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      ),
      color: "text-rose-500 dark:text-rose-400",
      bg: "bg-rose-500/10 dark:bg-rose-400/10",
      accentBg: "from-rose-500/10 via-rose-500/5 to-transparent",
    },
    {
      label: "Total Expenses",
      shortLabel: "Expenses",
      value: `$${totalExpenses.toLocaleString()}`,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
      color: "text-purple-500 dark:text-purple-400",
      bg: "bg-purple-500/10 dark:bg-purple-400/10",
      accentBg: "from-purple-500/10 via-purple-500/5 to-transparent",
    },
  ];

  return (
    <div>
      {/* Mobile & Tablet: Modern 2-column compact metric grid */}
      <div className="grid grid-cols-2 gap-3 lg:hidden">
        {stats.map((stat, idx) => {
          const isLastOdd = idx === stats.length - 1 && stats.length % 2 !== 0;
          return (
            <div
              key={stat.label}
              className={`relative overflow-hidden border rounded-2xl p-4 transition-all ${
                isLastOdd ? "col-span-2 flex items-center justify-between" : "flex flex-col justify-between"
              }`}
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border)",
              }}
            >
              {/* Subtle top-right ambient glow */}
              <div
                className={`absolute -top-6 -right-6 w-16 h-16 rounded-full bg-gradient-to-br ${stat.accentBg} blur-xl pointer-events-none`}
              />

              {isLastOdd ? (
                <>
                  <div className="space-y-1">
                    <span
                      className="text-[11px] font-bold uppercase tracking-wider block"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {stat.label}
                    </span>
                    <p
                      className="text-2xl font-black tracking-tight"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {stat.value}
                    </p>
                  </div>
                  <div className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center shrink-0`}>
                    {stat.icon}
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-2.5">
                    <span
                      className="text-[11px] font-bold uppercase tracking-wider line-clamp-1"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {stat.shortLabel}
                    </span>
                    <div className={`w-8 h-8 rounded-lg ${stat.bg} ${stat.color} flex items-center justify-center shrink-0`}>
                      {stat.icon}
                    </div>
                  </div>
                  <p
                    className="text-2xl font-black tracking-tight"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {stat.value}
                  </p>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Desktop: Elegant 5-column dashboard row */}
      <div className="hidden lg:grid grid-cols-5 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="group relative overflow-hidden border rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border)",
            }}
          >
            {/* Subtle ambient accent glow */}
            <div
              className={`absolute -top-8 -right-8 w-20 h-20 rounded-full bg-gradient-to-br ${stat.accentBg} blur-xl pointer-events-none transition-opacity opacity-70 group-hover:opacity-100`}
            />

            <div className="flex items-center justify-between mb-4">
              <span
                className="text-xs font-bold uppercase tracking-wider line-clamp-1"
                style={{ color: "var(--text-secondary)" }}
              >
                {stat.label}
              </span>
              <div className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center shrink-0`}>
                {stat.icon}
              </div>
            </div>

            <div>
              <p
                className="text-3xl font-black tracking-tight"
                style={{ color: "var(--text-primary)" }}
              >
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
