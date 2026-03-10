import { Shield, ChevronRight, FileCode, Terminal as TerminalIcon, ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function DocsPage() {
  return (
    <div className="relative min-h-screen bg-[#0A0A0C] text-white overflow-hidden selection:bg-purple-500/30">
      
      {/* HEADER */}
      <nav className="relative z-50 w-full px-6 py-4 flex flex-row items-center justify-between border-b border-white/5 bg-[#0d0d12]/80 backdrop-blur-md sticky top-0">
        <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded bg-gradient-to-br from-purple-500 to-pink-600">
                    <Shield className="w-3 h-3 text-white" />
                </div>
                <span className="text-lg font-bold tracking-tight text-white">SerpentScan Docs</span>
            </Link>
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
                <Link href="/" className="hover:text-white transition-colors">Platform</Link>
                <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
                <Link href="/docs" className="text-white font-bold">Documentation</Link>
                <Link href="/enterprise" className="hover:text-white transition-colors">Enterprise</Link>
                <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            </div>
        </div>
        
        <div className="flex items-center gap-4">
            <div className="hidden md:flex relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input type="text" placeholder="Search documentation... (Ctrl+K)" className="bg-[#16161c] border border-white/10 rounded-lg pl-10 pr-4 py-1.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500/50 w-64 transition-all" />
            </div>
            <Link href="/" className="bg-white text-black px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-zinc-200 transition-colors">
                Back to App
            </Link>
        </div>
      </nav>

      <div className="flex max-w-[1600px] w-full mx-auto relative h-[calc(100vh-65px)]">
          {/* SIDEBAR */}
          <aside className="w-64 border-r border-white/5 overflow-y-auto hide-scrollbar hidden lg:block bg-[#0A0A0C] z-10 shrink-0">
              <div className="p-6 space-y-8">
                  <div>
                      <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Getting Started</h4>
                      <ul className="space-y-2 text-sm text-zinc-300 font-medium">
                          <li className="text-purple-400 bg-purple-500/10 px-3 py-1.5 rounded-md -mx-3 cursor-pointer">Introduction</li>
                          <li className="hover:text-white px-3 py-1.5 -mx-3 cursor-pointer transition-colors">Installation</li>
                          <li className="hover:text-white px-3 py-1.5 -mx-3 cursor-pointer transition-colors">Quickstart Guide</li>
                          <li className="hover:text-white px-3 py-1.5 -mx-3 cursor-pointer transition-colors">CLI Reference</li>
                      </ul>
                  </div>
                  <div>
                      <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Core Concepts</h4>
                      <ul className="space-y-2 text-sm text-zinc-300 font-medium">
                          <li className="hover:text-white px-3 py-1.5 -mx-3 cursor-pointer transition-colors">Nodes & Executions</li>
                          <li className="hover:text-white px-3 py-1.5 -mx-3 cursor-pointer transition-colors">Triggers (Webhooks)</li>
                          <li className="hover:text-white px-3 py-1.5 -mx-3 cursor-pointer transition-colors">Data Contexts</li>
                          <li className="hover:text-white px-3 py-1.5 -mx-3 cursor-pointer transition-colors">State Management</li>
                      </ul>
                  </div>
                  <div>
                      <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Security Extensions</h4>
                      <ul className="space-y-2 text-sm text-zinc-300 font-medium">
                          <li className="flex items-center justify-between hover:text-white px-3 py-1.5 -mx-3 cursor-pointer transition-colors">AST Analyzers <span className="bg-white/10 text-[10px] px-1.5 py-0.5 rounded">New</span></li>
                          <li className="hover:text-white px-3 py-1.5 -mx-3 cursor-pointer transition-colors">Custom AI Rulesets</li>
                          <li className="hover:text-white px-3 py-1.5 -mx-3 cursor-pointer transition-colors">SARIF Exporters</li>
                      </ul>
                  </div>
              </div>
          </aside>

          {/* MAIN CONTENT AREA */}
          <main className="flex-1 overflow-y-auto p-8 lg:p-12 relative z-0 hide-scrollbar pb-32">
              
              <div className="max-w-3xl space-y-10">
                  <div className="text-sm font-medium text-purple-400 flex items-center gap-2 mb-4">
                      Getting Started <ChevronRight className="w-3 h-3" /> Introduction
                  </div>

                  <div>
                      <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">Introduction to SerpentScan</h1>
                      <p className="text-lg text-zinc-400 leading-relaxed font-light">
                          Welcome to the official documentation for SerpentScan. SerpentScan is a local-first, extremely lightweight automation node engine designed explicitly for developers and security engineers who demand absolute control over execution logic and data privacy.
                      </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                      <div className="bg-[#121217] border border-white/10 rounded-xl p-5 hover:border-purple-500/30 transition-colors cursor-pointer group">
                          <TerminalIcon className="w-6 h-6 text-purple-400 mb-3 group-hover:scale-110 transition-transform" />
                          <h3 className="font-bold text-white mb-1">Quickstart via CLI</h3>
                          <p className="text-sm text-zinc-500">Get your local node engine running in under 2 minutes.</p>
                      </div>
                      <div className="bg-[#121217] border border-white/10 rounded-xl p-5 hover:border-pink-500/30 transition-colors cursor-pointer group">
                          <ShieldAlert className="w-6 h-6 text-pink-400 mb-3 group-hover:scale-110 transition-transform" />
                          <h3 className="font-bold text-white mb-1">Security Scanning Guide</h3>
                          <p className="text-sm text-zinc-500">Learn how to wire the AI Trace Agent to your local repos.</p>
                      </div>
                  </div>

                  <hr className="border-white/5" />

                  <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-white tracking-tight">Why SerpentScan?</h2>
                      <p className="text-zinc-400 leading-relaxed">
                          Traditional iPaaS (Integration Platform as a Service) providers like Zapier or Make force your sensitive data and source code to leave your perimeters, causing compliance nightmares for Enterprise security teams.
                      </p>
                      <p className="text-zinc-400 leading-relaxed">
                          SerpentScan reverses this paradigm. The engine, the UI, and the execution trace runners exist entirely on your hardware as a compressed binary, orchestrating workflows exactly where the code natively lives.
                      </p>
                      
                      <div className="bg-[#121217] border border-purple-500/20 shadow-[0_0_20px_rgba(147,51,234,0.05)] rounded-xl p-6 mt-6 border-l-4 border-l-purple-500">
                          <h4 className="font-bold text-white mb-2 pb-1">Note for Cloud Users</h4>
                          <p className="text-sm text-zinc-400 leading-relaxed">
                              If you are using SerpentScan Cloud Sync (Pro Tier), your node configuration trees are synced to our servers, but the actual data payloads passing through the HTTP requests remain strictly processed locally inside your execution sandbox.
                          </p>
                      </div>
                  </div>

                  <hr className="border-white/5" />

                  <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-white tracking-tight">Installation</h2>
                      <p className="text-zinc-400 leading-relaxed">
                          The easiest way to install SerpentScan is using Node Package Manager (NPM). We recommend installing it globally if you plan to orchestrate cross-project workflows.
                      </p>
                      
                      {/* Terminal Code Block Mockup */}
                      <div className="bg-[#0b0c10] border border-white/10 rounded-xl overflow-hidden mt-4 shadow-xl">
                          <div className="flex items-center px-4 py-2 border-b border-white/5 bg-[#121217] gap-2">
                              <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                              <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                              <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                              <span className="ml-auto text-xs text-zinc-500 font-mono">bash</span>
                          </div>
                          <div className="p-5 font-mono text-sm text-white overflow-x-auto whitespace-pre">
                              <span className="text-pink-400">npm</span> install -g serpentscan-engine <span className="text-zinc-500"># Install the CLI</span><br/><br/>
                              <span className="text-pink-400">serpentscan</span> init                 <span className="text-zinc-500"># Scaffold the .serpentscan workspace config</span><br/>
                              <span className="text-pink-400">serpentscan</span> start                <span className="text-zinc-500"># Boot the local GUI</span>
                          </div>
                      </div>
                  </div>
              </div>
          </main>
          
          {/* FAKE TABLE OF CONTENTS (Right sidebar) */}
          <aside className="w-56 hidden xl:block p-8 pt-12 border-l border-white/5">
              <span className="text-xs font-bold text-white uppercase tracking-widest mb-4 block">On this page</span>
              <ul className="space-y-3 text-xs text-zinc-500 font-medium">
                  <li className="text-purple-400 cursor-pointer">Introduction</li>
                  <li className="hover:text-zinc-300 cursor-pointer">Why SerpentScan?</li>
                  <li className="hover:text-zinc-300 cursor-pointer">Installation</li>
                  <li className="hover:text-zinc-300 cursor-pointer">Next Steps</li>
              </ul>
          </aside>
      </div>
    </div>
  );
}
