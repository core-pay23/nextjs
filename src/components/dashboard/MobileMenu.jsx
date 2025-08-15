"use client";

import React from "react";
import { useMobileMenu } from "@/providers/MobileMenuProvider";
import { motion, AnimatePresence } from "framer-motion";
import { X, Droplets, Bitcoin } from "lucide-react";
import Link from "next/link";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const menuVariants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  exit: {
    x: "100%",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
};

const MenuItem = ({ icon: Icon, text, onClick, disabled, isPending }) => (
  <button
    onClick={onClick}
    disabled={disabled || isPending}
    className="w-full flex items-center gap-4 px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-orange-600/20 rounded-lg transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed group"
  >
    <Icon className="h-5 w-5 text-orange-500 group-hover:text-orange-400 transition-colors" />
    <span className="font-medium">{isPending ? "Minting..." : text}</span>
  </button>
);

export default function MobileMenu() {
  const { isMenuOpen, closeMenu, mintUSDC, mintCoreBtc, isPending } = useMobileMenu() || {};

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={closeMenu}
          />
          <motion.div
            className="relative bg-slate-900/80 backdrop-blur-xl border-l border-white/10 w-72 h-full ml-auto flex flex-col"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <header className="p-4 flex items-center justify-between border-b border-white/10">
              <h2 className="text-lg font-bold text-white tracking-wider">
                <span className="text-orange-500">Core</span>Pay
              </h2>
              <button onClick={closeMenu} className="p-1 text-white/60 hover:text-white">
                <X className="h-6 w-6" />
              </button>
            </header>

            <div className="p-4 flex-grow">
              <div className="flex flex-col gap-2">
                <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest px-4 mb-2">
                  Mint Tokens
                </h3>
                <MenuItem
                  icon={Droplets}
                  text="Mint USDC"
                  onClick={() => {
                    mintUSDC();
                    closeMenu();
                  }}
                  isPending={isPending}
                  disabled={isPending}
                />
                <MenuItem
                  icon={Bitcoin}
                  text="Mint Mock Core BTC"
                  onClick={() => {
                    mintCoreBtc();
                    closeMenu();
                  }}
                  isPending={isPending}
                  disabled={isPending}
                />
              </div>
            </div>

            <footer className="p-4 text-center text-xs text-white/30">
              <p>&copy; {new Date().getFullYear()} CorePay. All rights reserved.</p>
            </footer>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
