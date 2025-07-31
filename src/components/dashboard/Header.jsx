"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Header() {
  return (
    <header className="flex items-center justify-between gap-4 px-4 lg:px-6 py-4 border-b border-white/10 bg-slate-900/30 backdrop-blur-lg">
      <div className="flex items-center gap-4">
        <div className="lg:hidden w-8"></div>
        
        {/* Koneksi Brand Header */}
        <div className="flex items-center gap-3">
          {/* Network Icon - representing digital connections/blockchain */}
          <div className="relative">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg p-1.5 shadow-lg">
              <svg 
                className="w-full h-full text-white" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="2" />
                <path d="M12 1v6m0 6v6" />
                <path d="m1 12 6 0m6 0 6 0" />
                <circle cx="12" cy="5" r="1" />
                <circle cx="12" cy="19" r="1" />
                <circle cx="5" cy="12" r="1" />
                <circle cx="19" cy="12" r="1" />
              </svg>
            </div>
            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg blur-sm opacity-20 -z-10"></div>
          </div>
          
          {/* Koneksi Wordmark */}
          <div className="relative">
            <h1 className="text-xl lg:text-2xl font-semibold bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent">
              Koneksi
            </h1>
            {/* Gradient underline accent */}
            <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-600 opacity-60"></div>
          </div>
        </div>
        
        <div className="ml-4 lg:ml-6">
          <h2 className="text-base lg:text-lg font-medium">Payment Gateway</h2>
          <p className="text-xs lg:text-sm text-white/60">
            Secure digital asset processing
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <ConnectButton />
      </div>
    </header>
  );
}
