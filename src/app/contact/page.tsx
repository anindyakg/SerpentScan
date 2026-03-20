import { Shield } from "lucide-react";
import Link from "next/link";
import { MobileMenu } from "@/components/MobileMenu";

export default function ContactPage() {
  return (
    <div className="relative flex-1 flex flex-col w-full bg-black text-white overflow-x-hidden selection:bg-purple-500/30">
      
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
        <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-zinc-400">
            <Link href="/" className="hover:text-white transition-colors">Platform</Link>
            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/docs" className="hover:text-white transition-colors">Docs</Link>
            <Link href="/enterprise" className="hover:text-white transition-colors">Enterprise</Link>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <Link href="/contact" className="text-white">Contact</Link>
        </div>
        <div className="flex items-center gap-4">
            <MobileMenu />
            <Link href="/" className="bg-white text-black px-5 py-2 rounded-lg text-sm font-semibold hover:bg-zinc-200 transition-colors">
                Back to App
            </Link>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="relative z-10 w-full max-w-3xl mx-auto px-6 pt-32 pb-32 flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-white mb-6">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Touch</span>
        </h1>
        
        <p className="text-lg text-zinc-400 mb-12 font-light leading-relaxed max-w-xl">
            To get started with our Pro or Enterprise plans, request a custom deployment, or for any other inquiries, please reach out to our team.
        </p>

        <div className="bg-[#0b0c10] border border-white/10 rounded-2xl p-10 flex flex-col items-center w-full max-w-md transform hover:border-purple-500/30 transition-all shadow-[0_0_40px_rgba(147,51,234,0.05)]">
            <a 
              href="mailto:contact@serpentscan.com" 
              className="text-2xl md:text-3xl font-bold text-white hover:text-purple-400 transition-colors tracking-tight mb-4"
            >
                contact@serpentscan.com
            </a>
            <p className="text-zinc-500 text-sm">
                We typically respond within 24 hours.
            </p>
        </div>
      </main>
    </div>
  );
}
