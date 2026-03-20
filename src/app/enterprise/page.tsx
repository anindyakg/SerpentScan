import { Shield, Building2, Server, Lock, Globe, Users } from "lucide-react";
import Link from "next/link";
import { MobileMenu } from "@/components/MobileMenu";

export default function EnterprisePage() {
  return (
    <div className="relative flex-1 flex flex-col w-full bg-black text-white overflow-x-hidden selection:bg-purple-500/30">
      
      {/* PLASMA GLOWS */}
      <div className="bg-plasma-glow-purple top-[-5%] left-[-10%] opacity-30"></div>
      <div className="bg-plasma-glow-pink bottom-[10%] right-[-20%] opacity-20"></div>

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
            <Link href="/enterprise" className="text-white">Enterprise</Link>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
        </div>
        <div className="flex items-center gap-4">
            <MobileMenu />
            <Link href="/" className="bg-white text-black px-5 py-2 rounded-lg text-sm font-semibold hover:bg-zinc-200 transition-colors">
                Back to App
            </Link>
        </div>
      </nav>

      <main className="relative z-10 w-full flex flex-col items-center">
        
        {/* HERO SECTION */}
        <section className="w-full max-w-5xl mx-auto px-6 pt-24 pb-20 flex flex-col items-center text-center">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-700 bg-zinc-900 mb-8">
                <Building2 className="w-4 h-4 text-zinc-400" />
                <span className="text-xs font-bold tracking-wide text-zinc-300 uppercase">Trusted by Fortune 500s</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.05] text-white mb-6">
                Enterprise-ready<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">security architecture.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl font-light leading-relaxed">
                Deploy SerpentScan inside your infrastructure and enforce organization-wide security policies with full visibility and control.
            </p>

            <button className="bg-white hover:bg-zinc-200 text-black px-8 py-4 rounded-xl font-bold text-base transition-colors shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                Contact Enterprise Sales
            </button>
        </section>

        {/* FEATURES GRID */}
        <section className="w-full max-w-6xl mx-auto px-6 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                <div className="bg-[#0b0c10] border border-white/5 hover:border-purple-500/30 rounded-2xl p-8 transition-colors">
                    <div className="w-12 h-12 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-6">
                        <Server className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">VPC & On-Prem Deployment</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">
                        Deploy SerpentScan in your own AWS, Azure, or private cloud environment.
                    </p>
                </div>

                <div className="bg-[#0b0c10] border border-white/5 hover:border-purple-500/30 rounded-2xl p-8 transition-colors">
                    <div className="w-12 h-12 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 mb-6">
                        <Lock className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">Enterprise Identity Integration</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">
                        Integrate with enterprise identity providers such as Okta, Azure AD, and Google Workspace.
                    </p>
                </div>

                <div className="bg-[#0b0c10] border border-white/5 hover:border-purple-500/30 rounded-2xl p-8 transition-colors">
                    <div className="w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6">
                        <Globe className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">Enterprise Security Controls</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">
                        Built with encryption, access control, audit logging, and modern security best practices.
                    </p>
                </div>

            </div>
        </section>

        {/* TRUST BANNER */}
        <section className="w-full border-t border-b border-white/5 bg-[#050508] py-16 mt-16 flex flex-col items-center">
            <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-10">Trusted by Engineering Teams At</h3>
            <div className="flex flex-wrap items-center justify-center gap-12 opacity-40 grayscale">
                <span className="text-2xl font-black heading-font">ACME Corp</span>
                <span className="text-2xl font-black heading-font tracking-widest">GLOBEX</span>
                <span className="text-2xl font-black heading-font">SOYUZ</span>
                <span className="text-2xl font-black heading-font tracking-tighter">INERTA</span>
            </div>
        </section>

      </main>
    </div>
  );
}
