"use client";

import { useState } from "react";
import { useWallet } from "@/hooks/useWallet";
import { useWalletBalance } from "@/hooks/useWallet";
import TokenDisplay from "./TokenDisplay";
import { tokenList } from "@/lib/tokenlist";
import { parseUnits, formatUnits } from "viem";

const PaymentTransaction = ({ paymentData, onSuccess }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  
  const { address, isConnected } = useWallet();
  const { amount, tokenAddress, User } = paymentData;
  const recipientAddress = User?.EoaAddress;

  // Get token info
  const token = tokenList.find(
    (t) => t.address.toLowerCase() === tokenAddress.toLowerCase()
  );

  // Get wallet balance for the specific token
  const { balance, isLoading: balanceLoading } = useWalletBalance(
    token?.native ? null : tokenAddress
  );

  const hasInsufficientBalance = () => {
    if (!balance || !token) return false;
    const requiredAmount = parseUnits(amount.toString(), token.decimals);
    return balance.value < requiredAmount;
  };

  const formatBalance = () => {
    if (!balance || !token) return "0";
    return `${parseFloat(formatUnits(balance.value, token.decimals)).toFixed(4)} ${token.symbol}`;
  };

  const handlePayment = async () => {
    if (!isConnected || !token) {
      setError("Wallet not connected or invalid token");
      return;
    }

    if (hasInsufficientBalance()) {
      setError("Insufficient balance");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Simulate transaction processing
      // In a real implementation, you would:
      // 1. For native tokens: Use sendTransaction
      // 2. For ERC20 tokens: Use writeContract with transfer function
      
      await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate transaction time
      
      // Mock transaction hash
      const mockTxHash = `0x${Math.random().toString(16).substr(2, 64)}`;
      
      onSuccess(mockTxHash);
    } catch (err) {
      setError(err.message || "Transaction failed");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-white mb-2">
          Confirm Payment
        </h1>
        <p className="text-white/60">
          Review and confirm your transaction
        </p>
      </div>

      {/* Transaction Summary */}
      <div className="bg-slate-800/40 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-4">
        <h2 className="text-lg font-medium text-white">Transaction Summary</h2>
        
        {/* Amount */}
        <div className="space-y-3">
          <div className="text-sm text-white/60">You will send</div>
          <TokenDisplay
            tokenAddress={tokenAddress}
            amount={amount}
            className="bg-slate-700/40 p-4 rounded-lg border border-white/5"
          />
        </div>

        {/* Recipient */}
        <div className="space-y-2">
          <div className="text-sm text-white/60">To</div>
          <div className="bg-slate-700/40 p-3 rounded-lg border border-white/5">
            <div className="text-white text-sm font-mono">
              {recipientAddress}
            </div>
          </div>
        </div>
      </div>

      {/* Wallet Balance */}
      <div className="bg-slate-800/40 backdrop-blur-sm border border-white/10 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div className="text-white/60 text-sm">Your Balance</div>
          <div className="text-white font-medium">
            {balanceLoading ? (
              <div className="flex items-center space-x-2">
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                <span className="text-sm">Loading...</span>
              </div>
            ) : (
              formatBalance()
            )}
          </div>
        </div>
        
        {hasInsufficientBalance() && (
          <div className="mt-2 text-red-400 text-sm">
            Insufficient balance for this transaction
          </div>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-red-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div>
              <div className="text-red-400 font-medium text-sm">Transaction Error</div>
              <div className="text-red-200/80 text-sm mt-1">{error}</div>
            </div>
          </div>
        </div>
      )}

      {/* Processing State */}
      {isProcessing && (
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <svg className="animate-spin w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
            <div>
              <div className="text-blue-400 font-medium text-sm">Processing Transaction</div>
              <div className="text-blue-200/80 text-sm">Please wait while your transaction is being processed...</div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Button */}
      <button
        onClick={handlePayment}
        disabled={isProcessing || hasInsufficientBalance() || balanceLoading}
        className="
          w-full bg-gradient-to-r from-blue-500 to-cyan-600 
          hover:from-blue-600 hover:to-cyan-700 
          disabled:from-slate-600 disabled:to-slate-700
          text-white font-medium py-4 px-6 rounded-xl 
          transition-all duration-300 ease-in-out
          transform hover:scale-[1.02] hover:shadow-lg
          disabled:transform-none disabled:cursor-not-allowed
          flex items-center justify-center space-x-2
        "
      >
        {isProcessing ? (
          <>
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
            <span>Processing...</span>
          </>
        ) : hasInsufficientBalance() ? (
          <span>Insufficient Balance</span>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Confirm Payment</span>
          </>
        )}
      </button>

      {/* Security Notice */}
      <div className="text-center text-white/60 text-sm">
        <div className="flex items-center justify-center space-x-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span>Secured by blockchain technology</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentTransaction;
