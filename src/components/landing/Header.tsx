"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { COMPANY } from "@/lib/constants";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md border-b"
      style={{
        backgroundColor: "color-mix(in srgb, var(--bg-primary) 85%, transparent)",
        borderColor: "var(--border)",
      }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-5 h-16">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.jpg"
            alt="KD Green"
            width={40}
            height={40}
            className="rounded-lg shrink-0 object-cover"
          />
          <div className="flex flex-col leading-none">
            <span
              className="text-base sm:text-lg font-black tracking-wider uppercase"
              style={{ color: "var(--text-primary)" }}
            >
              KD GREEN
            </span>
            <span className="text-[10px] sm:text-[11px] font-black tracking-[0.2em] uppercase text-emerald-500 dark:text-emerald-400 mt-0.5">
              MULTISERVICES
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {["Services", "How It Works", "Book Now"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/ /g, "-")}`}
              className="transition-colors hover:opacity-70"
              style={{ color: "var(--text-secondary)" }}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href={`tel:${COMPANY.phoneTel}`}
            className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg transition-colors text-white"
            style={{ backgroundColor: "var(--accent)" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            Call Now
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg transition-colors"
            style={{ color: "var(--text-primary)" }}
            aria-label="Toggle menu"
          >
            {open ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="md:hidden border-t px-5 py-4 space-y-3"
          style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-primary)" }}
        >
          {["Services", "How It Works", "Book Now"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/ /g, "-")}`}
              className="block text-sm font-medium py-1"
              style={{ color: "var(--text-secondary)" }}
              onClick={() => setOpen(false)}
            >
              {item}
            </a>
          ))}
          <a
            href={`tel:${COMPANY.phoneTel}`}
            className="block w-full text-center text-sm font-semibold text-white py-2.5 rounded-lg"
            style={{ backgroundColor: "var(--accent)" }}
          >
            Call {COMPANY.phone}
          </a>
        </nav>
      )}
    </header>
  );
}
