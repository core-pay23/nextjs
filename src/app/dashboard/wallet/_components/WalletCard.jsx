import React from "react";
import WalletInfo from "./WalletInfo";

export default function WalletCard({
  avatar,
  badge,
  eoaAddress,
  loading,
  error,
}) {
  return (
    <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-lg mb-8 relative bg-slate-900/40 backdrop-blur border border-white/10">
      {/* Banner */}
      <div className="h-36 sm:h-44 w-full bg-gradient-to-r from-[#db5827] to-[#e78137] flex items-center justify-center relative">
        <span className="absolute inset-0 opacity-30 bg-[url('/globe.svg')] bg-cover bg-center" />
        <span className="text-4xl font-bold text-white tracking-widest z-10">
          CorePay
        </span>
      </div>
      {/* Wallet Info */}
      <WalletInfo
        avatar={avatar}
        badge={badge}
        eoaAddress={eoaAddress}
        loading={loading}
        error={error}
      />
    </div>
  );
}
