"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Invalid credentials");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <Image
              src="/logo.jpg"
              alt="KD Green"
              width={48}
              height={48}
              className="rounded-xl object-cover shadow-md"
            />
            <div className="flex flex-col text-left leading-none">
              <span
                className="text-lg font-black tracking-wider uppercase"
                style={{ color: "var(--text-primary)" }}
              >
                KD GREEN
              </span>
              <span className="text-[11px] font-black tracking-[0.2em] uppercase text-emerald-500 mt-1">
                MULTISERVICES
              </span>
            </div>
          </Link>

          <h1
            className="text-2xl font-black uppercase tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Admin Portal
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
            Sign in to manage requests, fleet, and operations
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border p-8 space-y-5 shadow-xl"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border)",
          }}
        >
          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium">
              {error}
            </div>
          )}

          <div>
            <label
              className="block text-xs font-bold uppercase tracking-wider mb-2"
              style={{ color: "var(--text-secondary)" }}
            >
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-emerald-500/30"
              style={{
                backgroundColor: "var(--bg-input)",
                borderColor: "var(--border)",
                color: "var(--text-primary)",
              }}
              placeholder="admin@kdgreen.com"
              required
            />
          </div>

          <div>
            <label
              className="block text-xs font-bold uppercase tracking-wider mb-2"
              style={{ color: "var(--text-secondary)" }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-emerald-500/30"
              style={{
                backgroundColor: "var(--bg-input)",
                borderColor: "var(--border)",
                color: "var(--text-primary)",
              }}
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl text-white font-bold text-sm tracking-wide uppercase transition-all shadow-lg hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: "var(--accent)" }}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
