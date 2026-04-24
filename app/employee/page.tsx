"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";

export default function EmployeePortal() {
  const [isGenerating, setIsGenerating] = useState(false);

  // Mock data for the cryptographic proof
  const timestamp = new Date().toLocaleDateString();
  const amount = "12,500.00";
  const employerAddress = "0x71C...3912";
  const employeePublicKey = "SOL-WALLET...4X92";
  const signature = "Sig: 5KjF9x2...[CRYPTOGRAPHIC_HASH]...a1B8zP";

  // ----------------------------------------------------
  // POLISHED PDF EXPORT (For Landlords & Visas)
  // ----------------------------------------------------
  const handleDownloadPDF = () => {
    setIsGenerating(true);
    const doc = new jsPDF();
    
    // Add branding
    doc.setFontSize(22);
    doc.setTextColor(147, 51, 234); // Purple
    doc.text("PrivaPay Verified Statement", 20, 30);
    
    doc.setFontSize(12);
    doc.setTextColor(100, 116, 139); // Slate
    doc.text("Zero-Knowledge Cryptographic Income Proof", 20, 40);
    
    // Add the core data
    doc.setTextColor(15, 23, 42); // Dark
    doc.setFontSize(14);
    doc.text(`Date of Issuance: ${timestamp}`, 20, 60);
    doc.text(`Verified Income Amount: ${amount} USDC`, 20, 75);
    doc.text(`Originating Treasury: ${employerAddress}`, 20, 90);
    
    // Add the cryptographic signature at the bottom
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text("--- Cryptographic Signature ---", 20, 120);
    doc.text(`Signer PK: ${employeePublicKey}`, 20, 130);
    doc.text(signature, 20, 140);

    doc.save(`PrivaPay_Statement_${timestamp}.pdf`);
    setIsGenerating(false);
  };

  // ----------------------------------------------------
  // RAW JSON EXPORT (For Developers/Verifiers)
  // ----------------------------------------------------
  const handleDownloadJSON = () => {
    setIsGenerating(true);
    const proofData = {
      message: `I verify that I received ${amount} USDC from Treasury ${employerAddress} on ${timestamp}.`,
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
    <div className="min-h-screen bg-[#020617] text-[#dae2fd] font-sans flex items-center justify-center p-6 selection:bg-purple-500/30">
      <div className="bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-10 max-w-lg w-full text-center relative overflow-hidden">
        
        {/* Glow Effects */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-purple-500/20 blur-[60px] rounded-full"></div>
        
        <div className="relative z-10">
          <div className="w-16 h-16 bg-purple-500/10 border border-purple-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-purple-400 text-3xl">lock_open</span>
          </div>
          
          <h1 className="text-3xl font-bold tracking-tight mb-2">Salary Decrypted</h1>
          <p className="text-slate-400 text-sm mb-8">
            Your recent payment of <strong className="text-purple-400">{amount} USDC</strong> has been verified on-chain. Choose your proof format below.
          </p>

          <div className="flex flex-col gap-4">
            <button 
              onClick={handleDownloadPDF}
              disabled={isGenerating}
              className="w-full py-4 rounded-xl bg-white text-slate-900 font-semibold text-lg flex items-center justify-center gap-2 hover:bg-slate-200 transition-all"
            >
              <span className="material-symbols-outlined">picture_as_pdf</span>
              Download PDF Stub
            </button>
            
            <button 
              onClick={handleDownloadJSON}
              disabled={isGenerating}
              className="w-full py-4 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 font-semibold text-lg flex items-center justify-center gap-2 hover:bg-slate-700 transition-all"
            >
              <span className="material-symbols-outlined">code</span>
              Export Raw JSON Proof
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}