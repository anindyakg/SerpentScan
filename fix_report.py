import sys

file_path = 'frontend/src/app/report/page.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('bg-[#0d1117]', 'bg-[#0A0A0C]')
text = text.replace('bg-[#161b22]', 'bg-[#111]')
text = text.replace('border-[#30363d]', 'border-white/10')
text = text.replace('text-teal-300', 'text-[#4da6ff]')

start_str = '{/* Metrics Row */}'
end_str = '{/* AI Analysis Warning Box */}'

metrics_row = """{/* Metrics Row */}
        <div className="flex flex-nowrap overflow-x-auto hide-scrollbar gap-4 items-stretch mb-2 pb-2">
            {/* Repo Box */}
            <div className="w-48 shrink-0 bg-[#111] border border-white/5 rounded-xl p-5 flex flex-col justify-center items-center shadow-sm text-center">
                <h2 className="text-xl font-bold tracking-tight text-white mb-2 truncate w-full">{data.repo_name}</h2>
                <div className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">Repository</div>
            </div>

            {/* Repo Type Box */}
            <div className="w-28 shrink-0 bg-[#111] border border-white/5 rounded-xl p-5 flex flex-col items-center justify-center shadow-sm">
                <div className="bg-white/5 text-zinc-400 text-[10px] font-bold px-3 py-1 rounded inline-block mb-2 uppercase tracking-wide">
                    LIBRARY
                </div>
                <div className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">Repo Type</div>
            </div>

            {/* Files */}
            <div className="w-28 shrink-0 bg-[#111] border border-white/5 rounded-xl p-5 flex flex-col items-center justify-center shadow-sm">
                <div className="text-2xl font-bold text-white mb-2">{data.files_scanned}</div>
                <div className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">Files</div>
            </div>
            
            {/* LOC */}
            <div className="w-32 shrink-0 bg-[#111] border border-white/5 rounded-xl p-5 flex flex-col items-center justify-center shadow-sm">
                <div className="text-2xl font-bold text-white mb-2">{data.lines_scanned.toLocaleString()}</div>
                <div className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">LOC</div>
            </div>

            {/* Scan Time */}
            <div className="w-32 shrink-0 bg-[#111] border border-white/5 rounded-xl p-5 flex flex-col items-center justify-center shadow-sm">
                <div className="text-2xl font-bold text-white mb-2">{data.scan_duration_s.toFixed(1)}s</div>
                <div className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">Scan Time</div>
            </div>

            {/* Security Score */}
            <div className="w-32 shrink-0 bg-[#111] border border-white/5 rounded-xl p-5 flex flex-col items-center justify-center shadow-sm">
                <div className="text-2xl font-bold text-white mb-2">{(100 - riskScore)}/100</div>
                <div className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">Security Score</div>
            </div>

            {/* Grade */}
            <div className="w-36 shrink-0 bg-[#111] border border-white/5 rounded-xl p-5 flex flex-col items-center justify-center shadow-sm">
                <div className={`text-[12px] font-bold text-white px-3 py-1 rounded flex items-center mb-2 ${riskScore > 0 ? "bg-red-500/90" : "bg-green-500/90"}`}>
                    {riskScore > 0 ? "F — CRITICAL RISK" : "A — LOW RISK"}
                </div>
                <div className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">Grade</div>
            </div>

            {/* Critical */}
            <div className="w-24 shrink-0 bg-[#111] border border-white/5 rounded-xl p-5 flex flex-col items-center justify-center shadow-sm">
                <div className="text-2xl font-bold text-red-500 mb-2">{criticals.length}</div>
                <div className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">Critical</div>
            </div>

            {/* High */}
            <div className="w-24 shrink-0 bg-[#111] border border-white/5 rounded-xl p-5 flex flex-col items-center justify-center shadow-sm">
                <div className="text-2xl font-bold text-red-500 mb-2">{highs.length}</div>
                <div className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">High</div>
            </div>

            {/* Medium */}
            <div className="w-24 shrink-0 bg-[#111] border border-white/5 rounded-xl p-5 flex flex-col items-center justify-center shadow-sm">
                <div className="text-2xl font-bold text-orange-500 mb-2">{mediums}</div>
                <div className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">Med</div>
            </div>

            {/* Low */}
            <div className="w-24 shrink-0 bg-[#111] border border-white/5 rounded-xl p-5 flex flex-col items-center justify-center shadow-sm">
                <div className="text-2xl font-bold text-[#4da6ff] mb-2">{lows}</div>
                <div className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">Low</div>
            </div>
        </div>
        
        <div className="text-[11px] text-zinc-500 font-medium -mt-2 mb-6 ml-2">
            Generated {new Date().toISOString().split('T')[0]} 06:33 UTC • SerpentScan v2.0
        </div>

        """

if start_str in text and end_str in text:
    before = text[:text.find(start_str)]
    after = text[text.find(end_str):]
    text = before + metrics_row + after
else:
    print("Could not find replacement block!")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(text)

print('Updated successfully')
