"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Github, Terminal, CheckCircle2, 
  Activity, Users, Zap, Shield, Play, Lock, LineChart, Code2, Database, Network
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  const { data: session, status } = useSession();
  const [repoUrl, setRepoUrl] = useState("");
  const [scanState, setScanState] = useState<"idle" | "scanning">("idle");
  const [logs, setLogs] = useState<string[]>([]);
  const router = useRouter();

  const MOCK_LOGS = [
    "Initializing SerpentScan Scanner engine Beta 1.0...",
    "Cloning repository locally to /tmp/workspace/job_29x...",
    "Cloning repository contents...",
    "Analyzing AST syntax trees...",
    "Running static taints analysis on external inputs...",
    "Finalizing structural report...",
  ];

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!repoUrl) return;

    setScanState("scanning");
    
    for (let i = 0; i < MOCK_LOGS.length; i++) {
        await new Promise(r => setTimeout(r, 600 + Math.random() * 400));
        setLogs(prev => [...prev, `[INFO] ${MOCK_LOGS[i]}`]);
    }

    router.push(`/report?repo=${encodeURIComponent(repoUrl)}`);
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden selection:bg-purple-500/30">
      
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
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <Link href="/" className="hover:text-white transition-colors">Platform</Link>
            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/docs" className="hover:text-white transition-colors">Docs</Link>
            <Link href="/enterprise" className="hover:text-white transition-colors">Enterprise</Link>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
        </div>
        <div className="flex items-center gap-4">
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
        <section className="w-full max-w-5xl mx-auto px-6 pt-32 pb-32 flex flex-col items-center text-center relative z-20">
            {/* Micro Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 mb-8 backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                <span className="text-xs font-semibold tracking-wide text-purple-300 uppercase">SerpentScan Beta 1.0 — Now Available</span>
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
                        <span className="text-xs font-semibold text-purple-300 tracking-wider">plasma-cli • Running local trace</span>
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
                        <motion.div animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-2 h-4 bg-white/70 mt-2 inline-block"/>
                    </div>
                </div>
            )}
        </section>

        {/* HERO UI MOCK (Node Editor) */}
        <section className="w-full max-w-6xl mx-auto px-6 relative z-10 -mt-10 mb-32 flex justify-center">
            <div className="w-full h-[600px] bg-[#0d0d12] border border-white/10 rounded-2xl shadow-2xl relative overflow-hidden flex">
                {/* Editor Top Bar */}
                <div className="absolute top-0 inset-x-0 h-12 bg-[#121217] border-b border-white/5 flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                    <div className="ml-auto flex items-center gap-2">
                        <div className="h-6 w-32 bg-white/5 rounded border border-white/10"></div>
                        <div className="h-6 w-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded flex items-center justify-center text-[10px] font-bold text-white shadow-lg">Run Flow</div>
                    </div>
                </div>

                {/* Left Sidebar Node Mocks */}
                <div className="w-64 border-r border-white/5 pt-16 p-4 flex flex-col gap-3">
                    <div className="w-full h-8 bg-white/5 rounded flex bg-blue-500/10 border border-blue-500/20 items-center px-3">
                        <span className="text-xs text-blue-400 line-through decoration-blue-500/50">HTTP Request</span>
                    </div>
                    <div className="w-full h-8 bg-white/5 rounded flex bg-green-500/10 border border-green-500/20 items-center px-3">
                        <span className="text-xs text-green-400">Webhook Trigger</span>
                    </div>
                    <div className="w-full h-8 bg-white/5 rounded flex bg-purple-500/10 border border-purple-500/20 items-center px-3">
                        <span className="text-xs text-purple-400">Database Query</span>
                    </div>
                    <div className="w-full h-24 mt-auto rounded border border-white/10 bg-[#1a1a24] p-3 shadow-inner relative overflow-hidden">
                       <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Mini-map</span>
                       <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    </div>
                </div>

                {/* Main Node Canvas Area */}
                <div className="flex-1 relative bg-[#0a0a0c] pt-12 overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    {/* Node 1 */}
                    <div className="absolute top-20 left-20 w-48 bg-[#121217] border border-white/10 rounded-xl p-3 shadow-xl">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-4 h-4 rounded bg-blue-500 flex items-center justify-center">
                                <Code2 className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-xs font-semibold">GitHub Source</span>
                        </div>
                        <div className="h-6 w-full bg-black rounded border border-white/5"></div>
                    </div>
                    {/* Arrow/Line styling */}
                    <div className="absolute top-[120px] left-[260px] w-[100px] border-t-2 border-dashed border-purple-500 shadow-[0_0_10px_#a855f7]"></div>
                    {/* Node 2 */}
                    <div className="absolute top-20 left-[360px] w-56 bg-[#121217] border border-purple-500/50 rounded-xl p-3 shadow-[0_0_30px_rgba(147,51,234,0.1)]">
                         <div className="flex items-center gap-2 mb-2">
                            <div className="w-4 h-4 rounded bg-purple-500 flex items-center justify-center">
                                <Zap className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-xs font-semibold">AI Trace Agent</span>
                        </div>
                        <div className="space-y-2">
                           <div className="h-4 w-full bg-black rounded border border-white/5"></div>
                           <div className="h-4 w-3/4 bg-black rounded border border-white/5"></div>
                        </div>
                    </div>

                    {/* Fake UI Log Panel Overlay on right */}
                    <div className="absolute top-16 bottom-4 right-4 w-72 bg-[#121217] border border-white/10 rounded-xl shadow-2xl flex flex-col overflow-hidden">
                        <div className="h-10 border-b border-white/5 flex items-center px-4">
                           <span className="text-xs font-bold text-zinc-300">Execution Logs (Success)</span>
                        </div>
                        <div className="flex-1 p-3 flex flex-col gap-2 opacity-50 font-mono text-[9px] text-zinc-400">
                           <div>[10:42:01] Fetched repository structure.</div>
                           <div>[10:42:02] Identified 14 security gaps.</div>
                           <div>[10:42:05] Generated SARIF output.</div>
                           <div className="text-yellow-500">[WARN] Unsanitized input found.</div>
                           <div>[10:42:10] Flow executed successfully in 1.4s.</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* ENGINEERED STRICTLY SECTION */}
        <section className="w-full max-w-6xl mx-auto px-6 py-20">
            <div className="flex justify-between items-end mb-12">
                <div>
                    <h2 className="text-4xl font-bold tracking-tight mb-2">Engineered strictly for power users</h2>
                    <p className="text-zinc-500">Plasma is locally-first, infinitely extensible, and operates flawlessly <br/> without the nagging lag of the legacy cloud.</p>
                </div>
                <div className="hidden md:flex items-center gap-2">
                    <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">←</button>
                    <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">→</button>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { title: "Local-first Execution", icon: <Lock className="w-4 h-4" /> },
                    { title: "Zero Dependencies", icon: <CheckCircle2 className="w-4 h-4" /> },
                    { title: "Advanced Scheduling", icon: <Activity className="w-4 h-4" /> },
                    { title: "AI Workflow Tracing", icon: <Zap className="w-4 h-4" /> },
                    { title: "Detailed Execution Logs", icon: <LineChart className="w-4 h-4" /> },
                    { title: "Seamless Custom Nodes", icon: <Code2 className="w-4 h-4" /> },
                ].map((item, idx) => (
                    <div key={idx} className={`bg-[#0b0c10] border border-white/5 rounded-xl p-5 hover:border-purple-500/30 transition-all ${idx < 2 ? 'col-span-2' : 'col-span-1 md:col-span-1'}`}>
                        <div className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center text-purple-400 mb-4">
                            {item.icon}
                        </div>
                        <h3 className="text-sm font-bold text-white mb-2">{item.title}</h3>
                        <p className="text-xs text-zinc-500">Execute strictly in your own network, removing any cloud-based friction or latency constraints.</p>
                    </div>
                ))}
            </div>
        </section>

        {/* PRIVACY FRIENDLY GRAPHS SECTION */}
        <section className="w-full max-w-6xl mx-auto px-6 py-24 flex flex-col items-center">
            
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4">Leave the legacy cloud behind.</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-transparent mb-6"></div>
                <div className="text-lg space-y-4">
                    <p className="text-zinc-500">Traditional iPaaS platforms suffer from unpredictable latencies, opaque routing protocols, and force you to send your data outside of your perimeter.</p>
                    <p className="text-zinc-500">SerpentScan is locally-first, infinitely extensible, and operates flawlessly <br/> without the nagging lag of the legacy cloud.</p>
                </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
                {/* Large Line Graph Mock */}
                <div className="md:col-span-2 bg-[#09090b] border border-white/10 rounded-2xl p-6 relative overflow-hidden shadow-xl hover:border-white/20 transition-all">
                    <h3 className="text-lg font-bold mb-2">See Everything at a Glance</h3>
                    <p className="text-sm text-zinc-500 w-2/3">Track your execution metrics, performance loads, and security hotspots instantly inside your local dashboard.</p>
                    
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
                    </div>
                </div>

                {/* KPI/Sparkline Mock */}
                <div className="md:col-span-1 bg-[#09090b] border border-white/10 rounded-2xl p-6 relative overflow-hidden shadow-xl hover:border-white/20 transition-all">
                    <h3 className="text-lg font-bold mb-2">Build Flows Like You Think</h3>
                    <p className="text-sm text-zinc-500 mb-8">Deploy ultra fast node hierarchies executing in fractions of a second natively on your machine.</p>
                    
                    <div className="text-xs text-zinc-500 font-bold tracking-widest uppercase mb-1">Total nodes</div>
                    <div className="text-5xl font-black text-white flex items-end gap-2 mb-8">
                        3,812 <span className="text-sm text-green-400 font-semibold bg-green-500/10 px-2 py-0.5 rounded">+12.4%</span>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1">
                            <div className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase mb-1">Avg Execution</div>
                            <div className="text-xl font-bold text-white">340<span className="text-rose-500 text-sm">ms</span></div>
                        </div>
                        <div className="flex-1">
                            <div className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase mb-1">Errors</div>
                            <div className="text-xl font-bold text-white">0.012<span className="text-green-500 text-sm">%</span></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full text-zinc-400 text-sm">
                <div>
                    <h4 className="font-bold text-white mb-2 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div> Performance Metrics</h4>
                    <p className="text-xs leading-relaxed">View detailed telemetry logs and performance charts seamlessly via local databases.</p>
                </div>
                <div>
                    <h4 className="font-bold text-white mb-2 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-pink-500"></div> Real-Time Syncing</h4>
                    <p className="text-xs leading-relaxed">Keep your actions safely persisted and cached locally without fear of data loss.</p>
                </div>
                <div>
                    <h4 className="font-bold text-white mb-2 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Fine grained access control</h4>
                    <p className="text-xs leading-relaxed">Control precisely what your nodes can execute directly on your local system.</p>
                </div>
                <div>
                    <h4 className="font-bold text-white mb-2 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> Realtime Webhooks</h4>
                    <p className="text-xs leading-relaxed">Create and manage flow endpoints securely while routing via custom authenticators.</p>
                </div>
            </div>

            <button className="mt-16 bg-[#111] border border-white/10 hover:border-purple-500/50 hover:bg-[#1a1a24] transition-all px-8 py-3 rounded-full text-sm font-semibold">
                All Features
            </button>
        </section>

        {/* EVEN MORE CONTROL STATS SECTION */}
        <section className="w-full pb-32 pt-20 flex flex-col items-center border-t border-white/5 mt-20 relative overflow-hidden">
            <div className="bg-plasma-glow-purple top-[-20%] left-[-20%] opacity-20"></div>
            
            <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto px-6 items-center justify-between gap-16 relative z-10">
                <div className="w-full md:w-1/2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-pink-500/30 bg-pink-500/10 mb-6">
                        <span className="text-[10px] font-bold tracking-widest text-pink-400 uppercase">Automation AI Model Integrated</span>
                    </div>
                    <h2 className="text-4xl font-bold tracking-tight mb-6">
                        Even more control with<br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">AI auto build and trigger</span>
                    </h2>
                    <p className="text-zinc-400 mb-10 text-lg font-light max-w-md">
                        Have one AI fully generate execution workflows, execute them iteratively, and monitor for failures natively, across any node trigger you provide securely.
                    </p>
                    
                    <div className="flex gap-8">
                        <div>
                            <div className="text-3xl font-black">650k+</div>
                            <div className="text-xs text-zinc-500 uppercase font-bold tracking-widest">Users</div>
                        </div>
                        <div>
                            <div className="text-3xl font-black">22.2M+</div>
                            <div className="text-xs text-zinc-500 uppercase font-bold tracking-widest">Executions</div>
                        </div>
                        <div>
                            <div className="text-3xl font-black">4.8M+</div>
                            <div className="text-xs text-zinc-500 uppercase font-bold tracking-widest">Workflows</div>
                        </div>
                    </div>
                </div>
                
                <div className="w-full md:w-1/2 h-[400px] relative">
                    {/* Node Tree Graphic Mocking exactly the reference */}
                    <div className="absolute top-10 left-0 w-48 bg-[#09090b] border border-white/10 p-3 rounded-lg shadow-2xl z-10">
                        <div className="text-xs font-bold text-white flex items-center gap-2"><div className="w-2 h-2 rounded bg-green-500"></div> Source GitHub Code</div>
                        <div className="text-[9px] text-zinc-500 mt-1">Configure origin repo path targeting</div>
                    </div>

                    <div className="absolute top-48 left-[50px] w-48 bg-[#09090b] border border-white/10 p-3 rounded-lg shadow-2xl z-10">
                        <div className="text-xs font-bold text-white flex items-center gap-2"><div className="w-2 h-2 rounded bg-blue-500"></div> Company Information</div>
                        <div className="text-[9px] text-zinc-500 mt-1">Extract contextual secrets environments</div>
                    </div>
                    
                    <div className="absolute top-[130px] right-0 w-48 bg-[#09090b] border border-pink-500/50 p-3 rounded-lg shadow-[0_0_20px_rgba(236,72,153,0.2)] z-10">
                        <div className="text-xs font-bold text-white flex items-center gap-2"><div className="w-2 h-2 rounded bg-pink-500"></div> AI Trace AST Engine</div>
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
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6">Control your privacy.</h2>
            <div className="text-lg space-y-6 max-w-xl">
                <p className="text-zinc-500 leading-relaxed text-left">Enterprise compliance teams block most AI integration and workflow platforms because webhooks expose proprietary internal payloads to third-party endpoints.</p>
                <p className="text-zinc-400 font-medium leading-relaxed text-left">SerpentScan is loaded natively to run complex sequences on local network environments securely, without tracking any sensitive codes.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 border-t border-white/5 pt-12">
                {[
                    { color: "bg-purple-500", title: "Flow Studio", desc: "Build complex hierarchical structures locally and visualize the node tree without boundaries natively." },
                    { color: "bg-blue-500", title: "Code Editor", desc: "Write any custom JavaScript or local Python functions to intercept data inline at any trace juncture immediately." },
                    { color: "bg-green-500", title: "Schedule", desc: "Trigger local tasks conditionally on time triggers recursively using a cron-like sequence completely." },
                    { color: "bg-pink-500", title: "Webhooks", desc: "Create endpoints natively without publishing to public proxies. Fast and latency free routing right here." }
                ].map((f, i) => (
                    <div key={i} className="flex gap-4 items-start group">
                        <div className={`mt-1 w-2.5 h-2.5 rounded-full ${f.color} shadow-[0_0_8px_${f.color}]`}></div>
                        <div>
                            <h4 className="font-bold text-white mb-2">{f.title}</h4>
                            <p className="text-zinc-500 text-sm leading-relaxed">{f.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="w-full border-t border-white/10 bg-[#0A0A0C] relative overflow-hidden">
        <div className="bg-plasma-glow-bottom opacity-50"></div>
        
        <div className="relative z-10 w-full flex flex-col items-center pt-24 pb-12">
            
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-8">Trusted by 10k+ Teams & OSS Companies</p>
            <div className="flex gap-8 opacity-40 grayscale mb-20 text-white">
                <Shield className="w-6 h-6"/>
                <Users className="w-6 h-6"/>
                <Database className="w-6 h-6"/>
                <Network className="w-6 h-6"/>
                <Activity className="w-6 h-6"/>
            </div>

            <div className="mb-12 md:mb-0">
            <div className="flex items-center gap-3 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-gradient-to-br from-purple-500 to-pink-600">
                    <Shield className="w-4 h-4 text-white" />
                </div>
                <span className="text-2xl font-bold tracking-tight text-white">SerpentScan</span>
            </div>
            <p className="text-zinc-500 max-w-xs leading-relaxed">The ultimate automation engine for teams who care about control, performance, and data sovereignty.</p>
        </div>

            <div className="flex gap-4 mb-20">
                <button className="bg-white hover:bg-zinc-200 text-black px-6 py-3 rounded-xl font-bold transition-all text-sm">
                    Try locally
                </button>
                <button className="bg-[#111] border border-white/10 hover:border-purple-500/50 hover:bg-[#1a1a24] text-white px-6 py-3 rounded-xl font-bold transition-all text-sm">
                    View on GitHub
                </button>
            </div>
            
            <div className="w-full max-w-7xl mx-auto px-6 border-t border-white/5 py-8 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-600 font-semibold tracking-wide">
                <p>© 2026 SerpentScan Automation Inc • Local First</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-zinc-300 transition-colors">Twitter</a>
                    <a href="#" className="hover:text-zinc-300 transition-colors">GitHub</a>
                    <a href="#" className="hover:text-zinc-300 transition-colors">Privacy</a>
                    <a href="#" className="hover:text-zinc-300 transition-colors">Terms</a>
                    <a href="#" className="hover:text-zinc-300 transition-colors">Status</a>
                    <a href="#" className="hover:text-zinc-300 transition-colors">Enterprise</a>
                </div>
                <div className="flex gap-3 text-zinc-700 mt-4 md:mt-0">
                    <div>EN</div>
                    <div>FR</div>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
}
