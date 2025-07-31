"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";

export default function Header() {
  return (
    <header className="flex items-center justify-between gap-4 px-4 lg:px-6 py-4 border-b border-white/10 bg-slate-900/30 backdrop-blur-lg">
      <div className="flex items-center gap-4">
        <div className="lg:hidden w-8"></div>

        {/* Koneksi Brand Header */}
        <div className="flex items-center gap-3">
          {/* Network Icon - representing digital connections/blockchain */}
          <div className="relative">
            <div className="w-14 h-14 rounded-lg p-1.5 shadow-lg">
              <Image
                src="/icon.svg"
                alt="Koneksi Logo"
                width={924}
                height={924}
                className="w-full h-full"
                priority
              />
            </div>
          </div>

        </div>

        <div className="">
            <h1 className="text-xl lg:text-2xl font-semibold bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent">
              Koneksi
            </h1>
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
