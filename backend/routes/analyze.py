from fastapi import APIRouter
from models import ScanRequest, ScanResult
import uuid
from datetime import datetime
import re

router = APIRouter()

# In-memory store for scans
scan_results_store = {}

mock_issues = [
    {
        "id": "iss_1",
        "title": "SQL Injection Vulnerability",
        "severity": "Critical",
        "category": "Security",
        "file_name": "db_queries.ts",
        "line_number": 42,
        "description": "User input is concatenated directly into the SQL query without parameterization.",
        "potential_impact": "Attackers can execute arbitrary SQL commands, potentially reading or modifying sensitive data.",
        "recommended_fix": "Use parameterized queries or an ORM.",
        "confidence_level": 98,
        "verification_status": "Verified",
        "code_snippet": "const query = `SELECT * FROM users WHERE username = '${req.body.username}'`;"
    },
    {
        "id": "iss_2",
        "title": "Missing Payment Retry Circuit Breaker",
        "severity": "High",
        "category": "Bug",
        "file_name": "payment_service.py",
        "line_number": 115,
        "description": "Payment retry logic does not have a circuit breaker, which can overwhelm the external gateway during an outage.",
        "potential_impact": "System outage and potential account ban from the payment provider due to rate limits.",
        "recommended_fix": "Implement a circuit breaker pattern.",
        "confidence_level": 85,
        "verification_status": "AI Suggested",
        "code_snippet": "while retry_count < 5:\n    try:\n        charge(user)\n        break\n    except Exception:\n        retry_count += 1"
    }
]

@router.post("/", response_model=ScanResult)
def analyze_code(request: ScanRequest):
    code = request.code
    language = request.language
    issues = []
    
    # 1. Check for SQL Injection patterns
    if re.search(r"SELECT.*FROM.*WHERE.*=.*\+.*", code, re.IGNORECASE) or re.search(r"SELECT.*FROM.*WHERE.*=.*f['\"].*\{.*\}", code, re.IGNORECASE) or "req.body" in code and "SELECT" in code.upper():
        issues.append({
            "id": f"iss_{uuid.uuid4().hex[:6]}",
            "title": "SQL Injection Vulnerability",
            "severity": "Critical",
            "category": "Security",
            "file_name": request.file_name,
            "line_number": code.upper().find("SELECT") // 30 + 1 if "SELECT" in code.upper() else 1,
            "description": "User input appears to be concatenated directly into a SQL query without parameterization.",
            "potential_impact": "Attackers can execute arbitrary SQL commands, potentially reading or modifying sensitive data.",
            "recommended_fix": "Use parameterized queries or an ORM instead of raw string interpolation.",
            "confidence_level": 95,
            "verification_status": "Verified",
            "code_snippet": code[max(0, code.upper().find("SELECT")-20):code.upper().find("SELECT")+100] + "..." if "SELECT" in code.upper() else "Vulnerable query detected"
        })

    # 2. Check for Hardcoded Secrets
    if re.search(r"(password|secret|api_key|token)\s*=\s*['\"][a-zA-Z0-9_-]{5,}['\"]", code, re.IGNORECASE):
        issues.append({
            "id": f"iss_{uuid.uuid4().hex[:6]}",
            "title": "Hardcoded Secret/Credentials",
            "severity": "High",
            "category": "Security",
            "file_name": request.file_name,
            "line_number": code.lower().find("secret") // 30 + 1 if "secret" in code.lower() else (code.lower().find("password") // 30 + 1 if "password" in code.lower() else 1),
            "description": "A hardcoded secret, token, or password was found in the source code.",
            "potential_impact": "If this code is leaked or accessed, attackers can use these credentials to compromise systems.",
            "recommended_fix": "Store secrets in environment variables or a secure vault (e.g., AWS Secrets Manager).",
            "confidence_level": 98,
            "verification_status": "Verified",
            "code_snippet": "password = '...'" # obfuscated for safety in report
        })

    # 3. Check for Infinite Loops or Bad Retry Logic
    if "while True:" in code or "while(true)" in code.replace(" ", "") or "while (true)" in code.lower() or "retry" in code.lower():
        issues.append({
            "id": f"iss_{uuid.uuid4().hex[:6]}",
            "title": "Potential Infinite Loop / Missing Circuit Breaker",
            "severity": "Medium",
            "category": "Bug",
            "file_name": request.file_name,
            "line_number": code.lower().find("while") // 30 + 1 if "while" in code.lower() else 1,
            "description": "A loop or retry mechanism was detected that may not have a proper exit condition or circuit breaker.",
            "potential_impact": "Can lead to CPU exhaustion, memory leaks, or overwhelming external APIs during an outage.",
            "recommended_fix": "Implement a circuit breaker pattern and ensure all loops have bounded exit conditions.",
            "confidence_level": 80,
            "verification_status": "AI Suggested",
            "code_snippet": "while condition:\n    # missing bound or breaker"
        })

    # 4. Insecure HTTP connections
    if "http://" in code:
        issues.append({
            "id": f"iss_{uuid.uuid4().hex[:6]}",
            "title": "Insecure HTTP Protocol Usage",
            "severity": "Medium",
            "category": "Security",
            "file_name": request.file_name,
            "line_number": code.find("http://") // 30 + 1,
            "description": "Cleartext HTTP is being used instead of secure HTTPS.",
            "potential_impact": "Traffic can be intercepted or modified via Man-in-the-Middle (MitM) attacks.",
            "recommended_fix": "Enforce HTTPS for all network communication.",
            "confidence_level": 100,
            "verification_status": "Verified",
            "code_snippet": code[max(0, code.find("http://")-10):code.find("http://")+30] + "..."
        })

    # 5. Generic Code Quality / Catch-all if nothing else found
    if len(issues) == 0:
        issues.append({
            "id": f"iss_{uuid.uuid4().hex[:6]}",
            "title": "Missing Error Handling",
            "severity": "Low",
            "category": "Code Quality",
            "file_name": request.file_name,
            "line_number": 1,
            "description": "The uploaded code might be missing robust try/catch or exception handling blocks.",
            "potential_impact": "Unexpected runtime errors could crash the application.",
            "recommended_fix": "Wrap critical execution paths in proper error handling blocks.",
            "confidence_level": 60,
            "verification_status": "AI Suggested",
            "code_snippet": "def example():\n  # Missing try/except block"
        })

    # Calculate mock risk score based on severities
    score = 100
    for issue in issues:
        if issue["severity"] == "Critical": score -= 30
        elif issue["severity"] == "High": score -= 20
        elif issue["severity"] == "Medium": score -= 10
        elif issue["severity"] == "Low": score -= 5
    
    score = max(0, score)
    status = "Approved" if score >= 80 else ("Review Required" if score >= 50 else "Blocked")

    scan_id = f"scan_{uuid.uuid4().hex[:8]}"
    result = ScanResult(
        id=scan_id,
        project_name=request.file_name or "Uploaded Code Analysis",
        timestamp=datetime.now().isoformat(),
        overall_risk_score=score,
        risk_status=status,
        issues=issues
    )
    
    scan_results_store[scan_id] = result
    return result
