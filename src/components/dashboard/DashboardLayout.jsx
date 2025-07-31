"use client";

import { useState, useEffect } from "react";
import { useAccount, useSignMessage } from "wagmi";
import { useRouter } from "next/navigation";
import Header from "./Header";
import ConnectWalletCard from "./ConnectWalletCard";

// Check if signature exists and is valid
const checkSignature = async () => {
  try {
    const savedSignature = localStorage.getItem('walletSignature');
    const savedAddress = localStorage.getItem('walletAddress');
    const savedTimestamp = localStorage.getItem('signatureTimestamp');
    
    if (!savedSignature || !savedAddress || !savedTimestamp) {
      return false;
    }
    
    // Check if signature is older than 24 hours (optional)
    const timestamp = parseInt(savedTimestamp);
    const now = Date.now();
    const isExpired = now - timestamp > 24 * 60 * 60 * 1000;
    
    if (isExpired) {
      localStorage.removeItem('walletSignature');
      localStorage.removeItem('walletAddress');
      localStorage.removeItem('signatureTimestamp');
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Error checking signature:", error);
    return false;
  }
};

// Save the signature to local storage
const saveSignature = async (signature, address) => {
  try {
    localStorage.setItem('walletSignature', signature);
    localStorage.setItem('walletAddress', address);
    localStorage.setItem('signatureTimestamp', Date.now().toString());
    return true;
  } catch (error) {
    console.error("Error saving signature:", error);
    return false;
  }
};

export default function DashboardLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isConnected, address } = useAccount();
  const { signMessage } = useSignMessage();
  const [isSigning, setIsSigning] = useState(false);
  const [hasValidSignature, setHasValidSignature] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check for existing valid signature when wallet connects
    const checkExistingSignature = async () => {
      if (isConnected && address) {
        const isValid = await checkSignature();
        setHasValidSignature(isValid);
        
        // If signature exists but is for different address, clear it
        const savedAddress = localStorage.getItem('walletAddress');
        if (savedAddress && savedAddress !== address) {
          localStorage.removeItem('walletSignature');
          localStorage.removeItem('walletAddress');
          localStorage.removeItem('signatureTimestamp');
          setHasValidSignature(false);
        }
      }
    };
    
    checkExistingSignature();
  }, [isConnected, address]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSignMessage = async () => {
    if (!address) return;
    
    setIsSigning(true);
    try {
      // Sign a message to confirm identity
      const message = `Please sign this message to confirm your identity with address: ${address}`;
      const signature = await signMessage({ message });
      
      console.log("Message signed:", signature);
      
      // Save signature to local storage
      const saved = await saveSignature(signature, address);
      if (saved) {
        setHasValidSignature(true);
      }
    } catch (error) {
      console.error("Error signing message:", error);
      // Handle user rejection or other errors
      if (error.code === 4001) {
        console.log("User rejected the signature request");
      }
    } finally {
      setIsSigning(false);
    }
  };

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
