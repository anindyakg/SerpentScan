import Link from "next/link";
import { Shield } from "lucide-react";

export default function TermsPage() {
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
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Terms of Service</h1>
            <p className="text-zinc-400 mb-12 text-lg">Last Updated: October 24, 2026</p>

            <div className="prose prose-invert prose-zinc max-w-none">
                <p className="text-zinc-300 leading-relaxed mb-6">
                    Welcome to SerpentScan. By using our website and services, you agree to comply with and be bound by the following terms and conditions of use. Please review these terms carefully. If you do not agree to these terms, you should not use this site or our services.
                </p>

                <h2 className="text-2xl font-bold text-white mt-12 mb-4">1. Acceptance of Agreement</h2>
                <p className="text-zinc-400 leading-relaxed mb-6">
                    You agree to the terms and conditions outlined in this Terms of Use Agreement with respect to our site. This Agreement constitutes the entire and only agreement between us and you, and supersedes all prior or contemporaneous agreements, representations, warranties and understandings with respect to the site and the subject matter of this Agreement.
                </p>

                <h2 className="text-2xl font-bold text-white mt-12 mb-4">2. Permitted Uses</h2>
                <p className="text-zinc-400 leading-relaxed mb-6">
                    SerpentScan grants you a non-exclusive, non-transferable, revocable license to access and use the Service strictly in accordance with this Agreement. You may use our service to perform static analysis and dependency scanning on Python code repositories that you own or have explicit authorization to scan.
                </p>

                <h2 className="text-2xl font-bold text-white mt-12 mb-4">3. Restrictions</h2>
                <p className="text-zinc-400 leading-relaxed mb-6">
                    You are explicitly prohibited from:
                </p>
                <ul className="list-disc pl-6 text-zinc-400 mb-6 space-y-2 marker:text-purple-500">
                    <li>Using the service for any illegal purpose or in violation of any local, state, national, or international law.</li>
                    <li>Scanning repositories you do not have permission to access.</li>
                    <li>Attempting to probe, scan, or test the vulnerability of the SerpentScan system or network.</li>
                    <li>Attempting to interfere with, compromise the system integrity or security, or decipher any transmissions to or from the servers running the Service.</li>
                </ul>

                <h2 className="text-2xl font-bold text-white mt-12 mb-4">4. Limitation of Liability</h2>
                <p className="text-zinc-400 leading-relaxed mb-6">
                    In no event shall SerpentScan, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.
                </p>
            </div>
        </main>
    </div>
  );
}
