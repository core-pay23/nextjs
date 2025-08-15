"use client";

import { useWallet } from "@/hooks/useWallet";
import { formatAddress } from "@/lib/utils/strings";

const CustomConnectButton = ({ onConnect, className = "", children }) => {
  const { 
    isConnected, 
    isConnecting, 
    address, 
    openConnectModal, 
    disconnect 
  } = useWallet();

  const handleClick = () => {
    if (isConnected) {
      if (onConnect) {
        onConnect();
      }
    } else {
      openConnectModal?.();
    }
  };


  if (isConnected) {
    return (
      <div className="space-y-4">
        {/* Connected Wallet Display */}
        <div className="bg-slate-800/40 backdrop-blur-sm border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <div className="text-white font-medium">Wallet Connected</div>
                <div className="text-white/60 text-sm">{formatAddress(address)}</div>
              </div>
            </div>
            <button
              onClick={disconnect}
              className="text-white/60 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleClick}
          className={`
            w-full bg-gradient-to-r from-blue-500 to-cyan-600 
            hover:from-blue-600 hover:to-cyan-700 
            text-white font-medium py-4 px-6 rounded-xl 
            transition-all duration-300 ease-in-out
            transform hover:scale-[1.02] hover:shadow-lg
            ${className}
          `}
        >
          {children || "Continue"}
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={isConnecting}
      className={`
        w-full bg-gradient-to-r from-blue-500 to-cyan-600 
        hover:from-blue-600 hover:to-cyan-700 
        disabled:from-slate-600 disabled:to-slate-700
        text-white font-medium py-4 px-6 rounded-xl 
        transition-all duration-300 ease-in-out
        transform hover:scale-[1.02] hover:shadow-lg
        disabled:transform-none disabled:cursor-not-allowed
        flex items-center justify-center space-x-2
        ${className}
      `}
    >
      {isConnecting ? (
        <>
          <svg
            className="animate-spin w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Connecting...</span>
        </>
      ) : (
        <>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span>{children || "Connect Wallet"}</span>
        </>
      )}
    </button>
  );
};

export default CustomConnectButton;
