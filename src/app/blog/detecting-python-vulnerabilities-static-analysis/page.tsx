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
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-800 bg-zinc-200 px-3 py-1 rounded-full">SAST Engineering</span>
                <span className="text-sm font-medium text-zinc-500">March 28, 2026</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
                Detecting Python vulnerabilities using static analysis
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed font-light">
                Unpack exactly how SerpentScan traces data flow using Abstract Syntax Trees (AST) and taint analysis to identify complex security flaws before deployment.
            </p>
        </div>

        <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-12 border border-white/10">
            <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200" alt="Cover" className="w-full h-full object-cover" />
        </div>

        <div className="prose prose-invert prose-zinc max-w-none">
            <p className="text-zinc-300 leading-relaxed text-lg mb-8">
                Dynamic Application Security Testing (DAST) involves attacking a running application from the outside to find vulnerabilities. Static Application Security Testing (SAST), on the other hand, analyzes the source code itself without executing it. SAST is shift-left security—finding issues exactly where the developer wrote them.
            </p>

            <h2 className="text-2xl font-bold text-white mt-12 mb-4">The Naive Approach: Regex</h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
                Early static analysis tools relied heavily on Regular Expressions (Regex). They would literally scan text files looking for `.execute(` or `eval(`. 
            </p>
            <p className="text-zinc-400 leading-relaxed mb-6">
                This approach is deeply flawed. Regex does not understand context. It will flag a perfectly safe query (`execute("SELECT * FROM USERS")`) while ignoring highly obfuscated but critical vulnerabilities spanning multiple functions. The result? Development teams abandon the tool due to overwhelming false positives.
            </p>

            <h2 className="text-2xl font-bold text-white mt-12 mb-4">The Solution: Abstract Syntax Trees (AST)</h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
                To truly analyze code, a security engine needs to understand it the way an interpreter does. Python's source code is first parsed into an Abstract Syntax Tree (AST)—a tree representation of the abstract syntactic structure of the source code.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-6">
                SerpentScan ingests this AST, turning the codebase into a massive, navigable graph of function definitions, assignments, and logic branches. Once we have the graph, we apply Taint Analysis.
            </p>

            <h2 className="text-2xl font-bold text-white mt-12 mb-4">Implementing Taint Analysis</h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
                Taint analysis relies on three primary concepts: Sources, Sinks, and Sanitizers.
            </p>
            <ul className="list-disc pl-6 text-zinc-400 mb-6 space-y-3 marker:text-purple-500">
                <li><strong>Sources:</strong> Places where untrusted data enters the application. Examples: `flask.request.args`, `sys.argv`, reading from an untrusted file.</li>
                <li><strong>Sinks:</strong> Dangerous operations where untrusted data should not end up. Examples: `sqlite3.execute()`, `os.system()`, `pickle.loads()`.</li>
                <li><strong>Sanitizers:</strong> Functions that make untrusted data safe. Examples: `markupsafe.escape()`, using parameterized variables instead of strings.</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-12 mb-4">Tracing the Graph</h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
                SerpentScan traverses the AST starting from thousands of known Sources. It "taints" those variables with a distinct marker. It then traces assignment operations through the graph across disparate files. If `variable_a` is tainted, and we see `variable_b = variable_a + variable_c`, then `variable_b` also inherits the taint.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-6">
                If, during this traversal, the engine encounters a known Sanitizer function operating on a variable, it strips the taint marker from the result.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-6">
                Finally, if a tainted variable is passed into a designated Sink as a vulnerable argument, SerpentScan registers an alert—painting the exact line path from the Source, through the entire application, down to the explosive Sink. Interprocedural accuracy meets lightning-fast Rust traversal.
            </p>
        </div>
      </main>
    </div>
  );
}
