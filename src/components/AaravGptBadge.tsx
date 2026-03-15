"use client";

import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

export function AaravGptBadge() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <a 
        href="https://aaravgpt.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="relative group cursor-pointer block"
      >
        {/* Glow backdrop */}
        <div className="absolute -inset-1.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-30 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
        
        {/* Actual Badge */}
        <div className="relative flex items-center gap-2 bg-[#0A0A0C] border border-white/10 px-4 py-2 rounded-full shadow-2xl">
          <div className="flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 rounded-full w-5 h-5">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
          <span className="text-xs font-semibold text-zinc-400 group-hover:text-zinc-200 transition-colors">
            Powered by <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 font-bold tracking-wide">aaravGPT</span>
          </span>
        </div>
      </a>
    </div>
  );
}
