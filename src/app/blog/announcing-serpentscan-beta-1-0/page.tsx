import Link from "next/link";
import { Shield, ArrowLeft } from "lucide-react";

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
            <Link href="/blog" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm font-semibold">
                <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
        </div>
      </nav>

      <main className="relative z-10 w-full max-w-3xl mx-auto px-6 pt-16 pb-32">
        
        <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full">Product Updates</span>
                <span className="text-sm font-medium text-zinc-500">March 10, 2026</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
                Announcing SerpentScan Beta 1.0: The Deep Trace Engine
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed font-light">
                We completely rebuilt the AST execution environment from the ground up. Over 200% faster traces on Python and JavaScript codebases.
            </p>
        </div>

        <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-12">
            <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200" alt="Cover" className="w-full h-full object-cover" />
        </div>

        <div className="prose prose-invert prose-zinc max-w-none">
            <p className="text-zinc-300 leading-relaxed text-lg mb-8">
                Today, we are thrilled to announce the Beta 1.0 release of SerpentScan, featuring our brand-new Deep Trace Engine. This release marks a massive leap forward in local-first static analysis, giving developers unprecedented visibility into the security posture of their applications without ever having to send source code to the cloud.
            </p>

            <h2 className="text-2xl font-bold text-white mt-12 mb-4">The Need for Speed (and Privacy)</h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
                Traditional SAST tools are slow. They require you to package your code, upload it to a centralized server, and wait hours for a bloated report full of false positives. With SerpentScan Beta 1.0, we wanted to flip this paradigm on its head. 
            </p>
            <p className="text-zinc-400 leading-relaxed mb-6">
                We completely abandoned our old pattern-matching architecture and built a custom Abstract Syntax Tree (AST) parser written entirely in Rust. By moving the analysis directly onto the developer's machine using WebAssembly and local Daemons, tracing user inputs from an API route down to a SQL query now takes seconds, not hours.
            </p>

            <h2 className="text-2xl font-bold text-white mt-12 mb-4">What's New in Beta 1.0?</h2>
            <ul className="list-disc pl-6 text-zinc-400 mb-6 space-y-3 marker:text-purple-500">
                <li><strong>The Deep Trace Engine:</strong> Interprocedural taint analysis that accurately maps how data flows between different files and modules in your repository.</li>
                <li><strong>200% Faster Execution:</strong> Thanks to the Rust rewrite, memory overhead has been slashed, and parallel execution allows for lightning-fast analysis of large monorepos.</li>
                <li><strong>Expanded Python Support:</strong> Full support for modern Python 3.12 syntax, including structural pattern matching, async/await, and deep integration with FastAPI and Django routing.</li>
                <li><strong>Dependency Risk Visibility:</strong> We now pull live CVE data from OSV and PyPI to cross-reference your required packages instantly.</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-12 mb-4">Looking Ahead</h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
                Beta 1.0 is just the beginning. Our goal is to make enterprise-grade security analysis accessible to every developer for free. In the coming months, we will be expanding our trace engine to support Go and Java, and introducing AI-assisted remediation directly into your IDE.
            </p>
            
            <div className="mt-12 p-8 rounded-2xl bg-white/5 border border-white/10 text-center">
                <h3 className="text-xl font-bold text-white mb-3">Ready to try it out?</h3>
                <p className="text-zinc-400 mb-6">Start scanning your repositories locally today.</p>
                <Link href="/" className="inline-block bg-white text-black font-bold px-6 py-3 rounded-lg hover:bg-zinc-200 transition-colors">
                    Go to Scanner
                </Link>
            </div>
        </div>
      </main>
    </div>
  );
}
