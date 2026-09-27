"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Activity, Play, AlertTriangle, ArrowRight, ShieldAlert, CheckCircle2 } from "lucide-react";

const scenarios = [
  { id: "1", name: "Payment Gateway Timeout", desc: "Simulates a >30s response from the external payment provider." },
  { id: "2", name: "Database Connection Failure", desc: "Simulates sudden loss of DB connectivity during a transaction." },
  { id: "3", name: "API Rate Limit Exceeded", desc: "Simulates 429 Too Many Requests from a third-party dependency." },
];

export default function Simulator() {
  const searchParams = useSearchParams();
  const scanId = searchParams.get('scan_id');
  const issueId = searchParams.get('issue_id');
  
  const [issue, setIssue] = useState<any>(null);
  
  useEffect(() => {
    async function fetchIssue() {
      if (!scanId || !issueId) return;
      try {
        const res = await fetch(`http://localhost:8000/api/scans/${scanId}`);
        if (res.ok) {
          const data = await res.json();
          const found = data.issues?.find((i: any) => i.id === issueId);
          if (found) setIssue(found);
        }
      } catch(e) {}
    }
    fetchIssue();
  }, [scanId, issueId]);

  const [selectedScenario, setSelectedScenario] = useState(scenarios[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [timeline, setTimeline] = useState<any[]>([]);

  const runSimulation = async () => {
    setIsRunning(true);
    setTimeline([]);
    
    const steps = [
      { step: "Request Started", status: "ok", description: "User initiates payment.", delay: 500 },
      { step: "External Service Timeout", status: "error", description: "Payment gateway takes >30s.", delay: 1500 },
      { step: "Retry Triggered", status: "warning", description: "System automatically retries without circuit breaker.", delay: 1000 },
      { step: "Duplicate Request Risk", status: "critical", description: "First request completes in background, retry causes double charge.", delay: 1500 }
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, steps[i].delay));
      setTimeline(prev => [...prev, steps[i]]);
    }
    
    setIsRunning(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 h-[calc(100vh-80px)] flex flex-col">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-space-grotesk font-bold">Failure Simulator</h1>
          <p className="text-text-secondary mt-1">
            {issue ? `Deterministic Demo Simulation for: ${issue.title}` : "Simulate failure before it happens in production."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow min-h-0">
        
        {/* Scenario Selection */}
        <div className="lg:col-span-1 bg-card border border-white/5 rounded-2xl p-6 flex flex-col">
          <h3 className="font-semibold mb-4 text-lg">Scenarios</h3>
          <div className="space-y-3 flex-grow overflow-y-auto">
            {scenarios.map(sc => (
              <div 
                key={sc.id}
                onClick={() => !isRunning && setSelectedScenario(sc)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedScenario.id === sc.id ? 'border-primary bg-primary/5' : 'border-white/5 bg-secondary hover:border-white/20'} ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <h4 className="font-semibold text-sm mb-1">{sc.name}</h4>
                <p className="text-xs text-text-secondary">{sc.desc}</p>
              </div>
            ))}
          </div>

          <button 
            onClick={runSimulation}
            disabled={isRunning}
            className="w-full bg-warning hover:bg-warning/90 text-background py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all mt-6 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(245,158,11,0.3)]"
          >
            {isRunning ? (
              <span className="animate-pulse flex items-center gap-2"><Activity className="w-5 h-5 animate-spin" /> Running...</span>
            ) : (
              <><Play className="w-5 h-5" /> Run Simulation</>
            )}
          </button>
        </div>

        {/* Execution Timeline */}
        <div className="lg:col-span-2 bg-[#0B1220] border border-white/5 rounded-2xl p-8 overflow-y-auto relative custom-scrollbar">
          {!isRunning && timeline.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-text-secondary">
              <Activity className="w-16 h-16 mb-4 opacity-20" />
              <p>Select a scenario and run the simulation to see the execution timeline.</p>
              <div className="mt-8 p-4 bg-warning/10 border border-warning/20 rounded-xl max-w-md text-center">
                <p className="text-sm text-warning font-medium">Demo Mode</p>
                <p className="text-xs mt-1">This simulation uses deterministic scenario-based demo logic, not a live cluster.</p>
              </div>
            </div>
          ) : (
            <div className="relative max-w-2xl mx-auto">
              {timeline.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: 'auto' }}
                  className="relative pl-8 pb-8"
                >
                  {/* Timeline connector */}
                  {idx !== timeline.length - 1 && (
                    <div className="absolute left-[11px] top-8 bottom-0 w-[2px] bg-card-border" />
                  )}
                  
                  {/* Node */}
                  <div className={`absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                    item.status === 'ok' ? 'bg-success/20 border-success text-success' :
                    item.status === 'error' ? 'bg-critical/20 border-critical text-critical' :
                    item.status === 'warning' ? 'bg-warning/20 border-warning text-warning' :
                    'bg-critical/20 border-critical text-critical'
                  }`}>
                    {item.status === 'ok' ? <CheckCircle2 className="w-3 h-3" /> :
                     item.status === 'warning' ? <AlertTriangle className="w-3 h-3" /> :
                     <ShieldAlert className="w-3 h-3" />}
                  </div>

                  <div className="bg-card border border-white/5 p-4 rounded-xl">
                    <h4 className={`font-semibold mb-1 ${
                      item.status === 'ok' ? 'text-success' :
                      item.status === 'error' ? 'text-critical' :
                      item.status === 'warning' ? 'text-warning' :
                      'text-critical'
                    }`}>{item.step}</h4>
                    <p className="text-sm text-text-secondary">{item.description}</p>
                  </div>
                </motion.div>
              ))}
              
              {isRunning && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="pl-8 flex items-center gap-3 text-text-secondary"
                >
                  <div className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                  <span className="text-sm">Simulating next step...</span>
                </motion.div>
              )}

              {!isRunning && timeline.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                  className="mt-8 p-6 bg-critical/10 border border-critical/30 rounded-xl"
                >
                  <h4 className="text-critical font-bold text-lg mb-2 flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5" /> Simulation Complete: High Risk Detected
                  </h4>
                  <p className="text-sm text-text-secondary mb-4">
                    The simulation shows a high risk of duplicate charges under timeout conditions due to the lack of a circuit breaker.
                  </p>
                  <button className="bg-primary hover:bg-primary/90 text-background px-6 py-2 rounded-lg font-semibold text-sm transition-all shadow-[0_0_15px_rgba(0,229,255,0.2)]">
                    Generate Fix with AI
                  </button>
                </motion.div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
