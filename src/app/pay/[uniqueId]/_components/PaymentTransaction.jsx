"use client";

import { useState, useEffect } from "react";
import { useWallet } from "@/hooks/useWallet";
import { useWalletBalance } from "@/hooks/useWallet";
import TokenDisplay from "./TokenDisplay";
import { tokenList } from "@/lib/tokenlist";
import { parseUnits, formatUnits } from "viem";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import Image from "next/image";
import { somniaTestnet } from "@/providers/wagmi-config";
import {
  PaymentGatewayAbi,
  PaymentGatewayAddress,
} from "@/lib/contracts/paymentGateway.js";
import { erc20Abi } from "@/lib/contracts/erc20.js";
import { parseEventLogs } from "viem";

const TRANSACTION_STEP = {
  CREATE_TRANSACTION: "create",
  ALLOW_TRANSACTION: "allow",
  PAY_TRANSACTION: "pay",
};

const PaymentTransaction = ({ paymentData, onSuccess }) => {
  const {
    data: hash,
    error: writeError,
    isPending,
    writeContract,
    isError,
    failureReason,
  } = useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: receiptError,
    data: receipt,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const {
    data: payHash,
    error: payError,
    writeContract: payWriteContract,
    isError: isPayError,
  } = useWriteContract();

  const {
    isLoading: isPayConfirming,
    isSuccess: isPayConfirmed,
    error: payReceiptError,
    data: payReceipt,
  } = useWaitForTransactionReceipt({
    hash: payHash,
  });

  // Add new hook for ERC20 approve
  const {
    data: approveHash,
    error: approveError,
    writeContract: approveWriteContract,
    isError: isApproveError,
  } = useWriteContract();

  const {
    isLoading: isApproveConfirming,
    isSuccess: isApproveConfirmed,
    error: approveReceiptError,
    data: approveReceipt,
  } = useWaitForTransactionReceipt({
    hash: approveHash,
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [transactionStep, setTransactionStep] = useState(
    TRANSACTION_STEP.CREATE_TRANSACTION
  );
  const [transactionId, setTransactionId] = useState(null);
  const [contractParams, setContractParams] = useState({});

  const {
    address,
    isConnected,
    openConnectModal,
    switchChain,
    chainId,
    disconnect,
  } = useWallet();
  const { amount, tokenAddress, User } = paymentData;
  const recipientAddress = User?.EoaAddress;
  const requiredChainId = somniaTestnet.id;
  const isCorrectNetwork = somniaTestnet.id === chainId;

  // Get token info
  const token = tokenList.find(
    (t) => t.address.toLowerCase() === tokenAddress.toLowerCase()
  );
  // Get wallet balance for the specific token
  const { balance, isLoading: balanceLoading } = useWalletBalance(
    token?.native ? null : tokenAddress
  );

  const formatBalance = () => {
    if (!balance || !token) return "0";
    return `${parseFloat(formatUnits(balance.value, token.decimals)).toFixed(
      4
    )} ${token.symbol}`;
  };

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
    if (!token) {
      return true; // Block transaction if no token
    }

    if (!balance || balance === undefined) {
      return true; // Block transaction if balance not loaded
    }

    try {
      const requiredAmount = parseUnits(amount.toString(), token.decimals);
      const insufficient = balance.value < requiredAmount;
      // console.log('Is insufficient?', insufficient);
      // console.log(`chain ID ${chainId}`)

      return insufficient;
    } catch (error) {
      console.error("Error in balance calculation:", error);
      return true; // Block transaction on error
    }
  };

  useEffect(() => {
    if (writeError) {
      console.error("Write contract error:", writeError);
      setError(writeError.message || "Transaction failed");
      setIsProcessing(false);
    }
    // Handle receipt errors
    if (receiptError) {
      // Move formatBalance inside the component to access balance and token
      const formatBalance = () => {
        if (!balance || !token) return "0";
        return `${parseFloat(
          formatUnits(balance.value, token.decimals)
        ).toFixed(4)} ${token.symbol}`;
      };
      console.error("Receipt error:", receiptError);
      setError(receiptError.message || "Transaction failed");
      setIsProcessing(false);
    }

    switch (transactionStep) {
      case "create":
        if (!isConfirmed && !receipt) return;
        let extractedTransactionId = null;

        // extract create transaction ID
        try {
          if (receipt.logs && receipt.logs.length > 0) {
            const parsedLogs = parseEventLogs({
              abi: PaymentGatewayAbi,
              logs: receipt.logs,
            });
            const txCreatedLog = parsedLogs.find(
              (log) => log.eventName === "TransactionCreated"
            );
            console.log("Parsed logs:", parsedLogs);
            console.log(txCreatedLog);
            if (
              txCreatedLog &&
              txCreatedLog.args &&
              txCreatedLog.args.transactionId !== undefined
            ) {
              extractedTransactionId =
                txCreatedLog.args.transactionId.toString();
            }
          }
        } catch (err) {
          console.error(
            "Error decoding TransactionCreated event with viem:",
            err
          );
        }

        if (!extractedTransactionId) {
          console.error(
            "Could not find transactionId in receipt logs:",
            receipt.logs
          );
          setError(
            "Transaction ID not found in receipt logs. Check contract events."
          );
          setIsProcessing(false);
          return;
        }
        console.log("Transaction ID extracted:", extractedTransactionId);
        setTransactionId(extractedTransactionId);

        // Move to allowance step only for ERC20 tokens, skip for native tokens
        if (token && !token.native) {
          console.log(`do 1`);
          setTransactionStep(TRANSACTION_STEP.ALLOW_TRANSACTION);
        } else {
          console.log(`do 2`);
          setTransactionStep(TRANSACTION_STEP.PAY_TRANSACTION);
        }
        break;

      case "allow":
        // Automatically trigger approval when entering this step
        if (!approveHash && token && !token.native) {
          console.log("Automatically triggering token approval...");
          triggerApproval();
        }

        // Handle approve errors
        console.log(`do allow`);
        if (approveError) {
          console.error("Approve contract error:", approveError);
          setError(approveError.message || "Approval failed");
          setIsProcessing(false);
          return;
        }

        // Handle approve receipt errors
        if (approveReceiptError) {
          console.error("Approve receipt error:", approveReceiptError);
          setError(approveReceiptError.message || "Approval failed");
          setIsProcessing(false);
          return;
        }

        // If approval is confirmed, move to payment step
        if (isApproveConfirmed && approveReceipt) {
          console.log("Token approval confirmed");
          setTransactionStep(TRANSACTION_STEP.PAY_TRANSACTION);
        }
        break;

      case "pay":
        // Only initiate payment if we don't have a hash yet
        if (!payHash && transactionId && contractParams) {
          // Use contractParams from state, but ensure it's up-to-date
          const value = contractParams.token?.native
            ? contractParams.totalPayment
            : undefined;

          // Determine which function to call based on token type
          const functionName = contractParams.token?.native
            ? "payTransaction"
            : "payTransactionWithToken";

          // Prepare arguments
          const args = [transactionId]; // Both functions take the same argument

          const writePayData = {
            address: PaymentGatewayAddress,
            abi: PaymentGatewayAbi,
            functionName,
            args,
            value, // Only set for native token payments
          };
          console.log(`writePayData vvvvv`);
          console.log(writePayData);
          payWriteContract(writePayData);
        }

        // Handle payment errors
        if (payError) {
          console.error("Payment contract error:", payError);
          setError(payError.message || "Payment failed");
          setIsProcessing(false);
          return;
        }

        // Handle payment receipt errors
        if (payReceiptError && payHash) {
          console.error("Payment receipt error:", payReceiptError);
          setError(payReceiptError.message || "Payment failed");
          setIsProcessing(false);
          return;
        }

        // If payment is confirmed, call onSuccess
        if (isPayConfirmed && payReceipt && payHash) {
          console.log("Payment confirmed");
          setIsProcessing(false);
          if (onSuccess) {
            onSuccess();
          }
        }
        break;
      default:
        break;
    }
  }, [
    writeError,
    receiptError,
    isConfirmed,
    receipt,
    transactionStep,
    onSuccess,
    hash,
    transactionId,
    contractParams,
    approveError,
    approveReceiptError,
    isApproveConfirmed,
    approveReceipt,
    payError,
    isPayError,
    payHash,
    isPayConfirmed,
    payReceipt,
    payReceiptError,
    approveHash,
    token
  ]);

  const handlePayment = async () => {
    if (!isConnected) {
      setError("Wallet not connected");
      return;
    }

    if (!isCorrectNetwork) {
      setError("Please switch to Somnia network");
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
      // Prepare arguments for createTransaction
      const originChain = somniaTestnet.id.toString();
      const totalPayment = parseUnits(amount.toString(), token.decimals);
      const shopOwner = recipientAddress;
      const paymentToken = tokenAddress;

      // Store contract params for use in the pay step
      setContractParams({
        PaymentGatewayAbi,
        PaymentGatewayAddress,
        originChain,
        totalPayment,
        shopOwner,
        paymentToken,
        token,
      });

      console.log("Preparing createTransaction with params:", {
        originChain,
        totalPayment: totalPayment.toString(),
        shopOwner,
        paymentToken,
      });

      // Call createTransaction
      console.log("Calling createTransaction...");
      const args = {
        address: PaymentGatewayAddress,
        abi: PaymentGatewayAbi,
        functionName: "createTransaction",
        args: [originChain, totalPayment, shopOwner, paymentToken],
      };
      console.log("Write contract args:", args);
      writeContract(args);
    } catch (err) {
      console.error("Transaction error:", err);
      console.error("Error stack:", err.stack);
      setError(err.message || "Transaction failed");
      setIsProcessing(false);
    }
  };

  // Handle token approval for ERC20 tokens
  const handleApprove = async () => {
    if (!token || token.native) {
      // Skip approval for native tokens
      setTransactionStep(TRANSACTION_STEP.PAY_TRANSACTION);
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const totalPayment = parseUnits(amount.toString(), token.decimals);

      console.log("Preparing token approval with params:", {
        tokenAddress,
        PaymentGatewayAddress,
        totalPayment: totalPayment.toString(),
      });

      // Call approve function on ERC20 token contract
      const args = {
        address: tokenAddress,
        abi: erc20Abi,
        functionName: "approve",
        args: [PaymentGatewayAddress, totalPayment],
      };
      console.log("Approve contract args:", args);
      approveWriteContract(args);
    } catch (err) {
      console.error("Approval error:", err);
      setError(err.message || "Approval failed");
      setIsProcessing(false);
    }
  };

  // New function to trigger approval automatically
  const triggerApproval = async () => {
    if (!token || token.native) {
      // Skip approval for native tokens
      setTransactionStep(TRANSACTION_STEP.PAY_TRANSACTION);
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const totalPayment = parseUnits(amount.toString(), token.decimals);

      console.log("Preparing token approval with params:", {
        tokenAddress,
        PaymentGatewayAddress,
        totalPayment: totalPayment.toString(),
      });

      // Call approve function on ERC20 token contract
      const args = {
        address: tokenAddress,
        abi: erc20Abi,
        functionName: "approve",
        args: [PaymentGatewayAddress, totalPayment],
      };
      console.log("Approve contract args:", args);
      approveWriteContract(args);
    } catch (err) {
      console.error("Approval error:", err);
      setError(err.message || "Approval failed");
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
            <svg
              className="w-5 h-5 text-red-500 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <div className="flex-1">
              <div className="text-red-400 font-medium text-sm">
                Wallet Not Connected
              </div>
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
            <svg
              className="w-5 h-5 text-amber-500 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <div className="flex-1">
              <div className="text-amber-400 font-medium text-sm">
                Wrong Network
              </div>
              <div className="text-amber-200/80 text-sm mt-1">
                Please switch to Somnia network to continue.
              </div>
              <button
                onClick={handleSwitchNetwork}
                className="mt-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-300 px-3 py-1 rounded-lg text-sm transition-colors"
              >
                Switch to Somnia
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
                  {address
                    ? `${address.slice(0, 6)}...${address.slice(-4)}`
                    : ""}
                </div>
                <div className="text-white/60 text-xs">
                  {chainId === somniaTestnet.id
                    ? "Somnia Testnet"
                    : `Chain ID: ${chainId}`}
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
                <svg
                  className="animate-spin w-4 h-4"
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
            <svg
              className="w-5 h-5 text-red-500 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <div className="text-red-400 font-medium text-sm">
                Transaction Error
              </div>
              <div className="text-red-200/80 text-sm mt-1 break-all">
                {error &&
                  (typeof error === "string"
                    ? error.includes("User rejected the request.")
                      ? "User rejected the request."
                      : error
                    : error.message &&
                      error.message.includes("User rejected the request.")
                    ? "User rejected the request."
                    : error.message || String(error))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Processing State */}
      {isProcessing && (
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <svg
              className="animate-spin w-5 h-5 text-blue-400"
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
            <div>
              <div className="text-blue-400 font-medium text-sm">
                Processing Transaction
              </div>
              <div className="text-blue-200/80 text-sm">
                Please wait while your transaction is being processed...
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Button */}
      <button
        onClick={handlePayment}
        disabled={
          isProcessing ||
          balanceLoading ||
          !isConnected ||
          !isCorrectNetwork ||
          hasInsufficientBalance() ||
          transactionStep === TRANSACTION_STEP.ALLOW_TRANSACTION
        }
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
        ) : transactionStep === TRANSACTION_STEP.ALLOW_TRANSACTION ? (
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
            <span>Approving Token Spending...</span>
          </>
        ) : (
          <>
            <svg
              className="w-5 h-5"
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
