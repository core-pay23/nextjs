"use client";

import { useState } from "react";
import TokenDisplay from "./TokenDisplay";

const PaymentSuccess = ({ paymentData, transactionHash }) => {
  const [copied, setCopied] = useState(false);
  const { amount, tokenAddress, User } = paymentData;

  const handleCopyHash = async () => {
    if (transactionHash) {
      await navigator.clipboard.writeText(transactionHash);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const explorerUrl = `https://sepolia-blockscout.lisk.com/tx/${transactionHash}`;

  return (
    <div className="space-y-6">
      {/* Success Animation */}
      <div className="text-center">
        <div className="w-20 h-20 mx-auto bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-4">
          <svg 
            className="w-10 h-10 text-white animate-pulse" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path 
              fillRule="evenodd" 
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
              clipRule="evenodd" 
            />
          </svg>
        </div>
        <h1 className="text-xl font-semibold text-white mb-2">
          Payment Successful!
        </h1>
        <p className="text-sm text-white/60">
          Your transaction has been confirmed on the blockchain
        </p>
      </div>

      {/* Transaction Details */}
      <div className="bg-slate-800/40 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-4">
        <h2 className="text-base font-medium text-white">Transaction Details</h2>
        
        {/* Amount Sent */}
        <div className="space-y-3">
          <div className="text-sm text-white/60">Amount Sent</div>
          <TokenDisplay
            tokenAddress={tokenAddress}
            amount={amount}
            className="bg-green-500/10 border border-green-500/20 p-4 rounded-lg"
          />
        </div>

        {/* Transaction Hash */}
        <div className="space-y-2">
          <div className="text-sm text-white/60">Transaction Hash</div>
          <div className="bg-slate-700/40 p-3 rounded-lg border border-white/5">
            <div className="flex items-center justify-between">
              <div className="text-white text-sm font-mono truncate pr-2">
                {transactionHash}
              </div>
              <button
                onClick={handleCopyHash}
                className="text-white/60 hover:text-white transition-colors shrink-0"
                title="Copy transaction hash"
              >
                {copied ? (
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Status */}
        {/* <div className="space-y-2">
          <div className="text-sm text-white/60">Status</div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 font-medium text-sm">Confirmed</span>
          </div>
        </div> */}

      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        {/* View on Explorer */}
        <a
          href={explorerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="
            w-full bg-slate-800/40 backdrop-blur-sm border border-white/10
            hover:bg-slate-700/40 hover:border-white/20
            text-white font-medium py-3 px-6 rounded-xl 
            transition-all duration-300 ease-in-out
            flex items-center justify-center space-x-2
            group
          "
        >
          <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          <span>View on Block Explorer</span>
        </a>

        {/* Create New Payment */}
        <button
          onClick={() => window.location.href = '/dashboard'}
          className="
            w-full bg-gradient-to-r from-blue-500 to-cyan-600 
            hover:from-blue-600 hover:to-cyan-700 
            text-white font-medium py-3 px-6 rounded-xl 
            transition-all duration-300 ease-in-out
            transform hover:scale-[1.02] hover:shadow-lg
            flex items-center justify-center space-x-2
          "
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Create New Payment</span>
        </button>
      </div>

      {/* Success Message */}
      <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <svg className="w-5 h-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <div>
            <div className="text-green-400 font-medium text-sm">Payment Complete</div>
            <div className="text-green-200/80 text-sm mt-1">
              Your payment has been successfully processed and recorded on the blockchain. 
              The recipient will receive the funds shortly.
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-white/60 text-sm">
        <div className="flex items-center justify-center space-x-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>Secured by Koneksi</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
