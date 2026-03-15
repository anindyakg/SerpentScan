"use client";

import { Shield, ChevronRight, Terminal as TerminalIcon, ShieldAlert, Cpu, GitMerge, Search, FileText } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

// The searchable index of our documentation
const SEARCH_INDEX = [
  { id: "introduction", title: "Introduction", section: "Getting Started", description: "What SerpentScan is, what it does, and who it's for." },
  { id: "installation", title: "Installation", section: "Getting Started", description: "Install via pip or from source code." },
  { id: "quickstart", title: "Quickstart", section: "Getting Started", description: "Run a security scan in under 1 minute." },
  { id: "static-analysis", title: "Static Analysis", section: "Core Concepts", description: "AST parsing, pattern detection, and code structure." },
  { id: "taint-tracking", title: "Taint Tracking", section: "Core Concepts", description: "Track data from untrusted sources to dangerous sinks." },
  { id: "dependency-scanning", title: "Dependency Scanning", section: "Core Concepts", description: "Detect vulnerable packages using OSV, PyPI, and CVEs." },
  { id: "vulnerability-detection", title: "Vulnerability Detection", section: "Core Concepts", description: "Injection, deserialization, and misconfigurations." },
  { id: "cli-usage", title: "CLI Usage", section: "Scanning", description: "Commands, formats, and output flags for the CLI." },
  { id: "repository-scanning", title: "Repository Scanning", section: "Scanning", description: "Scan local folders or remote GitHub repositories." },
  { id: "scan-results", title: "Scan Results", section: "Scanning", description: "Severity levels, risk scores, and exploit paths." },
  { id: "ast-rules", title: "AST Rules", section: "Security Rules", description: "Rule engine structure, patterns, and sinks." },
  { id: "custom-rulesets", title: "Custom Rulesets", section: "Security Rules", description: "Write your own detection rules in YAML." },
  { id: "false-positive-handling", title: "False Positive Handling", section: "Security Rules", description: "Ignore comments and suppress findings." }
];

