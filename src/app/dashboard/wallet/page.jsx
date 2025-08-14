"use client";
import React from "react";
import { useEOAAddress } from "@/hooks";
import WalletCard from "./_components/WalletCard";
import TokenList from "./_components/TokenList";
import WithdrawModalWithProvider from "@/components/WithdrawModalWithProvider";

// Dummy data for demonstration (except address)
const wallet = {
  avatar: "/icon.png", // Use your own avatar asset
  badge: "Bronze",
};

export default function WalletPage() {
  const { eoaAddress, loading, error } = useEOAAddress();

  const handleWithdraw = async (data) => {
    console.log("Withdraw data:", data);
    // Return the actual data from the API response
    return {
      withdrawal: {
        uniqueId: "wd-" + Date.now(), // Generate a unique ID
        tokenAddress: data.tokenAddress,
        amount: data.amount,
        status: "completed"
      },
      txHash: data.txHash
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br py-8 max-w-7xl px-6 mx-auto">
      {/* Wallet Card */}
      <WalletCard
        avatar={wallet.avatar}
        badge={wallet.badge}
        eoaAddress={eoaAddress}
        loading={loading}
        error={error}
      />

      {/* Token Table */}
      <div className="mx-auto bg-slate-900/40 backdrop-blur rounded-2xl border border-white/10 shadow-lg p-6">
        <div className="flex gap-4 mb-4">
          <button className="px-4 py-1.5 rounded-lg bg-white/10 text-white font-semibold hover:bg-white/20 transition">
            Tokens
          </button>
          <button className="px-4 py-1.5 rounded-lg bg-transparent text-white/60 font-semibold hover:bg-white/10 transition">
            Transaction History
          </button>
        </div>
        <TokenList />
      </div>
      
      {/* Withdraw Modal with Provider */}
      <WithdrawModalWithProvider onWithdraw={handleWithdraw} />
    </div>
  );
}
