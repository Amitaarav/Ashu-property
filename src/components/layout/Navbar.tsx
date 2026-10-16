"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks, site } from "@/data/site";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-md">
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 md:px-10">
        <Link href="/" className="text-lg font-normal tracking-tight" onClick={() => setOpen(false)}>
          {site.name}
          <span className="ml-2 hidden text-xs font-light text-white/50 sm:inline">Real estate</span>
        </Link>

        <ul className="hidden items-center gap-9 text-sm text-white/75 md:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="transition-colors hover:text-white">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href="/#contact"
            className="rounded-full bg-white px-5 py-2 text-sm font-normal text-black transition-colors hover:bg-white/85"
          >
            Enquire now
          </Link>
          <button
            type="button"
            className="flex h-10 w-10 flex-col items-center justify-center gap-[6px] md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`h-px w-6 bg-white transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`h-px w-6 bg-white transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-16 h-[calc(100svh-4rem)] bg-black px-5 py-10 md:hidden"
          >
            <ul className="flex flex-col gap-6">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} onClick={() => setOpen(false)} className="text-4xl font-light">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-12 text-sm text-white/50">
              {site.phone}
              <br />
              {site.address}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