export default function DocsPage() {
  const [activeId, setActiveId] = useState("introduction");
  
  // Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -66% 0px" }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Handle Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
        setIsSearchOpen(true);
      } else if (e.key === 'Escape') {
        setIsSearchOpen(false);
        searchInputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Perform Search
  const searchResults = searchQuery.trim() === "" 
    ? [] 
    : SEARCH_INDEX.filter(item => {
        const query = searchQuery.toLowerCase();
        return item.title.toLowerCase().includes(query) || 
               item.description.toLowerCase().includes(query) ||
               item.section.toLowerCase().includes(query);
      });

  const handleResultClick = (id: string) => {
    setIsSearchOpen(false);
    setSearchQuery("");
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

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
                    <Search className="w-4 h-4 text-zinc-500" />
                </div>
                <input 
                  type="text" 
                  ref={searchInputRef}
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchOpen(true);
                  }}
                  onFocus={() => setIsSearchOpen(true)}
                  placeholder="Search documentation... (Ctrl+K)" 
                  className="bg-[#16161c] border border-white/10 rounded-lg pl-10 pr-4 py-1.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500/50 w-72 transition-all" 
                />
                
                {/* Search Dropdown */}
                {isSearchOpen && (searchQuery.trim() !== "" || searchResults.length > 0) && (
                  <div ref={dropdownRef} className="absolute top-full left-0 right-0 mt-2 bg-[#121217] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 max-h-96 overflow-y-auto">
                    {searchResults.length > 0 ? (
                      <div className="p-2 space-y-1">
                        {searchResults.map((result) => (
                          <div 
                            key={result.id}
                            onClick={() => handleResultClick(result.id)}
                            className="p-3 hover:bg-white/5 rounded-lg cursor-pointer transition-colors flex flex-col gap-1"
                          >
                            <div className="flex items-center gap-2 text-sm font-semibold text-white">
                              <FileText className="w-4 h-4 text-purple-400" />
                              {result.title}
                            </div>
                            <div className="text-xs text-zinc-400 pl-6 line-clamp-1">{result.description}</div>
                            <div className="text-[10px] text-zinc-500 pl-6 uppercase tracking-widest font-bold mt-1">{result.section}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-6 text-center text-sm text-zinc-500">
                        No results found for "{searchQuery}"
                      </div>
                    )}
                  </div>
                )}
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
                          <li><a href="#introduction" className={`px-3 py-1.5 -mx-3 block transition-colors ${activeId === 'introduction' ? 'text-purple-400 bg-purple-500/10 rounded-md' : 'hover:text-white'}`}>Introduction</a></li>
                          <li><a href="#installation" className={`px-3 py-1.5 -mx-3 block transition-colors ${activeId === 'installation' ? 'text-purple-400 bg-purple-500/10 rounded-md' : 'hover:text-white'}`}>Installation</a></li>
                          <li><a href="#quickstart" className={`px-3 py-1.5 -mx-3 block transition-colors ${activeId === 'quickstart' ? 'text-purple-400 bg-purple-500/10 rounded-md' : 'hover:text-white'}`}>Quickstart</a></li>
                      </ul>
                  </div>
                  <div>
                      <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Core Concepts</h4>
                      <ul className="space-y-2 text-sm text-zinc-300 font-medium">
                          <li><a href="#static-analysis" className={`px-3 py-1.5 -mx-3 block transition-colors ${activeId === 'static-analysis' ? 'text-purple-400 bg-purple-500/10 rounded-md' : 'hover:text-white'}`}>Static Analysis</a></li>
                          <li><a href="#taint-tracking" className={`px-3 py-1.5 -mx-3 block transition-colors ${activeId === 'taint-tracking' ? 'text-purple-400 bg-purple-500/10 rounded-md' : 'hover:text-white'}`}>Taint Tracking</a></li>
                          <li><a href="#dependency-scanning" className={`px-3 py-1.5 -mx-3 block transition-colors ${activeId === 'dependency-scanning' ? 'text-purple-400 bg-purple-500/10 rounded-md' : 'hover:text-white'}`}>Dependency Scanning</a></li>
                          <li><a href="#vulnerability-detection" className={`px-3 py-1.5 -mx-3 block transition-colors ${activeId === 'vulnerability-detection' ? 'text-purple-400 bg-purple-500/10 rounded-md' : 'hover:text-white'}`}>Vulnerability Detection</a></li>
                      </ul>
                  </div>
                  <div>
                      <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Scanning</h4>
                      <ul className="space-y-2 text-sm text-zinc-300 font-medium">
                          <li><a href="#cli-usage" className={`px-3 py-1.5 -mx-3 block transition-colors ${activeId === 'cli-usage' ? 'text-purple-400 bg-purple-500/10 rounded-md' : 'hover:text-white'}`}>CLI Usage</a></li>
                          <li><a href="#repository-scanning" className={`px-3 py-1.5 -mx-3 block transition-colors ${activeId === 'repository-scanning' ? 'text-purple-400 bg-purple-500/10 rounded-md' : 'hover:text-white'}`}>Repository Scanning</a></li>
                          <li><a href="#scan-results" className={`px-3 py-1.5 -mx-3 block transition-colors ${activeId === 'scan-results' ? 'text-purple-400 bg-purple-500/10 rounded-md' : 'hover:text-white'}`}>Scan Results</a></li>
                      </ul>
                  </div>
                  <div>
                      <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Security Rules</h4>
                      <ul className="space-y-2 text-sm text-zinc-300 font-medium">
                          <li><a href="#ast-rules" className={`px-3 py-1.5 -mx-3 block transition-colors ${activeId === 'ast-rules' ? 'text-purple-400 bg-purple-500/10 rounded-md' : 'hover:text-white'}`}>AST Rules</a></li>
                          <li><a href="#custom-rulesets" className={`px-3 py-1.5 -mx-3 block transition-colors ${activeId === 'custom-rulesets' ? 'text-purple-400 bg-purple-500/10 rounded-md' : 'hover:text-white'}`}>Custom Rulesets</a></li>
                          <li><a href="#false-positive-handling" className={`px-3 py-1.5 -mx-3 block transition-colors ${activeId === 'false-positive-handling' ? 'text-purple-400 bg-purple-500/10 rounded-md' : 'hover:text-white'}`}>False Positive Handling</a></li>
                      </ul>
                  </div>
              </div>
          </aside>

          {/* MAIN CONTENT AREA */}
          <main className="flex-1 overflow-y-auto scroll-smooth p-8 lg:p-12 relative z-0 hide-scrollbar pb-32">
              
              <div className="max-w-3xl space-y-16">

                  {/* INTRODUCTION */}
                  <section id="introduction" className="space-y-6 scroll-mt-24">
                      <div className="text-sm font-medium text-purple-400 flex items-center gap-2 mb-4">
                          Getting Started <ChevronRight className="w-3 h-3" /> Introduction
                      </div>
                      <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">Introduction</h1>
                      <div className="text-lg text-zinc-400 leading-relaxed font-light space-y-4">
                          <p>
                              These pages help someone go from 0 → first scan.
                          </p>
                          <p>
                              <strong>Purpose:</strong> Explain what SerpentScan is, what it does, who it is for, what problems it solves, and its high-level architecture.
                          </p>
                          <h3 className="text-2xl font-bold text-white mt-8 tracking-tight">What is SerpentScan?</h3>
                          <p>
                              SerpentScan is a static security scanner for Python repositories. It analyzes source code and dependencies to detect vulnerabilities such as SQL injection, command injection, insecure deserialization, and vulnerable packages.
                          </p>
                          <h3 className="text-2xl font-bold text-white mt-8 tracking-tight">Key Capabilities</h3>
                          <ul className="list-disc pl-6 space-y-2 text-zinc-300">
                              <li>AST-based static analysis</li>
                              <li>Taint flow tracking</li>
                              <li>Dependency vulnerabilities detection</li>
                          </ul>
                          <h3 className="text-2xl font-bold text-white mt-8 tracking-tight">Supported Languages and Vulnerabilities</h3>
                          <p>Primary focus on Python.</p>
                      </div>
                  </section>

                  <hr className="border-white/5" />

                  {/* INSTALLATION */}
                  <section id="installation" className="space-y-6 scroll-mt-24">
                      <h2 className="text-3xl font-bold text-white tracking-tight">Installation</h2>
                      <p className="text-zinc-400 leading-relaxed mb-4">
                          Explain how to install the CLI.
                      </p>

                      <h3 className="text-xl font-bold text-white mt-6">Install via pip</h3>
                      <div className="bg-[#0b0c10] border border-white/5 rounded p-4">
                          <code className="text-sm text-pink-400 font-mono">pip install serpentscan</code>
                      </div>

                      <h3 className="text-xl font-bold text-white mt-6">Install from source</h3>
                      <div className="bg-[#0b0c10] border border-white/5 rounded p-4">
<pre className="text-sm text-pink-400 font-mono whitespace-pre overflow-x-auto">
git clone https://github.com/serpentscan/serpentscan
cd serpentscan
pip install -e .
</pre>
                      </div>

                      <h3 className="text-xl font-bold text-white mt-6">Verify installation</h3>
                      <div className="bg-[#0b0c10] border border-white/5 rounded p-4">
                          <code className="text-sm text-pink-400 font-mono">serpentscan --help</code>
                      </div>
                  </section>

                  <hr className="border-white/5" />

                  {/* QUICKSTART */}
                  <section id="quickstart" className="space-y-6 scroll-mt-24">
                      <h2 className="text-3xl font-bold text-white tracking-tight">Quickstart</h2>
                      <p className="text-zinc-400 leading-relaxed mb-4">
                          <strong>Goal:</strong> scan a repository in under 1 minute.
                      </p>

                      <div className="bg-[#0b0c10] border border-white/5 rounded p-4">
                          <code className="text-sm text-pink-400 font-mono">serpentscan scan https://github.com/user/project</code>
                      </div>

                      <h3 className="text-xl font-bold text-white mt-6">What happens internally:</h3>
                      <ul className="list-disc pl-6 space-y-2 text-zinc-300">
                          <li>Repository downloaded</li>
                          <li>Python files parsed</li>
                          <li>Dependencies analyzed</li>
                          <li>Vulnerabilities reported</li>
                      </ul>

                      <h3 className="text-xl font-bold text-white mt-6">Example Output:</h3>
                      <div className="bg-[#0b0c10] border border-red-500/20 rounded p-4">
<pre className="text-sm font-mono whitespace-pre overflow-x-auto text-zinc-300">
<span className="text-red-400 font-bold">CRITICAL: SQL Injection</span>
File: auth.py
Line: 42
</pre>
                      </div>
                  </section>

                  <hr className="border-white/5" />

                  {/* CORE CONCEPTS: Static Analysis */}
                  <section id="static-analysis" className="space-y-6 scroll-mt-24">
                      <div className="text-sm font-medium text-pink-400 flex items-center gap-2 mb-4">
                          Core Concepts <ChevronRight className="w-3 h-3" /> Static Analysis
                      </div>
                      <h2 className="text-3xl font-bold text-white tracking-tight">Static Analysis</h2>
                      <p className="text-zinc-400 leading-relaxed mb-4">
                          These pages explain how the scanner works internally.
                      </p>

                      <h3 className="text-xl font-bold text-white mt-6">Explanation</h3>
                      <ul className="list-disc pl-6 space-y-2 text-zinc-300">
                          <li>AST parsing</li>
                          <li>pattern detection</li>
                          <li>code structure analysis</li>
                      </ul>

                      <p className="text-zinc-400 mt-4">
                          <strong>Example:</strong> SerpentScan parses Python code into an Abstract Syntax Tree (AST) and analyzes function calls, imports, and control flow to detect vulnerable patterns.
                      </p>

                      <div className="bg-[#0b0c10] border border-white/5 rounded p-4 mt-4">
                          <code className="text-sm text-pink-400 font-mono">cursor.execute(f"SELECT * FROM users WHERE id={`{user_id}`}")</code>
                      </div>
                      <p className="text-sm text-zinc-500 italic mt-2">
                          This code is dangerous because it interpolates user input directly into a query, allowing for SQL Injection attacks.
                      </p>
                  </section>

                  <hr className="border-white/5" />

                  {/* CORE CONCEPTS: Taint Tracking */}
                  <section id="taint-tracking" className="space-y-6 scroll-mt-24">
                      <h2 className="text-3xl font-bold text-white tracking-tight">Taint Tracking</h2>
                      <p className="text-zinc-400 leading-relaxed mb-4">
                          Explain the concept: <code className="bg-[#0b0c10] px-1 py-0.5 rounded">source → propagation → sink</code>
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                          <div>
                              <h3 className="text-xl font-bold text-white mb-2">Example Sources:</h3>
                              <ul className="list-disc pl-6 space-y-2 text-zinc-300 font-mono text-sm">
                                  <li>request.args</li>
                                  <li>input()</li>
                                  <li>environment variables</li>
                              </ul>
                          </div>
                          <div>
                              <h3 className="text-xl font-bold text-white mb-2">Example Sinks:</h3>
                              <ul className="list-disc pl-6 space-y-2 text-zinc-300 font-mono text-sm">
                                  <li>eval()</li>
                                  <li>os.system()</li>
                                  <li>cursor.execute()</li>
                              </ul>
                          </div>
                      </div>

                      <p className="text-zinc-400 mt-6">
                          <strong>How SerpentScan detects:</strong> user input → SQL query. The system tracks untrusted variables as they pass through functions, ensuring they do not reach dangerous sinks without prior sanitization.
                      </p>
                  </section>

                  <hr className="border-white/5" />

                  {/* CORE CONCEPTS: Dependency Scanning */}
                  <section id="dependency-scanning" className="space-y-6 scroll-mt-24">
                      <h2 className="text-3xl font-bold text-white tracking-tight">Dependency Scanning</h2>
                      <p className="text-zinc-400 leading-relaxed mb-4">
                          Explain how dependency vulnerabilities are detected.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                              <h3 className="text-xl font-bold text-white mb-2">Example Files Scanned:</h3>
                              <ul className="list-disc pl-6 space-y-2 text-zinc-300 font-mono text-sm">
                                  <li>requirements.txt</li>
                                  <li>poetry.lock</li>
                                  <li>pyproject.toml</li>
                              </ul>
                          </div>
                          <div>
                              <h3 className="text-xl font-bold text-white mb-2">Vulnerability Sources:</h3>
                              <ul className="list-disc pl-6 space-y-2 text-zinc-300 text-sm">
                                  <li>OSV</li>
                                  <li>PyPI advisories</li>
                                  <li>CVE database</li>
                              </ul>
                          </div>
                      </div>

                      <h3 className="text-xl font-bold text-white mt-6">Example Output:</h3>
                      <div className="bg-[#0b0c10] border border-orange-500/20 rounded p-4">
<pre className="text-sm font-mono whitespace-pre overflow-x-auto text-zinc-300">
requests 2.19.0
CVE-2018-18074
<span className="text-orange-400">Severity: HIGH</span>
</pre>
                      </div>
                  </section>

                  <hr className="border-white/5" />

                  {/* CORE CONCEPTS: Vulnerability Detection */}
                  <section id="vulnerability-detection" className="space-y-6 scroll-mt-24">
                      <h2 className="text-3xl font-bold text-white tracking-tight">Vulnerability Detection</h2>
                      <p className="text-zinc-400 leading-relaxed mb-6">
                          List what SerpentScan detects.
                      </p>

                      <div className="space-y-8">
                          <div>
                              <h3 className="text-xl font-bold text-white mb-2">Injection Vulnerabilities</h3>
                              <ul className="list-disc pl-6 space-y-2 text-zinc-300">
                                  <li>SQL injection</li>
                                  <li>command injection</li>
                              </ul>
                          </div>
                          <div>
                              <h3 className="text-xl font-bold text-white mb-2">Deserialization Issues</h3>
                              <ul className="list-disc pl-6 space-y-2 text-zinc-300 font-mono text-sm">
                                  <li>pickle.loads()</li>
                                  <li>yaml.load()</li>
                              </ul>
                          </div>
                          <div>
                              <h3 className="text-xl font-bold text-white mb-2">Security Misconfigurations</h3>
                              <ul className="list-disc pl-6 space-y-2 text-zinc-300">
                                  <li>weak hashing</li>
                                  <li>insecure randomness</li>
                              </ul>
                          </div>
                      </div>
                  </section>

                  <hr className="border-white/5" />

                  {/* SCANNING: CLI Usage */}
                  <section id="cli-usage" className="space-y-6 scroll-mt-24">
                      <div className="text-sm font-medium text-emerald-400 flex items-center gap-2 mb-4">
                          Scanning <ChevronRight className="w-3 h-3" /> CLI Usage
                      </div>
                      <h2 className="text-3xl font-bold text-white tracking-tight">CLI Usage</h2>
                      <p className="text-zinc-400 leading-relaxed mb-4">
                          These pages explain how to use the tool, starting with the Command Line Interface.
                      </p>

                      <div className="bg-[#0b0c10] border border-white/5 rounded p-5">
<pre className="text-sm text-pink-400 font-mono whitespace-pre overflow-x-auto leading-relaxed">
serpentscan scan &lt;repository&gt;
serpentscan scan .
serpentscan scan --format json
serpentscan scan --output report.sarif
</pre>
                      </div>
                      <p className="text-sm text-zinc-500 mt-2">
                          Flags include <code className="bg-[#0b0c10] px-1 py-0.5 rounded">--format</code> for reporting format constraints and <code className="bg-[#0b0c10] px-1 py-0.5 rounded">--output</code> to specify file destination.
                      </p>
                  </section>

                  <hr className="border-white/5" />

                  {/* SCANNING: Repository Scanning */}
                  <section id="repository-scanning" className="space-y-6 scroll-mt-24">
                      <h2 className="text-3xl font-bold text-white tracking-tight">Repository Scanning</h2>
                      <p className="text-zinc-400 leading-relaxed mb-4">
                          Explain supported inputs and how scanning works internally.
                      </p>

                      <div className="space-y-6">
                          <div>
                              <h3 className="font-bold text-white mb-2">Scan local repo</h3>
                              <code className="text-sm text-pink-400 font-mono bg-[#0b0c10] px-2 py-1 rounded">serpentscan scan .</code>
                          </div>
                          <div>
                              <h3 className="font-bold text-white mb-2">Scan GitHub repo</h3>
                              <code className="text-sm text-pink-400 font-mono bg-[#0b0c10] px-2 py-1 rounded">serpentscan scan https://github.com/user/project</code>
                          </div>
                          <div>
                              <h3 className="font-bold text-white mb-2">Scan specific folder</h3>
                              <code className="text-sm text-pink-400 font-mono bg-[#0b0c10] px-2 py-1 rounded">serpentscan scan src/</code>
                          </div>
                      </div>
                  </section>

                  <hr className="border-white/5" />

                  {/* SCANNING: Scan Results */}
                  <section id="scan-results" className="space-y-6 scroll-mt-24">
                      <h2 className="text-3xl font-bold text-white tracking-tight">Scan Results</h2>
                      <p className="text-zinc-400 leading-relaxed mb-4">
                          Explain output format including severity levels, risk score, and exploit path. AI explanations trace the logic in an easily understandable natural language digest.
                      </p>

                      <div className="bg-[#0b0c10] border border-red-500/20 rounded-xl overflow-hidden mt-4 shadow-xl">
                          <div className="px-5 py-4 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre">
                              <span className="text-red-400 font-bold">CRITICAL: SQL Injection</span><br/><br/>
                              <span className="text-zinc-500">File: </span><span className="text-white">auth.py</span><br/>
                              <span className="text-zinc-500">Line: </span><span className="text-white">42</span><br/><br/>
                          </div>
                      </div>
                  </section>

                  <hr className="border-white/5" />

                  {/* SECURITY RULES: AST Rules */}
                  <section id="ast-rules" className="space-y-6 scroll-mt-24">
                      <div className="text-sm font-medium text-orange-400 flex items-center gap-2 mb-4">
                          Security Rules <ChevronRight className="w-3 h-3" /> AST Rules
                      </div>
                      <h2 className="text-3xl font-bold text-white tracking-tight">AST Rules</h2>
                      <p className="text-zinc-400 leading-relaxed mb-4">
                          Explain how detection rules work and the rule engine structure: <code className="bg-[#0b0c10] px-1 py-0.5 rounded">pattern</code>, <code className="bg-[#0b0c10] px-1 py-0.5 rounded">sink</code>, <code className="bg-[#0b0c10] px-1 py-0.5 rounded">severity</code>, <code className="bg-[#0b0c10] px-1 py-0.5 rounded">description</code>.
                      </p>

                      <div className="bg-[#0b0c10] border border-white/5 rounded p-4 font-mono text-sm text-zinc-300">
                          pattern: <span className="text-pink-400">eval(user_input)</span><br/>
                          severity: <span className="text-red-400">critical</span>
                      </div>
                  </section>

                  <hr className="border-white/5" />

                  {/* SECURITY RULES: Custom Rulesets */}
                  <section id="custom-rulesets" className="space-y-6 scroll-mt-24">
                      <h2 className="text-3xl font-bold text-white tracking-tight">Custom Rulesets</h2>
                      <p className="text-zinc-400 leading-relaxed mb-4">
                          Explain how users can define rules and where to place rule files (e.g., <code className="bg-[#0b0c10] px-1 py-0.5 rounded">.serpentscan/rules.yml</code>).
                      </p>

                      <div className="bg-[#0b0c10] border border-white/5 rounded p-5">
<pre className="text-sm font-mono whitespace-pre overflow-x-auto text-zinc-300 leading-relaxed">
<span className="text-blue-400">rule:</span>
  <span className="text-blue-400">id:</span> python-eval-user-input
  <span className="text-blue-400">pattern:</span> eval($VAR)
  <span className="text-blue-400">severity:</span> HIGH
</pre>
                      </div>
                  </section>

                  <hr className="border-white/5" />

                  {/* SECURITY RULES: False Positive Handling */}
                  <section id="false-positive-handling" className="space-y-6 scroll-mt-24">
                      <h2 className="text-3xl font-bold text-white tracking-tight">False Positive Handling</h2>
                      <p className="text-zinc-400 leading-relaxed mb-4">
                          Explain how to suppress findings and best practices for triaging.
                      </p>

                      <div className="space-y-4">
                          <div>
                              <h3 className="font-bold text-white mb-2">Ignore comment</h3>
                              <code className="text-sm text-zinc-500 font-mono bg-[#0b0c10] px-2 py-1 rounded"># serpentscan-ignore</code>
                          </div>
                          <div>
                              <h3 className="font-bold text-white mb-2">Ignore rule via CLI</h3>
                              <code className="text-sm text-pink-400 font-mono bg-[#0b0c10] px-2 py-1 rounded">--ignore-rule python-eval-user-input</code>
                          </div>
                      </div>
                  </section>

              </div>
          </main>
          
          {/* TABLE OF CONTENTS (Right sidebar) */}
          <aside className="w-56 hidden xl:block p-8 pt-12 border-l border-white/5">
              <span className="text-xs font-bold text-white uppercase tracking-widest mb-4 block">On this page</span>
              <ul className="space-y-3 text-xs text-zinc-500 font-medium">
                  <li><a href="#introduction" className={`cursor-pointer block transition-colors ${['introduction', 'installation', 'quickstart'].includes(activeId) ? 'text-purple-400' : 'hover:text-zinc-300'}`}>Getting Started</a></li>
                  <li><a href="#static-analysis" className={`cursor-pointer block transition-colors ${['static-analysis', 'taint-tracking', 'dependency-scanning', 'vulnerability-detection'].includes(activeId) ? 'text-purple-400' : 'hover:text-zinc-300'}`}>Core Concepts</a></li>
                  <li><a href="#cli-usage" className={`cursor-pointer block transition-colors ${['cli-usage', 'repository-scanning', 'scan-results'].includes(activeId) ? 'text-purple-400' : 'hover:text-zinc-300'}`}>Scanning</a></li>
                  <li><a href="#ast-rules" className={`cursor-pointer block transition-colors ${['ast-rules', 'custom-rulesets', 'false-positive-handling'].includes(activeId) ? 'text-purple-400' : 'hover:text-zinc-300'}`}>Security Rules</a></li>
              </ul>
          </aside>
      </div>
    </div>
  );
}
