"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function StockList({ items }: { items: any[] }) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    sku: "",
    category: "",
    quantity: 0,
    minQuantity: 5,
    unitCost: 0,
    location: "",
    supplier: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/admin/stock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setShowForm(false);
      setForm({ name: "", sku: "", category: "", quantity: 0, minQuantity: 5, unitCost: 0, location: "", supplier: "" });
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  async function updateQuantity(id: string, quantity: number) {
    await fetch(`/api/admin/stock/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    });
    router.refresh();
  }

  async function deleteItem(id: string) {
    if (!confirm("Are you sure you want to delete this stock item?")) return;
    await fetch(`/api/admin/stock/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="space-y-6">
      {/* Top Action */}
      <div className="flex justify-end">
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
              Add Stock Item
            </>
          )}
        </button>
      </div>

      {/* Add Stock Item Form */}
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
            New Inventory Item
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "var(--text-secondary)" }}>
                Item Name *
              </label>
              <input
                placeholder="e.g. 295/75R22.5 Steer Tire"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
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
                SKU / Part Code *
              </label>
              <input
                placeholder="e.g. TIRE-295-75R225"
                value={form.sku}
                onChange={(e) => setForm({ ...form, sku: e.target.value })}
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
              <input
                placeholder="Tires, Brakes, Engine..."
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500/30"
                style={{
                  backgroundColor: "var(--bg-input)",
                  borderColor: "var(--border)",
                  color: "var(--text-primary)",
                }}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "var(--text-secondary)" }}>
                Quantity
              </label>
              <input
                type="number"
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: parseInt(e.target.value) || 0 })}
                className="w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500/30"
                style={{
                  backgroundColor: "var(--bg-input)",
                  borderColor: "var(--border)",
                  color: "var(--text-primary)",
                }}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "var(--text-secondary)" }}>
                Min Alert Threshold
              </label>
              <input
                type="number"
                value={form.minQuantity}
                onChange={(e) => setForm({ ...form, minQuantity: parseInt(e.target.value) || 0 })}
                className="w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500/30"
                style={{
                  backgroundColor: "var(--bg-input)",
                  borderColor: "var(--border)",
                  color: "var(--text-primary)",
                }}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "var(--text-secondary)" }}>
                Unit Cost ($)
              </label>
              <input
                type="number"
                step="0.01"
                value={form.unitCost || ""}
                onChange={(e) => setForm({ ...form, unitCost: parseFloat(e.target.value) || 0 })}
                className="w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500/30"
                style={{
                  backgroundColor: "var(--bg-input)",
                  borderColor: "var(--border)",
                  color: "var(--text-primary)",
                }}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "var(--text-secondary)" }}>
                Stock Location
              </label>
              <input
                placeholder="Truck A, Warehouse..."
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500/30"
                style={{
                  backgroundColor: "var(--bg-input)",
                  borderColor: "var(--border)",
                  color: "var(--text-primary)",
                }}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "var(--text-secondary)" }}>
                Supplier
              </label>
              <input
                placeholder="Michelin, Delco..."
                value={form.supplier}
                onChange={(e) => setForm({ ...form, supplier: e.target.value })}
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
              {loading ? "Adding..." : "Add Item"}
            </button>
          </div>
        </form>
      )}

      {/* Stock Table */}
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
                <th className="p-4">Item Name</th>
                <th className="p-4">SKU</th>
                <th className="p-4">Category</th>
                <th className="p-4">Qty</th>
                <th className="p-4">Min</th>
                <th className="p-4">Unit Cost</th>
                <th className="p-4">Location</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y text-sm" style={{ borderColor: "var(--border)" }}>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center" style={{ color: "var(--text-muted)" }}>
                    No stock items found.
                  </td>
                </tr>
              ) : (
                items.map((item) => {
                  const isLow = item.quantity <= item.minQuantity;
                  return (
                    <tr
                      key={item.id}
                      className="transition-colors hover:bg-neutral-500/5"
                    >
                      <td className="p-4 font-semibold" style={{ color: "var(--text-primary)" }}>
                        {item.name}
                      </td>
                      <td className="p-4 font-mono text-xs" style={{ color: "var(--text-secondary)" }}>
                        {item.sku}
                      </td>
                      <td className="p-4" style={{ color: "var(--text-secondary)" }}>
                        {item.category || "—"}
                      </td>
                      <td className="p-4 font-bold">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-bold ${
                            isLow
                              ? "bg-rose-500/15 text-rose-500 dark:text-rose-400"
                              : "bg-emerald-500/15 text-emerald-500 dark:text-emerald-400"
                          }`}
                        >
                          {isLow && <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />}
                          {item.quantity}
                        </span>
                      </td>
                      <td className="p-4" style={{ color: "var(--text-muted)" }}>
                        {item.minQuantity}
                      </td>
                      <td className="p-4 font-medium" style={{ color: "var(--text-primary)" }}>
                        ${item.unitCost.toFixed(2)}
                      </td>
                      <td className="p-4" style={{ color: "var(--text-secondary)" }}>
                        {item.location || "—"}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-1.5">
                          {/* Decrement / Remove quantity */}
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                            title="Decrease quantity (-1)"
                            className="w-8 h-8 rounded-lg flex items-center justify-center border transition-all hover:opacity-80 active:scale-95"
                            style={{
                              borderColor: "var(--border)",
                              backgroundColor: "var(--bg-input)",
                              color: "var(--text-primary)",
                            }}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                          </button>

                          {/* Increment / Add quantity */}
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            title="Increase quantity (+1)"
                            className="w-8 h-8 rounded-lg flex items-center justify-center border transition-all hover:opacity-80 active:scale-95"
                            style={{
                              borderColor: "var(--border)",
                              backgroundColor: "var(--bg-input)",
                              color: "var(--text-primary)",
                            }}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                          </button>

                          {/* Delete Item */}
                          <button
                            onClick={() => deleteItem(item.id)}
                            title="Delete Item"
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-rose-500 hover:bg-rose-500/15 transition-colors ml-1"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                              <line x1="10" y1="11" x2="10" y2="17" />
                              <line x1="14" y1="11" x2="14" y2="17" />
                            </svg>
                          </button>
                        </div>
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
