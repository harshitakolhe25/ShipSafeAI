"use client";
import { useState, useEffect } from "react";

import { Download, FileJson, ShieldAlert, CheckCircle2, AlertTriangle, FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function Reports() {
  const [scan, setScan] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchScan() {
      try {
        const res = await fetch("http://localhost:8000/api/scans");
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) setScan(data[0]);
        }
      } catch (e) {
        console.error("Failed to fetch scan for report", e);
      } finally {
        setLoading(false);
      }
    }
    fetchScan();
  }, []);

  const downloadReport = () => {
    alert("Downloading PDF report (Demo)");
  };

  const downloadJson = () => {
    alert("Downloading JSON report (Demo)");
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8 max-w-5xl text-center">Loading Report...</div>;
  }

  const riskScore = scan?.overall_risk_score || 78;
  const projectName = scan?.project_name || "Demo Project";
  const status = scan?.risk_status || "Review Required";
  const criticalCount = scan?.issues?.filter((i:any) => i.severity === 'Critical').length || 0;
  const highCount = scan?.issues?.filter((i:any) => i.severity === 'High').length || 0;
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-space-grotesk font-bold">Release Safety Report</h1>
          <p className="text-text-secondary mt-1">Final summary and recommendation for release.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={downloadJson} className="bg-secondary hover:bg-card-border text-foreground px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all border border-white/5">
            <FileJson className="w-4 h-4" /> JSON
          </button>
          <button onClick={downloadReport} className="bg-primary hover:bg-primary/90 text-background px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(0,229,255,0.2)]">
            <Download className="w-4 h-4" /> Export PDF
          </button>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-white/5 rounded-2xl p-8 mb-8"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/5 pb-8 mb-8 gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">{projectName}</h2>
            <div className="flex items-center gap-4 text-sm text-text-secondary">
              <span>Scanned on: {scan ? new Date(scan.timestamp).toLocaleDateString() : new Date().toLocaleDateString()}</span>
              <span>Scan ID: <span className="font-mono">{scan?.id || 'demo-123'}</span></span>
            </div>
          </div>
          
          <div className={`bg-secondary border px-6 py-4 rounded-xl flex items-center gap-4 ${status === 'Approved' ? 'border-success/30' : status === 'Blocked' ? 'border-critical/30' : 'border-warning/30'}`}>
            {status === 'Approved' ? <CheckCircle2 className="w-8 h-8 text-success" /> : status === 'Blocked' ? <ShieldAlert className="w-8 h-8 text-critical" /> : <AlertTriangle className="w-8 h-8 text-warning" />}
            <div>
              <p className={`text-sm font-semibold ${status === 'Approved' ? 'text-success' : status === 'Blocked' ? 'text-critical' : 'text-warning'}`}>Release Status</p>
              <p className="text-xl font-bold text-foreground">{status}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-secondary rounded-xl p-4 border border-white/5">
            <p className="text-sm text-text-secondary mb-1">Overall Risk Score</p>
            <p className={`text-3xl font-bold ${riskScore >= 80 ? 'text-success' : riskScore < 50 ? 'text-critical' : 'text-warning'}`}>{riskScore}</p>
          </div>
          <div className="bg-secondary rounded-xl p-4 border border-white/5">
            <p className="text-sm text-text-secondary mb-1">Issues Found</p>
            <p className="text-3xl font-bold text-foreground">2</p>
          </div>
          <div className="bg-secondary rounded-xl p-4 border border-white/5">
            <p className="text-sm text-text-secondary mb-1">Test Coverage</p>
            <p className="text-3xl font-bold text-success">85%</p>
          </div>
          <div className="bg-secondary rounded-xl p-4 border border-white/5">
            <p className="text-sm text-text-secondary mb-1">Fixes Applied</p>
            <p className="text-3xl font-bold text-primary">1</p>
          </div>
        </div>

        <div className="space-y-8">
          <section>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 border-b border-white/5 pb-2">
              <ShieldAlert className="w-5 h-5 text-critical" /> Outstanding Risks
            </h3>
            <div className="bg-secondary/50 rounded-lg p-4 border border-critical/20">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-critical">Critical: SQL Injection Vulnerability</h4>
                  <p className="text-sm text-text-secondary mt-1">db_queries.ts:42 - User input concatenated into SQL query.</p>
                </div>
                <span className="text-xs font-mono bg-background px-2 py-1 rounded">Open</span>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 border-b border-white/5 pb-2">
              <CheckCircle2 className="w-5 h-5 text-success" /> Resolved Items
            </h3>
            <div className="bg-secondary/50 rounded-lg p-4 border border-success/20">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-success">High: Missing Payment Retry Circuit Breaker</h4>
                  <p className="text-sm text-text-secondary mt-1">payment_service.ts:115 - Fixed via IBM Bob AI assistant.</p>
                </div>
                <span className="text-xs font-mono bg-background px-2 py-1 rounded">Resolved</span>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5">
          <h3 className="text-lg font-semibold mb-2">Final Recommendation</h3>
          <p className="text-text-secondary leading-relaxed">
            The application contains 1 unresolved critical security vulnerability (SQL Injection). 
            <strong className="text-foreground"> It is strongly recommended to block the release</strong> until this issue is remediated. 
            The payment retry issue has been successfully resolved and validated with regression tests.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
