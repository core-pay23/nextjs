"use client";
import React from "react";
import { useEOAAddress } from "@/hooks";
import WalletCard from "./_components/WalletCard";

// Dummy data for demonstration (except address)
const wallet = {
  avatar: "/icon.png", // Use your own avatar asset
  badge: "Bronze",
};

const tokens = [
  {
    icon: "/icons/core.png",
    name: "Ether",
    symbol: "ETH",
    price: 4635.88,
    balance: 0.00007,
    value: 0.32,
    change1h: -0.47,
    change24h: 4,
  },
  // Add more tokens as needed
];

export default function WalletPage() {
  const { eoaAddress, loading, error } = useEOAAddress();

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
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="text-white/60 text-xs border-b border-white/10">
                <th className="py-2 pr-4 font-medium">Assets</th>
                <th className="py-2 pr-4 font-medium">Price</th>
                <th className="py-2 pr-4 font-medium">Balance</th>
                <th className="py-2 pr-4 font-medium">Value</th>
                <th className="py-2 pr-4 font-medium">1 hour</th>
                <th className="py-2 pr-4 font-medium">24 hours</th>
              </tr>
            </thead>
            <tbody>
              {tokens.map((token, i) => (
                <tr
                  key={i}
                  className="border-b border-white/5 last:border-0 hover:bg-white/5 transition"
                >
                  <td className="py-3 pr-4 flex items-center gap-3">
                    <img
                      src={token.icon}
                      alt={token.symbol}
                      className="w-7 h-7 rounded-full bg-slate-800"
                    />
                    <div>
                      <span className="text-white font-semibold text-sm">
                        {token.name}
                      </span>
                      <span className="ml-2 text-xs text-white/40 font-mono">
                        {token.symbol}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-white/80 font-mono">
                    ${token.price.toLocaleString()}
                  </td>
                  <td className="py-3 pr-4 text-white/80 font-mono">
                    {token.balance} {token.symbol}
                  </td>
                  <td className="py-3 pr-4 text-white/80 font-mono">
                    ${token.value.toFixed(2)}
                  </td>
                  <td
                    className={`py-3 pr-4 font-mono ${
                      token.change1h < 0 ? "text-red-400" : "text-emerald-400"
                    }`}
                  >
                    {token.change1h > 0 ? "▲" : "▼"} {Math.abs(token.change1h)}%
                  </td>
                  <td
                    className={`py-3 pr-4 font-mono ${
                      token.change24h < 0 ? "text-red-400" : "text-emerald-400"
                    }`}
                  >
                    {token.change24h > 0 ? "▲" : "▼"}{" "}
                    {Math.abs(token.change24h)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
