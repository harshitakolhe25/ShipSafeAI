"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, AlertTriangle, Bug, Code2, ArrowRight, CheckCircle2, Bot, Beaker } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Mock data (would come from backend)
const mockIssues = [
  {
    id: "iss_1",
    title: "SQL Injection Vulnerability",
    severity: "Critical",
    category: "Security",
    file_name: "db_queries.ts",
    line_number: 42,
    description: "User input is concatenated directly into the SQL query without parameterization.",
    impact: "Attackers can execute arbitrary SQL commands, potentially reading or modifying sensitive data.",
    fix: "Use parameterized queries or an ORM.",
    confidence: 98,
    code: "const query = `SELECT * FROM users WHERE username = '\${req.body.username}'`;"
  },
  {
    id: "iss_2",
    title: "Missing Payment Retry Circuit Breaker",
    severity: "High",
    category: "Bug",
    file_name: "payment_service.ts",
    line_number: 115,
    description: "Payment retry logic does not have a circuit breaker, which can overwhelm the external gateway during an outage.",
    impact: "System outage and potential account ban from the payment provider due to rate limits.",
    fix: "Implement a circuit breaker pattern.",
    confidence: 85,
    code: "while (retryCount < 5) {\n  try {\n    await charge(user);\n    break;\n  } catch (e) {\n    retryCount++;\n  }\n}"
  }
];

export default function Results() {
  const params = useParams();
  
  // State for fetched scan data
  const [scanData, setScanData] = useState<any>(null);
  const [issues, setIssues] = useState<any[]>(mockIssues);
  const [selectedIssue, setSelectedIssue] = useState<any>(mockIssues[0]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchScan() {
      try {
        const id = params?.id || 'demo-scan-123';
        const res = await fetch(`http://localhost:8000/api/scans/${id}`);
        if (res.ok) {
          const data = await res.json();
          setScanData(data);
          if (data.issues && data.issues.length > 0) {
            setIssues(data.issues);
            setSelectedIssue(data.issues[0]);
          }
        }
      } catch (err) {
        console.error("Backend unreachable, using mock data", err);
      } finally {
        setLoading(false);
      }
    }
    fetchScan();
  }, [params?.id]);

  const riskScore = scanData ? scanData.overall_risk_score : 78;
  const projectStatus = scanData ? scanData.risk_status : "Review Required";

  return (
    <div className="container mx-auto px-4 py-8 h-[calc(100vh-80px)] flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-card border border-white/5 p-6 rounded-2xl">
        <div>
          <h1 className="text-2xl font-space-grotesk font-bold">Analysis Results</h1>
          <div className="flex items-center gap-4 mt-2 text-sm text-text-secondary">
            <span>Project: <strong className="text-foreground">Demo Project</strong></span>
            <span>Scan ID: <span className="font-mono">{params?.id || 'demo-scan-123'}</span></span>
            <span className={`flex items-center gap-1 font-semibold ${projectStatus === 'Approved' ? 'text-success' : projectStatus === 'Blocked' ? 'text-critical' : 'text-warning'}`}>
              {projectStatus === 'Approved' ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />} {projectStatus}
            </span>
          </div>
        </div>
        
        {/* Risk Score Gauge (Simplified) */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-text-secondary">Overall Risk Score</p>
            <p className="text-xs text-text-secondary italic">Project-specific heuristic</p>
          </div>
          <div className={`relative w-16 h-16 flex items-center justify-center bg-secondary rounded-full border-4 ${riskScore >= 80 ? 'border-success text-success' : riskScore < 50 ? 'border-critical text-critical' : 'border-warning text-warning'}`}>
            <span className="text-2xl font-bold">{riskScore}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow min-h-0">
        
        {/* Issues List */}
        <div className="lg:col-span-1 bg-card border border-white/5 rounded-2xl p-4 flex flex-col h-full overflow-hidden">
          
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
            {["All", "Critical", "High", "Medium", "Low"].map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${filter === f ? 'bg-primary text-background' : 'bg-secondary text-text-secondary hover:text-foreground'}`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="overflow-y-auto pr-2 space-y-3 flex-grow custom-scrollbar">
            {issues.filter(i => filter === "All" || i.severity === filter).map(issue => (
              <div 
                key={issue.id}
                onClick={() => setSelectedIssue(issue)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedIssue?.id === issue.id ? 'border-primary bg-primary/5' : 'border-white/5 bg-secondary hover:border-white/20'}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                    issue.severity === 'Critical' ? 'bg-critical/20 text-critical' : 'bg-warning/20 text-warning'
                  }`}>
                    {issue.severity}
                  </span>
                  <span className="text-xs text-text-secondary flex items-center gap-1">
                    <ShieldAlert className="w-3 h-3" /> {issue.category}
                  </span>
                </div>
                <h4 className="font-semibold text-sm mb-1 line-clamp-2">{issue.title}</h4>
                <p className="text-xs text-text-secondary font-mono">{issue.file_name}:{issue.line_number}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Issue Details */}
        <div className="lg:col-span-2 bg-card border border-white/5 rounded-2xl p-6 overflow-y-auto custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedIssue.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full flex flex-col"
            >
              <div className="flex items-start justify-between mb-6 border-b border-white/5 pb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{selectedIssue.title}</h2>
                  <div className="flex items-center gap-4 text-sm text-text-secondary">
                    <span className="font-mono bg-secondary px-2 py-1 rounded">{selectedIssue.file_name}:{selectedIssue.line_number}</span>
                    <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-primary" /> {selectedIssue.confidence_level || selectedIssue.confidence}% Confidence</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6 flex-grow">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-text-secondary leading-relaxed">{selectedIssue.description}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Potential Impact</h3>
                  <p className="text-critical leading-relaxed">{selectedIssue.potential_impact || selectedIssue.impact}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Vulnerable Code</h3>
                  <div className="bg-[#1e1e1e] p-4 rounded-xl border border-[#404040] font-mono text-sm overflow-x-auto text-[#d4d4d4]">
                    <pre><code>{selectedIssue.code_snippet || selectedIssue.code}</code></pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-success">Recommended Fix</h3>
                  <p className="text-text-secondary leading-relaxed">{selectedIssue.recommended_fix || selectedIssue.fix}</p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap gap-4">
                <Link href={`/fix?scan_id=${params?.id}&issue_id=${selectedIssue.id}`} className="bg-primary hover:bg-primary/90 text-background px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all">
                  <Bot className="w-5 h-5" /> Fix with IBM Bob
                </Link>
                <Link href={`/simulator?scan_id=${params?.id}&issue_id=${selectedIssue.id}`} className="bg-card border border-card-border hover:border-warning/50 text-foreground px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all">
                  <AlertTriangle className="w-5 h-5 text-warning" /> View Failure Scenario
                </Link>
                <button className="bg-card border border-card-border hover:border-success/50 text-foreground px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all">
                  <Beaker className="w-5 h-5 text-success" /> Generate Tests
                </button>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
