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
            <MobileMenu />
            <Link href="/blog" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm font-semibold">
                <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
        </div>
      </nav>

      <main className="relative z-10 w-full max-w-3xl mx-auto px-6 pt-16 pb-32">
        
        <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-800 bg-zinc-200 px-3 py-1 rounded-full">Security Guides</span>
                <span className="text-sm font-medium text-zinc-500">April 12, 2026</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
                Top 10 Python security vulnerabilities developers miss
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed font-light">
                A comprehensive guide to SQL injection, command injection, insecure deserialization, path traversal, and weak crypto in modern Python apps.
            </p>
        </div>

        <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-12 border border-white/10">
            <img src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200" alt="Cover" className="w-full h-full object-cover" />
        </div>

        <div className="prose prose-invert prose-zinc max-w-none">
            <p className="text-zinc-300 leading-relaxed text-lg mb-8">
                Python is renowned for its readability and massive ecosystem, making it the bedrock of data science, AI, and backend web development. However, the exact features that make Python so flexible—dynamic typing, powerful built-in libraries, and easy metaprogramming—also make it incredibly easy to introduce critical security vulnerabilities without realizing it.
            </p>

            <h2 className="text-2xl font-bold text-white mt-12 mb-4">1. SQL Injection via String Formatting</h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
                The most prevalent vulnerability we see when scanning Python codebases with SerpentScan is SQL Injection via f-strings. Developers often construct queries by directly injecting user input into a SQL string.
            </p>
            <div className="bg-[#0b0c10] border border-white/10 rounded-lg p-6 my-8 overflow-x-auto">
                <pre className="text-red-400 font-mono text-sm leading-7">
<code className="text-zinc-500"># ❌ VULNERABLE</code><br/>
<code>user_id = request.args.get('id')</code><br/>
<code>query = f"SELECT * FROM users WHERE id = &#123;user_id&#125;"</code><br/>
<code>cursor.execute(query)</code>
                </pre>
            </div>
            <p className="text-zinc-400 leading-relaxed mb-6">
                <strong>The Fix:</strong> Always use parameterized queries natively provided by your database driver (like `psycopg2` or `sqlite3`) or an ORM like SQLAlchemy. Parameters are treated strictly as data, never as executable SQL.
            </p>

            <h2 className="text-2xl font-bold text-white mt-12 mb-4">2. Insecure Deserialization (Pickle)</h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
                Python's `pickle` module is incredibly powerful for serializing object structures, but it is fundamentally unsafe against erroneous or maliciously constructed data. Unpickling data allows arbitrary code execution (RCE).
            </p>
            <div className="bg-[#0b0c10] border border-white/10 rounded-lg p-6 my-8 overflow-x-auto">
                <pre className="text-red-400 font-mono text-sm leading-7">
<code className="text-zinc-500"># ❌ VULNERABLE</code><br/>
<code>import pickle</code><br/>
<code>data = request.data</code><br/>
<code>obj = pickle.loads(data) # Remote Code Execution waiting to happen</code>
                </pre>
            </div>
            <p className="text-zinc-400 leading-relaxed mb-6">
                <strong>The Fix:</strong> Never unpickle data received from an untrusted or unauthenticated source. Use standard formats like JSON (`json.loads()`) which only reconstruct data structures, not active objects.
            </p>

            <h2 className="text-2xl font-bold text-white mt-12 mb-4">3. Command Injection via Subprocess</h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
                Python scripts frequently need to interact with the underlying operating system. The `subprocess` standard library module is used to spawn new processes, connect to their input/output/error pipes, and obtain their return codes.
            </p>
            <div className="bg-[#0b0c10] border border-white/10 rounded-lg p-6 my-8 overflow-x-auto">
                <pre className="text-red-400 font-mono text-sm leading-7">
<code className="text-zinc-500"># ❌ VULNERABLE</code><br/>
<code>import subprocess</code><br/>
import { MobileMenu } from "@/components/MobileMenu";
<code>user_input = request.form['domain']</code><br/>
<code>subprocess.run(f"ping -c 4 &#123;user_input&#125;", shell=True)</code>
                </pre>
            </div>
            <p className="text-zinc-400 leading-relaxed mb-6">
                If the user inputs `example.com; rm -rf /`, the shell will execute both the ping and the destructive delete command. <strong>The Fix:</strong> Avoid `shell=True` at all costs. Pass arguments as a structured list instead: `subprocess.run(["ping", "-c", "4", user_input])`.
            </p>

            <h2 className="text-2xl font-bold text-white mt-12 mb-4">4. Path Traversal</h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
                Allowing users to specify filenames without sanitization can lead to Directory Traversal (or Path Traversal), enabling an attacker to read arbitrary files on the server.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-6">
                <strong>The Fix:</strong> Use `os.path.basename()` to strip out directory paths, or better yet, validate the sanitized file path to ensure it absolutely resides within an expected base directory boundary using `os.path.abspath()` checks.
            </p>

            <h2 className="text-2xl font-bold text-white mt-12 mb-4">5. Insecure Use of YAML</h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
                Similar to `pickle`, the standard `yaml.load()` function can instantiate arbitrary Python objects. Attackers can provide malicious YAML payloads triggering RCE when read by the application.
            </p>
             <p className="text-zinc-400 leading-relaxed mb-6">
                <strong>The Fix:</strong> Always use `yaml.safe_load()` which restricts the parser strictly to simple standard YAML tags.
            </p>
            
            <div className="mt-12 p-8 rounded-2xl bg-[#0b0c10] border border-purple-500/20 text-center">
                <h3 className="text-xl font-bold text-white mb-3">Don't guess if your code is vulnerable.</h3>
                <p className="text-zinc-400 mb-6">SerpentScan's static analysis engine catches all 10 of these vulnerabilities out of the box with zero configuration.</p>
                <Link href="/" className="inline-block bg-white text-black font-bold px-6 py-3 rounded-lg hover:bg-zinc-200 transition-colors">
                    Scan Your Repository Free
                </Link>
            </div>
        </div>
      </main>
    </div>
  );
}
