"use client";

import { tokenList } from "@/lib/tokenlist";
import Image from "next/image";
import { useState } from "react";

const TokenDisplay = ({ tokenAddress, amount, className = "" }) => {
  const [imageError, setImageError] = useState(false);

  const token = tokenList.find(
    (t) => t.address.toLowerCase() === tokenAddress.toLowerCase()
  );

  if (!token) {
    return (
      <div className={`flex items-center space-x-3 ${className}`}>
        <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center">
          <span className="text-white/60 text-xs">?</span>
        </div>
        <div>
          <div className="text-white font-medium">Unknown Token</div>
          <div className="text-white/60 text-sm">{amount}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-700 flex items-center justify-center relative">
        {!imageError && token.logoURI && typeof token.logoURI === 'string' && token.logoURI.trim() !== '' ? (
          <Image
            src={token.logoURI}
            alt={token.name}
            width={40}
            height={40}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white font-bold text-sm">
            {token.symbol.charAt(0)}
          </div>
        )}
      </div>
      <div>
        <div className="text-white font-medium">{token.name}</div>
        <div className="text-white/60 text-sm">{token.symbol}</div>
      </div>
      <div className="flex-1 text-right">
        <div className="text-white font-semibold text-lg">
          {amount} {token.symbol}
        </div>
      </div>
    </div>
  );
};

export default TokenDisplay;
