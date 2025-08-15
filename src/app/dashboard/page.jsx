"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount, useSignMessage } from "wagmi";
import { useEOAAddress } from "@/hooks";
import StatCard from "@/components/dashboard/StatCard";
import DebitCard from "@/components/dashboard/DebitCard";
import ChartCard from "@/components/dashboard/ChartCard";
import CreatePaymentModal from "./_components/createPaymentModal";
import RealTimePaymentsFeed from "./_components/RealTimePaymentsFeed";
import PaymentTokenDistribution from "./_components/PaymentTokenDistribution";
import {
  ActivityIcon,
  WalletIcon,
  HistoryIcon,
  MoneyBillIcon,
} from "@/components/dashboard/Icons";
import { ChevronDown } from "react-feather";
import { useMerchantTransactions } from "@/hooks/useMerchantTransactions";
import Link from "next/link";

export default function DashboardPage() {
  // All hooks must be called before any conditional returns
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { eoaAddress, loading, error, clientWalletAddress } = useEOAAddress();
  const [isCreatePaymentModalOpen, setIsCreatePaymentModalOpen] = useState(false);
  const [paymentModalState, setPaymentModalState] = useState("create"); // create, success
  const [paymentData, setPaymentData] = useState(null);
  const { ids, transactions, isLoading: isTransactionsLoading, refetch } = useMerchantTransactions(eoaAddress);
  const [storageUsed, setStorageUsed] = useState(null);
  const [storageLoading, setStorageLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isConnected) {
      router.push("/");
    }
  }, [isConnected, router]);

  useEffect(() => {
    // Simulate async fetch for storage used
    setStorageLoading(true);
    setTimeout(() => {
      setStorageUsed("84GB"); // Replace with real value
      setStorageLoading(false);
    }, 1000);
  }, []);

  // Don't render until client-side mounted to prevent hydration issues
  if (!mounted) {
    return null;
  }

  // Don't render dashboard content if not connected
  if (!isConnected) {
    return null;
  }

  const handleCreatePayment = async (paymentData) => {
    console.log(paymentData);
    try {
      // Create message to sign
      const message = `Create payment request: ${paymentData.amount} ${paymentData.tokenAddress} to ${clientWalletAddress} at ${Date.now()}`;

      // Sign the message
      const signedMessage = await signMessageAsync({ message });

      const response = await fetch("/api/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...paymentData,
          clientWalletAddress,
          signedMessage,
          message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create payment");
      }

      const result = await response.json();
      setPaymentData(result);
      setPaymentModalState("success");

      return result;
    } catch (error) {
      console.error("Error creating payment:", error);
      throw error;
    }
  };

  return (
  <section className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6 max-w-7xl mx-auto">
      <CreatePaymentModal
        isOpen={isCreatePaymentModalOpen}
        onClose={() => setIsCreatePaymentModalOpen(false)}
        onCreate={handleCreatePayment}
        paymentModalState={paymentModalState}
        setPaymentModalState={setPaymentModalState}
        paymentData={paymentData}
        setPaymentData={setPaymentData}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Debit/Credit Card Style Component */}
        <DebitCard
          title="Wallet"
          value="$0.27"
          eoaAddress={eoaAddress}
          loading={loading}
          error={error}
          clientWalletAddress={clientWalletAddress}
        />

        {/* Single StatCard showing both ETH and USDC balances */}
        <StatCard
          iconBgColor="bg-cyan-600/20"
          iconColor="text-cyan-400"
        />

        {/* Shortcut Buttons */}
        <div className="col-span-2 grid grid-cols-2 gap-4">
          <button
            onClick={() => setIsCreatePaymentModalOpen(true)}
            className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-900/40 border border-white/10 backdrop-blur-md cursor-pointer transition group hover:bg-blue-600/30 hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <span className="mb-2 text-blue-400 group-hover:text-blue-500">
              <MoneyBillIcon className="h-6 w-6" />
            </span>
            <span className="text-white font-medium">Create Payment</span>
          </button>
          <Link
            href="/dashboard/wallet?action=withdraw"
            className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-900/40 border border-white/10 backdrop-blur-md cursor-pointer transition group hover:bg-emerald-600/30 hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <span className="mb-2 text-emerald-400 group-hover:text-emerald-500">
              <ActivityIcon className="h-6 w-6" />
            </span>
            <span className="text-white font-medium">Withdraw</span>
          </Link>
          <Link
            href="/dashboard/wallet?action=history"
            className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-900/40 border border-white/10 backdrop-blur-md cursor-pointer transition group hover:bg-purple-600/30 hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <span className="mb-2 text-purple-400 group-hover:text-purple-500">
              <HistoryIcon className="h-6 w-6" />
            </span>
            <span className="text-white font-medium">History</span>
          </Link>
          <Link
            href="/dashboard/wallet"
            className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-900/40 border border-white/10 backdrop-blur-md cursor-pointer transition group hover:bg-cyan-600/30 hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <span className="mb-2 text-cyan-400 group-hover:text-cyan-500">
              <WalletIcon className="h-6 w-6" />
            </span>
            <span className="text-white font-medium">Wallet</span>
          </Link>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Real-Time Payments Feed */}
        <ChartCard className="lg:col-span-2">
          <RealTimePaymentsFeed />
        </ChartCard>

        {/* Payment Token Distribution */}
        <ChartCard>
          <PaymentTokenDistribution />
        </ChartCard>
      </div>

    </section>
  );
}
