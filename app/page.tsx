"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";

export default function PrivaPayApp() {
  // --- GLOBAL STATE ---
  const [activeView, setActiveView] = useState<"employer" | "employee">("employer");

  // --- EMPLOYER STATE & DATA ---
  const [isMultiSig, setIsMultiSig] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);

  const employees = [
    { id: 1, alias: "Lead-Dev", pubkey: "SOL-WALLET...4X92", amount: "12,500.00", icon: "terminal", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
    { id: 2, alias: "UI-Designer", pubkey: "SOL-WALLET...9R11", amount: "8,200.00", icon: "palette", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
    { id: 3, alias: "Growth-Lead", pubkey: "SOL-WALLET...2K38", amount: "9,400.00", icon: "campaign", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
    { id: 4, alias: "Ops-Manager", pubkey: "SOL-WALLET...7L55", amount: "7,500.00", icon: "engineering", color: "text-slate-400", bg: "bg-slate-700/10", border: "border-slate-700/20" },
  ];

  const handleExecutePayroll = async () => {
    setIsExecuting(true);
    if (isMultiSig) {
      alert("Enterprise Mode: Payroll proposal routed to Squads Multi-sig for executive approval.");
    } else {
      alert("Direct Mode: Generating stealth addresses and executing batch transfer on-chain.");
    }
    setTimeout(() => setIsExecuting(false), 1500);
  };

  // --- EMPLOYEE STATE & DATA ---
  const [isGenerating, setIsGenerating] = useState(false);
  const timestamp = new Date().toLocaleDateString();
  const employeeAmount = "12,500.00";
  const employerAddress = "0x71C...3912";
  const employeePublicKey = "SOL-WALLET...4X92";
  const signature = "Sig: 5KjF9x2...[CRYPTOGRAPHIC_HASH]...a1B8zP";

  const handleDownloadPDF = () => {
    setIsGenerating(true);
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.setTextColor(147, 51, 234);
    doc.text("PrivaPay Verified Statement", 20, 30);
    doc.setFontSize(12);
    doc.setTextColor(100, 116, 139);
    doc.text("Zero-Knowledge Cryptographic Income Proof", 20, 40);
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(14);
    doc.text(`Date of Issuance: ${timestamp}`, 20, 60);
    doc.text(`Verified Income Amount: ${employeeAmount} USDC`, 20, 75);
    doc.text(`Originating Treasury: ${employerAddress}`, 20, 90);
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text("--- Cryptographic Signature ---", 20, 120);
    doc.text(`Signer PK: ${employeePublicKey}`, 20, 130);
    doc.text(signature, 20, 140);
    doc.save(`PrivaPay_Statement_${timestamp}.pdf`);
    setIsGenerating(false);
  };

  const handleDownloadJSON = () => {
    setIsGenerating(true);
    const proofData = {
      message: `I verify that I received ${employeeAmount} USDC from Treasury ${employerAddress} on ${timestamp}.`,
      employeePublicKey,
      signature
    };
    const blob = new Blob([JSON.stringify(proofData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `PrivaPay_Proof_${timestamp}.json`;
    link.click();
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-[#dae2fd] font-sans selection:bg-purple-500/30 pb-20">
      
      {/* --- TOP HEADER (Shared) --- */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-12 h-20 bg-slate-900/80 backdrop-blur-xl border-b border-white/10 shadow-[0_0_20px_rgba(168,85,247,0.15)]">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-purple-500 text-3xl">security</span>
          <span className="font-mono text-2xl font-bold tracking-tighter text-slate-50">PrivaPay</span>
        </div>
        
        {/* Magic Demo Toggle Button */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setActiveView(activeView === "employer" ? "employee" : "employer")}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600/20 border border-purple-500/50 text-purple-300 text-sm font-semibold hover:bg-purple-600/40 transition-all"
          >
            <span className="material-symbols-outlined text-sm">
              {activeView === "employer" ? "switch_account" : "corporate_fare"}
            </span>
            {activeView === "employer" ? "View as Employee" : "View as Employer"}
          </button>
          <div className="hidden sm:flex flex-col items-end border-l border-white/10 pl-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Solana Mainnet</span>
            <span className="text-xs font-mono text-purple-400">0x71C...3912</span>
          </div>
        </div>
      </header>

      {/* --- RENDER LOGIC: Switch between Employer and Employee views --- */}
      <main className="pt-28 px-6 max-w-lg mx-auto md:max-w-4xl md:px-12 animate-in fade-in duration-500">
        
        {activeView === "employer" ? (
          /* =========================================
             EMPLOYER VIEW
             ========================================= */
          <>
            <section className="mb-8">
              <div className="bg-slate-900/80 backdrop-blur-md border border-white/10 border-t-white/20 rounded-xl p-8 relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-500/10 blur-[80px] rounded-full"></div>
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full"></div>
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Total Treasury Balance</p>
                      <h1 className="text-5xl font-bold tracking-tighter text-[#dae2fd]">
                        $1,240,500.00 <span className="text-[#b4c5ff] text-2xl font-mono">USDC</span>
                      </h1>
                    </div>
                    <span className="material-symbols-outlined text-[#3cddc7]">account_balance</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">Estimated Next Payroll</p>
                      <div className="flex items-end gap-2">
                        <p className="text-2xl font-semibold text-[#b4c5ff]">$42,300.00</p>
                        <p className="font-mono text-xs text-slate-500 mb-1">USDC</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <div className="flex items-center justify-between bg-slate-900/50 border border-white/5 p-3 rounded-xl mb-4">
                <div>
                  <p className="text-sm font-semibold text-slate-200">Execution Mode</p>
                  <p className="text-xs text-slate-500">Route via Squads v4 Multi-sig</p>
                </div>
                <button 
                  onClick={() => setIsMultiSig(!isMultiSig)}
                  className={`w-12 h-6 rounded-full flex items-center transition-colors p-1 ${isMultiSig ? 'bg-purple-600' : 'bg-slate-700'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${isMultiSig ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </div>

              <button 
                onClick={handleExecutePayroll}
                disabled={isExecuting}
                className="w-full py-5 rounded-xl bg-gradient-to-r from-[#b76dff] to-[#0053db] text-white font-semibold text-xl flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50"
              >
                <span className="material-symbols-outlined font-bold">bolt</span>
                {isExecuting ? "Processing..." : (isMultiSig ? "Create Squads Proposal" : "Execute Batch Payroll")}
              </button>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#dae2fd] mb-4">Employee Registry</h2>
              <div className="space-y-3">
                {employees.map((emp) => (
                  <div key={emp.id} className="bg-slate-900/80 backdrop-blur-md border border-white/10 border-t-white/20 p-4 rounded-xl flex items-center justify-between hover:bg-white/5 transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full ${emp.bg} ${emp.border} border flex items-center justify-center ${emp.color} group-hover:brightness-125 transition-all`}>
                        <span className="material-symbols-outlined">{emp.icon}</span>
                      </div>
                      <div>
                        <p className="text-lg font-semibold leading-none mb-1">{emp.alias}</p>
                        <p className="font-mono text-[10px] text-slate-500">{emp.pubkey}</p>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <p className="font-mono text-[#dae2fd] font-bold">{emp.amount} USDC</p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="material-symbols-outlined text-[#3cddc7] text-xs">check_circle</span>
                        <span className="text-[10px] uppercase tracking-tighter text-[#3cddc7] font-bold">Encrypted</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : (
          /* =========================================
             EMPLOYEE VIEW
             ========================================= */
          <section className="flex items-center justify-center pt-10">
            <div className="bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-10 max-w-lg w-full text-center relative overflow-hidden shadow-2xl">
              <div className="absolute -top-20 -right-20 w-48 h-48 bg-purple-500/20 blur-[60px] rounded-full"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-purple-500/10 border border-purple-500/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                  <span className="material-symbols-outlined text-purple-400 text-3xl">lock_open</span>
                </div>
                
                <h1 className="text-3xl font-bold tracking-tight mb-2">Salary Decrypted</h1>
                <p className="text-slate-400 text-sm mb-8">
                  Your recent payment of <strong className="text-purple-400">{employeeAmount} USDC</strong> has been verified on-chain. Choose your proof format below.
                </p>

                <div className="flex flex-col gap-4">
                  <button 
                    onClick={handleDownloadPDF}
                    disabled={isGenerating}
                    className="w-full py-4 rounded-xl bg-white text-slate-900 font-semibold text-lg flex items-center justify-center gap-2 hover:bg-slate-200 transition-all shadow-lg active:scale-95"
                  >
                    <span className="material-symbols-outlined">picture_as_pdf</span>
                    Download PDF Stub
                  </button>
                  
                  <button 
                    onClick={handleDownloadJSON}
                    disabled={isGenerating}
                    className="w-full py-4 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 font-semibold text-lg flex items-center justify-center gap-2 hover:bg-slate-700 transition-all active:scale-95"
                  >
                    <span className="material-symbols-outlined">code</span>
                    Export Raw JSON Proof
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}