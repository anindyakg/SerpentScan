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
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-800 bg-zinc-200 px-3 py-1 rounded-full">Tutorial</span>
                <span className="text-sm font-medium text-zinc-500">Dec 02, 2025</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
                Securing your Webhooks with SerpentScan Connectors
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed font-light">
                Learn to build a bulletproof HMAC-signed ingress gateway for your locally orchestrated SerpentScan webhook triggers.
            </p>
        </div>

        <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-12 border border-white/10">
            <img src="https://images.unsplash.com/photo-1563206767-5b18f218e8e1?auto=format&fit=crop&q=80&w=1200" alt="Cover" className="w-full h-full object-cover" />
        </div>

        <div className="prose prose-invert prose-zinc max-w-none">
            <p className="text-zinc-300 leading-relaxed text-lg mb-8">
                Automating your security pipeline requires your SerpentScan local daemon to communicate with third-party tools like Slack, Jira, or GitHub Actions. Webhooks are the standard for event-driven architectures, but exposing a local webhook receiver to the public internet is inherently risky.
            </p>

            <h2 className="text-2xl font-bold text-white mt-12 mb-4">The Danger of Unsigned Webhooks</h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
                If your CI/CD server is listening for a "Scan Complete" event from SerpentScan, an attacker who discovers your webhook endpoint could easily forge payloads to trigger unauthorized builds or bypass security gates.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-6">
                To prevent this, SerpentScan Connectors automatically append a cryptographic HMAC (Hash-based Message Authentication Code) signature to every outgoing request.
            </p>

            <h2 className="text-2xl font-bold text-white mt-12 mb-4">Verifying the HMAC Signature in Python</h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
                When you define a Connector in SerpentScan, you are provided with a `WEBHOOK_SECRET`. SerpentScan takes the raw JSON payload, hashes it using SHA-256 alongside your secret, and sends the resulting signature in the `X-SerpentScan-Signature` header.
            </p>

            <div className="bg-[#0b0c10] border border-white/10 rounded-lg p-6 my-8 overflow-x-auto">
                <pre className="text-pink-400 font-mono text-sm leading-7">
<code>import hmac</code><br/>
<code>import hashlib</code><br/>
<code className="text-zinc-300">from fastapi import Request, HTTPException</code><br/>
<br/>
<code className="text-zinc-300">def verify_signature(request: Request, body: bytes) -{'>'} bool:</code><br/>
<code className="text-zinc-300">    secret = "your_webhook_secret".encode('utf-8')</code><br/>
<code className="text-zinc-300">    signature = request.headers.get('x-serpentscan-signature')</code><br/>
<br/>
<code className="text-zinc-300">    expected = hmac.new(secret, body, hashlib.sha256).hexdigest()</code><br/>
<code className="text-zinc-300">    </code><br/>
<code className="text-zinc-300">    if not hmac.compare_digest(signature, expected):</code><br/>
<code className="text-zinc-300">        raise HTTPException(status_code=401, detail="Invalid signature")</code><br/>
<code className="text-zinc-300">    return True</code>
                </pre>
            </div>

            <h2 className="text-2xl font-bold text-white mt-12 mb-4">Best Practices</h2>
            <ul className="list-disc pl-6 text-zinc-400 mb-6 space-y-3 marker:text-purple-500">
                <li><strong>Always use compare_digest:</strong> Never use `==` to compare hashes. Standard string comparison is vulnerable to timing attacks. `hmac.compare_digest` takes a constant amount of time regardless of whether the strings match.</li>
                <li><strong>Replay Protection:</strong> Even with HMAC, an attacker who intercepts a payload can send it again later. Use the timestamp included in the SerpentScan payload to ensure requests are less than 5 minutes old.</li>
                <li><strong>HTTPS is Mandatory:</strong> HMAC prevents tampering, but it does not encrypt the payload. All webhook traffic must be routed over TLS.</li>
            </ul>
        </div>
      </main>
    </div>
  );
}
