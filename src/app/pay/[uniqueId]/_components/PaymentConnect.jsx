"use client";

import CustomConnectButton from "./CustomConnectButton";
import { useWallet } from "@/hooks/useWallet";

const PaymentConnect = ({ paymentData, onNext }) => {
  const { isConnected, address, chainId } = useWallet();
  const requiredChainId = 4202; // Lisk Sepolia

  const isCorrectNetwork = chainId === requiredChainId;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-white mb-2">
          Connect Your Wallet
        </h1>
        <p className="text-white/60">
          Connect your wallet to proceed with the payment
        </p>
      </div>

      {/* Connection Status */}
      {isConnected && (
        <div className="space-y-4">
          {/* Network Check */}
          {!isCorrectNetwork && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-red-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div>
                  <div className="text-red-400 font-medium text-sm">Wrong Network</div>
                  <div className="text-red-200/80 text-sm mt-1">
                    Please switch to Lisk Sepolia network to continue with the payment.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Success State */}
          {isCorrectNetwork && (
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <div className="text-green-400 font-medium text-sm">Wallet Connected</div>
                  <div className="text-green-200/80 text-sm mt-1">
                    Your wallet is connected and ready for payment.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Wallet Features */}
      <div className="bg-slate-800/40 backdrop-blur-sm border border-white/10 rounded-xl p-6">
        <h3 className="text-lg font-medium text-white mb-4">
          Why Connect Your Wallet?
        </h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <div className="text-white font-medium text-sm">Secure Transaction</div>
              <div className="text-white/60 text-xs">Your private keys never leave your device</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <div className="text-white font-medium text-sm">Instant Payment</div>
              <div className="text-white/60 text-xs">Fast and reliable blockchain transactions</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div className="text-white font-medium text-sm">Transparent</div>
              <div className="text-white/60 text-xs">All transactions are recorded on the blockchain</div>
            </div>
          </div>
        </div>
      </div>

      {/* Connect Button */}
      <CustomConnectButton
        onConnect={isConnected && isCorrectNetwork ? onNext : undefined}
      >
        {isConnected 
          ? isCorrectNetwork 
            ? "Continue to Payment" 
            : "Switch Network"
          : "Connect Wallet"
        }
      </CustomConnectButton>
    </div>
  );
};

export default PaymentConnect;
