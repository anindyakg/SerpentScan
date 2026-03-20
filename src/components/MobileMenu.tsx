"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="lg:hidden flex items-center">
      <button onClick={() => setIsOpen(true)} className="p-2 -mr-2 text-zinc-400 hover:text-white transition-colors" aria-label="Open menu">
        <Menu className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-[#000000]/95 backdrop-blur-md flex flex-col pt-24 px-8 border-l border-white/5 transition-all w-full min-h-[100dvh]">
          <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 p-2 text-zinc-400 hover:text-white bg-white/5 rounded-full transition-colors border border-white/10" aria-label="Close menu">
            <X className="w-6 h-6" />
          </button>
          
          <nav className="flex flex-col gap-8 text-3xl font-bold tracking-tight text-zinc-400">
            <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-white hover:pl-4 transition-all">Platform</Link>
            <Link href="/pricing" onClick={() => setIsOpen(false)} className="hover:text-white hover:pl-4 transition-all">Pricing</Link>
            <Link href="/docs" onClick={() => setIsOpen(false)} className="hover:text-white hover:pl-4 transition-all">Docs</Link>
            <Link href="/enterprise" onClick={() => setIsOpen(false)} className="hover:text-white hover:pl-4 transition-all">Enterprise</Link>
            <Link href="/blog" onClick={() => setIsOpen(false)} className="hover:text-white hover:pl-4 transition-all">Blog</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="hover:text-white hover:pl-4 transition-all">Contact</Link>
          </nav>

          <div className="mt-auto mb-12 border-t border-white/10 pt-8 flex flex-col gap-4">
            <p className="text-zinc-500 text-sm font-semibold uppercase tracking-widest">SerpentScan Automation</p>
          </div>
        </div>
      )}
    </div>
  );
}
