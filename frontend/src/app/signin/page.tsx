"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Eye, EyeOff, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    // Simulate demo login delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Demo Mode logic: Accept any valid-looking format
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setIsLoading(false);
      return;
    }

    // Success -> redirect
    router.push("/dashboard");
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent/10 blur-[100px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-card/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl relative z-10"
      >
        <div className="flex flex-col items-center text-center mb-8">
          <Link href="/" className="flex items-center justify-center w-12 h-12 bg-background border border-white/5 rounded-2xl mb-6 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
            <ShieldCheck className="h-6 w-6 text-primary" />
          </Link>
          <h1 className="text-2xl font-space-grotesk font-bold text-foreground">Welcome Back</h1>
          <p className="text-text-secondary text-sm mt-2">Sign in to your ShipSafe AI dashboard.</p>
          
          <div className="mt-4 bg-warning/10 border border-warning/20 px-3 py-1 rounded-full text-xs font-semibold text-warning flex items-center gap-2">
            <AlertCircle className="w-3 h-3" /> Demo Mode Enabled
          </div>
        </div>

        <form onSubmit={handleSignIn} className="space-y-5">
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-critical/10 border border-critical/30 text-critical text-sm px-4 py-3 rounded-xl flex items-start gap-2"
            >
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <p>{error}</p>
            </motion.div>
          )}

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5 ml-1">Email Address</label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="developer@company.com"
              className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-text-secondary/30"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5 ml-1">
              <label className="block text-sm font-medium text-text-secondary">Password</label>
              <Link href="#" className="text-xs text-primary hover:text-primary/80 transition-colors">Forgot Password?</Link>
            </div>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-background border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-text-secondary/30"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-foreground transition-colors p-1"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 ml-1">
            <input 
              type="checkbox" 
              id="remember" 
              className="w-4 h-4 rounded bg-background border-white/10 accent-primary cursor-pointer"
            />
            <label htmlFor="remember" className="text-sm text-text-secondary cursor-pointer select-none">Remember me for 30 days</label>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary/90 text-background py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(0,229,255,0.2)] mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Authenticating...</>
            ) : (
              <>Sign In <ArrowRight className="w-4 h-4" /></>
            )}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-white/5 pt-6">
          <p className="text-sm text-text-secondary">
            Don't have an account? <Link href="/dashboard" className="text-foreground font-semibold hover:text-primary transition-colors">Get Started</Link>
          </p>
          <Link href="/" className="inline-block text-xs text-text-secondary/60 hover:text-foreground transition-colors mt-4">
            ← Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
