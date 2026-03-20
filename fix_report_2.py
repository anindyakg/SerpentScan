import sys

file_path = 'frontend/src/app/report/page.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Update text colors
text = text.replace('text-orange-500 mb-2">{mediums}', 'text-amber-500 mb-2">{mediums}')
text = text.replace('text-[#4da6ff] mb-2">{lows}', 'text-blue-500 mb-2">{lows}')

table_code = """
        {/* Score Interpretation Table */}
        <div className="mt-8 mb-6 ml-2">
            <h3 className="text-lg font-bold text-white mb-4">Score Interpretation</h3>
            <div className="bg-[#111] border border-white/5 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse text-sm">
                    <thead>
                        <tr className="border-b border-white/5 bg-[#0b0c10]">
                            <th className="font-semibold text-zinc-400 p-4">Score</th>
                            <th className="font-semibold text-zinc-400 p-4">Grade</th>
                            <th className="font-semibold text-zinc-400 p-4">Label</th>
                            <th className="font-semibold text-zinc-400 p-4">Meaning</th>
                            <th className="font-semibold text-zinc-400 p-4">Recommended Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-zinc-300">
                        <tr className="hover:bg-white/[0.02]">
                            <td className="p-4 py-3">90–100</td>
                            <td className="p-4 py-3"><span className="bg-green-500 text-white font-bold px-3 py-1 rounded text-xs">A</span></td>
                            <td className="p-4 py-3 text-[10px] tracking-wider uppercase font-bold text-white">SECURE</td>
                            <td className="p-4 py-3">Minimal or no findings. Strong security posture.</td>
                            <td className="p-4 py-3">Maintain current practices. Schedule periodic re-scan.</td>
                        </tr>
                        <tr className="hover:bg-white/[0.02]">
                            <td className="p-4 py-3">75–89</td>
                            <td className="p-4 py-3"><span className="bg-green-500 text-white font-bold px-3 py-1 rounded text-xs">B</span></td>
                            <td className="p-4 py-3 text-[10px] tracking-wider uppercase font-bold text-white">LOW RISK</td>
                            <td className="p-4 py-3">Minor issues present with low exploitability.</td>
                            <td className="p-4 py-3">Remediate before next major release.</td>
                        </tr>
                        <tr className="hover:bg-white/[0.02]">
                            <td className="p-4 py-3">50–74</td>
                            <td className="p-4 py-3"><span className="bg-amber-500 text-white font-bold px-3 py-1 rounded text-xs">C</span></td>
                            <td className="p-4 py-3 text-[10px] tracking-wider uppercase font-bold text-white">MEDIUM RISK</td>
                            <td className="p-4 py-3">Multiple issues; some may be exploitable.</td>
                            <td className="p-4 py-3">Prioritise HIGH findings. Fix before production deploy.</td>
                        </tr>
                        <tr className="hover:bg-white/[0.02]">
                            <td className="p-4 py-3">25–49</td>
                            <td className="p-4 py-3"><span className="bg-orange-500 text-white font-bold px-3 py-1 rounded text-xs">D</span></td>
                            <td className="p-4 py-3 text-[10px] tracking-wider uppercase font-bold text-white">HIGH RISK</td>
                            <td className="p-4 py-3">Serious vulnerabilities present.</td>
                            <td className="p-4 py-3">Halt new features. Remediate CRITICAL and HIGH urgently.</td>
                        </tr>
                        <tr className="hover:bg-white/[0.02]">
                            <td className="p-4 py-3">0–24</td>
                            <td className="p-4 py-3"><span className="bg-red-500 text-white font-bold px-3 py-1 rounded text-xs">F</span></td>
                            <td className="p-4 py-3 text-[10px] tracking-wider uppercase font-bold text-white">CRITICAL RISK</td>
                            <td className="p-4 py-3">Critical or easily exploitable issues confirmed.</td>
                            <td className="p-4 py-3">Do not deploy. Immediate security review required.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="text-[10px] text-zinc-500 font-medium mt-3 mb-10">
                Score = 100 - penalties. Code findings (weighted by severity) + capped vulnerable dependency penalty. First occurrence of each severity is penalised most heavily.
            </div>
        </div>
"""

idx = text.find('Generated {new Date().toISOString()')
if idx != -1:
    end_div = text.find('</div>', idx)
    if end_div != -1:
        before = text[:end_div + 6]
        after = text[end_div + 6:]
        text = before + "\n" + table_code + after

# 3. Handle PDF Button
export_json = '<Download className="w-4 h-4" /> Export JSON'
export_pdf = '<Download className="w-4 h-4" /> Download PDF'
btn_before = '<button className="flex items-center gap-2 text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-md transition-colors border border-white/10">'
btn_after = '<button onClick={() => window.print()} className="flex items-center gap-2 text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-md transition-colors border border-white/10">'
if export_json in text:
    text = text.replace(export_json, export_pdf)
    text = text.replace(btn_before, btn_after)

# 4. Handle auto-print logic
trigger_print = """
  useEffect(() => {
    if (searchParams?.get("print") === "true") {
      setTimeout(() => {
        window.print();
      }, 1000);
    }
  }, [searchParams, loading]);
"""
# insert before "if (!repo) return;"
if "if (!repo) return;" in text and "window.print" not in text:
    text = text.replace("if (!repo) return;", trigger_print + "\n    if (!repo) return;")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(text)

print('Updated successfully')
