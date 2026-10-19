"use client";

import { useState } from "react";
import { COMPANY } from "@/lib/constants";

export function BookingForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    vehicle: "",
    issue: "",
    urgency: "normal",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/service-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setForm({ name: "", phone: "", vehicle: "", issue: "", urgency: "normal" });
    } catch {
      setStatus("error");
    }
  };

  const inputStyle = {
    backgroundColor: "var(--bg-input)",
    borderColor: "var(--border)",
    color: "var(--text-primary)",
  };

  return (
    <section id="book-now" className="py-20 md:py-28">
      <div className="max-w-xl mx-auto px-5">
        <div className="mb-10">
          <p
            className="text-sm font-semibold uppercase tracking-widest mb-3"
            style={{ color: "var(--accent)" }}
          >
            Book Now
          </p>
          <h2
            className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3"
            style={{ color: "var(--text-primary)" }}
          >
            Request service
          </h2>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            We&apos;ll call you back within 15 minutes. For immediate help, call{" "}
            <a
              href={`tel:${COMPANY.phoneTel}`}
              className="font-semibold underline"
              style={{ color: "var(--accent)" }}
            >
              {COMPANY.phone}
            </a>
          </p>
        </div>

        {status === "sent" ? (
          <div
            className="rounded-2xl border p-10 text-center"
            style={{
              borderColor: "var(--accent)",
              backgroundColor: "var(--accent-subtle)",
            }}
          >
            <div className="text-3xl mb-3">✓</div>
            <h3
              className="text-lg font-bold mb-1"
              style={{ color: "var(--text-primary)" }}
            >
              Request submitted
            </h3>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              We&apos;ll be in touch shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid sm:grid-cols-2 gap-3">
              <input
                required
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-green-500/30"
                style={inputStyle}
              />
              <input
                required
                type="tel"
                placeholder="Phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-green-500/30"
                style={inputStyle}
              />
            </div>
            <input
              required
              placeholder="Vehicle (Year / Make / Model)"
              value={form.vehicle}
              onChange={(e) => setForm({ ...form, vehicle: e.target.value })}
              className="w-full border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-green-500/30"
              style={inputStyle}
            />
            <textarea
              required
              rows={3}
              placeholder="Describe the issue..."
              value={form.issue}
              onChange={(e) => setForm({ ...form, issue: e.target.value })}
              className="w-full border rounded-xl px-4 py-3 text-sm outline-none resize-none focus:ring-2 focus:ring-green-500/30"
              style={inputStyle}
            />
            <select
              value={form.urgency}
              onChange={(e) => setForm({ ...form, urgency: e.target.value })}
              className="w-full border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-green-500/30"
              style={inputStyle}
            >
              <option value="normal">Schedule Service</option>
              <option value="urgent">Urgent — Need Help Today</option>
              <option value="emergency">Emergency — Stranded Now</option>
            </select>
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full text-white font-semibold py-3.5 rounded-xl text-sm transition-colors disabled:opacity-50"
              style={{ backgroundColor: "var(--accent)" }}
            >
              {status === "sending" ? "Sending..." : "Submit Request"}
            </button>
            {status === "error" && (
              <p className="text-red-500 text-sm text-center">
                Something went wrong. Please try again or call us.
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
