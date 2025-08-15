"use client";

import React from "react";
import { useMobileMenu } from "@/providers/MobileMenuProvider";
import Link from "next/link";

export default function MobileMenu() {
  const { isMenuOpen, closeMenu, mintUSDC, mintCoreBtc, isPending } = useMobileMenu() || {};

  if (!isMenuOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 z-40">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => closeMenu()}
      ></div>
      <div className="relative bg-slate-900/50 backdrop-blur-lg border-l border-white/10 w-64 h-full ml-auto overflow-y-auto">
        <div className="p-4">
          <div className="flex flex-col gap-4">
            <div className="pt-4 border-t border-white/10">
              <h3 className="text-white font-medium mb-2">Mint Tokens</h3>
              <button
                onClick={() => {
                  mintUSDC();
                  closeMenu();
                }}
                disabled={isPending}
                className="w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed mb-2"
              >
                {isPending ? "Minting USDC..." : "Mint USDC"}
              </button>
              <button
                onClick={() => {
                  mintCoreBtc();
                  closeMenu();
                }}
                disabled={isPending}
                className="w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? "Minting Core BTC..." : "Mint Mock Core Btc"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
