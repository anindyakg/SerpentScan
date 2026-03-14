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
                <span className="text-sm font-medium text-zinc-500">Feb 23, 2026</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
                How to run local LLM AST Scanners securely
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed font-light">
                A deep dive into bypassing cloud-latency and piping AST syntax trees directly into LLaMa 3 running locally on your Macbook M3.
            </p>
        </div>

        <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-12 border border-white/10">
            <img src="https://images.unsplash.com/photo-1620825937374-87fc1d6aaffa?auto=format&fit=crop&q=80&w=1200" alt="Cover" className="w-full h-full object-cover" />
        </div>

        <div className="prose prose-invert prose-zinc max-w-none">
            <p className="text-zinc-300 leading-relaxed text-lg mb-8">
                With the advent of highly capable, open-weight language models like LLaMa 3, developers no longer have to rely exclusively on OpenAI or Anthropic for intelligent code analysis. By shifting inference locally, we solve the two biggest hurdles in AI security tooling: privacy and latency.
            </p>

            <h2 className="text-2xl font-bold text-white mt-12 mb-4">The Privacy Imperative</h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
                Many organizations have strict data compliance policies that outright forbid uploading proprietary source code to a third-party LLM API. Even if an API guarantees data won't be used for training, the risk of interception or a breach at the provider level is a non-starter for defense contractors, fintech companies, and healthcare organizations.
            </p>

            <h2 className="text-2xl font-bold text-white mt-12 mb-4">Piping AST to LLaMa 3</h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
                Rather than feeding raw, noisy source code into a local LLM—which rapidly exhausts the context window—SerpentScan uses a clever technique. We first parse the code into an Abstract Syntax Tree (AST), strip out non-essential boilerplate, comments, and imports, and generate a highly compressed Graph representation of the vulnerable path.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-6">
                We then serialize this graph and pipe it directly into a locally hosted llama.cpp instance running on an M3 Macbook via Metal performance shaders.
            </p>

            <div className="bg-[#0b0c10] border border-white/10 rounded-lg p-6 my-8 overflow-x-auto">
                <pre className="text-purple-400 font-mono text-sm leading-7">
<code>// Example serialization pipeline</code><br/>
<code className="text-zinc-300">const ast = parser.parse(sourceCode);</code><br/>
<code className="text-zinc-300">const taintGraph = engine.trace(ast, sinks.SQL_INJECTION);</code><br/>
<code className="text-zinc-300">const compressedContext = serializeForLLM(taintGraph);</code><br/>
<br/>
<code className="text-zinc-300">const response = await localLlama.infer(&#123;</code><br/>
<code className="text-zinc-300">  prompt: `Analyze this trace: $&#123;compressedContext&#125;`,</code><br/>
<code className="text-zinc-300">  temperature: 0.1</code><br/>
<code className="text-zinc-300">&#125;);</code>
                </pre>
            </div>

            <h2 className="text-2xl font-bold text-white mt-12 mb-4">Results & Performance</h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
                Using 4-bit quantization, LLaMa 3 8B fits entirely within the unified memory of an Apple Silicon Mac. The result is astonishing: SerpentScan can identify a vulnerability, extract the exact execution path, and have the local LLM write a patch in under 4 seconds, entirely offline.
            </p>
            
            <p className="text-zinc-400 leading-relaxed mb-6">
                This local-first architecture is the foundational philosophy behind SerpentScan. Absolute security requires absolute data sovereignty.
            </p>
        </div>
      </main>
    </div>
  );
}
