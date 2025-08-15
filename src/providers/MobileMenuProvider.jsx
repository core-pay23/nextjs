"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useWriteContract, useWaitForTransactionReceipt, useAccount, useChainId } from "wagmi";
import { parseUnits } from "viem";
import { toast } from "react-toastify";
import { mockUSDCAddress, mockUSDCAbi } from "@/lib/contracts/mockUSDC";
import { mockCoreBtcAddress /*, mockCoreBtcAbi */ } from "@/lib/contracts/btc";
import { coreTestnet } from "@/providers/wagmi-config";
import MobileMenu from "@/components/dashboard/MobileMenu";

const MobileMenuContext = createContext(null);

export function useMobileMenu() {
  return useContext(MobileMenuContext);
}

export function MobileMenuProvider({ children }) {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {
    data: hash,
    error,
    isPending,
    writeContract,
  } = useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: receiptError,
  } = useWaitForTransactionReceipt({ hash });

  const requiredChainId = coreTestnet.id;
  const isCorrectNetwork = chainId === requiredChainId;

  // Toast handlers moved from Header into provider
  useEffect(() => {
    if (hash && !isConfirming && !isConfirmed && !error && !receiptError) {
      toast.info("Transaction submitted! Waiting for confirmation...", { position: "bottom-right", autoClose: 5000 });
    }
  }, [hash, isConfirming, isConfirmed, error, receiptError]);

  useEffect(() => {
    if (isConfirming) {
      toast.loading("Confirming transaction...", { toastId: "confirming", position: "bottom-right" });

      const timeout = setTimeout(() => {
        if (isConfirming && !isConfirmed && !receiptError) {
          toast.dismiss("confirming");
          toast.warning("Transaction is taking longer than expected. Please check your wallet or block explorer.", {
            position: "bottom-right",
            autoClose: 10000,
          });
        }
      }, 60000);

      return () => clearTimeout(timeout);
    }
  }, [isConfirming, isConfirmed, receiptError]);

  useEffect(() => {
    if (isConfirmed) {
      toast.dismiss("confirming");
      toast.success("🎉 Success! Transaction confirmed", { position: "bottom-right", autoClose: 8000 });
    }
  }, [isConfirmed]);

  useEffect(() => {
    if (error) {
      toast.dismiss("confirming");
      toast.error(`Transaction failed: ${error.shortMessage || error.message}`, { position: "bottom-right", autoClose: 8000 });
    }
  }, [error]);

  useEffect(() => {
    if (receiptError) {
      toast.dismiss("confirming");
      toast.error(`Transaction reverted: ${receiptError.shortMessage || receiptError.message}`, { position: "bottom-right", autoClose: 8000 });
    }
  }, [receiptError]);

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen((s) => !s);

  const mintUSDC = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first", { position: "bottom-right", autoClose: 3000 });
      return;
    }

    if (!isCorrectNetwork) {
      toast.error("Please switch to core network", { position: "bottom-right", autoClose: 3000 });
      return;
    }

    try {
      await writeContract({
        address: mockUSDCAddress,
        abi: mockUSDCAbi,
        functionName: "mint",
        args: [address, parseUnits("10", 6)],
      });
    } catch (err) {
      console.error("Error minting USDC:", err);
      toast.error(`Failed to mint USDC: ${err.message || "Unknown error"}`, { position: "bottom-right", autoClose: 5000 });
    }
  };

  const mintCoreBtc = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first", { position: "bottom-right", autoClose: 3000 });
      return;
    }

    if (!isCorrectNetwork) {
      toast.error("Please switch to core network", { position: "bottom-right", autoClose: 3000 });
      return;
    }

    try {
      await writeContract({
        address: mockCoreBtcAddress,
        abi: mockUSDCAbi, // mockCoreBtcAbi is not needed for mint signature here in this project
        functionName: "mint",
        args: [address, parseUnits("0.001", 8)],
      });
    } catch (err) {
      console.error("Error minting CoreBtc:", err);
      toast.error(`Failed to mint CoreBtc: ${err.message || "Unknown error"}`, { position: "bottom-right", autoClose: 5000 });
    }
  };

  const value = {
    isMenuOpen,
    openMenu,
    closeMenu,
    toggleMenu,
    mintUSDC,
    mintCoreBtc,
    isPending,
  };

  return (
    <MobileMenuContext.Provider value={value}>
      {children}
      {/* render mobile menu near top-level so it doesn't sit inside other layout stacking contexts */}
      <MobileMenu />
    </MobileMenuContext.Provider>
  );
}

export default MobileMenuProvider;
