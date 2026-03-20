import Link from "next/link";
import { Shield, ArrowLeft } from "lucide-react";
import { MobileMenu } from "@/components/MobileMenu";

export default function BlogPost() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden selection:bg-purple-500/30">
      
      {/* PLASMA GLOWS */}
      <div className="bg-plasma-glow-purple top-[-10%] left-[-10%] opacity-20"></div>

      {/* HEADER */}
      <nav className="relative z-50 w-full max-w-7xl mx-auto px-6 py-6 flex flex-row items-center justify-between border-b border-white/5">
        <Link href="/" className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-gradient-to-br from-purple-500 to-pink-600">
                <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">SerpentScan</span>
        </Link>
        <div className="flex items-center gap-4">
            <MobileMenu />
            <Link href="/blog" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm font-semibold">
                <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
        </div>
      </nav>

      <main className="relative z-10 w-full max-w-3xl mx-auto px-6 pt-16 pb-32">
        
        <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-800 bg-zinc-200 px-3 py-1 rounded-full">SAST Engineering</span>
                <span className="text-sm font-medium text-zinc-500">March 15, 2026</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
                Reducing false positives in security scanners
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed font-light">
                Security fatigue is real. Learn how we utilize advanced call graph generation and semantic reachability bounds to eliminate noisy static analysis alerts.
            </p>
        </div>

        <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-12 border border-white/10">
            <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200" alt="Cover" className="w-full h-full object-cover" />
        </div>

        <div className="prose prose-invert prose-zinc max-w-none">
            <p className="text-zinc-300 leading-relaxed text-lg mb-8">
                The biggest threat to a security program isn't a zero-day exploit; it's alert fatigue. When a SAST scanner generates thousands of low-priority or strictly incorrect alerts, developers learn to ignore it. A tool that flags everything effectively flags nothing.
            </p>

            <h2 className="text-2xl font-bold text-white mt-12 mb-4">Why Do False Positives Happen?</h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
                False positives generally occur when a scanner uses an overly simplistic detection mechanism. A Regex-based scanner might flag every instance of the string `exec(` in a codebase, even if it's just a method name inside a benign logging class (`logger.exec()`).
            </p>
            <p className="text-zinc-400 leading-relaxed mb-6">
                Even more advanced tools using Taint Analysis can generate false positives if their semantic understanding of the language is incomplete. For instance, if Python's `shlex.quote()` is called on a variable before it hits a `subprocess.Popen` sink, the code is safe. If the scanner doesn't recognize `shlex.quote()` as an active Sanitizer, it screams "Command Injection!" anyway.
            </p>

            <h2 className="text-2xl font-bold text-white mt-12 mb-4">The Call Graph Solution</h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
                SerpentScan attacks the false positive problem by constructing high-fidelity Call Graphs. It doesn't analyze functions in a vacuum—it maps exactly how functions call one another across the entire Python repository.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-6">
                If the analysis engine detects a path from `flask.request` (Source) down to `sqlite3.execute` (Sink), it doesn't immediately alert. It first verifies <strong>Reachability</strong>.
            </p>

            <ul className="list-disc pl-6 text-zinc-400 mb-6 space-y-3 marker:text-purple-500">
                <li><strong>Dead Code Elimination:</strong> Is the vulnerable function actually ever called in production code? If it's isolated dead code, or located exclusively inside a `/tests` directory block, SerpentScan drops the severity to INFO.</li>
                <li><strong>Type Inferencing:</strong> Python is dynamically typed, but SerpentScan uses PEP 484 type hints and deep inference. If a variable reaching an SQL execution block is mathematically proven to be a strict `int()` before execution, SQL injection is impossible. The alert is dropped.</li>
                <li><strong>Deep Interprocedural Sanitization:</strong> Developers often wrap Sanitizers in their own custom utility functions (`utils.clean_sql_input(user_query)`). SerpentScan recurses into these custom utilities. If a known sanitizer lives inside, the taint trace is cleanly severed.</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-12 mb-4">The Verdict: Developer Trust</h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
                We measure SerpentScan's success by the signal-to-noise ratio. By embedding deep semantic understanding of Python idioms into the core Rust engine, we actively suppress alerts that aren't practically exploitable, saving thousands of engineering hours.
            </p>
        </div>
      </main>
    </div>
  );
}
