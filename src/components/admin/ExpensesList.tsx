"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const CATEGORIES = [
  { value: "fuel", label: "Fuel" },
  { value: "parts", label: "Parts" },
  { value: "tools", label: "Tools" },
  { value: "insurance", label: "Insurance" },
  { value: "payroll", label: "Payroll" },
  { value: "maintenance", label: "Maintenance" },
  { value: "other", label: "Other" },
];

const CATEGORY_BADGES: Record<string, { bg: string; text: string }> = {
  fuel: { bg: "bg-amber-500/15", text: "text-amber-500 dark:text-amber-400" },
  parts: { bg: "bg-emerald-500/15", text: "text-emerald-500 dark:text-emerald-400" },
  tools: { bg: "bg-blue-500/15", text: "text-blue-500 dark:text-blue-400" },
  insurance: { bg: "bg-purple-500/15", text: "text-purple-500 dark:text-purple-400" },
  payroll: { bg: "bg-teal-500/15", text: "text-teal-500 dark:text-teal-400" },
  maintenance: { bg: "bg-orange-500/15", text: "text-orange-500 dark:text-orange-400" },
  other: { bg: "bg-slate-500/15", text: "text-slate-400" },
};

export default function ExpensesList({ expenses, total }: { expenses: any[]; total: number }) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    description: "",
    amount: 0,
    category: "fuel",
    date: new Date().toISOString().split("T")[0],
    notes: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/admin/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setShowForm(false);
      setForm({ description: "", amount: 0, category: "fuel", date: new Date().toISOString().split("T")[0], notes: "" });
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  async function deleteExpense(id: string) {
    if (!confirm("Are you sure you want to delete this expense?")) return;
    await fetch(`/api/admin/expenses/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="space-y-6">
      {/* Top Bar with Total & Toggle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div
          className="border rounded-2xl px-5 py-3.5 shadow-sm"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border)",
          }}
        >
          <span
            className="text-xs font-bold uppercase tracking-wider block"
            style={{ color: "var(--text-muted)" }}
          >
            Total Operational Expenses
          </span>
          <p
            className="text-2xl font-black tracking-tight mt-0.5"
            style={{ color: "var(--text-primary)" }}
          >
            ${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white transition-opacity hover:opacity-90 shadow-sm"
          style={{ backgroundColor: "var(--accent)" }}
        >
          {showForm ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              Cancel
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
              Add Expense
            </>
          )}
        </button>
      </div>

      {/* Add Expense Form Modal / Card */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="border rounded-2xl p-6 space-y-4 shadow-md transition-colors"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border)",
          }}
        >
          <h3
            className="text-base font-bold uppercase tracking-wider mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            New Expense Entry
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "var(--text-secondary)" }}>
                Description *
              </label>
              <input
                placeholder="e.g. Diesel fuel — Truck A"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500/30"
                style={{
                  backgroundColor: "var(--bg-input)",
                  borderColor: "var(--border)",
                  color: "var(--text-primary)",
                }}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "var(--text-secondary)" }}>
                Amount ($) *
              </label>
              <input
                placeholder="0.00"
                type="number"
                step="0.01"
                value={form.amount || ""}
                onChange={(e) => setForm({ ...form, amount: parseFloat(e.target.value) || 0 })}
                className="w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500/30"
                style={{
                  backgroundColor: "var(--bg-input)",
                  borderColor: "var(--border)",
                  color: "var(--text-primary)",
                }}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "var(--text-secondary)" }}>
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500/30"
                style={{
                  backgroundColor: "var(--bg-input)",
                  borderColor: "var(--border)",
                  color: "var(--text-primary)",
                }}
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value} className="bg-neutral-900 text-white dark:bg-neutral-900 dark:text-white">
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "var(--text-secondary)" }}>
                Date
              </label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500/30"
                style={{
                  backgroundColor: "var(--bg-input)",
                  borderColor: "var(--border)",
                  color: "var(--text-primary)",
                }}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "var(--text-secondary)" }}>
                Notes / Reference (Optional)
              </label>
              <input
                placeholder="Receipt #, invoice or service notes"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500/30"
                style={{
                  backgroundColor: "var(--bg-input)",
                  borderColor: "var(--border)",
                  color: "var(--text-primary)",
                }}
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: "var(--accent)" }}
            >
              {loading ? "Adding..." : "Add Expense"}
            </button>
          </div>
        </form>
      )}

      {/* Expenses Table */}
      <div
        className="border rounded-2xl overflow-hidden shadow-sm"
        style={{
          backgroundColor: "var(--bg-card)",
          borderColor: "var(--border)",
        }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-xs font-bold uppercase tracking-wider" style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}>
                <th className="p-4">Description</th>
                <th className="p-4">Category</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Date</th>
                <th className="p-4">Notes</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y text-sm" style={{ borderColor: "var(--border)" }}>
              {expenses.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center" style={{ color: "var(--text-muted)" }}>
                    No expenses recorded yet.
                  </td>
                </tr>
              ) : (
                expenses.map((exp) => {
                  const badge = CATEGORY_BADGES[exp.category] || CATEGORY_BADGES.other;
                  return (
                    <tr
                      key={exp.id}
                      className="transition-colors hover:bg-neutral-500/5"
                    >
                      <td className="p-4 font-semibold" style={{ color: "var(--text-primary)" }}>
                        {exp.description}
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider ${badge.bg} ${badge.text}`}>
                          {exp.category}
                        </span>
                      </td>
                      <td className="p-4 font-bold" style={{ color: "var(--text-primary)" }}>
                        ${exp.amount.toFixed(2)}
                      </td>
                      <td className="p-4" style={{ color: "var(--text-secondary)" }}>
                        {new Date(exp.date).toLocaleDateString()}
                      </td>
                      <td className="p-4 max-w-xs truncate" style={{ color: "var(--text-muted)" }}>
                        {exp.notes || "—"}
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => deleteExpense(exp.id)}
                          title="Delete Expense"
                          className="w-8 h-8 rounded-lg inline-flex items-center justify-center text-rose-500 hover:bg-rose-500/15 transition-colors"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            <line x1="10" y1="11" x2="10" y2="17" />
                            <line x1="14" y1="11" x2="14" y2="17" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
