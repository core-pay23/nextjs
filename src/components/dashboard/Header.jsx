"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useMobileMenu } from "@/providers/MobileMenuProvider";
import { useAccount, useChainId } from "wagmi";
import { coreTestnet } from "@/providers/wagmi-config";
import Link from "next/link";
import { Droplets, Bitcoin } from "lucide-react";

export default function Header() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const isCorrectNetwork = chainId === coreTestnet.id;
  const { openMenu, toggleMenu, isMenuOpen: providerMenuOpen, mintUSDC, mintCoreBtc, isPending } = useMobileMenu() || {};

  const buttonBaseStyles = "px-4 py-2 text-white text-sm font-medium rounded-lg transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 flex items-center gap-2";
  const primaryButtonStyles = `bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 ${buttonBaseStyles}`;
  const disabledButtonStyles = `bg-gradient-to-r from-slate-600 to-slate-700 ${buttonBaseStyles}`;

  return (
    <div className="border-b border-white/10 backdrop-blur-lg sticky top-0 z-30">
      <header className="flex items-center justify-between gap-4 max-w-7xl w-full px-4 py-2 mx-auto">
        <div className="flex items-center gap-4">
          <Link className="relative cursor-pointer" href="/dashboard">
            <div className="w-12 h-12 rounded-lg p-1 shadow-lg">
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
          <Link className="cursor-pointer" href="/dashboard">
            <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
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
            className={`${isPending || !isConnected || !isCorrectNetwork ? disabledButtonStyles : primaryButtonStyles}`}
          >
            <Droplets className="h-4 w-4" />
            {isPending ? "Minting..." : "Mint USDC"}
          </button>
          <button
            onClick={() => mintCoreBtc && mintCoreBtc()}
            disabled={isPending || !isConnected || !isCorrectNetwork}
            className={`${isPending || !isConnected || !isCorrectNetwork ? disabledButtonStyles : primaryButtonStyles}`}
          >
            <Bitcoin className="h-4 w-4" />
            {isPending ? "Minting..." : "Mint Mock Core BTC"}
          </button>
          <ConnectButton />
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => openMenu && openMenu()}
              className={primaryButtonStyles}
            >
              <Droplets className="h-4 w-4" />
              Mint
            </button>
          </div>
          <ConnectButton />
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
    </div>
  );
}
