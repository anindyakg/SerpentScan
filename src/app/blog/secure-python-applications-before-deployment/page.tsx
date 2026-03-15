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
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-800 bg-zinc-200 px-3 py-1 rounded-full">Best Practices</span>
                <span className="text-sm font-medium text-zinc-500">February 10, 2026</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
                How to secure Python applications before deployment
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed font-light">
                Integrating SerpentScan straight into GitHub Actions block risky PRs from ever reaching production. Achieve continuous delivery without compromise.
            </p>
        </div>

        <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-12 border border-white/10">
            <img src="https://images.unsplash.com/photo-1510915228340-29c0fc4fd8f6?auto=format&fit=crop&q=80&w=1200" alt="Cover" className="w-full h-full object-cover" />
        </div>

        <div className="prose prose-invert prose-zinc max-w-none">
            <p className="text-zinc-300 leading-relaxed text-lg mb-8">
                Securing a Python application is no longer a checklist you hand to a pentester a week before launch. To keep developer velocity high, security must shift left into the CI/CD pipeline. By integrating tools like SerpentScan directly into your GitHub Actions or GitLab CI, vulnerable Pull Requests can be blocked dynamically before they are merged into the main branch.
            </p>

            <h2 className="text-2xl font-bold text-white mt-12 mb-4">Building the Workflow File</h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
                SerpentScan exposes a lightweight Docker image designed specifically for ephemeral pipeline execution. Here is a baseline example of integrating SerpentScan into your `.github/workflows/security.yml` file:
            </p>

            <div className="bg-[#0b0c10] border border-white/10 rounded-lg p-6 my-8 overflow-x-auto">
                <pre className="text-blue-400 font-mono text-sm leading-7">
<code>name: Python Security SAST</code><br/>
<code>on: [push, pull_request]</code><br/>
<br/>
<code>jobs:</code><br/>
<code>  serpentscan:</code><br/>
<code>    runs-on: ubuntu-latest</code><br/>
<code>    steps:</code><br/>
<code>      - uses: actions/checkout@v4</code><br/>
<code>      </code><br/>
<code>      - name: Run SerpentScan Engine</code><br/>
<code>        uses: serpentscan/action@v2</code><br/>
<code>        with:</code><br/>
<code>          target-directory: './src'</code><br/>
<code>          # Block merge if HIGH or CRITICAL flaws are detected</code><br/>
<code>          fail-on-severity: 'HIGH,CRITICAL'</code><br/>
<code>          sarif-output: 'serpentscan-results.sarif'</code><br/>
<br/>
<code>      - name: Upload SARIF report to GitHub Advanced Security</code><br/>
<code>        uses: github/codeql-action/upload-sarif@v3</code><br/>
<code>        if: always()</code><br/>
<code>        with:</code><br/>
<code>          sarif_file: 'serpentscan-results.sarif'</code>
                </pre>
            </div>

            <h2 className="text-2xl font-bold text-white mt-12 mb-4">Frictionless Security Guardrails</h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
                Because SerpentScan executes completely offline via WebAssembly binaries in under a few seconds, it adds practically zero latency to your continuous delivery pipeline. When a developer triggers a pipeline failure by pushing SQL Injection code, SerpentScan highlights the exact PR diff line directly in the GitHub UI via SARIF.
            </p>

            <h2 className="text-2xl font-bold text-white mt-12 mb-4">Securing the Software Supply Chain</h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
                Pipeline execution also perfectly pairs with Software Composition Analysis (SCA). SerpentScan will instantly inspect your `requirements.txt` or `pyproject.toml` file against realtime CVE databases. If a developer attempts to PR a known vulnerable package version like an outdated version of urllib3, SerpentScan blocks the merge and provides the secure version bump recommendation.
            </p>

            <div className="mt-12 p-8 rounded-2xl border border-white/10 bg-white/5 text-center">
                 <h3 className="text-xl font-bold text-white mb-3">Enterprise Integrations</h3>
                 <p className="text-zinc-400 mb-6">Running GitHub Enterprise Server or Jenkins on-prem? Contact us to set up private endpoint artifact deployment.</p>
                 <Link href="/enterprise" className="inline-block bg-white text-black font-bold px-6 py-3 rounded-lg hover:bg-zinc-200 transition-colors">
                     View Enterprise Docs
                 </Link>
             </div>

        </div>
      </main>
    </div>
  );
}
