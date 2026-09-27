"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldCheck, Menu, X } from "lucide-react";
import { motion } from "framer-motion";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md border-b border-card" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <ShieldCheck className="h-8 w-8 text-primary group-hover:text-accent transition-colors" />
            <span className="font-space-grotesk text-xl font-bold tracking-tight text-foreground">
              ShipSafe <span className="text-primary">AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-text-secondary hover:text-primary transition-colors">Home</Link>
            <Link href="/#features" className="text-sm font-medium text-text-secondary hover:text-primary transition-colors">Features</Link>
            <Link href="/#how-it-works" className="text-sm font-medium text-text-secondary hover:text-primary transition-colors">How It Works</Link>
            <Link href="/dashboard" className="text-sm font-medium text-text-secondary hover:text-primary transition-colors">Dashboard</Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/signin" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Sign In</Link>
            <Link href="/dashboard" className="bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 px-5 py-2 rounded-full text-sm font-medium transition-all shadow-[0_0_15px_rgba(0,229,255,0.15)] hover:shadow-[0_0_25px_rgba(0,229,255,0.3)]">
              Get Started
            </Link>
            <div className="h-6 w-px bg-white/10 mx-2"></div>
            <Link href="/profile" className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary border border-white/10 hover:border-primary/50 hover:bg-primary/10 transition-all text-text-secondary hover:text-primary overflow-hidden">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden text-foreground" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="md:hidden bg-secondary border-b border-card"
        >
          <div className="flex flex-col px-4 py-4 gap-4">
            <Link href="/" className="text-sm font-medium text-foreground">Home</Link>
            <Link href="/#features" className="text-sm font-medium text-foreground">Features</Link>
            <Link href="/dashboard" className="text-sm font-medium text-foreground">Dashboard</Link>
            <Link href="/profile" className="text-sm font-medium text-foreground">Profile</Link>
            <div className="h-px bg-card my-2" />
            <Link href="/signin" className="text-sm font-medium text-foreground">Sign In</Link>
            <Link href="/dashboard" className="text-sm font-medium text-primary">Get Started</Link>
          </div>
        </motion.div>
      )}
    </header>
  );
}
