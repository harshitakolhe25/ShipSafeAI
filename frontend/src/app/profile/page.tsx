"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  User, Mail, Building, MapPin, ShieldAlert, Key, 
  Bell, Activity, LogOut, CheckCircle2, ShieldCheck,
  Smartphone, Laptop, Globe, Code2
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Demo user data
  const [profile, setProfile] = useState({
    name: "Alex Developer",
    email: "alex@company.com",
    role: "Senior Software Engineer",
    organization: "Acme Corp",
    location: "San Francisco, CA",
    bio: "Passionate about writing secure code and automating release safety checks."
  });

  const [toggles, setToggles] = useState({
    emailNotif: true,
    securityAlerts: true,
    releaseNotif: false,
    twoFactor: true
  });

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsSaving(false);
    setIsEditing(false);
  };

  const handleSignOut = () => {
    router.push("/");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-space-grotesk font-bold">User Profile</h1>
          <p className="text-text-secondary mt-1">Manage your account settings and security preferences.</p>
        </div>
        <div className="flex gap-3">
          {isEditing ? (
            <>
              <button onClick={() => setIsEditing(false)} className="px-5 py-2 rounded-xl font-semibold border border-white/10 hover:bg-secondary transition-all text-sm">
                Cancel
              </button>
              <button 
                onClick={handleSave} 
                disabled={isSaving}
                className="bg-primary hover:bg-primary/90 text-background px-5 py-2 rounded-xl font-bold transition-all text-sm shadow-[0_0_15px_rgba(0,229,255,0.2)] disabled:opacity-50"
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setIsEditing(true)} className="bg-secondary border border-white/5 hover:border-primary/50 text-foreground px-5 py-2 rounded-xl font-semibold transition-all text-sm">
                Edit Profile
              </button>
              <button onClick={handleSignOut} className="bg-critical/10 border border-critical/30 text-critical hover:bg-critical/20 px-5 py-2 rounded-xl font-semibold transition-all text-sm flex items-center gap-2">
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Profile Info */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* Header Card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-white/5 p-6 rounded-2xl text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-primary/20 to-transparent pointer-events-none" />
            
            <div className="relative inline-block mb-4 mt-4">
              <div className="w-24 h-24 rounded-full bg-secondary border-4 border-background flex items-center justify-center text-4xl font-space-grotesk text-primary shadow-xl">
                {profile.name.charAt(0)}
              </div>
              <div className="absolute bottom-1 right-1 w-5 h-5 bg-success rounded-full border-2 border-background flex items-center justify-center" title="Verified Account">
                <CheckCircle2 className="w-3 h-3 text-background" />
              </div>
            </div>
            
            <h2 className="text-xl font-bold">{profile.name}</h2>
            <p className="text-text-secondary text-sm mb-4">{profile.role}</p>
            
            <div className="flex flex-col gap-3 text-sm text-left mt-6 pt-6 border-t border-white/5">
              <div className="flex items-center gap-3 text-text-secondary">
                <Mail className="w-4 h-4 shrink-0 text-primary" /> 
                <span className="truncate">{profile.email}</span>
              </div>
              <div className="flex items-center gap-3 text-text-secondary">
                <Building className="w-4 h-4 shrink-0 text-primary" /> 
                <span>{profile.organization}</span>
              </div>
              <div className="flex items-center gap-3 text-text-secondary">
                <MapPin className="w-4 h-4 shrink-0 text-primary" /> 
                <span>{profile.location}</span>
              </div>
            </div>
          </motion.div>

          {/* Security Status */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card border border-white/5 p-6 rounded-2xl">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-success" /> Security Status
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <p className="font-medium">Two-Factor Auth</p>
                  <p className="text-xs text-text-secondary">Authenticator App</p>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-semibold ${toggles.twoFactor ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'}`}>
                  {toggles.twoFactor ? 'Enabled' : 'Disabled'}
                </div>
              </div>
              
              <div className="pt-4 border-t border-white/5">
                <p className="text-sm font-medium mb-2">Active Sessions</p>
                <div className="flex items-center gap-3 mb-3">
                  <Laptop className="w-8 h-8 text-text-secondary p-1.5 bg-secondary rounded-lg" />
                  <div>
                    <p className="text-xs font-semibold">MacBook Pro - Chrome</p>
                    <p className="text-[10px] text-text-secondary flex items-center gap-1"><Globe className="w-3 h-3" /> San Francisco • Active now</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 opacity-60">
                  <Smartphone className="w-8 h-8 text-text-secondary p-1.5 bg-secondary rounded-lg" />
                  <div>
                    <p className="text-xs font-semibold">iPhone 14 Pro - Safari</p>
                    <p className="text-[10px] text-text-secondary flex items-center gap-1"><Globe className="w-3 h-3" /> San Francisco • 2h ago</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Right Column - Forms & Activity */}
        <div className="lg:col-span-2 space-y-8">
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card border border-white/5 p-6 md:p-8 rounded-2xl">
            <h3 className="font-semibold mb-6 text-lg flex items-center gap-2">
              <User className="w-5 h-5 text-primary" /> Profile Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5 ml-1">Full Name</label>
                <input 
                  type="text" 
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                  disabled={!isEditing}
                  className="w-full bg-background border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary disabled:opacity-70 disabled:cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5 ml-1">Email Address</label>
                <input 
                  type="email" 
                  value={profile.email}
                  disabled
                  className="w-full bg-secondary border border-white/5 rounded-xl px-4 py-2.5 text-sm opacity-60 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5 ml-1">Role</label>
                <input 
                  type="text" 
                  value={profile.role}
                  onChange={(e) => setProfile({...profile, role: e.target.value})}
                  disabled={!isEditing}
                  className="w-full bg-background border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary disabled:opacity-70 disabled:cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5 ml-1">Organization</label>
                <input 
                  type="text" 
                  value={profile.organization}
                  onChange={(e) => setProfile({...profile, organization: e.target.value})}
                  disabled={!isEditing}
                  className="w-full bg-background border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary disabled:opacity-70 disabled:cursor-not-allowed"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-text-secondary mb-1.5 ml-1">Bio</label>
                <textarea 
                  value={profile.bio}
                  onChange={(e) => setProfile({...profile, bio: e.target.value})}
                  disabled={!isEditing}
                  rows={3}
                  className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary disabled:opacity-70 disabled:cursor-not-allowed resize-none"
                />
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-card border border-white/5 p-6 md:p-8 rounded-2xl">
            <h3 className="font-semibold mb-6 text-lg flex items-center gap-2">
              <Bell className="w-5 h-5 text-accent" /> Preferences
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-background border border-white/5 rounded-xl">
                <div>
                  <p className="text-sm font-medium">Email Notifications</p>
                  <p className="text-xs text-text-secondary mt-0.5">Receive weekly summary reports.</p>
                </div>
                <button 
                  disabled={!isEditing}
                  onClick={() => setToggles({...toggles, emailNotif: !toggles.emailNotif})}
                  className={`w-11 h-6 rounded-full flex items-center transition-colors px-1 disabled:opacity-70 ${toggles.emailNotif ? 'bg-primary' : 'bg-secondary border border-white/10'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${toggles.emailNotif ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-background border border-white/5 rounded-xl">
                <div>
                  <p className="text-sm font-medium">Critical Security Alerts</p>
                  <p className="text-xs text-text-secondary mt-0.5">Immediate notifications for critical vulnerabilities.</p>
                </div>
                <button 
                  disabled={!isEditing}
                  onClick={() => setToggles({...toggles, securityAlerts: !toggles.securityAlerts})}
                  className={`w-11 h-6 rounded-full flex items-center transition-colors px-1 disabled:opacity-70 ${toggles.securityAlerts ? 'bg-critical' : 'bg-secondary border border-white/10'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${toggles.securityAlerts ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Activity Feed */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-card border border-white/5 p-6 md:p-8 rounded-2xl">
            <h3 className="font-semibold mb-6 text-lg flex items-center gap-2">
              <Activity className="w-5 h-5 text-success" /> Recent Activity (Demo)
            </h3>
            
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
              {[
                { title: "Release Report Created", desc: "Demo Project v2.4.1", time: "2 hours ago", color: "text-success", icon: <CheckCircle2 className="w-4 h-4" /> },
                { title: "Regression Tests Generated", desc: "Payment Retry Logic Fix", time: "Yesterday", color: "text-primary", icon: <Code2 className="w-4 h-4" /> },
                { title: "Critical Issue Reviewed", desc: "SQL Injection in db_queries.ts", time: "2 days ago", color: "text-critical", icon: <ShieldAlert className="w-4 h-4" /> },
                { title: "Code Scan Completed", desc: "Demo Project manual scan", time: "3 days ago", color: "text-text-secondary", icon: <Activity className="w-4 h-4" /> },
              ].map((act, i) => (
                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full border-4 border-card bg-secondary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 ${act.color}`}>
                    {act.icon}
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-background border border-white/5 p-4 rounded-xl shadow">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-sm">{act.title}</h4>
                      <span className="text-xs text-text-secondary ml-2">{act.time}</span>
                    </div>
                    <p className="text-xs text-text-secondary">{act.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </motion.div>

        </div>
      </div>
    </div>
  );
}
