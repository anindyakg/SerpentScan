import { Shield, Check, Zap } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden selection:bg-purple-500/30">
      
      {/* PLASMA GLOWS */}
      <div className="bg-plasma-glow-purple top-[-10%] opacity-40"></div>
      <div className="bg-plasma-glow-pink left-[80%] opacity-30"></div>

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
            <Link href="/pricing" className="text-white">Pricing</Link>
            <Link href="/docs" className="hover:text-white transition-colors">Docs</Link>
            <Link href="/enterprise" className="hover:text-white transition-colors">Enterprise</Link>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
        </div>
        <div className="flex items-center gap-4">
            <Link href="/" className="bg-white text-black px-5 py-2 rounded-lg text-sm font-semibold hover:bg-zinc-200 transition-colors">
                Back to App
            </Link>
        </div>
      </nav>

      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-32 pb-32 flex flex-col items-center text-center">
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.05] text-white mb-6">
            Security scanning for<br/>
            <span className="text-gradient-purple">every stage of development.</span>
        </h1>
        
        <p className="text-lg text-zinc-400 mb-6 max-w-2xl font-light leading-relaxed">
            Core vulnerability detection is open and transparent.<br/>
            AI is used only to explain and prioritize findings.
        </p>
        
        <p className="text-sm text-zinc-500 mb-20 max-w-3xl leading-relaxed mx-auto italic">
            * AI enrichment analyzes scan results and provides vulnerability explanations, exploit path insights, and remediation guidance. Core vulnerability detection does not rely on AI.
        </p>

        {/* PRICING CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl text-left mb-32">
            
            {/* Community Tier */}
            <div className="bg-[#0b0c10] border border-white/10 rounded-2xl p-8 flex flex-col hover:border-white/20 transition-all">
                <h3 className="text-2xl font-bold text-white mb-2">Community</h3>
                <div className="text-sm text-zinc-400 mb-6 h-10">For individual developers and open source projects.</div>
                <div className="text-5xl font-black text-white mb-8">$0</div>
                
                <button className="w-full bg-[#1a1a24] text-white hover:bg-zinc-800 border border-white/10 py-3 rounded-xl font-bold mb-8 transition-colors">
                    Download CLI
                </button>

                <div className="space-y-4 flex-1">
                    {[
                        "AST static analysis",
                        "Taint tracking",
                        "Dependency CVE detection",
                        "CLI scanning",
                        "SARIF export",
                        "Scan public GitHub repos"
                    ].map((feature, i) => (
                        <div key={i} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-zinc-500 shrink-0 mt-0.5" />
                            <span className="text-sm text-zinc-300">{feature}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pro Tier (Highlighted) */}
            <div className="bg-[#0b0c10] border border-purple-500/50 rounded-2xl p-8 flex flex-col relative shadow-[0_0_40px_rgba(147,51,234,0.15)] transform md:-translate-y-4">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-lg flex items-center gap-1">
                    <Zap className="w-3 h-3" /> AI Security Insights
                </div>

                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-2">Pro</h3>
                <div className="text-sm text-zinc-400 mb-6 h-10">Security scanning with AI-powered vulnerability insights.</div>
                <div className="text-5xl font-black text-white mb-8">$29<span className="text-lg text-zinc-500 font-normal">/mo per user</span></div>
                
                <button className="w-full bg-white text-black hover:bg-zinc-200 py-3 rounded-xl font-bold mb-8 transition-colors">
                    Start 14-Day Free Trial
                </button>

                <div className="space-y-4 flex-1">
                    <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                        <span className="text-sm text-zinc-100 font-bold">Everything in Community plus</span>
                    </div>
                    {[
                        "AI vulnerability explanations",
                        "Remediation suggestions",
                        "Exploit path analysis",
                        "Security report summaries",
                        "CI/CD integration",
                        "GitHub integration",
                        "Team dashboards"
                    ].map((feature, i) => (
                        <div key={i} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                            <span className="text-sm text-zinc-100 font-medium">{feature}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Enterprise Tier */}
            <div className="bg-[#0b0c10] border border-white/10 rounded-2xl p-8 flex flex-col hover:border-white/20 transition-all border-l-4 border-l-blue-500">
                <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
                <div className="text-sm text-zinc-400 mb-6 h-10">Dedicated deployment and compliance for large organizations.</div>
                <div className="text-5xl font-black text-white mb-8">Custom</div>
                
                <button className="w-full bg-blue-600 text-white hover:bg-blue-700 py-3 rounded-xl font-bold mb-8 transition-colors shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                    Contact Sales
                </button>

                <div className="space-y-4 flex-1">
                    <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                        <span className="text-sm text-zinc-100 font-bold">Everything in Pro plus</span>
                    </div>
                    {[
                        "Private deployment",
                        "Custom rule packs",
                        "Compliance reporting",
                        "SSO",
                        "Organization-wide scans",
                        "Vulnerability trend analytics",
                        "API access",
                        "Enterprise support"
                    ].map((feature, i) => (
                        <div key={i} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-zinc-500 shrink-0 mt-0.5" />
                            <span className="text-sm text-zinc-300">{feature}</span>
                        </div>
                    ))}
                </div>
            </div>

        </div>

        {/* FEATURE COMPARISON TABLE */}
        <div className="w-full max-w-5xl mx-auto flex flex-col pt-16 border-t border-white/10">
            <h2 className="text-3xl font-bold text-white mb-10">Compare Plans</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/10 relative">
                            <th className="py-4 px-6 text-zinc-400 font-medium text-lg w-1/3">Feature</th>
                            <th className="py-4 px-6 text-white font-bold text-lg text-center w-1/5">Community</th>
                            <th className="py-4 px-6 text-purple-400 font-bold text-lg text-center w-1/5">Pro</th>
                            <th className="py-4 px-6 text-blue-400 font-bold text-lg text-center w-1/5">Enterprise</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="py-4 px-6 text-zinc-300">Static analysis</td>
                            <td className="py-4 px-6 text-center text-zinc-500"><Check className="w-5 h-5 mx-auto text-zinc-300" /></td>
                            <td className="py-4 px-6 text-center text-zinc-500"><Check className="w-5 h-5 mx-auto text-purple-400" /></td>
                            <td className="py-4 px-6 text-center text-zinc-500"><Check className="w-5 h-5 mx-auto text-blue-400" /></td>
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="py-4 px-6 text-zinc-300">Taint tracking</td>
                            <td className="py-4 px-6 text-center text-zinc-500"><Check className="w-5 h-5 mx-auto text-zinc-300" /></td>
                            <td className="py-4 px-6 text-center text-zinc-500"><Check className="w-5 h-5 mx-auto text-purple-400" /></td>
                            <td className="py-4 px-6 text-center text-zinc-500"><Check className="w-5 h-5 mx-auto text-blue-400" /></td>
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="py-4 px-6 text-zinc-300">Dependency scanning</td>
                            <td className="py-4 px-6 text-center text-zinc-500"><Check className="w-5 h-5 mx-auto text-zinc-300" /></td>
                            <td className="py-4 px-6 text-center text-zinc-500"><Check className="w-5 h-5 mx-auto text-purple-400" /></td>
                            <td className="py-4 px-6 text-center text-zinc-500"><Check className="w-5 h-5 mx-auto text-blue-400" /></td>
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="py-4 px-6 text-zinc-300 font-medium">AI vulnerability explanation</td>
                            <td className="py-4 px-6 text-center text-zinc-600">—</td>
                            <td className="py-4 px-6 text-center text-zinc-500"><Check className="w-5 h-5 mx-auto text-purple-400" /></td>
                            <td className="py-4 px-6 text-center text-zinc-500"><Check className="w-5 h-5 mx-auto text-blue-400" /></td>
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="py-4 px-6 text-zinc-300">CI/CD integration</td>
                            <td className="py-4 px-6 text-center text-zinc-600">—</td>
                            <td className="py-4 px-6 text-center text-zinc-500"><Check className="w-5 h-5 mx-auto text-purple-400" /></td>
                            <td className="py-4 px-6 text-center text-zinc-500"><Check className="w-5 h-5 mx-auto text-blue-400" /></td>
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="py-4 px-6 text-zinc-300">Private deployment</td>
                            <td className="py-4 px-6 text-center text-zinc-600">—</td>
                            <td className="py-4 px-6 text-center text-zinc-600">—</td>
                            <td className="py-4 px-6 text-center text-zinc-500"><Check className="w-5 h-5 mx-auto text-blue-400" /></td>
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="py-4 px-6 text-zinc-300">SSO & Compliance Reporting</td>
                            <td className="py-4 px-6 text-center text-zinc-600">—</td>
                            <td className="py-4 px-6 text-center text-zinc-600">—</td>
                            <td className="py-4 px-6 text-center text-zinc-500"><Check className="w-5 h-5 mx-auto text-blue-400" /></td>
                        </tr>
                        <tr className="hover:bg-white/5 transition-colors">
                            <td className="py-4 px-6 text-zinc-300">Custom rulesets</td>
                            <td className="py-4 px-6 text-center text-zinc-600">—</td>
                            <td className="py-4 px-6 text-center text-zinc-600">—</td>
                            <td className="py-4 px-6 text-center text-zinc-500"><Check className="w-5 h-5 mx-auto text-blue-400" /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

      </main>
    </div>
  );
}
