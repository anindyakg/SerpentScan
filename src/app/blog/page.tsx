import { Shield, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const POSTS = [
    {
        title: "Announcing SerpentScan Beta 1.0: The Deep Trace Engine",
        category: "Product Updates",
        date: "March 10, 2026",
        desc: "We completely rebuilt the AST execution environment from the ground up. Over 200% faster traces on Python and JavaScript codebases.",
        img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
        slug: "announcing-serpentscan-beta-1-0",
        featured: true
    },
    {
        title: "How to run local LLM AST Scanners securely",
        category: "Engineering",
        date: "Feb 23, 2026",
        desc: "A deep dive into bypassing cloud-latency and piping AST syntax trees directly into LLaMa 3 running locally on your Macbook M3.",
        img: "https://images.unsplash.com/photo-1620825937374-87fc1d6aaffa?auto=format&fit=crop&q=80&w=800",
        slug: "run-local-llm-ast-scanners-securely"
    },
    {
        title: "Why we migrated from Go back to Rust",
        category: "Engineering",
        date: "Jan 14, 2026",
        desc: "The story of why we rewrote the core SerpentScan routing Daemon to take advantage of strict memory guarantees and zero-cost abstractions.",
        img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
        slug: "why-we-migrated-from-go-back-to-rust"
    },
    {
        title: "Securing your Webhooks with SerpentScan Connectors",
        category: "Tutorial",
        date: "Dec 02, 2025",
        desc: "Learn to build a bulletproof HMAC-signed ingress gateway for your locally orchestrated SerpentScan webhook triggers.",
        img: "https://images.unsplash.com/photo-1563206767-5b18f218e8e1?auto=format&fit=crop&q=80&w=800",
        slug: "securing-webhooks-serpentscan"
    }
];

export default function BlogPage() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden selection:bg-purple-500/30">
      
      {/* PLASMA GLOWS */}
      <div className="bg-plasma-glow-purple top-0 right-0 opacity-20"></div>

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
            <Link href="/blog" className="text-white">Blog</Link>
        </div>
        <div className="flex items-center gap-4">
            <Link href="/" className="bg-white text-black px-5 py-2 rounded-lg text-sm font-semibold hover:bg-zinc-200 transition-colors">
                Back to App
            </Link>
        </div>
      </nav>

      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-16 pb-32">
        
        <div className="mb-16">
            <h1 className="text-5xl font-bold tracking-tighter text-white mb-4">The SerpentScan Blog</h1>
            <p className="text-lg text-zinc-400">Engineering deep-dives, product releases, and tutorials for control freaks.</p>
        </div>

        {/* Featured Post */}
        <Link href={`/blog/${POSTS[0].slug}`} className="w-full bg-[#0b0c10] border border-white/10 rounded-3xl overflow-hidden hover:border-purple-500/30 transition-all cursor-pointer group mb-12 flex flex-col md:flex-row relative z-10 block">
            <div className="w-full md:w-1/2 h-64 md:h-auto overflow-hidden relative">
                <img src={POSTS[0].img} alt="Featured" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] to-transparent md:hidden"></div>
                <div className="absolute inset-0 bg-gradient-to-l from-[#0b0c10] to-transparent hidden md:block"></div>
            </div>
            <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full">{POSTS[0].category}</span>
                    <span className="text-sm font-medium text-zinc-500">{POSTS[0].date}</span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-4 leading-snug">{POSTS[0].title}</h2>
                <p className="text-zinc-400 leading-relaxed mb-6">{POSTS[0].desc}</p>
                <div className="text-sm font-bold text-white flex items-center gap-2 group-hover:text-purple-400 transition-colors">
                    Read Article <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
        </Link>

        {/* Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {POSTS.slice(1).map((post, i) => (
                <Link href={`/blog/${post.slug}`} key={i} className="bg-[#0b0c10] border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition-all cursor-pointer group flex flex-col relative z-10 block">
                    <div className="h-48 w-full overflow-hidden">
                        <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-300">{post.category}</span>
                            <span className="text-xs font-medium text-zinc-600">{post.date}</span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-3 leading-snug">{post.title}</h3>
                        <p className="text-sm text-zinc-400 leading-relaxed mb-6 flex-1 line-clamp-3">{post.desc}</p>
                        <div className="text-xs font-bold text-zinc-300 flex items-center gap-2 group-hover:text-white transition-colors">
                            Read Article <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </Link>
            ))}
        </div>

      </main>
    </div>
  );
}
