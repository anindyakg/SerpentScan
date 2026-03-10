"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Shield, Lightbulb, Download } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";

type Finding = {
  id: string;
  source: string;
  title: string;
  description: string;
  severity: string;
  category: string;
  cwe: string;
  owasp: string;
  file: string;
  lineno: number;
  code_snippet: string;
  fix_suggestion: string;
};

type ScanResponse = {
  repo_url: string;
  repo_name: string;
  files_scanned: number;
  lines_scanned: number;
  scan_duration_s: number;
  findings: Finding[];
};

function ReportContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { status } = useSession();
  const repo = searchParams?.get("repo");
  const [data, setData] = useState<ScanResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  useEffect(() => {
    if (!repo) return;

    fetch("http://localhost:8000/api/scan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ repo_url: repo }),
    })
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [repo]);

  if (status === "loading" || status === "unauthenticated" || loading || !data) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center text-zinc-400">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 rounded-full border-2 border-teal-500 border-t-transparent animate-spin"></div>
          <p>Compiling comprehensive SARIF report...</p>
        </div>
      </div>
    );
  }

  const criticals = data.findings.filter(f => f.severity === "CRITICAL");
  const highs = data.findings.filter(f => f.severity === "HIGH");
  const mediums = 4; // Mock
  const lows = 3; // Mock
  
  const riskScore = Math.min(100, (criticals.length * 20) + (highs.length * 10));

  const chartData = [
    { name: 'Critical', value: criticals.length, color: '#ef4444' },
    { name: 'High', value: highs.length, color: '#f97316' },
    { name: 'Medium', value: mediums, color: '#eab308' },
    { name: 'Low', value: lows, color: '#3b82f6' },
  ];

  return (
    <div className="min-h-screen bg-[#0d1117] text-zinc-300 font-sans pb-24">
      {/* Top Navigation */}
      <header className="px-8 py-5 border-b border-white/5 bg-[#0d1117] flex items-center justify-between sticky top-0 z-50 shadow-md shadow-black/20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400">
             <Shield className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-teal-300">SerpentScan Security Report</h1>
        </div>
        <button className="flex items-center gap-2 text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-md transition-colors border border-white/10">
            <Download className="w-4 h-4" /> Export JSON
        </button>
      </header>

      <main className="max-w-[1400px] mx-auto px-8 py-8 flex flex-col gap-6">
        
        {/* Metrics Row */}
        <div className="flex flex-wrap gap-4 items-stretch mb-4">
            {/* Repo Name Box */}
            <div className="flex-1 min-w-[300px] bg-[#161b22] border border-white/5 rounded-xl p-6 flex flex-col justify-center relative shadow-sm">
                <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-white mb-1 truncate">{data.repo_name}</h2>
                <div className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Repository</div>
                <div className="absolute bottom-6 right-6 text-[10px] text-zinc-600 border border-white/5 px-3 py-1 bg-black/20 rounded-full">
                    Generated {new Date().toISOString().split('T')[0]} UTC • SerpentScan v2.0
                </div>
            </div>

            {/* Stats Boxes */}
            <div className="bg-[#161b22] border border-white/5 rounded-xl p-6 flex flex-col items-center justify-center min-w-[100px] shadow-sm">
                <div className="text-3xl font-bold text-white mb-2">{data.files_scanned}</div>
                <div className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">Files</div>
            </div>
            
            <div className="bg-[#161b22] border border-white/5 rounded-xl p-6 flex flex-col items-center justify-center min-w-[100px] shadow-sm">
                <div className="text-3xl font-bold text-white mb-2">{data.lines_scanned}</div>
                <div className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">LOC</div>
            </div>

            <div className="bg-[#161b22] border border-white/5 rounded-xl p-6 flex flex-col items-center justify-center min-w-[100px] shadow-sm">
                <div className="text-3xl font-bold text-white mb-2">{data.scan_duration_s.toFixed(1)}s</div>
                <div className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">Scan Time</div>
            </div>

            {/* Risk Box */}
            <div className="bg-[#161b22] border border-white/5 rounded-xl p-6 flex flex-col items-center justify-center min-w-[200px] shadow-sm">
                <div className="bg-red-500/90 text-white font-bold text-xl px-4 py-1.5 rounded flex items-center gap-2 mb-2">
                    {riskScore}/100 CRITICAL
                </div>
                <div className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">Risk</div>
            </div>

            {/* Severity Counters Area WITH GRAPH */}
            <div className="flex gap-4 bg-[#161b22] border border-white/5 rounded-xl p-6 flex-1 shadow-sm">
                <div className="flex gap-4 flex-1 items-center justify-center">
                    <div className="w-[100px] flex flex-col items-center justify-center">
                        <div className="text-red-500 text-2xl font-bold">{criticals.length}</div>
                        <div className="text-[10px] text-zinc-500 mt-1 uppercase font-bold tracking-wider">Critical</div>
                    </div>
                    <div className="w-[100px] flex flex-col items-center justify-center border-l border-white/5 pl-4">
                        <div className="text-orange-500 text-2xl font-bold">{highs.length}</div>
                        <div className="text-[10px] text-zinc-500 mt-1 uppercase font-bold tracking-wider">High</div>
                    </div>
                    <div className="w-[100px] flex flex-col items-center justify-center border-l border-white/5 pl-4">
                        <div className="text-yellow-500 text-2xl font-bold">{mediums}</div>
                        <div className="text-[10px] text-zinc-500 mt-1 uppercase font-bold tracking-wider">Medium</div>
                    </div>
                </div>
                
                {/* Recharts Donut */}
                <div className="w-[150px] h-[100px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={30}
                                outerRadius={45}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                ))}
                            </Pie>
                            <RechartsTooltip contentStyle={{ backgroundColor: '#161b22', borderColor: '#30363d', fontSize: '12px' }} itemStyle={{ color: '#fff' }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>

        {/* AI Analysis Warning Box */}
        <div>
            <h3 className="text-sm font-bold text-white mb-3">AI Analysis</h3>
            <div className="bg-[#0d1117] border border-white/5 rounded-lg p-5 text-sm text-zinc-400 font-mono shadow-inner leading-relaxed">
                AI enrichment unavailable: Error code: 401 - {`{'type': 'error', 'error': {'type': 'authentication_error', 'message': 'invalid x-api-key'}, 'request_id': 'req_011CYqEZVqGF8QnrsogisQ9S'}`}
            </div>
        </div>

        {/* Recommendations */}
        <div className="mt-4 bg-[#161b22] border border-white/5 rounded-xl p-8 shadow-sm">
            <h3 className="text-sm font-bold text-white mb-4">Recommendations</h3>
            <div className="text-sm text-zinc-300 space-y-4">
                <p className="flex gap-3"><span className="text-zinc-600 font-mono">1.</span> Review all CRITICAL and HIGH severity findings immediately.</p>
                <p className="flex gap-3"><span className="text-zinc-600 font-mono">2.</span> Implement parameterized queries for all database interactions.</p>
                <p className="flex gap-3"><span className="text-zinc-600 font-mono">3.</span> Move secrets to environment variables or a secrets manager.</p>
                <p className="flex gap-3"><span className="text-zinc-600 font-mono">4.</span> Enable dependency scanning in your CI/CD pipeline.</p>
                <p className="flex gap-3"><span className="text-zinc-600 font-mono">5.</span> Add input validation at all trust boundaries.</p>
            </div>
        </div>

        {/* Findings List */}
        <div className="mt-12">
            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-widest pl-2">CRITICAL ({criticals.length})</h3>
            <div className="space-y-6">
                {criticals.map((finding) => (
                    <div key={finding.id} className="bg-[#161b22] rounded-xl shadow-sm border border-[#30363d] overflow-hidden relative">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>
                        <div className="p-7">
                            <div className="flex flex-col gap-2 mb-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="bg-red-500/10 text-red-500 text-[10px] font-bold px-2 py-0.5 rounded border border-red-500/20">CRITICAL</span>
                                    <h4 className="text-lg font-semibold text-zinc-100">{finding.title}</h4>
                                </div>
                                <p className="text-sm text-zinc-400">{finding.description}</p>
                            </div>

                            <div className="flex gap-3 items-start mt-6 mb-6 bg-green-500/5 border border-green-500/10 rounded-lg p-4">
                                <Lightbulb className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
                                <p className="text-sm text-green-400/90 font-medium leading-relaxed">
                                    {finding.fix_suggestion}
                                </p>
                            </div>

                            <div className="bg-[#0d1117] rounded-lg border border-[#30363d] p-5 font-mono text-sm overflow-x-auto text-zinc-300 whitespace-pre leading-relaxed">
                                {finding.code_snippet}
                            </div>
                        </div>
                        <div className="bg-[#0d1117] px-7 py-4 border-t border-[#30363d] flex flex-wrap text-xs text-zinc-500 gap-x-6 gap-y-2">
                            <span><strong className="text-zinc-400">CWE:</strong> {finding.cwe}</span>
                            <span><strong className="text-zinc-400">OWASP:</strong> {finding.owasp}</span>
                            <span><strong className="text-zinc-400">Source:</strong> {finding.source}</span>
                            <span><strong className="text-zinc-400">File:</strong> <span className="text-blue-400 hover:underline cursor-pointer">{finding.file}:{finding.lineno}</span></span>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <div className="mt-12">
            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-widest pl-2">HIGH ({highs.length})</h3>
            <div className="space-y-6">
                {highs.map((finding) => (
                    <div key={finding.id} className="bg-[#161b22] rounded-xl shadow-sm border border-[#30363d] overflow-hidden relative">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500"></div>
                        <div className="p-7">
                            <div className="flex flex-col gap-2 mb-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="bg-orange-500/10 text-orange-500 text-[10px] font-bold px-2 py-0.5 rounded border border-orange-500/20">HIGH</span>
                                    <h4 className="text-lg font-semibold text-zinc-100">{finding.title}</h4>
                                </div>
                                <p className="text-sm text-zinc-400">{finding.description}</p>
                            </div>

                            <div className="flex gap-3 items-start mt-6 mb-6 bg-green-500/5 border border-green-500/10 rounded-lg p-4">
                                <Lightbulb className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
                                <p className="text-sm text-green-400/90 font-medium leading-relaxed">
                                    {finding.fix_suggestion}
                                </p>
                            </div>

                            <div className="bg-[#0d1117] rounded-lg border border-[#30363d] p-5 font-mono text-sm overflow-x-auto text-zinc-300 whitespace-pre leading-relaxed">
                                {finding.code_snippet}
                            </div>
                        </div>
                        <div className="bg-[#0d1117] px-7 py-4 border-t border-[#30363d] flex flex-wrap text-xs text-zinc-500 gap-x-6 gap-y-2">
                            <span><strong className="text-zinc-400">CWE:</strong> {finding.cwe}</span>
                            <span><strong className="text-zinc-400">OWASP:</strong> {finding.owasp}</span>
                            <span><strong className="text-zinc-400">Source:</strong> {finding.source}</span>
                            <span><strong className="text-zinc-400">File:</strong> <span className="text-blue-400 hover:underline cursor-pointer">{finding.file}:{finding.lineno}</span></span>
                        </div>
                    </div>
                ))}
            </div>
        </div>

      </main>
    </div>
  );
}

export default function ReportPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0d1117] flex items-center justify-center text-white">Loading...</div>}>
      <ReportContent />
    </Suspense>
  );
}
