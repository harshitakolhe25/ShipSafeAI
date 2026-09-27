"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, AlertTriangle, CheckCircle2, ShieldAlert, Bug, BarChart3 } from "lucide-react";
import Link from "next/link";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const mockRiskData = [
  { name: 'Jan', risk: 85 },
  { name: 'Feb', risk: 78 },
  { name: 'Mar', risk: 65 },
  { name: 'Apr', risk: 72 },
  { name: 'May', risk: 54 },
  { name: 'Jun', risk: 42 },
  { name: 'Jul', risk: 38 },
];

export default function Dashboard() {
  const [scans, setScans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchScans() {
      try {
        const res = await fetch("http://localhost:8000/api/scans");
        if (res.ok) {
          const data = await res.json();
          setScans(data);
        }
      } catch (e) {
        console.error("Failed to fetch scans", e);
      } finally {
        setLoading(false);
      }
    }
    fetchScans();
  }, []);

  const totalScans = scans.length || 1248;
  const criticalIssues = scans.reduce((acc, scan) => acc + (scan.issues?.filter((i: any) => i.severity === 'Critical').length || 0), 0) || 4;
  const avgRisk = scans.length > 0 ? Math.round(scans.reduce((acc, scan) => acc + scan.overall_risk_score, 0) / scans.length) : 38;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-space-grotesk font-bold">Dashboard</h1>
          <p className="text-text-secondary mt-1">Overview of your project release safety metrics.</p>
        </div>
        <Link href="/analyze" className="bg-primary hover:bg-primary/90 text-background px-6 py-2 rounded-full font-semibold transition-all">
          New Scan
        </Link>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: "Total Projects", value: "1", icon: <BarChart3 className="text-primary h-6 w-6" /> },
          { title: "Total Scans", value: totalScans.toString(), icon: <Activity className="text-primary h-6 w-6" /> },
          { title: "Critical Issues", value: criticalIssues.toString(), icon: <ShieldAlert className="text-critical h-6 w-6" /> },
          { title: "Avg Risk Score", value: avgRisk.toString(), icon: <AlertTriangle className="text-warning h-6 w-6" /> },
        ].map((metric, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-card border border-white/5 p-6 rounded-2xl flex items-center justify-between"
          >
            <div>
              <p className="text-text-secondary text-sm mb-1">{metric.title}</p>
              <h3 className="text-3xl font-bold">{metric.value}</h3>
            </div>
            <div className="bg-secondary p-3 rounded-xl">{metric.icon}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Risk Trend Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-card border border-white/5 p-6 rounded-2xl lg:col-span-2"
        >
          <h3 className="text-xl font-semibold mb-6">Average Risk Score Trend</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockRiskData}>
                <defs>
                  <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00E5FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                <XAxis dataKey="name" stroke="#9ca3af" axisLine={false} tickLine={false} />
                <YAxis stroke="#9ca3af" axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#101827', border: '1px solid #1f2937', borderRadius: '8px' }}
                  itemStyle={{ color: '#00E5FF' }}
                />
                <Area type="monotone" dataKey="risk" stroke="#00E5FF" strokeWidth={3} fillOpacity={1} fill="url(#colorRisk)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-card border border-white/5 p-6 rounded-2xl"
        >
          <h3 className="text-xl font-semibold mb-6">Recent Activity</h3>
          <div className="flex flex-col gap-4">
            {loading ? (
              <p className="text-sm text-text-secondary">Loading activity...</p>
            ) : scans.slice(0, 5).map((scan, idx) => (
              <div key={idx} className="flex items-start gap-3 pb-4 border-b border-white/5 last:border-0 last:pb-0 cursor-pointer hover:bg-white/5 p-2 rounded-xl transition-colors" onClick={() => window.location.href = `/results/${scan.id}`}>
                <div className="mt-1 bg-secondary p-1.5 rounded-full">
                  {scan.overall_risk_score < 50 ? <ShieldAlert className="text-critical h-4 w-4" /> : scan.overall_risk_score >= 80 ? <CheckCircle2 className="text-success h-4 w-4" /> : <AlertTriangle className="text-warning h-4 w-4" />}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium">{scan.project_name}</p>
                    <span className={`text-xs font-bold ${scan.overall_risk_score < 50 ? 'text-critical' : scan.overall_risk_score >= 80 ? 'text-success' : 'text-warning'}`}>Risk: {scan.overall_risk_score}</span>
                  </div>
                  <p className="text-xs text-text-secondary mt-1">Issues: {scan.issues?.length || 0}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
