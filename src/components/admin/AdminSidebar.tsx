"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/landing/ThemeToggle";

const NAV = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="9" /><rect x="14" y="3" width="7" height="5" />
        <rect x="14" y="12" width="7" height="9" /><rect x="3" y="16" width="7" height="5" />
      </svg>
    ),
  },
  {
    href: "/admin/operations",
    label: "Operations",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    href: "/admin/service-requests",
    label: "Service Requests",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    href: "/admin/stock",
    label: "Stock & Parts",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="21 8 21 21 3 21 3 8" /><rect x="1" y="3" width="22" height="5" />
        <line x1="10" y1="12" x2="14" y2="12" />
      </svg>
    ),
  },
  {
    href: "/admin/expenses",
    label: "Expenses",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
];

export default function AdminSidebar({ admin }: { admin: { name: string; email: string } }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const navContent = (
    <>
      {/* Brand Header */}
      <div className="p-4 sm:p-5 border-b flex items-center justify-between" style={{ borderColor: "var(--border)" }}>
        <Link href="/admin" onClick={() => setMobileOpen(false)} className="flex items-center gap-3">
          <Image
            src="/logo.jpg"
            alt="KD Green"
            width={36}
            height={36}
            className="rounded-lg object-cover shadow-sm"
          />
          <div className="flex flex-col leading-none">
            <span
              className="text-base font-black tracking-wider uppercase"
              style={{ color: "var(--text-primary)" }}
            >
              KD GREEN
            </span>
            <span className="text-[10px] font-black tracking-[0.2em] uppercase text-emerald-500 mt-0.5">
              DISPATCH ADMIN
            </span>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white"
            aria-label="Close sidebar"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {NAV.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all"
              style={
                active
                  ? {
                      backgroundColor: "var(--accent-subtle)",
                      color: "var(--accent)",
                      fontWeight: 600,
                    }
                  : {
                      color: "var(--text-secondary)",
                    }
              }
            >
              <span className="shrink-0">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Info & Logout */}
      <div className="p-4 border-t space-y-3 shrink-0" style={{ borderColor: "var(--border)" }}>
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
            style={{
              backgroundColor: "var(--accent-subtle)",
              color: "var(--accent)",
            }}
          >
            {admin.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p
              className="text-sm font-semibold truncate"
              style={{ color: "var(--text-primary)" }}
            >
              {admin.name}
            </p>
            <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>
              {admin.email}
            </p>
          </div>
        </div>

        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border transition-colors hover:opacity-80"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--bg-input)",
            color: "var(--text-secondary)",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Top Header */}
      <header
        className="lg:hidden sticky top-0 z-40 border-b flex items-center justify-between px-4 sm:px-6 h-16 sm:h-20 backdrop-blur-md shrink-0 w-full shadow-sm"
        style={{
          backgroundColor: "color-mix(in srgb, var(--bg-card) 95%, transparent)",
          borderColor: "var(--border)",
        }}
      >
        <Link href="/admin" className="flex items-center gap-3">
          <Image
            src="/logo.jpg"
            alt="KD Green"
            width={40}
            height={40}
            className="rounded-xl object-cover shadow-sm"
          />
          <div className="flex flex-col leading-none">
            <span
              className="text-base font-black tracking-wider uppercase"
              style={{ color: "var(--text-primary)" }}
            >
              KD GREEN
            </span>
            <span className="text-[10px] font-black tracking-[0.2em] uppercase text-emerald-500 mt-1">
              DISPATCH ADMIN
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2.5 rounded-xl border transition-all active:scale-95"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "var(--bg-input)",
              color: "var(--text-primary)",
            }}
            aria-label="Open menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </header>

      {/* Desktop Persistent Sidebar */}
      <aside
        className="hidden lg:flex w-64 border-r flex-col min-h-screen shrink-0 transition-colors sticky top-0 h-screen"
        style={{
          backgroundColor: "var(--bg-card)",
          borderColor: "var(--border)",
        }}
      >
        {navContent}
      </aside>

      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity"
        />
      )}

      {/* Mobile Drawer Sheet */}
      <aside
        className={`lg:hidden fixed top-0 bottom-0 left-0 z-50 w-72 max-w-[85vw] border-r flex flex-col transition-transform duration-300 ease-out shadow-2xl ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          backgroundColor: "var(--bg-card)",
          borderColor: "var(--border)",
        }}
      >
        {navContent}
      </aside>
    </>
  );
}
