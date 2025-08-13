"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { useEffect } from "react";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
  useChainId,
} from "wagmi";
import { parseUnits } from "viem";
import { toast } from "react-toastify";
import { mockUSDCAddress, mockUSDCAbi } from "@/lib/contracts/mockUSDC";
import { coreTestnet } from "@/providers/wagmi-config";
import { mockCoreBtcAbi, mockCoreBtcAddress } from "@/lib/contracts/btc";

export default function Header() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();

  const { data: hash, error, isPending, writeContract, isError, failureReason } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed, error: receiptError } =
    useWaitForTransactionReceipt({
      hash,
    });

  const requiredChainId = coreTestnet.id; // Somnia
  const isCorrectNetwork = chainId === requiredChainId;

  // Handle transaction status updates with toast notifications
  useEffect(() => {
    if (hash && !isConfirming && !isConfirmed && !error && !receiptError) {
      toast.info("Transaction submitted! Waiting for confirmation...", {
        position: "bottom-right",
        autoClose: 5000,
      });
    }
  }, [hash, isConfirming, isConfirmed, error, receiptError]);

  useEffect(() => {
    if (isConfirming) {
      toast.loading("Confirming transaction...", {
        toastId: "confirming",
        position: "bottom-right",
      });

      // Set a timeout to dismiss the confirming toast if it takes too long
      const timeout = setTimeout(() => {
        if (isConfirming && !isConfirmed && !receiptError) {
          toast.dismiss("confirming");
          toast.warning("Transaction is taking longer than expected. Please check your wallet or block explorer.", {
            position: "bottom-right",
            autoClose: 10000,
          });
        }
      }, 60000); // 60 seconds timeout

      return () => clearTimeout(timeout);
    }
  }, [isConfirming, isConfirmed, receiptError]);

  useEffect(() => {
    if (isConfirmed) {
      toast.dismiss("confirming");
      toast.success(
        "🎉 Success! 10 Mock USDC has been minted to your wallet!",
        {
          position: "bottom-right",
          autoClose: 8000,
        }
      );
    }
  }, [isConfirmed]);

  // Handle writeContract errors (before transaction is sent)
  useEffect(() => {
    if (error) {
      toast.dismiss("confirming");
      toast.error(
        `Transaction failed: ${error.shortMessage || error.message}`,
        {
          position: "bottom-right",
          autoClose: 8000,
        }
      );
    }
  }, [error]);

  // Handle receipt errors (transaction was sent but failed/reverted)
  useEffect(() => {
    if (receiptError) {
      toast.dismiss("confirming");
      toast.error(
        `Transaction reverted: ${receiptError.shortMessage || receiptError.message}`,
        {
          position: "bottom-right",
          autoClose: 8000,
        }
      );
    }
  }, [receiptError]);

  // Cleanup confirming toast when transaction is no longer pending
  useEffect(() => {
    if (!isPending && !isConfirming && (error || receiptError)) {
      toast.dismiss("confirming");
    }
  }, [isPending, isConfirming, error, receiptError]);

  const handleMintUSDC = () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first", {
        position: "bottom-right",
        autoClose: 3000,
      });
      return;
    }

    if (!isCorrectNetwork) {
      toast.error("Please switch to Somnia network", {
        position: "bottom-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      // Use the mint function to mint 10 Mock USDC to the connected wallet
      // 10 USDC with 6 decimals = 10 * 10^6 = 10000000
      writeContract({
        address: mockUSDCAddress,
        abi: mockUSDCAbi,
        functionName: "mint",
        args: [address, parseUnits("10", 6)], // mint 10 USDC to current wallet address
      });
      console.log(parseUnits("10", 6));
    } catch (err) {
      console.error("Error minting USDC:", err);
      toast.error(`Failed to mint USDC: ${err.message || "Unknown error"}`, {
        position: "bottom-right",
        autoClose: 5000,
      });
    }
  };

  const handleMintMockBtc = () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first", {
        position: "bottom-right",
        autoClose: 3000,
      });
      return;
    }

    if (!isCorrectNetwork) {
      toast.error("Please switch to Somnia network", {
        position: "bottom-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      // Use the mint function to mint 0.001 Mock Core Btc to the connected wallet
      writeContract({
        address: mockCoreBtcAddress,
        abi: mockUSDCAbi,
        functionName: "mint",
        args: [address, parseUnits("0.001", 8)], // mint 0.001 Mock Core Btc to current wallet address
      });
      console.log(parseUnits("0.001", 8));
    } catch (err) {
      console.error("Error minting CoreBtc:", err);
      toast.error(`Failed to mint CoreBtc: ${err.message || "Unknown error"}`, {
        position: "bottom-right",
        autoClose: 5000,
      });
    }
  };

  return (
    <header className="flex items-center justify-between gap-4 px-4 lg:px-6 py-4 border-b border-white/10 bg-slate-900/30 backdrop-blur-lg">
      <div className="flex items-center gap-4">
        <div className="lg:hidden w-8"></div>

        {/* Koneksi Brand Header */}
        <div className="flex items-center gap-3">
          {/* Network Icon - representing digital connections/blockchain */}
          <div className="relative">
            <div className="w-14 h-14 rounded-lg p-1.5 shadow-lg">
              <Image
                src="/icon.svg"
                alt="Koneksi Logo"
                width={924}
                height={924}
                className="w-full h-full"
                priority
              />
            </div>
          </div>
        </div>

        <div className="">
          <h1 className="text-xl lg:text-2xl font-semibold bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent">
            Koneksi
          </h1>
          <p className="text-xs lg:text-sm text-white/60">
            Secure digital asset processing
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleMintUSDC}
          disabled={isPending || !isConnected || !isCorrectNetwork}
          className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-600 hover:to-cyan-700 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          {isPending ? "Minting..." : "Mint USDC"}
        </button>
        <button
          onClick={handleMintMockBtc}
          disabled={isPending || !isConnected || !isCorrectNetwork}
          className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-600 hover:to-cyan-700 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          {isPending ? "Minting..." : "Mint Mock Core Btc"}
        </button>
        <ConnectButton />
      </div>
    </header>
  );
}
