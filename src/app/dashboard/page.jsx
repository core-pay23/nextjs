"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { useEOAAddress } from "@/hooks";
import StatCard from "@/components/dashboard/StatCard";
import DebitCard from "@/components/dashboard/DebitCard";
import ChartCard from "@/components/dashboard/ChartCard";
import ArtistsTable from "@/components/dashboard/ArtistsTable";
import {
  MusicIcon,
  HardDriveIcon,
  ActivityIcon,
  DollarSignIcon,
  WalletIcon,
  HistoryIcon,
  BillIcon,
  MoneyBillIcon,
} from "@/components/dashboard/Icons";
import { ChevronDown } from "react-feather";

export default function DashboardPage() {
  const { isConnected } = useAccount();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { eoaAddress, loading, error, clientWalletAddress } = useEOAAddress();


  useEffect(() => {
    setMounted(true);
  }, []);


  useEffect(() => {
    if (!isConnected) {
      router.push("/");
    }
  }, [isConnected, router]);

  // Don't render until client-side mounted to prevent hydration issues
  if (!mounted) {
    return null;
  }

  // Don't render dashboard content if not connected
  if (!isConnected) {
    return null;
  }

  return (
    <section className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6">

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Debit/Credit Card Style Component */}
        <DebitCard title="Wallet" value="$0.27" 
        eoaAddress={eoaAddress} loading={loading} error={error} clientWalletAddress={clientWalletAddress}
        />

        <StatCard
          title="Storage Used"
          value="84GB"
          icon={HardDriveIcon}
          iconBgColor="bg-cyan-600/20"
          iconColor="text-cyan-400"
        />
        {/* Shortcut Buttons */}
        <div className="col-span-2 grid grid-cols-2 gap-4">
          <a
            href="/payment"
            className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-900/40 border border-white/10 backdrop-blur-md cursor-pointer transition group hover:bg-blue-600/30 hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <span className="mb-2 text-blue-400 group-hover:text-blue-500">
              <MoneyBillIcon className="h-6 w-6" />
            </span>
            <span className="text-white font-medium">Create Payment</span>
          </a>
          <a
            href="/wallet"
            className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-900/40 border border-white/10 backdrop-blur-md cursor-pointer transition group hover:bg-emerald-600/30 hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <span className="mb-2 text-emerald-400 group-hover:text-emerald-500">
              <ActivityIcon className="h-6 w-6" />
            </span>
            <span className="text-white font-medium">Withdraw</span>
          </a>
          <a
            href="/wallet?action=history"
            className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-900/40 border border-white/10 backdrop-blur-md cursor-pointer transition group hover:bg-purple-600/30 hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <span className="mb-2 text-purple-400 group-hover:text-purple-500">
              <HistoryIcon className="h-6 w-6" />
            </span>
            <span className="text-white font-medium">History</span>
          </a>
          <a
            href="/wallet"
            className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-900/40 border border-white/10 backdrop-blur-md cursor-pointer transition group hover:bg-cyan-600/30 hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <span className="mb-2 text-cyan-400 group-hover:text-cyan-500">
              <WalletIcon className="h-6 w-6" />
            </span>
            <span className="text-white font-medium">Wallet</span>
          </a>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Monthly Revenue Trends */}
        <ChartCard className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-medium">Monthly Revenue Trends</h2>
            <div className="flex items-center gap-2">
              <span className="text-xs text-emerald-400 flex items-center gap-1">
                {/* Replace with Feather Icon */}
                <ChevronDown className="h-3 w-3" />
                +12.5%
              </span>
              <select className="text-xs bg-slate-800/50 border border-white/10 rounded px-2 py-1">
                <option>2024</option>
                <option>2023</option>
              </select>
            </div>
          </div>
          <div className="h-48 bg-slate-800/30 rounded-lg flex items-center justify-center">
            <p className="text-white/40">Chart component placeholder</p>
          </div>
        </ChartCard>

        {/* Genre Distribution */}
        <ChartCard>
          <h2 className="font-medium mb-4">Genre Distribution</h2>
          <div className="h-48 bg-slate-800/30 rounded-lg flex items-center justify-center">
            <p className="text-white/40">Chart component placeholder</p>
          </div>
        </ChartCard>
      </div>

      {/* Studio Usage & Artists table */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Studio Usage Chart */}
        <ChartCard>
          <h2 className="font-medium mb-4">Studio Usage (7 days)</h2>
          <div className="h-48 bg-slate-800/30 rounded-lg flex items-center justify-center">
            <p className="text-white/40">Chart component placeholder</p>
          </div>
        </ChartCard>

        {/* Artists table */}
        <div className="lg:col-span-2">
          <ArtistsTable />
        </div>
      </div>

      {/* Frequency Spectrum */}
      <ChartCard>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-medium">Frequency Spectrum Analysis</h2>
          <button className="text-xs text-white/60 hover:text-white transition">
            View Details
          </button>
        </div>
        <div className="h-64 bg-slate-800/30 rounded-lg flex items-center justify-center">
          <p className="text-white/40">Chart component placeholder</p>
        </div>
      </ChartCard>
    </section>
  );
}
