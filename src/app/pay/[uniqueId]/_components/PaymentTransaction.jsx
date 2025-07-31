"use client";

import { useState } from "react";
import { useWallet } from "@/hooks/useWallet";
import { useWalletBalance } from "@/hooks/useWallet";
import TokenDisplay from "./TokenDisplay";
import { tokenList } from "@/lib/tokenlist";
import { parseUnits, formatUnits } from "viem";
import Image from "next/image";
import CustomConnectButton from "./CustomConnectButton";

const PaymentTransaction = ({ paymentData, onSuccess }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  
  const { address, isConnected, openConnectModal, switchChain, chainId, disconnect } = useWallet();
  const { amount, tokenAddress, User } = paymentData;
  const recipientAddress = User?.EoaAddress;
  const requiredChainId = 4202; // Lisk Sepolia
  const isCorrectNetwork = chainId === requiredChainId;

  // Get token info
  const token = tokenList.find(
    (t) => t.address.toLowerCase() === tokenAddress.toLowerCase()
  );

  // Get wallet balance for the specific token
  const { balance, isLoading: balanceLoading } = useWalletBalance(
    token?.native ? null : tokenAddress
  );

  console.log('Wallet and balance data:', { 
    address, 
    isConnected, 
    chainId, 
    balance, 
    balanceLoading, 
    token, 
    amount,
    tokenAddress 
  });

  const handleConnectWallet = () => {
    openConnectModal?.();
  };

  const handleSwitchNetwork = async () => {
    try {
      await switchChain({ chainId: requiredChainId });
    } catch (err) {
      setError("Failed to switch network. Please switch manually.");
    }
  };

  const hasInsufficientBalance = () => {
    console.log('=== hasInsufficientBalance Debug ===');
    console.log('Function called');
    console.log('Raw values:', { balance, token, amount });
    console.log('Balance exists:', !!balance);
    console.log('Token exists:', !!token);
    
    if (!token) {
      console.log('❌ No token data - returning true (block transaction)');
      return true; // Block transaction if no token
    }
    
    if (!balance || balance === undefined) {
      console.log('❌ No balance data - returning true (block transaction)');
      return true; // Block transaction if balance not loaded
    }
    
    console.log('✅ Both balance and token exist, proceeding with calculation...');
    console.log('Token decimals:', token.decimals);
    console.log('Amount (raw):', amount, 'Type:', typeof amount);
    
    try {
      const requiredAmount = parseUnits(amount.toString(), token.decimals);
      console.log('Required amount (wei):', requiredAmount.toString());
      console.log('Wallet balance (wei):', balance.value?.toString());
      console.log('Balance value type:', typeof balance.value);
      
      const insufficient = balance.value < requiredAmount;
      console.log('Is insufficient?', insufficient);
      console.log('================================');
      
      return insufficient;
    } catch (error) {
      console.error('Error in balance calculation:', error);
      return true; // Block transaction on error
    }
  };

  const formatBalance = () => {
    if (!balance || !token) return "0";
    return `${parseFloat(formatUnits(balance.value, token.decimals)).toFixed(4)} ${token.symbol}`;
  };

  const handlePayment = async () => {
    if (!isConnected) {
      setError("Wallet not connected");
      return;
    }

    if (!isCorrectNetwork) {
      setError("Please switch to Lisk Sepolia network");
      return;
    }

    if (!token) {
      setError("Invalid token");
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
        <h1 className="text-xl font-semibold text-white mb-2">
          Confirm Payment
        </h1>
        <p className="text-sm text-white/60">
          Review and confirm your transaction
        </p>
      </div>

      {/* Connection and Network Status */}
      {!isConnected && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-red-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div className="flex-1">
              <div className="text-red-400 font-medium text-sm">Wallet Not Connected</div>
              <div className="text-red-200/80 text-sm mt-1">
                Please connect your wallet to proceed with the payment.
              </div>
              <button
                onClick={handleConnectWallet}
                className="mt-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-300 px-3 py-1 rounded-lg text-sm transition-colors"
              >
                Connect Wallet
              </button>
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
            <div className="flex-1">
              <div className="text-amber-400 font-medium text-sm">Wrong Network</div>
              <div className="text-amber-200/80 text-sm mt-1">
                Please switch to Lisk Sepolia network to continue.
              </div>
              <button
                onClick={handleSwitchNetwork}
                className="mt-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-300 px-3 py-1 rounded-lg text-sm transition-colors"
              >
                Switch to Lisk Sepolia
              </button>
            </div>
          </div>
        </div>
      )}

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
        {/* <div className="space-y-2">
          <div className="text-sm text-white/60">To</div>
          <div className="bg-slate-700/40 p-3 rounded-lg border border-white/5">
            <div className="text-white text-sm font-mono">
              {recipientAddress}
            </div>
          </div>
        </div> */}

      </div>

      {/* Connected Wallet Info */}
      {isConnected && (
        <div className="bg-slate-800/40 backdrop-blur-sm border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <div className="flex flex-col space-y-1">
                <div className="text-white/60 text-xs">Connected Wallet</div>
                <div className="text-white text-sm font-mono">
                  {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ''}
                </div>
                <div className="text-white/60 text-xs">
                  {chainId === 4202 ? 'Lisk Sepolia Testnet' : `Chain ID: ${chainId}`}
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                setError(null);
                disconnect();
              }}
              className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-300 px-3 py-2 rounded-lg text-sm transition-colors"
            >
              Disconnect
            </button>
          </div>
        </div>
      )}

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
            ) : !balance || !token ? (
              <span className="text-red-400 text-sm">
                {balance == undefined ? "0" : "No balance data"}
              </span>
            ) : (
              formatBalance()
            )}
          </div>
        </div>
        
        {!balanceLoading && hasInsufficientBalance() && (
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
        disabled={isProcessing || balanceLoading || !isConnected || !isCorrectNetwork || hasInsufficientBalance()}
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
        ) : !isConnected ? (
          <span>Connect Wallet to Continue</span>
        ) : !isCorrectNetwork ? (
          <span>Switch Network to Continue</span>
        ) : balanceLoading ? (
          <span>Loading Balance...</span>
        ) : !balance || !token ? (
          <span>Unable to Load Balance</span>
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
            <Image
              src="/icon.svg"
              alt="Koneksi Logo"
              width={120}
              height={120}
              className="h-6 w-6"
              priority
            />
          <span>Transaction Secured by Koneksi</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentTransaction;
