import time
import random
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(title="SerpentScan Mock API")

# Allow frontend to access the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ScanRequest(BaseModel):
    repo_url: str

class Finding(BaseModel):
    id: str
    source: str
    title: str
    description: str
    severity: str
    category: str
    cwe: str
    owasp: str
    file: str
    lineno: int
    code_snippet: str
    fix_suggestion: str
    propagation_chain: list = []
    source_lineno: Optional[int] = None
    ai_analysis: Optional[str] = None

class ScanResponse(BaseModel):
    repo_url: str
    repo_name: str
    files_scanned: int
    lines_scanned: int
    scan_duration_s: float
    findings: List[Finding]

@app.post("/api/scan", response_model=ScanResponse)
async def perform_mock_scan(request: ScanRequest):
    if not request.repo_url.startswith("http"):
        raise HTTPException(status_code=400, detail="Invalid repository URL")
    
    # Extract a clean repo name format
    repo_parts = request.repo_url.strip("/").split("/")
    repo_name = f"{repo_parts[-2]}/{repo_parts[-1]}" if len(repo_parts) >= 2 else "Unknown/Repo"

    # Simulate scanning delay
    time.sleep(random.uniform(1.2, 2.5))

    # The exact JSON structure requested in the screenshots
    findings = [
        Finding(
            id="PAT-PY016",
            source="pattern",
            title="JWT Signature Verification Disabled",
            description="Decoding JWT without verifying the signature allows attackers to forge arbitrary tokens.",
            severity="CRITICAL",
            category="JWT Security",
            cwe="CWE-347",
            owasp="OWASP A05:2021 — Security Misconfiguration",
            file="app/app.py",
            lineno=97,
            code_snippet="def insecure_verify(token):\n    decoded = jwt.decode(token, verify=False)\n    print(decoded)\n    return",
            fix_suggestion="Always verify JWT signatures: jwt.decode(token, key, algorithms=['HS256']).",
        ),
        Finding(
            id="PAT-PY022",
            source="pattern",
            title="Potential Server-Side Template Injection (SSTI)",
            description="render_template_string() with user-controlled content enables SSTI -> RCE.",
            severity="CRITICAL",
            category="Injection",
            cwe="CWE-94",
            owasp="OWASP A03:2021 — Injection",
            file="app/app.py",
            lineno=114,
            code_snippet="@app.route('/hello')\ndef hello():\n    name = request.args.get('name', 'World')\n    return render_template_string(f'Hello {name}!')",
            fix_suggestion="Use render_template() with static template files only. Never pass user input as template code.",
        ),
        Finding(
            id="PAT-PY022-2",
            source="pattern",
            title="Potential Server-Side Template Injection (SSTI)",
            description="render_template_string() with user-controlled content enables SSTI -> RCE.",
            severity="CRITICAL",
            category="Injection",
            cwe="CWE-94",
            owasp="OWASP A03:2021 — Injection",
            file="app/app.py",
            lineno=281,
            code_snippet="@app.route('/greet')\ndef greet():\n    user_input = request.form['greeting']\n    return render_template_string(user_input)",
            fix_suggestion="Use render_template() with static template files only. Never pass user input as template code.",
        ),
        Finding(
            id="PAT-PY005",
            source="pattern",
            title="Hardcoded Secret Key",
            description="A hardcoded secret key creates a cryptographic weak point if the source is exposed.",
            severity="CRITICAL",
            category="Authentication",
            cwe="CWE-798",
            owasp="OWASP A07:2021 — Identification and Authentication Failures",
            file="app/app.py",
            lineno=28,
            code_snippet="SECRET_KEY = 'super_secret_key_123!'",
            fix_suggestion="Store secrets in env vars or a secrets manager (Vault, AWS Secrets Manager).",
        ),
        Finding(
            id="PAT-PY006",
            source="pattern",
            title="Hardcoded Password",
            description="Hardcoded passwords bypass standard authentication defenses.",
            severity="CRITICAL",
            category="Authentication",
            cwe="CWE-798",
            owasp="OWASP A07:2021 — Identification and Authentication Failures",
            file="app/app.py",
            lineno=63,
            code_snippet="db_password = 'admin_password_2024'",
            fix_suggestion="Store secrets in env vars or a secrets manager (Vault, AWS Secrets Manager).",
        ),
        Finding(
            id="DFD-PY012",
            source="dataflow",
            title="XSS [INTERPROCEDURAL] - tainted data reaches flask.Response",
            description="User input flows into a raw response without sanitization.",
            severity="HIGH",
            category="XSS",
            cwe="CWE-79",
            owasp="OWASP A03:2021 — Injection",
            file="app/app.py",
            lineno=185,
            code_snippet="def unsafe_echo(msg):\n    return Response(msg)\n\n@app.route('/echo')\ndef echo():\n    return unsafe_echo(request.args.get('msg'))",
            fix_suggestion="Escape user input using html_escape or rely on a standard templating engine.",
        )
    ]

    return ScanResponse(
        repo_url=request.repo_url,
        repo_name=repo_name,
        files_scanned=3,
        lines_scanned=421,
        scan_duration_s=random.uniform(1.2, 1.9),
        findings=findings
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
