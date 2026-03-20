"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Github, Terminal, CheckCircle2, 
  Activity, Users, Zap, Shield, Play, Lock, LineChart, Code2, Database, Network, Instagram
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MobileMenu } from "@/components/MobileMenu";

export default function LandingPage() {
  const { data: session, status } = useSession();
  const [repoUrl, setRepoUrl] = useState("");
  const [scanState, setScanState] = useState<"idle" | "scanning" | "completed">("idle");
  const [logs, setLogs] = useState<string[]>([]);
  const router = useRouter();

  const MOCK_LOGS = [
    "Initializing SerpentScan Scanner engine v2.0...",
    "Scanning dependencies from requirements.txt...",
    "Checking OSV database for known vulnerabilities...",
    "Analyzing AST syntax trees...",
    "Running static taints analysis on external inputs...",
    "Finalizing structural report...",
  ];

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!repoUrl) return;

    setScanState("scanning");
    setLogs([]);
    
    for (let i = 0; i < MOCK_LOGS.length; i++) {
        await new Promise(r => setTimeout(r, 600 + Math.random() * 400));
        setLogs(prev => [...prev, `[INFO] ${MOCK_LOGS[i]}`]);
    }

    setScanState("completed");
  };

  return (
    <div className="relative flex-1 flex flex-col w-full bg-black text-white overflow-x-hidden selection:bg-purple-500/30">
      
      {/* PLASMA GLOWS */}
      <div className="bg-plasma-glow-purple"></div>
      <div className="bg-plasma-glow-pink"></div>

      {/* HEADER */}
      <nav className="relative z-50 w-full max-w-7xl mx-auto px-6 py-6 flex flex-row items-center justify-between border-b border-white/5">
        <Link href="/" className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-gradient-to-br from-purple-500 to-pink-600">
                <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">SerpentScan</span>
        </Link>
        <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-zinc-400">
            <Link href="/" className="hover:text-white transition-colors">Platform</Link>
            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/docs" className="hover:text-white transition-colors">Docs</Link>
            <Link href="/enterprise" className="hover:text-white transition-colors">Enterprise</Link>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
        </div>
        <div className="flex items-center gap-4">
            <MobileMenu />
            {status === "unauthenticated" ? (
              <>
                <button onClick={() => signIn("google")} className="text-sm font-medium text-zinc-300 hover:text-white transition-colors px-3 py-2">Sign in</button>
                <button onClick={() => signIn("google")} className="bg-white text-black px-5 py-2 rounded-lg text-sm font-semibold hover:bg-zinc-200 transition-colors">
                    Get Started
                </button>
              </>
            ) : status === "authenticated" ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {session.user?.image && (
                    <Image src={session.user.image} alt="User Avatar" width={32} height={32} className="rounded-full border border-white/20" />
                  )}
                  <span className="text-sm font-medium text-zinc-300 hidden md:inline-block">{session.user?.name}</span>
                </div>
                <button onClick={() => signOut()} className="bg-zinc-900 border border-white/10 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-zinc-800 transition-colors">
                    Sign Out
                </button>
              </div>
            ) : (
                <div className="w-20 h-8 bg-zinc-800 rounded animate-pulse"></div>
            )}
        </div>
      </nav>

      <main className="relative z-10 w-full flex flex-col items-center">
        
        {/* HERO SECTION */}
        <section id="scan" className="w-full max-w-5xl mx-auto px-6 pt-32 pb-32 flex flex-col items-center text-center relative z-20">
            {/* Micro Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="text-xs font-semibold tracking-wide text-purple-300 uppercase">SerpentScan v2.0 — Now Available</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[1.05] text-white mb-6 heading-font">
                Static security analysis<br />
                for <span className="text-gradient-purple">Python developers</span>
            </h1>
            
            <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl font-light leading-relaxed">
                SerpentScan is an open-source security scanner for Python code.<br />
                Detect vulnerabilities, insecure patterns, and vulnerable dependencies using AST analysis, taint tracking, and CVE intelligence.
            </p>

            {/* SCANNER FORM OR LOADING TERMINAL */}
            {status === "loading" ? (
                <div className="w-full max-w-xl h-14 bg-[#0d0d12] border border-white/10 rounded-2xl animate-pulse"></div>
            ) : status === "unauthenticated" ? (
                <button 
                    onClick={() => signIn("google")}
                    className="w-full max-w-xl relative flex items-center justify-center gap-3 bg-white text-black hover:bg-zinc-200 border border-white/10 rounded-2xl p-4 shadow-[0_0_30px_rgba(147,51,234,0.15)] transition-all font-bold text-lg"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Sign in with Google to Scan
                </button>
            ) : scanState === "idle" ? (
                <form 
                    onSubmit={handleScan}
                    className="w-full max-w-xl relative flex items-center bg-[#0d0d12] border border-white/10 rounded-2xl p-1.5 shadow-[0_0_30px_rgba(147,51,234,0.15)] transition-all hover:border-purple-500/50"
                >
                    <div className="pl-4 text-zinc-500">
                        <Github className="w-5 h-5" />
                    </div>
                    <input 
                        type="url"
                        value={repoUrl}
                        onChange={(e) => setRepoUrl(e.target.value)}
                        placeholder="Paste your public GitHub repo here"
                        className="flex-1 bg-transparent border-none outline-none text-white px-4 py-3 placeholder:text-zinc-600 font-medium text-sm"
                        required
                    />
                    <button 
                        type="submit"
                        className="bg-white hover:bg-zinc-200 text-black px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all text-sm"
                    >
                        Scan now
                    </button>
                </form>
            ) : (
                <div className="w-full max-w-xl bg-[#0d0d12] border border-purple-500/30 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(147,51,234,0.2)]">
                    <div className="flex items-center gap-2 bg-[#1a1a24] border-b border-white/10 px-4 py-3 text-left">
                        <Terminal className="w-4 h-4 text-purple-400" />
                        <span className="text-xs font-semibold text-purple-300 tracking-wider">SerpentScan-cli • Running local trace</span>
                        <div className="ml-auto w-3 h-3 rounded-full border-2 border-purple-500 border-t-transparent animate-spin"></div>
                    </div>
                    <div className="p-6 font-mono text-[13px] leading-7 text-zinc-400 flex flex-col items-start min-h-[200px] text-left">
                        <AnimatePresence>
                            {logs.map((log, i) => (
                                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                                    <span className="text-pink-400">{log.split(' ')[0]}</span>{" "}{log.split(' ').slice(1).join(' ')}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {scanState === "scanning" && (
                            <motion.div animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-2 h-4 bg-white/70 mt-2 inline-block"/>
                        )}
                        {scanState === "completed" && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 flex flex-col gap-3 w-full">
                                <div className="flex gap-4 w-full">
                                    <Link href={`/report?repo=${encodeURIComponent(repoUrl)}`} target="_blank" rel="noopener noreferrer" className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 rounded-lg font-bold text-center transition-colors text-sm shadow-[0_0_15px_rgba(147,51,234,0.3)]">
                                        View Results
                                    </Link>
                                    <button onClick={() => window.open(`/report?repo=${encodeURIComponent(repoUrl)}&print=true`, '_blank')} className="flex-1 bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-lg font-bold text-center transition-colors text-sm">
                                        Download Results
                                    </button>
                                </div>
                                <button 
                                    onClick={() => { setScanState("idle"); setRepoUrl(""); setLogs([]); }} 
                                    className="w-full bg-zinc-900 border border-white/5 hover:border-white/10 hover:bg-zinc-800 text-zinc-400 hover:text-white px-4 py-2.5 rounded-lg font-bold text-center transition-all text-sm mt-1"
                                >
                                    Scan Another Repository
                                </button>
                            </motion.div>
                        )}
                    </div>
                </div>
            )}
        </section>

        {/* HOW SERPENTSCAN WORKS SECTION */}
        <section className="w-full max-w-6xl mx-auto px-6 py-24 flex flex-col items-center relative z-10 -mt-20">
            <div className="flex flex-col items-center mb-16 text-center">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">Everything you need to secure Python applications</h2>
                <p className="text-lg text-zinc-400 max-w-2xl font-light">Static analysis, dependency intelligence, and AI-assisted vulnerability detection in one platform.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                {/* Feature 1 */}
                <div className="bg-[#0b0c10] border border-white/5 rounded-2xl p-8 hover:border-purple-500/30 transition-all shadow-lg flex flex-col items-start text-left group">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                        <Code2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Static Code Analysis</h3>
                    <p className="text-sm font-semibold text-purple-400 mb-4">AST-based vulnerability detection</p>
                    <p className="text-sm text-zinc-400 mb-6 flex-1 leading-relaxed">
                        SerpentScan analyzes your Python code using real AST parsing and control-flow analysis to detect vulnerabilities like SQL injection, command injection, insecure deserialization, and more.
                    </p>
                    <ul className="space-y-2.5 text-sm text-zinc-500 font-medium w-full">
                        <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>SQL Injection</li>
                        <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>Command Injection</li>
                        <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>Deserialization bugs</li>
                        <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>Path traversal</li>
                    </ul>
                </div>

                {/* Feature 2 */}
                <div className="bg-[#0b0c10] border border-white/5 rounded-2xl p-8 hover:border-blue-500/30 transition-all shadow-lg flex flex-col items-start text-left group">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                        <Network className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Taint Tracking Engine</h3>
                    <p className="text-sm font-semibold text-blue-400 mb-4">Trace user input to dangerous operations</p>
                    <p className="text-sm text-zinc-400 mb-6 flex-1 leading-relaxed">
                        SerpentScan tracks how untrusted data flows through your application and detects when it reaches sensitive operations such as database queries, shell execution, or file access.
                    </p>
                    <ul className="space-y-2.5 text-sm text-zinc-500 font-medium w-full mt-auto">
                        <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>Source → Sink detection</li>
                        <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>Interprocedural analysis</li>
                        <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>Real exploit paths</li>
                    </ul>
                </div>

                {/* Feature 3 */}
                <div className="bg-[#0b0c10] border border-white/5 rounded-2xl p-8 hover:border-green-500/30 transition-all shadow-lg flex flex-col items-start text-left group">
                    <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 mb-6 group-hover:scale-110 transition-transform">
                        <Database className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Dependency Vulnerability Scanning</h3>
                    <p className="text-sm font-semibold text-green-400 mb-4">Detect vulnerable Python packages</p>
                    <p className="text-sm text-zinc-400 mb-6 flex-1 leading-relaxed">
                        Automatically scan your dependencies against the OSV vulnerability database and identify exploitable CVEs in your Python ecosystem.
                    </p>
                    <ul className="space-y-2.5 text-sm text-zinc-500 font-medium w-full mt-auto">
                        <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>requirements.txt scanning</li>
                        <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>PyPI vulnerability lookup</li>
                        <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>Reachability analysis</li>
                    </ul>
                </div>

                {/* Feature 4 */}
                <div className="bg-[#0b0c10] border border-white/5 rounded-2xl p-8 hover:border-pink-500/30 transition-all shadow-lg flex flex-col items-start text-left group">
                    <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 mb-6 group-hover:scale-110 transition-transform">
                        <Zap className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">AI-Assisted Security Insights</h3>
                    <p className="text-sm font-semibold text-pink-400 mb-4">Understand vulnerabilities instantly</p>
                    <p className="text-sm text-zinc-400 mb-6 flex-1 leading-relaxed">
                        AI explains vulnerabilities, provides remediation guidance, and highlights real exploit paths so developers can fix issues faster.
                    </p>
                    <ul className="space-y-2.5 text-sm text-zinc-500 font-medium w-full mt-auto">
                        <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-pink-500"></div>Vulnerability explanations</li>
                        <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-pink-500"></div>Secure code examples</li>
                        <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-pink-500"></div>Risk prioritization</li>
                    </ul>
                </div>
                {/* Feature 5 */}
                <div className="bg-[#0b0c10] border border-white/5 rounded-2xl p-8 hover:border-teal-500/30 transition-all shadow-lg flex flex-col items-start text-left group">
                    <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-6 group-hover:scale-110 transition-transform">
                        <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Reachability Analysis</h3>
                    <p className="text-sm font-semibold text-teal-400 mb-4">Prioritize real exploitable vulnerabilities</p>
                    <p className="text-sm text-zinc-400 mb-6 flex-1 leading-relaxed">
                        SerpentScan determines whether vulnerable code paths are actually reachable, dramatically reducing false positives.
                    </p>
                    <ul className="space-y-2.5 text-sm text-zinc-500 font-medium w-full mt-auto">
                        <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>Call graph analysis</li>
                        <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>False positive reduction</li>
                        <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>Exploitability scoring</li>
                    </ul>
                </div>

                {/* Feature 6 */}
                <div className="bg-[#0b0c10] border border-white/5 rounded-2xl p-8 hover:border-yellow-500/30 transition-all shadow-lg flex flex-col items-start text-left group">
                    <div className="w-12 h-12 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400 mb-6 group-hover:scale-110 transition-transform">
                        <LineChart className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Security Graph Engine</h3>
                    <p className="text-sm font-semibold text-yellow-400 mb-4">Understand vulnerabilities as code flows</p>
                    <p className="text-sm text-zinc-400 mb-6 flex-1 leading-relaxed">
                        Build a security graph of functions, data flows, and dependencies to visualize exploit paths and understand real attack surfaces.
                    </p>
                    <ul className="space-y-2.5 text-sm text-zinc-500 font-medium w-full mt-auto">
                        <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>Visual exploit paths</li>
                        <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>Data flow mapping</li>
                        <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>Contextual risk assessment</li>
                    </ul>
                </div>
            </div>
        </section>



        {/* PRIVACY FRIENDLY GRAPHS SECTION */}
        <section className="w-full max-w-6xl mx-auto px-6 py-24 flex flex-col items-center">
            
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4">See your application’s security posture at a glance.</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-transparent mb-6"></div>
                <div className="text-lg space-y-4 max-w-3xl">
                    <p className="text-zinc-500">Modern applications are complex and security vulnerabilities often hide deep inside code paths. SerpentScan analyzes your Python codebase to surface vulnerabilities, dependency risks, and real exploit paths before they reach production.</p>
                </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
                {/* Large Line Graph Mock */}
                <div className="md:col-span-2 bg-[#09090b] border border-white/10 rounded-2xl p-6 relative overflow-hidden shadow-xl hover:border-white/20 transition-all">
                    <h3 className="text-lg font-bold mb-2">Security Insights Dashboard</h3>
                    <p className="text-sm text-zinc-500 w-2/3">View detected vulnerabilities, exploit paths, dependency risks, and security scores across your entire repository.</p>
                    
                    <div className="mt-10 h-48 w-full relative">
                        {/* Fake grid lines */}
                        <div className="absolute inset-x-0 bottom-[20%] border-t border-white/5"></div>
                        <div className="absolute inset-x-0 bottom-[50%] border-t border-white/5"></div>
                        <div className="absolute inset-x-0 bottom-[80%] border-t border-white/5"></div>
                        
                        {/* Fake graph lines SVG */}
                        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                            <path d="M0,150 Q100,100 200,120 T400,80 T600,50 T800,20" fill="none" stroke="#d946ef" strokeWidth="3" className="drop-shadow-[0_0_10px_rgba(217,70,239,0.8)]" />
                            <path d="M0,180 Q100,150 200,170 T400,120 T600,100 T800,70" fill="none" stroke="#3b82f6" strokeWidth="3" className="drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                        </svg>

                        {/* Graph Legend */}
                        <div className="absolute top-0 right-0 flex gap-4 text-xs font-semibold">
                           <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-fuchsia-400"></div> High Severity</div>
                           <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Low Severity</div>
                        </div>
                    </div>
                </div>

                {/* Security Metrics Panel */}
                <div className="md:col-span-1 bg-[#09090b] border border-white/10 rounded-2xl p-6 relative overflow-hidden shadow-xl hover:border-white/20 transition-all flex flex-col">
                    <h3 className="text-lg font-bold mb-2">Comprehensive Scan Reports</h3>
                    <p className="text-sm text-zinc-500 mb-6">Instantly view security scores, line-of-code analysis, and severity breakdowns for any scanned repository.</p>
                    
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-5">
                        <div className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase mb-1">Security Score</div>
                        <div className="flex items-end justify-between">
                            <div className="text-4xl font-black text-white">88<span className="text-lg text-zinc-500 font-light">/100</span></div>
                            <div className="text-xs font-bold text-green-400 bg-green-500/10 px-2.5 py-1 rounded text-center border border-green-500/20">B — LOW RISK</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-2 mt-auto">
                        <div className="bg-white/5 border border-white/10 rounded-lg p-2 flex flex-col items-center justify-center">
                            <div className="text-xl font-bold text-red-500">0</div>
                            <div className="text-[9px] text-zinc-500 font-bold uppercase mt-1">Critical</div>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-lg p-2 flex flex-col items-center justify-center">
                            <div className="text-xl font-bold text-red-400">0</div>
                            <div className="text-[9px] text-zinc-500 font-bold uppercase mt-1">High</div>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-lg p-2 flex flex-col items-center justify-center">
                            <div className="text-xl font-bold text-yellow-500">2</div>
                            <div className="text-[9px] text-zinc-500 font-bold uppercase mt-1">Med</div>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-lg p-2 flex flex-col items-center justify-center">
                            <div className="text-xl font-bold text-blue-400">3</div>
                            <div className="text-[9px] text-zinc-500 font-bold uppercase mt-1">Low</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full text-zinc-400 text-sm">
                <div>
                    <h4 className="font-bold text-white mb-2 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div> Vulnerability Detection</h4>
                    <p className="text-xs leading-relaxed">Detect SQL injection, command injection, insecure deserialization, and other common security flaws in Python applications.</p>
                </div>
                <div>
                    <h4 className="font-bold text-white mb-2 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-pink-500"></div> Dependency Risk Analysis</h4>
                    <p className="text-xs leading-relaxed">Identify vulnerable dependencies using CVE intelligence from OSV and PyPI vulnerability databases.</p>
                </div>
                <div>
                    <h4 className="font-bold text-white mb-2 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Exploit Path Visualization</h4>
                    <p className="text-xs leading-relaxed">Understand how user input flows through your code and reaches dangerous operations.</p>
                </div>
                <div>
                    <h4 className="font-bold text-white mb-2 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> AI Security Analysis</h4>
                    <p className="text-xs leading-relaxed">AI explains vulnerabilities, prioritizes risks, and provides secure code fixes.</p>
                </div>
            </div>

            <button className="mt-16 bg-[#111] border border-white/10 hover:border-purple-500/50 hover:bg-[#1a1a24] transition-all px-8 py-3 rounded-full text-sm font-semibold">
                View Full Security Analysis
            </button>
        </section>

        {/* EVEN MORE CONTROL STATS SECTION */}
        <section className="w-full pb-32 pt-20 flex flex-col items-center border-t border-white/5 mt-20 relative overflow-hidden">
            <div className="bg-plasma-glow-purple top-[-20%] left-[-20%] opacity-20"></div>
            
            <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto px-6 items-center justify-between gap-16 relative z-10">
                <div className="w-full md:w-1/2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-pink-500/30 bg-pink-500/10 mb-6">
                        <span className="text-[10px] font-bold tracking-widest text-pink-400 uppercase">AI-ASSISTED SECURITY ANALYSIS</span>
                    </div>
                    <h2 className="text-4xl font-bold tracking-tight mb-6">
                        AI that understands your<br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">code and vulnerabilities</span>
                    </h2>
                    <p className="text-zinc-400 mb-10 text-lg font-light max-w-md">
                        SerpentScan uses AI to analyze vulnerability patterns, explain exploit paths, and recommend secure fixes. Combined with AST parsing and taint tracking, it helps developers understand and remediate security issues faster.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-y-8 gap-x-4 mb-8">
                        <div>
                            <div className="text-3xl font-black">1K+</div>
                            <div className="text-xs text-zinc-500 uppercase font-bold tracking-widest">Repositories Scanned</div>
                        </div>
                        <div>
                            <div className="text-3xl font-black">1M+</div>
                            <div className="text-xs text-zinc-500 uppercase font-bold tracking-widest">LoC Analyzed</div>
                        </div>
                        <div>
                            <div className="text-3xl font-black">12K+</div>
                            <div className="text-xs text-zinc-500 uppercase font-bold tracking-widest">Vulnerabilities Detected</div>
                        </div>
                        <div>
                            <div className="text-3xl font-black">5K+</div>
                            <div className="text-xs text-zinc-500 uppercase font-bold tracking-widest">Dependency Checks</div>
                        </div>
                    </div>
                    
                    <p className="text-sm font-semibold text-purple-400 flex items-center gap-2 border-l-2 border-purple-500 pl-3">Powered by AST parsing, taint tracking, and security graph analysis</p>
                </div>
                
                <div className="w-full md:w-1/2 h-[400px] relative">
                    {/* Security Node Tree Graphic */}
                    <div className="absolute top-10 left-0 w-48 bg-[#09090b] border border-white/10 p-3 rounded-lg shadow-2xl z-10">
                        <div className="text-xs font-bold text-white flex items-center gap-2"><div className="w-2 h-2 rounded bg-green-500"></div> Scan Target Repository</div>
                        <div className="text-[9px] text-zinc-500 mt-1">Configure origin repo path targeting</div>
                    </div>

                    <div className="absolute top-48 left-[50px] w-48 bg-[#09090b] border border-white/10 p-3 rounded-lg shadow-2xl z-10">
                        <div className="text-xs font-bold text-white flex items-center gap-2"><div className="w-2 h-2 rounded bg-blue-500"></div> Vulnerability Intelligence</div>
                        <div className="text-[9px] text-zinc-500 mt-1">Extract contextual secrets environments</div>
                    </div>
                    
                    <div className="absolute top-[130px] right-0 w-48 bg-[#09090b] border border-pink-500/50 p-3 rounded-lg shadow-[0_0_20px_rgba(236,72,153,0.2)] z-10">
                        <div className="text-xs font-bold text-white flex items-center gap-2"><div className="w-2 h-2 rounded bg-pink-500"></div> AI Security Analysis Engine</div>
                        <div className="text-[9px] text-zinc-500 mt-1">Runs autonomous traces across paths</div>
                    </div>

                    {/* SVG Splines associating them */}
                    <svg className="absolute inset-0 w-full h-full z-0" pointerEvents="none">
                        <path d="M 190 60 C 250 60, 250 150, 310 150" fill="none" stroke="#3f3f46" strokeWidth="1.5"/>
                        <path d="M 240 210 C 270 210, 270 150, 310 150" fill="none" stroke="#3f3f46" strokeWidth="1.5"/>
                    </svg>
                </div>
            </div>
        </section>

        {/* BOTTOM FEATURES LIST GRID */}
        <section className="w-full max-w-6xl mx-auto px-6 pb-40">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6">Security analysis you can trust</h2>
            <div className="text-lg space-y-6 max-w-xl">
                <p className="text-zinc-400 font-medium leading-relaxed text-left">SerpentScan analyzes public repositories and surfaces vulnerabilities with clear explanations, exploit paths, and actionable remediation guidance.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 border-t border-white/5 pt-12">
                {[
                    { color: "bg-purple-500", title: "Transparent Findings", subtitle: "Understand why vulnerabilities are detected", desc: "Every security finding includes detailed explanations, source code references, and vulnerability classifications such as CWE and OWASP." },
                    { color: "bg-blue-500", title: "Exploit Path Analysis", subtitle: "Trace how vulnerabilities occur", desc: "SerpentScan shows how untrusted inputs flow through your application and reach dangerous operations." },
                    { color: "bg-green-500", title: "Dependency Risk Visibility", subtitle: "See vulnerable dependencies instantly", desc: "Identify outdated or vulnerable packages and understand their real security impact." },
                    { color: "bg-pink-500", title: "Actionable Fix Guidance", subtitle: "Fix vulnerabilities faster", desc: "Each issue includes secure code examples and remediation guidance so developers can resolve vulnerabilities quickly." }
                ].map((f, i) => (
                    <div key={i} className="flex gap-4 items-start group">
                        <div className={`mt-1.5 min-w-[10px] w-2.5 h-2.5 rounded-full ${f.color} shadow-[0_0_8px_${f.color}]`}></div>
                        <div>
                            <h4 className="font-bold text-white mb-1 text-lg">{f.title}</h4>
                            <p className={`text-sm font-semibold mb-2 text-${f.color.split('-')[1]}-400`}>{f.subtitle}</p>
                            <p className="text-zinc-500 text-sm leading-relaxed">{f.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>

      </main>


    </div>
  );
}
