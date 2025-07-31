'use client';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Header() {
  return (
    <header className="flex items-center justify-between gap-4 px-4 lg:px-6 py-4 border-b border-white/10 bg-slate-900/30 backdrop-blur-lg">
      <div className="flex items-center gap-4">
        <div className="lg:hidden w-8"></div>
        <div>
          <h1 className="text-base lg:text-lg font-medium">Studio Analytics</h1>
          <p className="text-xs lg:text-sm text-white/60">
            12 active collaborators • Studio Elite
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <ConnectButton />
      </div>
    </header>
  );
}
