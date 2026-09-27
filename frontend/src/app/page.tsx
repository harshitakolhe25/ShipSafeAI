"use client";

import { motion } from "framer-motion";
import { Shield3D } from "@/components/hero/Shield3D";
import { ShieldAlert, Cpu, GitBranch, Terminal, Activity, ArrowRight, Zap, Beaker, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: <Cpu className="h-6 w-6 text-primary" />,
    title: "AI Code Analysis",
    description: "Deep semantic understanding of your code to identify complex logical flaws."
  },
  {
    icon: <ShieldAlert className="h-6 w-6 text-critical" />,
    title: "Security Vulnerability Detection",
    description: "Identify OWASP Top 10 vulnerabilities before they reach production."
  },
  {
    icon: <GitBranch className="h-6 w-6 text-accent" />,
    title: "Dependency Risk Analysis",
    description: "Map and analyze the health of your entire software supply chain."
  },
  {
    icon: <Beaker className="h-6 w-6 text-success" />,
    title: "Test Coverage Analysis",
    description: "Intelligently identify missing test cases in critical business paths."
  },
  {
    icon: <Activity className="h-6 w-6 text-warning" />,
    title: "Failure Simulation",
    description: "Simulate external service outages and resource limits safely."
  },
  {
    icon: <Zap className="h-6 w-6 text-primary" />,
    title: "AI-Powered Fix Suggestions",
    description: "Get one-click fix recommendations tailored to your codebase."
  }
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 3D Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32 min-h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/cubes.png')] opacity-5" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 z-20"
            >
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-space-grotesk font-bold leading-tight mb-6 text-foreground max-w-2xl">
                Ship Code With <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Confidence.</span>
              </h1>
              <p className="text-lg lg:text-xl text-text-secondary mb-10 max-w-xl leading-relaxed">
                Your AI-powered release safety engineer. Detect risks, simulate failures, fix issues, and validate every release before it reaches production.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/analyze" className="bg-primary hover:bg-primary/90 text-background px-8 py-4 rounded-full font-semibold text-center transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,229,255,0.4)]">
                  <Terminal className="h-5 w-5" /> Analyze Your Code
                </Link>
                <Link href="/dashboard" className="bg-card border border-card-border hover:border-primary/50 text-foreground px-8 py-4 rounded-full font-semibold text-center transition-all flex items-center justify-center gap-2">
                  Explore Live Demo <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="lg:col-span-5 relative h-[400px] lg:h-[500px] mt-8 lg:mt-0 flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
                <Shield3D />
              </div>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 border-y border-card bg-secondary/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70">
            <div className="flex items-center gap-2 text-sm font-semibold tracking-widest uppercase">
              <CheckCircle2 className="h-5 w-5 text-success" /> AI-Powered Analysis
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold tracking-widest uppercase">
              <CheckCircle2 className="h-5 w-5 text-success" /> Security Detection
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold tracking-widest uppercase">
              <CheckCircle2 className="h-5 w-5 text-success" /> Regression Tests
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold tracking-widest uppercase">
              <CheckCircle2 className="h-5 w-5 text-success" /> Release Readiness
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 relative" id="problem">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-3xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-space-grotesk font-bold mb-6"
          >
            Production Bugs Should <span className="text-critical">Never Be a Surprise.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-text-secondary text-lg mb-12"
          >
            Hidden bugs, security vulnerabilities, dependency risks, and missing tests cost engineering teams millions. ShipSafe AI identifies these before your users do.
          </motion.p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-secondary/30 relative" id="features">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-space-grotesk font-bold mb-4">Comprehensive Safety</h2>
            <p className="text-text-secondary">Everything you need to ship with confidence.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-card border border-white/5 p-8 rounded-2xl hover:border-primary/30 transition-colors group"
              >
                <div className="bg-background w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-text-secondary mb-6">{feature.description}</p>
                <Link href="/analyze" className="text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn More <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Workflow Section */}
      <section className="py-24 relative" id="how-it-works">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-space-grotesk font-bold mb-4">Continuous Safety Workflow</h2>
            <p className="text-text-secondary">A seamless integration from code change to production release.</p>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-card -z-10" />
            
            {["Code Upload", "AI Analysis", "Risk Detection", "Failure Simulation", "AI Fix", "Regression Testing", "Release Report"].map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center gap-4 bg-background p-4 rounded-xl w-full lg:w-40 text-center border border-card"
              >
                <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
                  {idx + 1}
                </div>
                <span className="font-semibold text-sm">{step}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* IBM Bob Integration Section */}
      <section className="py-24 bg-gradient-to-b from-secondary to-background border-t border-card">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-4xl">
          <div className="inline-block bg-accent/20 text-accent px-4 py-1 rounded-full text-sm font-semibold mb-6">
            AI Collaboration
          </div>
          <h2 className="text-3xl md:text-5xl font-space-grotesk font-bold mb-6">
            From Risk Detection to <span className="text-accent">AI-Assisted Fixes.</span>
          </h2>
          <p className="text-text-secondary text-lg mb-10">
            ShipSafe AI identifies potential issues and coordinates an AI-assisted workflow to help developers understand, fix, and validate code changes using IBM Bob.
          </p>
          <div className="flex justify-center mb-10 opacity-70">
            <div className="flex items-center gap-4">
              <span className="font-semibold">Detected Issue</span>
              <ArrowRight className="w-4 h-4" />
              <span className="font-semibold text-accent">IBM Bob</span>
              <ArrowRight className="w-4 h-4" />
              <span className="font-semibold text-primary">Suggested Fix</span>
              <ArrowRight className="w-4 h-4" />
              <span className="font-semibold text-success">Validation</span>
            </div>
          </div>
          <Link href="/fix" className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-full font-semibold transition-all">
            Explore Integration <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 relative text-center">
        <div className="absolute inset-0 bg-primary/5 blur-[150px] -z-10" />
        <h2 className="text-4xl md:text-6xl font-space-grotesk font-bold mb-8">
          Make Every Release a <br/> <span className="text-primary">Confident Release.</span>
        </h2>
        <Link href="/analyze" className="inline-block bg-primary hover:bg-primary/90 text-background px-10 py-5 rounded-full font-bold text-lg shadow-[0_0_30px_rgba(0,229,255,0.4)] transition-all transform hover:scale-105">
          Start Your First Scan
        </Link>
      </section>

    </div>
  );
}
