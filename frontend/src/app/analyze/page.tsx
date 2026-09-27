"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Editor from "@monaco-editor/react";
import { Play, Upload, Code2, ShieldAlert, Cpu, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

const sampleCodes: Record<string, string> = {
  javascript: `// Sample vulnerable payment retry logic
async function processPayment(user, amount) {
  let retryCount = 0;
  
  while (retryCount < 5) {
    try {
      const response = await externalPaymentGateway.charge(user.id, amount);
      if (response.success) {
        await db.query(\`UPDATE users SET balance = balance - \${amount} WHERE id = \${user.id}\`);
        return true;
      }
    } catch (error) {
      // Timeout without circuit breaker
      console.error("Payment failed, retrying...");
      retryCount++;
    }
  }
  return false;
}`,
  python: `# Sample vulnerable SQL query
def get_user_data(username):
    # Vulnerable to SQL injection
    query = f"SELECT * FROM users WHERE username = '{username}'"
    
    conn = db.connect()
    cursor = conn.cursor()
    cursor.execute(query)
    
    return cursor.fetchall()`,
  java: `// Sample vulnerable Java code
public class UserService {
    public void authenticateUser(String username, String password) {
        // Hardcoded secret
        String apiSecret = "super_secret_key_12345";
        
        String query = "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'";
        db.execute(query);
    }
}`,
  cpp: `// Sample vulnerable C++ code
void processRequest(char* input) {
    char buffer[50];
    // Vulnerable to buffer overflow
    strcpy(buffer, input);
    printf("Processing: %s\\n", buffer);
}`,
  go: `// Sample vulnerable Go code
func handler(w http.ResponseWriter, r *http.Request) {
    username := r.URL.Query().Get("username")
    // Vulnerable to SQL injection
    query := fmt.Sprintf("SELECT * FROM users WHERE username = '%s'", username)
    db.Exec(query)
}`,
  rust: `// Sample Rust code
fn main() {
    let api_key = "12345-abcde-secret-token"; // Hardcoded secret
    println!("Connecting with key: {}", api_key);
}`
};

export default function Analyze() {
  const router = useRouter();
  const [language, setLanguage] = useState<string>("javascript");
  const [code, setCode] = useState(sampleCodes.javascript);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStep, setScanStep] = useState("");
  const [fileName, setFileName] = useState("payment_service.js");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    
    // Auto-detect simple languages from extension
    if (file.name.endsWith(".py")) setLanguage("python");
    else if (file.name.endsWith(".java")) setLanguage("java");
    else if (file.name.endsWith(".cpp") || file.name.endsWith(".c") || file.name.endsWith(".cc")) setLanguage("cpp");
    else if (file.name.endsWith(".go")) setLanguage("go");
    else if (file.name.endsWith(".rs")) setLanguage("rust");
    else setLanguage("javascript");

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === "string") {
        setCode(content);
      }
    };
    reader.readAsText(file);
    
    // Reset input so the same file can be uploaded again if needed
    e.target.value = '';
  };
  
  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    setCode(sampleCodes[lang] || sampleCodes.javascript);
    
    const extensions: Record<string, string> = {
      javascript: "payment_service.js",
      python: "db_queries.py",
      java: "UserService.java",
      cpp: "main.cpp",
      go: "handler.go",
      rust: "main.rs"
    };
    setFileName(extensions[lang] || "file.txt");
  };

  const handleAnalyze = async () => {
    setIsScanning(true);
    setScanProgress(0);
    
    const steps = [
      "Initializing AI models...",
      "Parsing AST...",
      "Running semantic analysis...",
      "Simulating failure paths...",
      "Generating report..."
    ];

    for (let i = 0; i < steps.length; i++) {
      setScanStep(steps[i]);
      setScanProgress((i + 1) * 20);
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    try {
      const response = await fetch("http://localhost:8000/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: code,
          language: language,
          file_name: fileName,
          config: {}
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        router.push(`/results/${data.id}`);
      } else {
        console.error("Backend returned error, falling back to demo");
        router.push("/results/demo-scan-123");
      }
    } catch (error) {
      console.error("Backend not reachable, falling back to demo");
      router.push("/results/demo-scan-123");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 h-[calc(100vh-80px)] flex flex-col">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-space-grotesk font-bold">Code Analysis Workspace</h1>
          <p className="text-text-secondary mt-1">Submit code for AI-powered vulnerability and risk assessment.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-grow min-h-0">
        
        {/* Sidebar Configuration */}
        <div className="lg:col-span-1 bg-card border border-white/5 rounded-2xl p-6 flex flex-col">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" /> Configuration
          </h3>
          
          <div className="space-y-6 flex-grow">
            <div>
              <label className="text-sm text-text-secondary mb-2 block">Language</label>
              <select 
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="w-full bg-secondary border border-card-border rounded-lg p-2 text-sm focus:outline-none focus:border-primary"
              >
                <option value="javascript">JavaScript / TypeScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
                <option value="go">Go</option>
                <option value="rust">Rust</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-text-secondary mb-2 block">Analysis Modules</label>
              <div className="space-y-3">
                {[
                  { id: 'bug', label: 'Bug Detection', icon: <Cpu className="w-4 h-4 text-primary" /> },
                  { id: 'sec', label: 'Security Analysis', icon: <ShieldAlert className="w-4 h-4 text-critical" /> },
                  { id: 'dep', label: 'Dependency Analysis', icon: <Code2 className="w-4 h-4 text-accent" /> },
                ].map(mod => (
                  <label key={mod.id} className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="accent-primary w-4 h-4 bg-secondary border-card-border" />
                    <span className="text-sm flex items-center gap-2">{mod.icon} {mod.label}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="pt-4 border-t border-white/5">
              <label className="text-sm text-text-secondary mb-2 block">Repository URL (Optional)</label>
              <input 
                type="text" 
                placeholder="https://github.com/org/repo" 
                className="w-full bg-secondary border border-card-border rounded-lg p-2 text-sm focus:outline-none focus:border-primary placeholder:text-text-secondary/50"
              />
            </div>
          </div>

          <button 
            onClick={handleAnalyze}
            disabled={isScanning}
            className="w-full bg-primary hover:bg-primary/90 text-background py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isScanning ? (
              <span className="animate-pulse">Analyzing...</span>
            ) : (
              <><Play className="w-4 h-4" /> Analyze Code</>
            )}
          </button>
        </div>

        {/* Editor Area */}
        <div className="lg:col-span-3 bg-[#1e1e1e] border border-white/5 rounded-2xl overflow-hidden flex flex-col relative">
          <div className="bg-[#2d2d2d] px-4 py-2 flex items-center justify-between border-b border-[#404040]">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-critical"></div>
              <div className="w-3 h-3 rounded-full bg-warning"></div>
              <div className="w-3 h-3 rounded-full bg-success"></div>
            </div>
            <div className="text-xs text-text-secondary font-mono flex items-center gap-2">
              <Code2 className="w-3 h-3" /> {fileName}
            </div>
            <div>
              <input 
                type="file" 
                id="file-upload" 
                className="hidden" 
                onChange={handleFileUpload} 
                accept=".js,.ts,.py,.jsx,.tsx,.json,.md,.txt,.java,.cpp,.go,.rs"
              />
              <label 
                htmlFor="file-upload"
                className="text-xs text-text-secondary hover:text-foreground flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Upload className="w-3 h-3" /> Upload File
              </label>
            </div>
          </div>
          
          <div className="flex-grow relative">
            <Editor
              height="100%"
              language={language}
              theme="vs-dark"
              value={code}
              onChange={(v) => setCode(v || "")}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: "var(--font-jetbrains-mono)",
                padding: { top: 16 },
                scrollBeyondLastLine: false,
                smoothScrolling: true,
              }}
            />

            {/* Scanning Overlay */}
            {isScanning && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center z-10"
              >
                <div className="w-64">
                  <div className="flex justify-between text-sm mb-2 font-mono text-primary">
                    <span>{scanStep}</span>
                    <span>{scanProgress}%</span>
                  </div>
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${scanProgress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  
                  {/* Scan line effect */}
                  <motion.div 
                    className="absolute inset-0 w-full h-[2px] bg-primary/50 shadow-[0_0_15px_#00E5FF]"
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  />
                </div>
              </motion.div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
