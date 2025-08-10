'use client';
import { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";

const ConnectWalletCard = ({ isConnected, handleSignMessage, isSigning, checkSignature }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-trigger signing when wallet connects (only once)
  useEffect(() => {
    if (mounted && isConnected && !isSigning) {
      // Small delay to ensure wallet is fully connected
      const timer = setTimeout(() => {
        handleSignMessage();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isConnected, handleSignMessage, isSigning, mounted]);

  // Prevent hydration mismatch by not rendering until client-side mounted
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0c1425] flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl mb-4 animate-pulse"></div>
            <div className="h-8 bg-slate-700/50 rounded w-32 mx-auto mb-2 animate-pulse"></div>
            <div className="h-4 bg-slate-700/30 rounded w-48 mx-auto animate-pulse"></div>
          </div>
          <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <div className="h-20 bg-slate-700/30 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0c1425] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 mb-4">
            {/* Replaced with icon.svg, now larger */}
            <Image
              src="/icon.svg"
              alt="Koneksi Logo"
              width={120}
              height={120}
              className="h-20 w-20"
              priority
            />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Koneksi</h1>
          <p className="text-white/60">
            Connect your wallet to access secure digital asset payments
          </p>
        </div>

        {/* Connection Card */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600/20 rounded-full mb-4">
              {isSigning ? (
                // Loading spinner for signing
                <svg
                  className="h-10 w-10 text-blue-400 animate-spin"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 2L12 6M12 18L12 22M6 12L2 12M22 12L18 12M19.78 19.78L17.66 17.66M6.34 6.34L4.22 4.22M6.34 17.66L4.22 19.78M19.78 4.22L17.66 6.34"
                  />
                </svg>
              ) : (
                // Default wallet icon
                <svg
                  className="h-10 w-10 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              )}
            </div>
            <h2 className="text-2xl font-semibold text-white mb-2">
              {isConnected && isSigning
                ? "Sign Message"
                : isConnected
                ? "Sign to Authenticate"
                : "Connect Wallet"}
            </h2>
            <p className="text-white/60 text-sm">
              {isConnected && isSigning
                ? "Please sign the message in your wallet to authenticate"
                : isConnected
                ? "Complete the authentication by signing a message"
                : "Connect your wallet to access secure payment processing and manage your digital assets"}
            </p>
          </div>

          {/* Show different content based on state */}
          {!isConnected ? (
            // Features when not connected
            <>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-8 h-8 bg-purple-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="h-4 w-4 text-purple-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-medium">Secure Payments</p>
                    <p className="text-white/60 text-xs">
                      Process digital asset transactions safely
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-left">
                  <div className="w-8 h-8 bg-green-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="h-4 w-4 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-medium">Asset Management</p>
                    <p className="text-white/60 text-xs">
                      Monitor your digital assets and balances
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-left">
                  <div className="w-8 h-8 bg-cyan-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="h-4 w-4 text-cyan-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h18m-7.5-14L21 7.5m0 0L16.5 12M21 7.5H3"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-medium">Network Analytics</p>
                    <p className="text-white/60 text-xs">
                      Track transactions and network activity
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Connect Button - Using RainbowKit ConnectButton */}
              <div className="flex justify-center">
                <div className="rainbowkit-connect-button">
                  <ConnectButton />
                </div>
              </div>
            </>
          ) : isSigning ? (
            // Signing state
            <div className="mb-8">
              <div className="flex justify-center mb-4">
                <div className="animate-pulse bg-blue-600/20 rounded-lg px-4 py-2">
                  <p className="text-blue-400 text-sm">Processing signature request...</p>
                </div>
              </div>
              <p className="text-white/60 text-xs">
                Check your wallet for the signature request
              </p>
            </div>
          ) : (
            // Connected but need to sign
            <div className="mb-8">
              <button
                onClick={handleSignMessage}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                Sign Message to Continue
              </button>
              <p className="text-white/60 text-xs mt-2">
                This signature proves you own this wallet address
              </p>
            </div>
          )}

          <p className="text-white/40 text-xs mt-4">
            By connecting your wallet, you agree to our terms of service
          </p>
        </div>

        {/* Network Info */}
        <div className="text-center mt-6">
          <p className="text-white/60 text-sm">Powered by Somnia Network</p>
        </div>
      </div>
    </div>
  );
};

export default ConnectWalletCard;