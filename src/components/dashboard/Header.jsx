"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useMobileMenu } from "@/providers/MobileMenuProvider";
import { useAccount, useChainId } from "wagmi";
import { coreTestnet } from "@/providers/wagmi-config";
import Link from "next/link";

export default function Header() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const isCorrectNetwork = chainId === coreTestnet.id;
  // use mobile menu provider for mobile menu and mint actions
  const { openMenu, toggleMenu, isMenuOpen: providerMenuOpen, mintUSDC, mintCoreBtc, isPending } = useMobileMenu() || {};

  // Note: minting actions and mobile menu rendering are handled by MobileMenuProvider

  return (
    <div className="border-b border-white/10 backdrop-blur-lg">
      <header className="flex items-center justify-between gap-4 max-w-7xl w-full px-4 py-2 mx-auto">
        <div className="flex items-center gap-4">

          {/* CorePay Brand Header */}
          <div className="flex items-center gap-3">
            {/* Network Icon - representing digital connections/blockchain */}
            <Link className="relative cursor-pointer" href="/dashboard">
              <div className="w-14 h-14 rounded-lg p-1.5 shadow-lg">
                <Image
                  src="/icon.png"
                  alt="CorePay Logo"
                  width={924}
                  height={924}
                  className="w-full h-full"
                  priority
                />
              </div>
            </Link>
          </div>

          <Link className="cursor-pointer" href="/dashboard">
            <h1 className="text-xl lg:text-2xl font-semibold bg-gradient-to-r from-[#db5827] to-[#e78137] bg-clip-text text-transparent">
              CorePay
            </h1>
            <p className="text-xs lg:text-sm text-white/60 hidden sm:block">
              Secure digital asset processing
            </p>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => mintUSDC && mintUSDC()}
            disabled={isPending || !isConnected || !isCorrectNetwork}
            className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-600 hover:to-cyan-700 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {isPending ? "Minting..." : "Mint USDC"}
          </button>
          <button
            onClick={() => mintCoreBtc && mintCoreBtc()}
            disabled={isPending || !isConnected || !isCorrectNetwork}
            className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-600 hover:to-cyan-700 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {isPending ? "Minting..." : "Mint Mock Core Btc"}
          </button>
          <ConnectButton />
        </div>

  {/* Mobile Navigation */}
  <div className="md:hidden flex items-center gap-2">
          {/* Mint Menu Button */}
          <div className="relative">
            <button
              onClick={() => openMenu && openMenu()}
              className="px-3 py-2 bg-gradient-to-r from-emerald-500 to-cyan-600 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Mint
            </button>
          </div>

          {/* Connect Button */}
          <div className="flex items-center">
            <ConnectButton />
          </div>

          {/* Hamburger Menu Button */}
          <button
            onClick={() => toggleMenu && toggleMenu()}
            className="p-2 rounded-md text-white hover:bg-white/10 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {providerMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </header>

  {/* Mobile menu moved to MobileMenu component provided by MobileMenuProvider */}
    </div>
  );
}
