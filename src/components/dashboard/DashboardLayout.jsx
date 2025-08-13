"use client";

import { useState, useEffect } from "react";
import { useAccount, useSignMessage } from "wagmi";
import { useRouter } from "next/navigation";
import Header from "./Header";
import ConnectWalletCard from "./ConnectWalletCard";
import { useWallet } from "@/hooks";

// Check if signature exists and is valid
const checkSignature = async () => {
  try {
    const savedSignature = localStorage.getItem("walletSignature");
    const savedAddress = localStorage.getItem("walletAddress");
    const savedTimestamp = localStorage.getItem("signatureTimestamp");

    console.log(
      "Checking signature:",
      savedSignature,
      savedAddress,
      savedTimestamp
    );

    if (!savedSignature) {
      console.log("No saved signature found");
      return false;
    }

    if (!savedAddress) {
      console.log("No saved address found");
      return false;
    }

    if (!savedTimestamp) {
      console.log("No saved timestamp found");
      return false;
    }

    // Check if signature is older than 24 hours (optional)
    const timestamp = parseInt(savedTimestamp);
    const now = Date.now();
    const isExpired = now - timestamp > 24 * 60 * 60 * 1000;

    if (isExpired) {
      console.log("Signature expired, removing...");
      localStorage.removeItem("walletSignature");
      localStorage.removeItem("walletAddress");
      localStorage.removeItem("signatureTimestamp");
      return false;
    }

    console.log("Valid signature found");
    return true;
  } catch (error) {
    console.error("Error checking signature:", error);
    return false;
  }
};

// Save the signature to local storage
const saveSignature = async (signature, address) => {
  try {
    console.log("Attempting to save signature:", signature);
    console.log("Address:", address);

    if (!signature) {
      console.error("Signature is undefined or null, not saving");
      return false;
    }

    if (typeof signature !== "string" || !signature.startsWith("0x")) {
      console.error("Invalid signature format, not saving:", signature);
      return false;
    }

    localStorage.setItem("walletSignature", signature);
    localStorage.setItem("walletAddress", address);
    localStorage.setItem("signatureTimestamp", Date.now().toString());

    console.log("Signature saved successfully");
    return true;
  } catch (error) {
    console.error("Error saving signature:", error);
    return false;
  }
};

export default function DashboardLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isConnected, address, chainId } = useAccount();
  const { switchChain, disconnect } = useWallet();
  const { signMessage, data, error, isLoading } = useSignMessage();
  const [isSigning, setIsSigning] = useState(false);
  const [hasValidSignature, setHasValidSignature] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);


  useEffect(() => {
    // Check for existing valid signature when wallet connects
    const checkExistingSignature = async () => {
      if (isConnected && address) {
        const isValid = await checkSignature();
        console.log("Signature valid:", isValid);

        // If signature exists but is for different address, clear it
        const savedAddress = localStorage.getItem("walletAddress");
        if (savedAddress && savedAddress !== address) {
          console.log("Address mismatch, clearing signature data");
          localStorage.removeItem("walletSignature");
          localStorage.removeItem("walletAddress");
          localStorage.removeItem("signatureTimestamp");
          setHasValidSignature(false);
          return;
        }

        // If signature is invalid but address and timestamp exist, clear all
        if (!isValid) {
          const savedSignature = localStorage.getItem("walletSignature");
          const savedAddress = localStorage.getItem("walletAddress");
          const savedTimestamp = localStorage.getItem("signatureTimestamp");

          if (savedSignature || savedAddress || savedTimestamp) {
            console.log("Clearing incomplete signature data");
            localStorage.removeItem("walletSignature");
            localStorage.removeItem("walletAddress");
            localStorage.removeItem("signatureTimestamp");
          }
          setHasValidSignature(false);
        } else {
          setHasValidSignature(true);
        }
      } else {
        setHasValidSignature(false);
      }
    };

    checkExistingSignature();
  }, [isConnected, address, isSigning]);


  // Log the state of the useSignMessage hook for debugging
  useEffect(() => {
    const saveSignatureData = async () => {
      if (data && !isLoading && address) {
        const saveResult = await saveSignature(data, address);
        setIsSigning(false);
        if (saveResult) {
          setHasValidSignature(true);
        } else {
          setHasValidSignature(false);
        }
        console.log("Signature save result:", saveResult);
      }
    };

    saveSignatureData();
  }, [data, error, isLoading, address]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSignMessage = async () => {
    if (!address) return;

    setIsSigning(true);
    try {
      console.log("Starting signature process for address:", address);

      // Sign a message to confirm identity
      const message = `Please sign this message to confirm your identity with address: ${address}`;
      console.log("Message to sign:", message);

      // Call signMessage and await the result
      const signature = await signMessage({ message });
      saveSignature(signature, address);
    } catch (error) {
      console.error("Error signing message:", error);
    } finally {
      setIsSigning(false);
    }
  };

  // Don't render anything until client-side hydration is complete
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0c1425] flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-16 h-16 bg-blue-600/20 rounded-xl"></div>
        </div>
      </div>
    );
  }

  // If wallet is not connected, show the connection page
  if (!isConnected) {
    return (
      <ConnectWalletCard
        isConnected={isConnected}
        isSigning={isSigning}
        checkSignature={checkSignature}
        handleSignMessage={handleSignMessage}
      />
    );
  }

  // If connected but no valid signature, show signing prompt
  if (isConnected && !hasValidSignature && !isSigning) {
    return (
      <ConnectWalletCard
        isConnected={isConnected}
        isSigning={isSigning}
        checkSignature={checkSignature}
        handleSignMessage={handleSignMessage}
      />
    );
  }

  // If connected and has valid signature, show the dashboard
  return (
    <div className="h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0c1425] text-white font-inter">
      <div className="flex h-full">
        {/* Mobile Menu Button */}
        {/* <button
          onClick={toggleMobileMenu}
          className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-800/80 backdrop-blur-lg rounded-lg border border-white/10"
        >
          <Menu className="h-5 w-5" />
        </button> */}

        {/* Sidebar */}
        {/* <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} /> */}

        {/* Overlay for mobile */}
        {isMobileMenuOpen && (
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          />
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </div>
  );
}
