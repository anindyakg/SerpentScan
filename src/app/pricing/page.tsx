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
            Simple pricing for<br/>
            <span className="text-gradient-purple">control freaks.</span>
        </h1>
        
        <p className="text-lg text-zinc-400 mb-20 max-w-2xl font-light leading-relaxed">
            Run local traces forever for free. Scale to the cloud only when you need distributed execution and team collaboration.
        </p>

        {/* PRICING CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl text-left">
            
            {/* Free Tier */}
            <div className="bg-[#0b0c10] border border-white/10 rounded-2xl p-8 flex flex-col hover:border-white/20 transition-all">
                <h3 className="text-2xl font-bold text-white mb-2">Local Hacker</h3>
                <div className="text-sm text-zinc-400 mb-6 h-10">Everything you need to run unlimited traces on your own hardware.</div>
                <div className="text-5xl font-black text-white mb-8">$0<span className="text-lg text-zinc-500 font-normal">/mo forever</span></div>
                
                <button className="w-full bg-[#1a1a24] text-white hover:bg-zinc-800 border border-white/10 py-3 rounded-xl font-bold mb-8 transition-colors">
                    Download CLI
                </button>

                <div className="space-y-4 flex-1">
                    {[
                        "Unlimited local executions",
                        "Unlimited nodes per workflow",
                        "Local SQLite persistence",
                        "Community plugins",
                        "Community Discord support"
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
                    <Zap className="w-3 h-3" /> Most Popular
                </div>

                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-2">Cloud Synced</h3>
                <div className="text-sm text-zinc-400 mb-6 h-10">For professionals who need cloud runners and cross-device sync.</div>
                <div className="text-5xl font-black text-white mb-8">$29<span className="text-lg text-zinc-500 font-normal">/mo per user</span></div>
                
                <button className="w-full bg-white text-black hover:bg-zinc-200 py-3 rounded-xl font-bold mb-8 transition-colors">
                    Start 14-Day Free Trial
                </button>

                <div className="space-y-4 flex-1">
                    {[
                        "Everything in Local Hacker",
                        "Cloud workspace synchronization",
                        "1,000 Cloud executions per month",
                        "Advanced AI Action Triggers",
                        "Secret Management Sandbox",
                        "Priority Email Support"
                    ].map((feature, i) => (
                        <div key={i} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                            <span className="text-sm text-zinc-100 font-medium">{feature}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Enterprise Tier */}
            <div className="bg-[#0b0c10] border border-white/10 rounded-2xl p-8 flex flex-col hover:border-white/20 transition-all">
                <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
                <div className="text-sm text-zinc-400 mb-6 h-10">Dedicated infrastructure and compliance for large organizations.</div>
                <div className="text-5xl font-black text-white mb-8">Custom</div>
                
                <button className="w-full bg-[#1a1a24] text-white hover:bg-zinc-800 border border-white/10 py-3 rounded-xl font-bold mb-8 transition-colors">
                    Contact Sales
                </button>

                <div className="space-y-4 flex-1">
                    {[
                        "Dedicated VPC deployment",
                        "Unlimited Cloud executions",
                        "SAML & SCIM SSO Integration",
                        "Custom node development",
                        "Vulnerability auto-remediation API",
                        "Dedicated Success Manager",
                        "99.99% Uptime SLA"
                    ].map((feature, i) => (
                        <div key={i} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-zinc-500 shrink-0 mt-0.5" />
                            <span className="text-sm text-zinc-300">{feature}</span>
                        </div>
                    ))}
                </div>
            </div>

        </div>

      </main>
    </div>
  );
}
