'use client';

import { useConnectionStatus, useWallet, useNetwork } from '@/hooks';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export function WalletConnection({ showNetwork = true, className = '' }) {
  const { isConnected, connectWallet } = useConnectionStatus();
  const { address } = useWallet();
  const { currentNetwork, isTestnet } = useNetwork();

  if (!isConnected) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <ConnectButton />
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <ConnectButton />
      {showNetwork && (
        <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/50 border border-white/10">
          <div className={`w-2 h-2 rounded-full ${isTestnet ? 'bg-yellow-400' : 'bg-green-400'}`} />
          <span className="text-xs text-white/80">{currentNetwork}</span>
        </div>
      )}
    </div>
  );
}

export function WalletInfo() {
  const { address, isConnected } = useWallet();
  const { currentNetwork } = useNetwork();

  if (!isConnected) {
    return null;
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-white/60">Wallet Address</span>
        <span className="text-sm font-mono text-white">
          {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Not connected'}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-white/60">Network</span>
        <span className="text-sm text-white">{currentNetwork}</span>
      </div>
    </div>
  );
}

export default WalletConnection;
