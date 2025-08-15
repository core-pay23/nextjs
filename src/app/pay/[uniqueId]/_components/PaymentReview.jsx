"use client";
import { coreTestnet } from "@/providers/wagmi-config";
import TokenDisplay from "./TokenDisplay";
import { useWallet } from "@/hooks/useWallet";
import { useEffect, useState } from "react";

const PaymentReview = ({ paymentData, onNext }) => {
  const { amount, tokenAddress, User } = paymentData;
  const recipientAddress = User?.EoaAddress;
  const { isConnected, openConnectModal, chainId } = useWallet();
  const requiredChainId = coreTestnet.id;
  const isCorrectNetwork = chainId === requiredChainId;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleProceed = () => {
    if (!isConnected) {
      // If not connected, open wallet connection modal
      openConnectModal?.();
    } else if (!isCorrectNetwork) {
      // If connected but wrong network, still proceed (network switching will be handled in transaction step)
      onNext();
    } else {
      // If connected and correct network, proceed to transaction
      onNext();
    }
  };

  const formatAddress = (addr) => {
    if (!addr) return "Unknown";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (!mounted) {
    // Render a placeholder or nothing until mounted on client
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-xl font-semibold text-white mb-2">
          Review Payment
        </h1>
        <p className="text-sm text-white/60">
          Please review the payment details before proceeding
        </p>
      </div>

      {/* Payment Details Card */}
      <div className="bg-slate-800/40 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-4">
        <h2 className="text-base font-medium text-white">Payment Details</h2>
        
        {/* Token and Amount */}
        <div className="space-y-3">
          <div className="text-sm text-white/60">You will send</div>
          <TokenDisplay
            tokenAddress={tokenAddress}
            amount={amount}
            className="bg-slate-700/40 p-4 rounded-lg"
          />
        </div>

        {/* Recipient */}
        <div className="space-y-2">
          <div className="text-sm text-white/60">To recipient</div>
          <div className="bg-slate-700/40 p-4 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <div className="text-white text-sm font-medium">Recipient</div>
                <div className="text-white/60 text-xs">{formatAddress(recipientAddress)}</div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Wallet Status Notice */}
      {!isConnected && (
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-blue-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <div className="text-blue-400 font-medium text-sm">Wallet Connection Required</div>
              <div className="text-blue-200/80 text-sm mt-1">
                You'll need to connect your wallet to proceed with the payment.
              </div>
            </div>
          </div>
        </div>
      )}

      {isConnected && !isCorrectNetwork && (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-amber-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <div className="text-amber-400 font-medium text-sm">Network Switch Required</div>
              <div className="text-amber-200/80 text-sm mt-1">
                Please switch to core network to complete the payment.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Security Notice */}
      <div className="bg-slate-800/40 backdrop-blur-sm border border-white/10 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <svg className="w-5 h-5 text-slate-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <div>
            <div className="text-slate-300 font-medium text-sm">Security Notice</div>
            <div className="text-slate-400 text-sm mt-1">
              Always verify the recipient address and amount before proceeding. 
              This transaction cannot be reversed once confirmed.
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={handleProceed}
        className="
          w-full bg-gradient-to-r from-blue-500 to-cyan-600 
          hover:from-blue-600 hover:to-cyan-700 
          text-white font-medium py-3 px-6 rounded-xl 
          transition-all duration-300 ease-in-out
          transform hover:scale-[1.02] hover:shadow-lg
          flex items-center justify-center space-x-2
        "
      >
        {!isConnected ? (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Connect Wallet & Proceed</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            <span>Proceed to Payment</span>
          </>
        )}
      </button>
    </div>
  );
};

export default PaymentReview;
