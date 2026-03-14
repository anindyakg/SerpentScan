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
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-800 bg-zinc-200 px-3 py-1 rounded-full">Engineering</span>
                <span className="text-sm font-medium text-zinc-500">Jan 14, 2026</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
                Why we migrated from Go back to Rust
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed font-light">
                The story of why we rewrote the core SerpentScan routing Daemon to take advantage of strict memory guarantees and zero-cost abstractions.
            </p>
        </div>

        <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-12 border border-white/10">
            <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200" alt="Cover" className="w-full h-full object-cover" />
        </div>

        <div className="prose prose-invert prose-zinc max-w-none">
            <p className="text-zinc-300 leading-relaxed text-lg mb-8">
                In late 2024, our team re-architected the SerpentScan routing daemon—a critical component responsible for orchestrating parallel AST parsers and aggregating taint graphs—from Python to Go. Go's simplicity and native concurrency made it an easy choice. But as our product scaled to handle massive enterprise monorepos, we ran into an invisible ceiling.
            </p>

            <h2 className="text-2xl font-bold text-white mt-12 mb-4">The Garbage Collection Tax</h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
                Analyzing a Python codebase with millions of lines of code generates billions of AST nodes. In Go, these nodes are allocated on the heap. While the Go GC is incredibly fast for traditional web microservices, AST parsing creates an enormous volume of short-lived objects.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-6">
                During intense scans of complex repositories, we observed GC pauses that accounted for up to 35% of total CPU time. Tail latency (P99) spiked unpredictably. We were spending more time cleaning up memory than actually traversing the graph.
            </p>

            <h2 className="text-2xl font-bold text-white mt-12 mb-4">Enter Rust</h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
                After a week-long hackathon prototyping a new AST parser in Rust, the results were impossible to ignore. Because Rust has no GC and uses compile-time memory management via the borrow checker, we could manage AST node lifecycles with zero runtime overhead using arena allocators.
            </p>

            <div className="bg-[#0b0c10] border border-white/10 rounded-lg p-6 my-8 overflow-x-auto">
                <pre className="text-blue-400 font-mono text-sm leading-7">
<code className="text-zinc-500">// Using bumpalo for arena allocation</code><br/>
<code>use bumpalo::Bump;</code><br/>
<code className="text-zinc-300">let arena = Bump::new();</code><br/>
<code className="text-zinc-300">let ast_node = arena.alloc(AstNode::new(NodeType::FunctionDef));</code><br/>
<code className="text-zinc-500">// Node memory is freed instantly when the arena goes out of scope</code><br/>
                </pre>
            </div>

            <h2 className="text-2xl font-bold text-white mt-12 mb-4">The Payoff</h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
                Rewriting the routing daemon took 4 months. The learning curve was steep, and fighting the borrow checker around mutable graph references was tough. However, the performance gains were staggering.
            </p>
            <ul className="list-disc pl-6 text-zinc-400 mb-6 space-y-3 marker:text-purple-500">
                <li><strong>Memory Usage:</strong> Dropped by 80%. We went from needing 16GB of RAM to scan a large codebase down to under 3GB.</li>
                <li><strong>Execution Time:</strong> Total scan times decreased by over 200%.</li>
                <li><strong>Deterministic Latency:</strong> Because there is no GC, trace time is now perfectly predictable. P99 latency is flat.</li>
            </ul>
        </div>
      </main>
    </div>
  );
}
