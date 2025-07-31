"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { useEOAAddress } from "@/hooks";
import StatCard from "@/components/dashboard/StatCard";
import ChartCard from "@/components/dashboard/ChartCard";
import ArtistsTable from "@/components/dashboard/ArtistsTable";
import {
  MusicIcon,
  HardDriveIcon,
  ActivityIcon,
  DollarSignIcon,
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
      {/* EOA Address Display */}
      <div className="bg-slate-800/50 border border-white/10 rounded-lg p-4">
        <h3 className="text-sm font-medium text-white/60 mb-2">
          Your EOA Address
        </h3>
        {loading ? (
          <div className="text-sm text-white/40">Loading EOA address...</div>
        ) : error ? (
          <div className="text-sm text-red-400">Error: {error}</div>
        ) : eoaAddress ? (
          <div className="text-sm font-mono text-emerald-400 break-all">
            {eoaAddress}
          </div>
        ) : (
          <div className="text-sm text-white/40">No EOA address found</div>
        )}
        {clientWalletAddress && (
          <div className="mt-2">
            <span className="text-xs text-white/40">Client Wallet: </span>
            <span className="text-xs font-mono text-white/60 break-all">
              {clientWalletAddress}
            </span>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Tracks"
          value="247"
          icon={MusicIcon}
          iconBgColor="bg-blue-600/20"
          iconColor="text-blue-400"
        />
        <StatCard
          title="Storage Used"
          value="84GB"
          icon={HardDriveIcon}
          iconBgColor="bg-cyan-600/20"
          iconColor="text-cyan-400"
        />
        <StatCard
          title="Active Sessions"
          value="12"
          icon={ActivityIcon}
          iconBgColor="bg-green-600/20"
          iconColor="text-green-400"
        />
        <StatCard
          title="Revenue"
          value="$12.4K"
          icon={DollarSignIcon}
          iconBgColor="bg-purple-600/20"
          iconColor="text-purple-400"
        />
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
