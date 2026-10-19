"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const STATUS_BADGES: Record<string, { bg: string; text: string }> = {
  pending: { bg: "bg-amber-500/15", text: "text-amber-500 dark:text-amber-400" },
  dispatched: { bg: "bg-blue-500/15", text: "text-blue-500 dark:text-blue-400" },
  in_progress: { bg: "bg-emerald-500/15", text: "text-emerald-500 dark:text-emerald-400" },
  completed: { bg: "bg-slate-500/15", text: "text-slate-400" },
  cancelled: { bg: "bg-rose-500/15", text: "text-rose-500 dark:text-rose-400" },
};

const PRIORITY_BADGES: Record<string, { bg: string; text: string }> = {
  low: { bg: "bg-slate-500/15", text: "text-slate-400" },
  normal: { bg: "bg-blue-500/15", text: "text-blue-400" },
  high: { bg: "bg-amber-500/15", text: "text-amber-400" },
  emergency: { bg: "bg-rose-500/15", text: "text-rose-500 dark:text-rose-400" },
};

export default function ServiceRequestsList({ requests }: { requests: any[] }) {
  const router = useRouter();
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? requests : requests.filter((r) => r.status === filter);

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/admin/service-requests/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    router.refresh();
  }

  async function updatePriority(id: string, priority: string) {
    await fetch(`/api/admin/service-requests/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priority }),
    });
    router.refresh();
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        {["all", "pending", "dispatched", "in_progress", "completed", "cancelled"].map((s) => {
          const active = filter === s;
          return (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
              style={
                active
                  ? {
                      backgroundColor: "var(--accent-subtle)",
                      color: "var(--accent)",
                      border: "1px solid var(--accent)",
                    }
                  : {
                      backgroundColor: "var(--bg-card)",
                      color: "var(--text-secondary)",
                      border: "1px solid var(--border)",
                    }
              }
            >
              {s.replace("_", " ")}
            </button>
          );
        })}
      </div>

      {/* Requests Table */}
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
                <th className="p-4">Customer</th>
                <th className="p-4">Service Required</th>
                <th className="p-4">Location</th>
                <th className="p-4">Priority</th>
                <th className="p-4">Status</th>
                <th className="p-4">Received</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y text-sm" style={{ borderColor: "var(--border)" }}>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center" style={{ color: "var(--text-muted)" }}>
                    No service requests found.
                  </td>
                </tr>
              ) : (
                filtered.map((req) => {
                  const statusBadge = STATUS_BADGES[req.status] || STATUS_BADGES.pending;
                  const priorityBadge = PRIORITY_BADGES[req.priority] || PRIORITY_BADGES.normal;
                  return (
                    <tr
                      key={req.id}
                      className="transition-colors hover:bg-neutral-500/5"
                    >
                      <td className="p-4">
                        <p className="font-semibold" style={{ color: "var(--text-primary)" }}>
                          {req.name}
                        </p>
                        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                          {req.phone}
                        </p>
                      </td>
                      <td className="p-4">
                        <span className="font-medium" style={{ color: "var(--text-primary)" }}>
                          {req.serviceType}
                        </span>
                        {req.truckModel && (
                          <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                            {req.truckModel}
                          </p>
                        )}
                      </td>
                      <td className="p-4 text-xs" style={{ color: "var(--text-secondary)" }}>
                        {req.location}
                      </td>
                      <td className="p-4">
                        <select
                          value={req.priority}
                          onChange={(e) => updatePriority(req.id, e.target.value)}
                          className="border rounded-xl px-2.5 py-1 text-xs font-bold uppercase outline-none cursor-pointer"
                          style={{
                            backgroundColor: "var(--bg-input)",
                            borderColor: "var(--border)",
                            color: "var(--text-primary)",
                          }}
                        >
                          <option value="low" className="bg-neutral-900 text-white dark:bg-neutral-900 dark:text-white">Low</option>
                          <option value="normal" className="bg-neutral-900 text-white dark:bg-neutral-900 dark:text-white">Normal</option>
                          <option value="high" className="bg-neutral-900 text-white dark:bg-neutral-900 dark:text-white">High</option>
                          <option value="emergency" className="bg-neutral-900 text-white dark:bg-neutral-900 dark:text-white">Emergency</option>
                        </select>
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider ${statusBadge.bg} ${statusBadge.text}`}>
                          {req.status.replace("_", " ")}
                        </span>
                      </td>
                      <td className="p-4 text-xs" style={{ color: "var(--text-muted)" }}>
                        {new Date(req.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-center">
                        <select
                          value={req.status}
                          onChange={(e) => updateStatus(req.id, e.target.value)}
                          className="border rounded-xl px-3 py-1.5 text-xs font-semibold outline-none focus:ring-2 focus:ring-emerald-500/30 cursor-pointer"
                          style={{
                            backgroundColor: "var(--bg-input)",
                            borderColor: "var(--border)",
                            color: "var(--text-primary)",
                          }}
                        >
                          <option value="pending" className="bg-neutral-900 text-white dark:bg-neutral-900 dark:text-white">Pending</option>
                          <option value="dispatched" className="bg-neutral-900 text-white dark:bg-neutral-900 dark:text-white">Dispatched</option>
                          <option value="in_progress" className="bg-neutral-900 text-white dark:bg-neutral-900 dark:text-white">In Progress</option>
                          <option value="completed" className="bg-neutral-900 text-white dark:bg-neutral-900 dark:text-white">Completed</option>
                          <option value="cancelled" className="bg-neutral-900 text-white dark:bg-neutral-900 dark:text-white">Cancelled</option>
                        </select>
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
