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
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-800 bg-zinc-200 px-3 py-1 rounded-full">Tutorials</span>
                <span className="text-sm font-medium text-zinc-500">February 22, 2026</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
                Scanning Flask for vulnerabilities using SerpentScan
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed font-light">
                A hands-on walkthrough scanning a deeply vulnerable open-source Flask repository and interpreting the trace path outputs from SerpentScan's engine.
            </p>
        </div>

        <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-12 border border-white/10">
            <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200" alt="Cover" className="w-full h-full object-cover" />
        </div>

        <div className="prose prose-invert prose-zinc max-w-none">
            <p className="text-zinc-300 leading-relaxed text-lg mb-8">
                Flask is an incredibly popular microframework, perfect for building Python web applications quickly. But its unopinionated nature means security enforcement is entirely in the hands of the developer. Let's see what happens when we unleash SerpentScan on a deliberately vulnerable Flask application.
            </p>

            <h2 className="text-2xl font-bold text-white mt-12 mb-4">The Setup</h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
                We'll be scanning an intentionally insecure mock e-commerce backend built with Flask and SQLite. First, we install the SerpentScan CLI via strictly audited pip distributions:
            </p>

            <div className="bg-[#0b0c10] border border-white/10 rounded-lg p-4 my-6">
                <code className="text-purple-400 font-mono text-sm">pip install serpentscan</code>
            </div>

            <p className="text-zinc-400 leading-relaxed mb-6">
                And then we invoke the scan on the root directory of the application:
            </p>
            <div className="bg-[#0b0c10] border border-white/10 rounded-lg p-4 my-6">
                <code className="text-purple-400 font-mono text-sm">serpentscan analyze ./flask-shop-demo --format=cli</code>
            </div>

            <h2 className="text-2xl font-bold text-white mt-12 mb-4">Analyzing the Output</h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
                Within 1.2 seconds, SerpentScan outputs a comprehensive terminal report. Let's look at one of the Critical alerts: Path Traversal in the Product Images route.
            </p>

            <div className="bg-[#0b0c10] border border-white/10 rounded-lg p-6 my-8 overflow-x-auto">
                <pre className="text-zinc-300 font-mono text-sm leading-7">
<code className="text-red-400 font-bold">[CRITICAL] Path Traversal (CWE-22) detected in image_server.py</code><br/>
<br/>
<code>Trace Path:</code><br/>
<code>1. Source (Taint Entry) -{'>'} flask-shop-demo/app/routes.py:112</code><br/>
<code>   - filename = request.args.get('file')</code><br/>
<br/>
<code>2. Propagation -{'>'} flask-shop-demo/app/utils/image_formatter.py:22</code><br/>
<code>   - formatted_path = f"/var/www/images/&#123;filename&#125;"</code><br/>
<br/>
<code>3. Sink (Execution) -{'>'} flask-shop-demo/app/image_server.py:45</code><br/>
<code>   - return send_file(formatted_path)</code><br/>
<br/>
<code className="text-zinc-500">Details: Untrusted input from `request.args` flows directly into the `send_file` sink without sanitization. An attacker can use `../../` to escape the root directory and read arbitrary system files (e.g. /etc/passwd).</code><br/>
                </pre>
            </div>

            <h2 className="text-2xl font-bold text-white mt-12 mb-4">Applying the Fix</h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
                The trace path above is incredibly valuable. It shows that while the vulnerability triggers in `image_server.py`, the core problem roots back to `routes.py`. To fix it, we utilize Werkzeug's `secure_filename()` utility.
            </p>

            <div className="bg-[#0b0c10] border border-white/10 rounded-lg p-6 my-8 overflow-x-auto">
                <pre className="text-green-400 font-mono text-sm leading-7">
<code className="text-zinc-300">from werkzeug.utils import secure_filename</code><br/>
<code className="text-zinc-300">import os</code><br/>
<br/>
<code className="text-zinc-300">@app.route('/image')</code><br/>
<code className="text-zinc-300">def get_image():</code><br/>
<code className="text-zinc-300">    filename = request.args.get('file')</code><br/>
<code className="text-green-400">    # SAFE: Strips out directory traversal characters</code><br/>
<code className="text-green-400">    safe_name = secure_filename(filename)</code><br/>
<code className="text-zinc-300">    </code><br/>
<code className="text-zinc-300">    return send_file(os.path.join('/var/www/images/', safe_name))</code>
                </pre>
            </div>

            <p className="text-zinc-400 leading-relaxed mb-6">
                Running `serpentscan analyze` again yields a clean pass. SerpentScan recognizes `secure_filename()` as an active Python Sanitizer, mathematically proving the traversal path is sealed. 
            </p>
        </div>
      </main>
    </div>
  );
}
