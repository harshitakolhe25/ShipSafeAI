import Link from "next/link";
import { ShieldCheck, Mail, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary border-t border-card py-12 mt-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <span className="font-space-grotesk text-lg font-bold tracking-tight text-foreground">
                ShipSafe <span className="text-primary">AI</span>
              </span>
            </Link>
            <p className="text-text-secondary text-sm max-w-xs mb-6">
              Your AI-powered release safety engineer. Detect risks, simulate failures, fix issues, and validate every release.
            </p>
            <div className="flex items-center gap-4 text-text-secondary">
              <Globe className="h-5 w-5 hover:text-foreground cursor-pointer transition-colors" />
              <Mail className="h-5 w-5 hover:text-foreground cursor-pointer transition-colors" />
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Product</h4>
            <ul className="flex flex-col gap-2 text-sm text-text-secondary">
              <li><Link href="/dashboard" className="hover:text-primary transition-colors">Features</Link></li>
              <li><Link href="/analyze" className="hover:text-primary transition-colors">Code Analysis</Link></li>
              <li><Link href="/simulator" className="hover:text-primary transition-colors">Failure Simulator</Link></li>
              <li><Link href="/fix" className="hover:text-primary transition-colors">AI Fixes</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="flex flex-col gap-2 text-sm text-text-secondary">
              <li><Link href="#" className="hover:text-primary transition-colors">About</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Documentation</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-card flex flex-col md:flex-row items-center justify-between text-sm text-text-secondary">
          <p>© {new Date().getFullYear()} ShipSafe AI. All rights reserved.</p>
          <p className="mt-2 md:mt-0 flex items-center gap-2">
            Built with <span className="text-primary">AI</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
