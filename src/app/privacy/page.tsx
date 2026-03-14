import Link from "next/link";
import { Shield } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-white p-12 lg:p-24 selection:bg-purple-500/30 relative">
        <div className="bg-plasma-glow-purple fixed top-0 left-0 w-full h-[500px] opacity-20 pointer-events-none"></div>

        <nav className="mb-16 relative z-10 flex items-center justify-between">
            <Link href="/" className="inline-flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg shadow-purple-500/20">
                    <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold tracking-tight">SerpentScan</span>
            </Link>
            <div className="text-zinc-500 text-sm font-medium tracking-wide">LEGAL</div>
        </nav>

        <main className="max-w-3xl mx-auto relative z-10">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Privacy Policy</h1>
            <p className="text-zinc-400 mb-12 text-lg">Last Updated: October 24, 2026</p>

            <div className="prose prose-invert prose-zinc max-w-none">
                <p className="text-zinc-300 leading-relaxed mb-6">
                    SerpentScan is committed to protecting your privacy and ensuring you have a secure experience on our website. This Privacy Policy details the data we collect, how it is used, and your rights concerning your personal information.
                </p>

                <h2 className="text-2xl font-bold text-white mt-12 mb-4">1. Information We Collect</h2>
                <p className="text-zinc-400 leading-relaxed mb-6">
                    We collect very limited information necessary to operate our service:
                </p>
                <ul className="list-disc pl-6 text-zinc-400 mb-6 space-y-2 marker:text-purple-500">
                    <li><strong>Authentication Data:</strong> If you sign in using Google, we collect your name, email address, and profile picture provided by the OAuth service.</li>
                    <li><strong>Repository Links:</strong> We temporarily process the public GitHub repository URLs you submit to perform static analysis.</li>
                    <li><strong>Usage Metadata:</strong> We collect non-personally identifiable information such as IP addresses, browser types, and access times for security and analytics purposes.</li>
                </ul>

                <h2 className="text-2xl font-bold text-white mt-12 mb-4">2. Processing of Source Code</h2>
                <p className="text-zinc-400 leading-relaxed mb-6">
                    SerpentScan is designed as a local-first security tool. When utilizing our cloud platform, source code is pulled into an ephemeral execution environment for the duration of the scan. It is analyzed, the reports are generated, and the repository is immediately purged from our active processing servers. <strong>We do not store your source code.</strong>
                </p>

                <h2 className="text-2xl font-bold text-white mt-12 mb-4">3. Data Sharing and Disclosure</h2>
                <p className="text-zinc-400 leading-relaxed mb-6">
                    We do not sell, trade, or rent your personal information to third parties. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners and trusted affiliates.
                </p>

                <h2 className="text-2xl font-bold text-white mt-12 mb-4">4. Your Rights</h2>
                <p className="text-zinc-400 leading-relaxed mb-6">
                    Depending on your jurisdiction (such as under the GDPR or CCPA), you may have the right to request access to the data we have collected about you, request that your data be deleted, or request that we correct any inaccuracies. You can exercise these rights by contacting our associated privacy team.
                </p>

                <h2 className="text-2xl font-bold text-white mt-12 mb-4">5. Contact Us</h2>
                <p className="text-zinc-400 leading-relaxed mb-6">
                    If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us openly via our GitHub repository issues.
                </p>
            </div>
        </main>
    </div>
  );
}
