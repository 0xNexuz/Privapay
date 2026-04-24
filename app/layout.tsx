import type { Metadata } from "next";
import "./globals.css";

// This metadata automatically updates your browser tab and SEO previews
export const metadata: Metadata = {
  title: "PrivaPay | Private Blockchain Payroll",
  description: "PrivaPay is a decentralized payroll protocol on Solana that brings enterprise-grade privacy to Web3 HR using stealth addresses and confidential computing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // We force dark mode on the root HTML tag so your Tailwind works perfectly
    <html lang="en" className="dark">
      <head>
        {/* Space Grotesk & Inter Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
        
        {/* Material Symbols Outlined */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" 
          rel="stylesheet" 
        />
      </head>
      
      <body className="antialiased bg-[#020617] text-[#dae2fd] font-sans selection:bg-purple-500/30 min-h-screen">
        {/* This is where your page.tsx dashboard gets injected */}
        {children}
      </body>
    </html>
  );
}