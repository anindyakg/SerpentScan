import { Shield, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const POSTS = [
    {
        title: "Top 10 Python security vulnerabilities developers miss",
        category: "Security Guides",
        date: "April 12, 2026",
        desc: "A comprehensive guide to SQL injection, command injection, insecure deserialization, path traversal, and weak crypto in modern Python apps.",
        img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
        slug: "top-10-python-security-vulnerabilities",
        featured: true
    },
    {
        title: "How SQL injection happens in Python (and how to fix it)",
        category: "Vulnerability Deep Dive",
        date: "April 5, 2026",
        desc: "Stop using f-strings for queries. We explain how SQLi occurs in cursor.execute contexts and how parameterized statements prevent it entirely.",
        img: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800",
        slug: "how-sql-injection-happens-in-python"
    },
    {
        title: "Detecting Python vulnerabilities using static analysis",
        category: "SAST Engineering",
        date: "March 28, 2026",
        desc: "Unpack exactly how SerpentScan traces data flow using Abstract Syntax Trees (AST) and taint analysis to identify complex security flaws before deployment.",
        img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
        slug: "detecting-python-vulnerabilities-static-analysis"
    },
    {
        title: "Reducing false positives in security scanners",
        category: "SAST Engineering",
        date: "March 15, 2026",
        desc: "Security fatigue is real. Learn how we utilize advanced call graph generation and semantic reachability bounds to eliminate noisy static analysis alerts.",
        img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
        slug: "reducing-false-positives-security-scanners"
    },
    {
        title: "Scanning Flask for vulnerabilities using SerpentScan",
        category: "Tutorials",
        date: "February 22, 2026",
        desc: "A hands-on walkthrough scanning a deeply vulnerable open-source Flask repository and interpreting the trace path outputs from SerpentScan's engine.",
        img: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=800",
        slug: "scanning-flask-vulnerabilities-serpentscan"
    },
    {
        title: "How to secure Python applications before deployment",
        category: "Best Practices",
        date: "February 10, 2026",
        desc: "Integrating SerpentScan straight into GitHub Actions block risky PRs from ever reaching production. Achieve continuous delivery without compromise.",
        img: "https://images.unsplash.com/photo-1510915228340-29c0fc4fd8f6?auto=format&fit=crop&q=80&w=800",
        slug: "secure-python-applications-before-deployment"
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
