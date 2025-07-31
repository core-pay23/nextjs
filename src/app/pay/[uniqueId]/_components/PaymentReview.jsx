"use client";

import TokenDisplay from "./TokenDisplay";

const PaymentReview = ({ paymentData, onNext }) => {
  const { amount, tokenAddress, User } = paymentData;
  const recipientAddress = User?.EoaAddress;

  const formatAddress = (addr) => {
    if (!addr) return "Unknown";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-white mb-2">
          Review Payment
        </h1>
        <p className="text-white/60">
          Please review the payment details before proceeding
        </p>
      </div>

      {/* Payment Details Card */}
      <div className="bg-slate-800/40 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-4">
        <h2 className="text-lg font-medium text-white">Payment Details</h2>
        
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
                <div className="text-white font-medium">Recipient</div>
                <div className="text-white/60 text-sm">{formatAddress(recipientAddress)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment ID */}
        <div className="space-y-2">
          <div className="text-sm text-white/60">Payment ID</div>
          <div className="bg-slate-700/40 p-3 rounded-lg">
            <div className="text-white text-sm font-mono">
              {paymentData.uniqueId}
            </div>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <svg className="w-5 h-5 text-amber-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <div>
            <div className="text-amber-400 font-medium text-sm">Security Notice</div>
            <div className="text-amber-200/80 text-sm mt-1">
              Always verify the recipient address and amount before proceeding. 
              This transaction cannot be reversed once confirmed.
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={onNext}
        className="
          w-full bg-gradient-to-r from-blue-500 to-cyan-600 
          hover:from-blue-600 hover:to-cyan-700 
          text-white font-medium py-4 px-6 rounded-xl 
          transition-all duration-300 ease-in-out
          transform hover:scale-[1.02] hover:shadow-lg
        "
      >
        Proceed to Connect Wallet
      </button>
    </div>
  );
};

export default PaymentReview;
