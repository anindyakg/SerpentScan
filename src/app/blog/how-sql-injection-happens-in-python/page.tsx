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
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-800 bg-zinc-200 px-3 py-1 rounded-full">Vulnerability Deep Dive</span>
                <span className="text-sm font-medium text-zinc-500">April 5, 2026</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
                How SQL injection happens in Python (and how to fix it)
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed font-light">
                Stop using f-strings for queries. We explain how SQLi occurs in cursor.execute contexts and how parameterized statements prevent it entirely.
            </p>
        </div>

        <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-12 border border-white/10">
            <img src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=1200" alt="Cover" className="w-full h-full object-cover" />
        </div>

        <div className="prose prose-invert prose-zinc max-w-none">
            <p className="text-zinc-300 leading-relaxed text-lg mb-8">
                SQL Injection (SQLi) remains one of the most critical vulnerabilities in modern web applications. Despite the widespread use of ORMs like SQLAlchemy and Django ORM, many developers still drop down to raw SQL using `psycopg2` or `sqlite3` for complex queries. When they do, they often make a fatal mistake: string formatting.
            </p>

            <h2 className="text-2xl font-bold text-white mt-12 mb-4">The Anatomy of the Attack</h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
                The vulnerability occurs when untrusted user input is directly concatenated into a SQL query string before being sent to the database parser. Look at this standard Flask route:
            </p>

            <div className="bg-[#0b0c10] border border-white/10 rounded-lg p-6 my-8 overflow-x-auto">
                <pre className="text-pink-400 font-mono text-sm leading-7">
<code className="text-zinc-300">@app.route('/user')</code><br/>
<code className="text-zinc-300">def get_user():</code><br/>
<code className="text-zinc-300">    user_id = request.args.get('id')</code><br/>
<code className="text-red-400">    # THE FATAL F-STRING MISTAKE</code><br/>
<code className="text-red-400">    query = f"SELECT username, email FROM users WHERE id = &#123;user_id&#125;"</code><br/>
<code className="text-zinc-300">    cursor.execute(query)</code><br/>
<code className="text-zinc-300">    return cursor.fetchone()</code>
                </pre>
            </div>

            <p className="text-zinc-400 leading-relaxed mb-6">
                If a legitimate user requests `/user?id=4`, the query becomes `SELECT username, email FROM users WHERE id = 4`. The database runs it, and the data is returned.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-6">
                But what if an attacker requests `/user?id=4 OR 1=1`? The resulting query is:
            </p>
            <div className="bg-[#0b0c10] border border-red-500/20 rounded-lg p-4 my-6">
                <code className="text-red-400 font-mono text-sm">SELECT username, email FROM users WHERE id = 4 OR 1=1</code>
            </div>
            <p className="text-zinc-400 leading-relaxed mb-6">
                Because `1=1` is always true, the database bypasses the ID check entirely, often returning the entire table of users, leaking massive amounts of PII. An attacker can go further by appending `UNION SELECT password, null FROM admins`, leaking admin passwords directly to the screen.
            </p>

            <h2 className="text-2xl font-bold text-white mt-12 mb-4">The Fix: Parameterized Queries</h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
                The only robust defense against SQL Injection is using parameterized queries (also known as prepared statements). 
            </p>
            <p className="text-zinc-400 leading-relaxed mb-6">
                Instead of sending a dynamically constructed string, you send the SQL query with placeholders to the database separately from the actual parameter data. The database driver treats the parameters strictly as literal values, never as executable SQL commands. 
            </p>

            <div className="bg-[#0b0c10] border border-white/10 rounded-lg p-6 my-8 overflow-x-auto">
                <pre className="text-green-400 font-mono text-sm leading-7">
<code className="text-zinc-300">@app.route('/user')</code><br/>
<code className="text-zinc-300">def get_user():</code><br/>
<code className="text-zinc-300">    user_id = request.args.get('id')</code><br/>
<code className="text-green-400">    # SAFE: Using placeholder (?) and passing variables separately</code><br/>
<code className="text-green-400">    query = "SELECT username, email FROM users WHERE id = ?"</code><br/>
<code className="text-green-400">    cursor.execute(query, (user_id,))</code><br/>
<code className="text-zinc-300">    return cursor.fetchone()</code>
                </pre>
            </div>

            <p className="text-zinc-400 leading-relaxed mb-6">
                Now, if the attacker inputs `4 OR 1=1`, the database looks for a literal user row whose exact ID string is literally `"4 OR 1=1"`. Naturally, no such row exists, and the attack fails harmlessly.
            </p>

            <h2 className="text-2xl font-bold text-white mt-12 mb-4">How SerpentScan Protects You</h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
                Missing a single f-string query in a massive monolithic application is incredibly easy. SerpentScan uses advanced data-flow taint analysis to trace variables directly from inputs like `request.args` down to critical sinks like `cursor.execute()`. Find SQL injections statically, before the code ever hits production.
            </p>
            
        </div>
      </main>
    </div>
  );
}
