import { Shield, ChevronRight, Terminal as TerminalIcon, ShieldAlert, Cpu, GitMerge } from "lucide-react";
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
                          <li className="hover:text-white px-3 py-1.5 -mx-3 cursor-pointer transition-colors">Quickstart</li>
                      </ul>
                  </div>
                  <div>
                      <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Core Concepts</h4>
                      <ul className="space-y-2 text-sm text-zinc-300 font-medium">
                          <li className="hover:text-white px-3 py-1.5 -mx-3 cursor-pointer transition-colors">Static Analysis</li>
                          <li className="hover:text-white px-3 py-1.5 -mx-3 cursor-pointer transition-colors">Taint Tracking</li>
                          <li className="hover:text-white px-3 py-1.5 -mx-3 cursor-pointer transition-colors">Dependency Scanning</li>
                          <li className="hover:text-white px-3 py-1.5 -mx-3 cursor-pointer transition-colors">Vulnerability Detection</li>
                      </ul>
                  </div>
                  <div>
                      <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Scanning</h4>
                      <ul className="space-y-2 text-sm text-zinc-300 font-medium">
                          <li className="hover:text-white px-3 py-1.5 -mx-3 cursor-pointer transition-colors">CLI Usage</li>
                          <li className="hover:text-white px-3 py-1.5 -mx-3 cursor-pointer transition-colors">Repository Scanning</li>
                          <li className="hover:text-white px-3 py-1.5 -mx-3 cursor-pointer transition-colors">Scan Results</li>
                      </ul>
                  </div>
                  <div>
                      <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Security Rules</h4>
                      <ul className="space-y-2 text-sm text-zinc-300 font-medium">
                          <li className="hover:text-white px-3 py-1.5 -mx-3 cursor-pointer transition-colors">AST Rules</li>
                          <li className="hover:text-white px-3 py-1.5 -mx-3 cursor-pointer transition-colors">Custom Rulesets</li>
                          <li className="hover:text-white px-3 py-1.5 -mx-3 cursor-pointer transition-colors">False Positive Handling</li>
                      </ul>
                  </div>
                  <div>
                      <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Integrations</h4>
                      <ul className="space-y-2 text-sm text-zinc-300 font-medium">
                          <li className="hover:text-white px-3 py-1.5 -mx-3 cursor-pointer transition-colors">GitHub</li>
                          <li className="hover:text-white px-3 py-1.5 -mx-3 cursor-pointer transition-colors">CI/CD Pipelines</li>
                      </ul>
                  </div>
                  <div>
                      <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Output Formats</h4>
                      <ul className="space-y-2 text-sm text-zinc-300 font-medium">
                          <li className="hover:text-white px-3 py-1.5 -mx-3 cursor-pointer transition-colors">SARIF Export</li>
                          <li className="hover:text-white px-3 py-1.5 -mx-3 cursor-pointer transition-colors">JSON Reports</li>
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
                      <div className="text-lg text-zinc-400 leading-relaxed font-light space-y-4">
                          <p>
                              SerpentScan is an open-source security scanner for Python codebases. It analyzes repositories using static analysis, taint tracking, and dependency vulnerability intelligence to detect security issues before they reach production.
                          </p>
                          <p>
                              SerpentScan combines multiple analysis techniques:
                          </p>
                          <ul className="list-disc pl-6 space-y-2 text-zinc-300">
                              <li>AST-based static analysis</li>
                              <li>Taint flow tracking</li>
                              <li>Dependency CVE detection</li>
                              <li>Exploit path tracing</li>
                              <li>AI-assisted vulnerability explanation</li>
                          </ul>
                          <p>
                              It is designed for developers, security engineers, and DevSecOps teams who want to identify and fix vulnerabilities early in the development lifecycle.
                          </p>
                      </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                      <div className="bg-[#121217] border border-white/10 rounded-xl p-5 hover:border-purple-500/30 transition-colors cursor-pointer group flex flex-col h-full">
                          <TerminalIcon className="w-6 h-6 text-purple-400 mb-3 group-hover:scale-110 transition-transform" />
                          <h3 className="font-bold text-white mb-2">Quickstart via CLI</h3>
                          <p className="text-sm text-zinc-400 mb-4 flex-grow">Run a security scan on a Python repository in minutes.</p>
                          <div className="bg-[#0b0c10] border border-white/5 rounded p-3 mt-auto">
                              <code className="text-xs text-pink-400 font-mono break-all">serpentscan scan https://github.com/user/repo</code>
                          </div>
                      </div>
                      <div className="bg-[#121217] border border-white/10 rounded-xl p-5 hover:border-pink-500/30 transition-colors cursor-pointer group flex flex-col h-full">
                          <ShieldAlert className="w-6 h-6 text-pink-400 mb-3 group-hover:scale-110 transition-transform" />
                          <h3 className="font-bold text-white mb-2">Security Scanning Guide</h3>
                          <p className="text-sm text-zinc-400">Learn how SerpentScan detects vulnerabilities including:</p>
                          <ul className="list-disc pl-4 mt-2 text-xs text-zinc-500 space-y-1">
                              <li>SQL injection</li>
                              <li>Command injection</li>
                              <li>Insecure deserialization</li>
                              <li>Weak cryptography</li>
                              <li>Vulnerable dependencies</li>
                          </ul>
                      </div>
                  </div>

                  <hr className="border-white/5" />

                  <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-white tracking-tight">Why SerpentScan?</h2>
                      <div className="text-zinc-400 leading-relaxed space-y-4">
                          <p>
                              Modern Python applications rely on complex dependencies and dynamic code execution patterns that make security vulnerabilities difficult to detect manually.
                          </p>
                          <p>
                              SerpentScan helps developers identify these issues automatically by analyzing the structure and behavior of the codebase.
                          </p>
                          <p>Key capabilities include:</p>
                          <ul className="list-disc pl-6 space-y-2 text-zinc-300">
                              <li>Static analysis of Python AST</li>
                              <li>Tracking untrusted input through code paths</li>
                              <li>Detecting vulnerable dependencies</li>
                              <li>Identifying real exploit paths</li>
                              <li>Providing remediation guidance</li>
                          </ul>
                          <p>
                              This enables teams to detect and fix security issues early in the development lifecycle.
                          </p>
                      </div>
                  </div>

                  <hr className="border-white/5" />

                  <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-white tracking-tight">How SerpentScan Works</h2>
                      <p className="text-zinc-400 leading-relaxed mb-6">
                          SerpentScan analyzes Python code in several stages:
                      </p>
                      
                      <div className="space-y-6">
                          <div className="flex gap-4">
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-sm">1</div>
                              <div>
                                  <h4 className="font-bold text-white mb-1">Repository Parsing</h4>
                                  <p className="text-sm text-zinc-400">Source files and dependency manifests are discovered.</p>
                              </div>
                          </div>
                          <div className="flex gap-4">
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-sm">2</div>
                              <div>
                                  <h4 className="font-bold text-white mb-1">AST Analysis</h4>
                                  <p className="text-sm text-zinc-400">Python files are parsed into abstract syntax trees.</p>
                              </div>
                          </div>
                          <div className="flex gap-4">
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-sm">3</div>
                              <div>
                                  <h4 className="font-bold text-white mb-1">Taint Tracking</h4>
                                  <p className="text-sm text-zinc-400">Data flows from untrusted sources are traced through the code.</p>
                              </div>
                          </div>
                          <div className="flex gap-4">
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-sm">4</div>
                              <div>
                                  <h4 className="font-bold text-white mb-1">Dependency Scanning</h4>
                                  <p className="text-sm text-zinc-400">Python dependencies are checked against vulnerability databases.</p>
                              </div>
                          </div>
                          <div className="flex gap-4">
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center font-bold text-sm">5</div>
                              <div>
                                  <h4 className="font-bold text-white mb-1">Finding Generation</h4>
                                  <p className="text-sm text-zinc-400">Vulnerabilities are reported with exploit paths and remediation guidance.</p>
                              </div>
                          </div>
                      </div>
                  </div>

                  <hr className="border-white/5" />

                  <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-white tracking-tight">Example Output</h2>
                      <p className="text-zinc-400 leading-relaxed mb-4">
                          SerpentScan provides clear, actionable terminal output highlighting exactly where the vulnerability exists and how to fix it:
                      </p>
                      
                      <div className="bg-[#0b0c10] border border-red-500/20 rounded-xl overflow-hidden mt-4 shadow-xl">
                          <div className="px-5 py-4 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre">
                              <span className="text-red-400 font-bold">CRITICAL: SQL Injection</span><br/><br/>
                              <span className="text-zinc-500">File: </span><span className="text-white">app/auth.py</span><br/>
                              <span className="text-zinc-500">Line: </span><span className="text-white">42</span><br/><br/>
                              <span className="text-zinc-300">User input reaches database query without parameterization.</span><br/><br/>
                              <span className="text-green-400 font-bold">Fix:</span><br/>
                              <span className="text-white">Use parameterized queries with placeholders.</span>
                          </div>
                      </div>
                  </div>

                  <hr className="border-white/5" />

                  <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-white tracking-tight">Supported Vulnerabilities</h2>
                      <p className="text-zinc-400 leading-relaxed mb-4">
                          Out of the box, SerpentScan's AST engine and AI rulesets detect a comprehensive suite of security issues:
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {["SQL Injection", "Command Injection", "Insecure Deserialization", "Path Traversal", "Weak Cryptography", "Hardcoded Secrets", "Vulnerable Dependencies"].map((vuln, i) => (
                              <div key={i} className="bg-zinc-900/50 border border-white/5 rounded-lg px-4 py-3 flex items-center gap-2">
                                  <ShieldAlert className="w-4 h-4 text-purple-400 shrink-0" />
                                  <span className="text-sm text-zinc-200">{vuln}</span>
                              </div>
                          ))}
                      </div>
                  </div>

                  <hr className="border-white/5" />

                  <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                          <GitMerge className="w-6 h-6 text-purple-400" />
                          CI/CD Integration
                      </h2>
                      <p className="text-zinc-400 leading-relaxed mb-4">
                          Block vulnerable code at the pull request level by integrating SerpentScan into your automated pipelines.
                      </p>
                      
                      <div className="bg-[#0b0c10] border border-white/10 rounded-xl overflow-hidden shadow-xl">
                          <div className="flex items-center px-4 py-2 border-b border-white/5 bg-[#121217]">
                              <span className="text-xs text-zinc-300 font-mono">GitHub Actions</span>
                          </div>
                          <div className="p-5 font-mono text-sm text-white overflow-x-auto whitespace-pre">
                              <span className="text-zinc-400">- name: </span><span className="text-white">Run SerpentScan</span><br/>
                              <span className="text-zinc-400">  run: </span><span className="text-pink-400">serpentscan scan .</span>
                          </div>
                      </div>
                  </div>

              </div>
          </main>
          
          {/* TABLE OF CONTENTS (Right sidebar) */}
          <aside className="w-56 hidden xl:block p-8 pt-12 border-l border-white/5">
              <span className="text-xs font-bold text-white uppercase tracking-widest mb-4 block">On this page</span>
              <ul className="space-y-3 text-xs text-zinc-500 font-medium">
                  <li className="text-purple-400 cursor-pointer">Introduction</li>
                  <li className="hover:text-zinc-300 cursor-pointer">Why SerpentScan?</li>
                  <li className="hover:text-zinc-300 cursor-pointer">How It Works</li>
                  <li className="hover:text-zinc-300 cursor-pointer">Example Output</li>
                  <li className="hover:text-zinc-300 cursor-pointer">Supported Vulnerabilities</li>
                  <li className="hover:text-zinc-300 cursor-pointer">CI/CD Integration</li>
              </ul>
          </aside>
      </div>
    </div>
  );
}
