"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, Search, Lock, Package, Activity, 
  CheckCircle2, Bot, ArrowRight, ShieldAlert, Check
} from "lucide-react";

const nodes = [
  { id: "analysis", label: "Code Analysis", icon: Search, angle: -90, radius: 140, color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/30", desc: "Deep AST parsing & logic inspection" },
  { id: "security", label: "Security", icon: Lock, angle: -40, radius: 160, color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/30", desc: "Vulnerability & secrets detection" },
  { id: "deps", label: "Dependencies", icon: Package, angle: 15, radius: 150, color: "text-cyan-400", bg: "bg-cyan-400/10", border: "border-cyan-400/30", desc: "Supply chain risk assessment" },
  { id: "reliability", label: "Reliability", icon: Activity, angle: 70, radius: 170, color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/30", desc: "Failure simulation & resilience" },
  { id: "tests", label: "Tests", icon: CheckCircle2, angle: 130, radius: 150, color: "text-green-400", bg: "bg-green-400/10", border: "border-green-400/30", desc: "Automated regression testing" },
  { id: "ai", label: "AI / IBM Bob", icon: Bot, angle: 180, radius: 160, color: "text-pink-400", bg: "bg-pink-400/10", border: "border-pink-400/30", desc: "AI-assisted code remediation" },
  { id: "release", label: "Release Gate", icon: ShieldCheck, angle: 230, radius: 140, color: "text-primary", bg: "bg-primary/10", border: "border-primary/30", desc: "Final deployment verification" },
];

const statuses = [
  { text: "Scanning...", label: "RELEASE ANALYSIS", color: "text-blue-400", bg: "bg-blue-400/20" },
  { text: "12 ISSUES DETECTED", label: "RISK ASSESSMENT", color: "text-warning", bg: "bg-warning/20" },
  { text: "AI REMEDIATION", label: "IBM BOB ACTIVE", color: "text-pink-400", bg: "bg-pink-400/20" },
  { text: "REGRESSION TESTS", label: "VALIDATING FIXES", color: "text-purple-400", bg: "bg-purple-400/20" },
  { text: "RE-ANALYSIS", label: "FINAL VERIFICATION", color: "text-cyan-400", bg: "bg-cyan-400/20" },
  { text: "RELEASE READY", label: "APPROVED", color: "text-success", bg: "bg-success/20" },
];

export function Shield3D() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [statusIndex, setStatusIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % statuses.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[500px] lg:h-[600px] flex items-center justify-center perspective-1000"
    >
      <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

      <motion.div 
        animate={{ x: mousePos.x, y: mousePos.y }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        className="relative w-full max-w-[500px] aspect-square flex items-center justify-center"
      >
        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" style={{ zIndex: 0 }}>
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#00E5FF" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#D946EF" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          {nodes.map((node) => {
            const rad = (node.angle * Math.PI) / 180;
            const x2 = 250 + Math.cos(rad) * node.radius;
            const y2 = 250 + Math.sin(rad) * node.radius;
            const isHovered = hoveredNode === node.id;
            
            return (
              <g key={`line-${node.id}`}>
                <line 
                  x1="250" y1="250" x2={x2} y2={y2} 
                  stroke="url(#lineGradient)" 
                  strokeWidth={isHovered ? 2 : 1}
                  className="transition-all duration-300"
                  opacity={hoveredNode ? (isHovered ? 1 : 0.2) : 0.6}
                />
                
                <circle r={isHovered ? 3 : 2} fill="#00E5FF" opacity={hoveredNode && !isHovered ? 0 : 0.8}>
                  <animateMotion 
                    dur={`${2 + Math.random()}s`} 
                    repeatCount="indefinite" 
                    path={`M 250 250 L ${x2} ${y2}`}
                  />
                </circle>
              </g>
            );
          })}
        </svg>

        <div className="absolute z-10 flex items-center justify-center">
          <motion.div 
            animate={{ scale: [1, 1.05, 1], boxShadow: ["0 0 20px rgba(0, 229, 255, 0.2)", "0 0 40px rgba(0, 229, 255, 0.4)", "0 0 20px rgba(0, 229, 255, 0.2)"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-24 h-24 rounded-full bg-[#0B1220] border-2 border-primary/50 flex items-center justify-center shadow-xl backdrop-blur-md relative"
          >
            <div className="absolute inset-2 rounded-full border border-primary/30 border-dashed animate-[spin_10s_linear_infinite]" />
            <div className="absolute inset-4 rounded-full border border-purple-500/30 animate-[spin_15s_linear_infinite_reverse]" />
            
            <ShieldCheck className="w-10 h-10 text-primary drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]" />
          </motion.div>
        </div>

        {nodes.map((node) => {
          const rad = (node.angle * Math.PI) / 180;
          const isHovered = hoveredNode === node.id;
          
          return (
            <motion.div
              key={node.id}
              className="absolute z-20 flex items-center justify-center"
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{ 
                x: Math.cos(rad) * node.radius, 
                y: Math.sin(rad) * node.radius,
                opacity: hoveredNode ? (isHovered ? 1 : 0.3) : 1
              }}
              transition={{ 
                x: { type: "spring", stiffness: 50, damping: 15 },
                y: { type: "spring", stiffness: 50, damping: 15 },
                opacity: { duration: 0.3 }
              }}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <motion.div 
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: "easeInOut", delay: Math.random() }}
                className="relative cursor-pointer group"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-md border transition-all duration-300 ${isHovered ? `${node.bg} ${node.border} scale-110 shadow-[0_0_15px_rgba(255,255,255,0.1)]` : 'bg-card/80 border-white/10 hover:border-white/30'}`}>
                  <node.icon className={`w-5 h-5 ${isHovered ? node.color : 'text-text-secondary'}`} />
                </div>

                <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-max bg-card border border-white/10 p-3 rounded-lg shadow-xl backdrop-blur-md transition-all duration-300 pointer-events-none ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
                  <p className={`text-sm font-bold ${node.color} mb-0.5`}>{node.label}</p>
                  <p className="text-xs text-text-secondary">{node.desc}</p>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="absolute bottom-4 right-4 lg:bottom-10 lg:right-10 z-30">
        <div className="bg-card/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl min-w-[220px]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-bold tracking-wider text-text-secondary uppercase">
              {statuses[statusIndex].label}
            </span>
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={statusIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3"
            >
              <div className={`p-1.5 rounded-lg ${statuses[statusIndex].bg}`}>
                {statusIndex === 1 ? <ShieldAlert className={`w-4 h-4 ${statuses[statusIndex].color}`} /> : 
                 statusIndex === 5 ? <Check className={`w-4 h-4 ${statuses[statusIndex].color}`} /> :
                 <Activity className={`w-4 h-4 ${statuses[statusIndex].color}`} />}
              </div>
              <span className={`text-sm font-bold ${statuses[statusIndex].color}`}>
                {statuses[statusIndex].text}
              </span>
            </motion.div>
          </AnimatePresence>
          
          <div className="mt-3 h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              key={`progress-${statusIndex}`}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, ease: "linear" }}
              className={`h-full ${statusIndex === 1 ? 'bg-warning' : statusIndex === 5 ? 'bg-success' : 'bg-primary'}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
