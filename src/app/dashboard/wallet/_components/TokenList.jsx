import React from "react";
import { useMerchantBalance } from "@/hooks/useMerchantBalance";
import { useEOAAddress } from "@/hooks/useEOAAddress";

// Token data with icons
const tokenData = [
  {
    icon: "/icons/core.png",
    name: "Core",
    symbol: "CORE",
  },
  {
    icon: "/icons/btc.png",
    name: "Bitcoin",
    symbol: "BTC",
  },
  {
    icon: "/icons/usdc.png",
    name: "USD Coin",
    symbol: "USDC",
  },
];

export default function TokenList() {
  const { eoaAddress } = useEOAAddress();
  const { t2coreBalance, btcBalance, usdcBalance, isLoading, isError } = useMerchantBalance(eoaAddress);

  // Map balances to tokens
  const tokens = tokenData.map((token, index) => {
    let balance;
    switch (token.symbol) {
      case "CORE":
        balance = t2coreBalance;
        break;
      case "BTC":
        balance = btcBalance;
        break;
      case "USDC":
        balance = usdcBalance;
        break;
      default:
        balance = "0.000000";
    }

    return {
      ...token,
      balance: balance || "0.000000",
    };
  });

  if (isLoading) {
    return <div className="text-white/60 py-4 text-center">Loading balances...</div>;
  }

  if (isError) {
    return <div className="text-red-400 py-4 text-center">Error loading balances</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left">
        <thead>
          <tr className="text-white/60 text-xs border-b border-white/10">
            <th className="py-2 pr-4 font-medium">Assets</th>
            <th className="py-2 pr-4 font-medium">Balance</th>
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
                {token.balance} {token.symbol}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
