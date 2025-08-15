"use client";

import React, { useState, useEffect } from "react";
import { useEOAAddress } from "@/hooks";
import { tokenList } from "@/lib/tokenlist";
import { coreTestnetConfig } from "@/providers/wagmi-config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

export default function TransactionHistory() {
  const {
    eoaAddress,
    loading: addressLoading,
    error: addressError,
  } = useEOAAddress();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!eoaAddress) return;

    const fetchTransactionHistory = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `/api/get-transaction-history?eoaAddress=${eoaAddress}`
        );
        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.error || "Failed to fetch transaction history"
          );
        }

        setTransactions(result.data);
      } catch (err) {
        console.error("Error fetching transaction history:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionHistory();
  }, [eoaAddress]);

  if (addressLoading || loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-white/60">Loading transaction history...</div>
      </div>
    );
  }

  if (addressError || error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-400">{addressError || error}</div>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-white/60">No transaction history found</div>
      </div>
    );
  }

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // Function to truncate address
  const truncateAddress = (address) => {
    if (!address) return "";
    return `${address.substring(0, 6)}...${address.substring(
      address.length - 4
    )}`;
  };

  // Function to get token info by address
  const getTokenInfo = (tokenAddress) => {
    const token = tokenList.find(
      (t) => t.address.toLowerCase() === tokenAddress.toLowerCase()
    );
    return (
      token || {
        name: truncateAddress(tokenAddress),
        logoURI: null,
        decimals: 18,
      }
    );
  };

  // Function to format amount based on token decimals
  const formatAmount = (amount, decimals) => {
    if (!amount || !decimals) return amount;
    // Convert from smallest unit to display unit
    const formatted = amount / Math.pow(10, decimals);
    // Format to appropriate number of decimal places
    return formatted.toFixed(decimals > 6 ? 6 : decimals);
  };

  // Function to get status badge
  const getStatusBadge = (status) => {
    let color = "";
    switch (status) {
      case "COMPLETED":
        color = "text-emerald-300 bg-emerald-500/20";
        break;
      case "FAILED":
        color = "text-red-300 bg-red-500/20";
        break;
      case "PENDING":
        color = "text-yellow-300 bg-yellow-500/20";
        break;
      default:
        color = "text-gray-300 bg-gray-500/20";
    }
    return (
      <span
        className={`inline-flex items-center gap-1 text-xs ${color} px-2 py-1 rounded-full`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left">
        <thead>
          <tr className="text-white/60 text-xs border-b border-white/10">
            <th className="py-2 pr-4 font-medium">Date</th>
            <th className="py-2 pr-4 font-medium">Transaction ID</th>
            <th className="py-2 pr-4 font-medium">Amount</th>
            <th className="py-2 pr-4 font-medium">Token</th>
            <th className="py-2 pr-4 font-medium">Status</th>
            <th className="py-2 pr-4 font-medium">Tx Hash</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => {
            const tokenInfo = getTokenInfo(transaction.tokenAddress);
            return (
              <tr
                key={transaction.id}
                className="border-b border-white/5 last:border-0 hover:bg-white/5 transition"
              >
                <td className="py-3 pr-4 text-white/80">
                  {formatDate(transaction.createdAt)}
                </td>
                <td className="py-3 pr-4 font-mono text-sm">
                  {transaction.status == "PENDING" ? (
                    <div className="flex items-center gap-2">
                      <a
                        href={`/pay/${transaction.uniqueId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-500 hover:text-orange-400 transition-colors"
                      >
                        {truncateAddress(transaction.uniqueId)}
                        <FontAwesomeIcon
                          icon={faExternalLinkAlt}
                          className="ml-2 w-2 h-2"
                        />
                      </a>
                    </div>
                  ) : (
                    <span className="text-white/40 text-sm">
                      {truncateAddress(transaction.uniqueId)}
                    </span>
                  )}
                </td>
                <td className="py-3 pr-4 text-white/80 font-mono">
                  {transaction.amount}
                </td>
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-2">
                    {tokenInfo.logoURI && (
                      <img
                        src={tokenInfo.logoURI}
                        alt={tokenInfo.name}
                        className="w-5 h-5 rounded-full"
                      />
                    )}
                    <span className="text-white/80">{tokenInfo.name}</span>
                  </div>
                </td>
                <td className="py-3 pr-4">
                  {getStatusBadge(transaction.status)}
                </td>
                <td className="py-3 pr-4">
                  {transaction.txHash ? (
                    <div className="flex items-center gap-2">
                      <a
                        href={`${coreTestnetConfig.blockExplorers.default.url}tx/${transaction.txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-500 hover:text-orange-400 transition-colors text-sm"
                      >
                        {truncateAddress(transaction.txHash)}
                        <FontAwesomeIcon
                          icon={faExternalLinkAlt}
                          className="w-2 h-2 ml-2"
                        />
                      </a>
                    </div>
                  ) : (
                    <span className="text-white/40 text-sm">-</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
