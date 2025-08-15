"use client";
import { useEffect, useState } from "react";
import { useEOAAddress } from "@/hooks";
import { Activity, ArrowRight } from "react-feather";
import { getTokenByAddress } from "@/lib/tokenlist";
import Image from "next/image";
import Link from "next/link";


function timeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) {
    return Math.floor(interval) + " years ago";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months ago";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days ago";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours ago";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
}

const StatusBadge = ({ status }) => {
  const baseClasses = "text-xs px-2 py-1 rounded-full font-medium";
  const statusClasses = {
    PENDING: "bg-amber-500/20 text-amber-400",
    COMPLETED: "bg-emerald-500/20 text-emerald-400",
    FAILED: "bg-red-500/20 text-red-400",
    PROCESSING: "bg-blue-500/20 text-blue-400",
  };
  return (
    <span
      className={`${baseClasses} ${
        statusClasses[status] || "bg-slate-500/20 text-slate-400"
      }`}
    >
      {status}
    </span>
  );
};

const toFixedAmount = (token, amount) => {
  if (!token || !amount) return "0.00";
  if(token.decimals < 8) return amount.toFixed(6);
  return amount.toFixed(4);
};

export default function RealTimePaymentsFeed() {
  const { eoaAddress } = useEOAAddress();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (eoaAddress) {
      fetch(`/api/get-recent-payments?eoaAddress=${eoaAddress}&limit=5`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            console.log("Payments data:", data.data);
            setPayments(data.data);
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [eoaAddress]);

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-medium">Real-Time Payments Feed</h2>
        <Link
          href="/dashboard/wallet?action=history"
          className="text-xs text-white/60 hover:text-white transition flex items-center gap-1"
        >
          View All <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
      <div className="space-y-3">
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/30 animate-pulse"
            >
              <div className="h-8 w-8 rounded-full bg-slate-700/50"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-700/50 rounded w-3/4"></div>
                <div className="h-3 bg-slate-700/50 rounded w-1/2"></div>
              </div>
            </div>
          ))
        ) : payments.length > 0 ? (
          payments.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/40 border border-white/10 backdrop-blur-md"
            >
              <div className="p-2 bg-slate-800/50 rounded-full">
                <Activity className="h-4 w-4 text-orange-500" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {(() => {
                      const token = getTokenByAddress(p.tokenAddress);
                      return (
                        <>
                          {token && token.logoURI && (
                            <Image 
                              src={token.logoURI} 
                              alt={token.symbol} 
                              width={16} 
                              height={16} 
                              className="rounded-full"
                            />
                          )}
                          <p className="font-medium text-sm">
                            {toFixedAmount(token, p.amount)} {token ? token.symbol : 'Unknown Token'}
                          </p>
                        </>
                      );
                    })()}
                  </div>
                  <StatusBadge status={p.status} />
                </div>
                <p className="text-xs text-white/60">{timeAgo(p.createdAt)}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="h-48 flex items-center justify-center text-white/40">
            No recent payments found.
          </div>
        )}
      </div>
    </div>
  );
}
