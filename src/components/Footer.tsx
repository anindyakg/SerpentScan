import { Shield, Users, Database, Network, Activity, Github, Instagram } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-[#0A0A0C] relative overflow-hidden">
        <div className="bg-plasma-glow-bottom opacity-50"></div>
        
        <div className="relative z-10 w-full flex flex-col items-center pt-24 pb-12">
            
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-8">Trusted by 10k+ Teams & OSS Companies</p>
            <div className="flex gap-8 opacity-40 grayscale mb-20 text-white">
                <Shield className="w-6 h-6"/>
                <Users className="w-6 h-6"/>
                <Database className="w-6 h-6"/>
                <Network className="w-6 h-6"/>
                <Activity className="w-6 h-6"/>
            </div>

            <div className="mb-12 md:mb-0 flex flex-col items-center text-center">
                <div className="flex items-center justify-center gap-3 mb-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-gradient-to-br from-purple-500 to-pink-600">
                        <Shield className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-2xl font-bold tracking-tight text-white">SerpentScan</span>
                </div>
                <div className="text-zinc-400 font-semibold mb-4 text-sm">Open-source security scanning for Python code</div>
                <p className="text-zinc-500 max-w-[400px] leading-relaxed text-sm">
                    Detect vulnerabilities in Python code before they reach production.<br/>
                    Static analysis, dependency scanning, and AI-assisted security insights in one platform.
                </p>
            </div>

            <div className="flex gap-4 mb-20">
                <Link href="/#scan" className="bg-white hover:bg-zinc-200 text-black px-6 py-3 rounded-xl font-bold transition-all text-sm inline-block">
                    Scan Repository
                </Link>
                <a href="https://github.com/anindyakg/SerpentScan" target="_blank" rel="noopener noreferrer" className="bg-[#111] border border-white/10 hover:border-purple-500/50 hover:bg-[#1a1a24] text-white px-6 py-3 rounded-xl font-bold transition-all text-sm inline-block">
                    View on GitHub
                </a>
            </div>
            
            <div className="w-full max-w-7xl mx-auto px-6 border-t border-white/5 py-8 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-600 font-semibold tracking-wide">
                <p>© 2026 SerpentScan Automation Inc • Local First</p>
                <div className="flex items-center gap-6 mt-4 md:mt-0">
                    <a href="https://x.com/serpentscan" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="X (Twitter)">
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                    </a>
                    <a href="https://github.com/anindyakg/SerpentScan" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="GitHub">
                        <Github className="w-4 h-4" />
                    </a>
                    <a href="https://instagram.com/serpentscan" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Instagram">
                        <Instagram className="w-4 h-4" />
                    </a>
                    <a href="/privacy" className="hover:text-zinc-300 transition-colors ml-2">Privacy</a>
                    <a href="/terms" className="hover:text-zinc-300 transition-colors">Terms</a>
                    <a href="/status" className="hover:text-zinc-300 transition-colors">Status</a>
                    <a href="/enterprise" className="hover:text-zinc-300 transition-colors">Enterprise</a>
                </div>
                <div className="flex gap-3 text-zinc-700 mt-4 md:mt-0">
                    <div>EN</div>
                    <div>FR</div>
                </div>
            </div>
        </div>
    </footer>
  );
}
