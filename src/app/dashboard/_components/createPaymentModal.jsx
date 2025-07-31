import { useState } from "react";
import Modal from "@/components/Modal";
import { DollarSignIcon, WalletIcon } from "@/components/dashboard/Icons";
import { tokenList } from "@/lib/tokenlist";

export default function CreatePaymentModal({ isOpen, onClose, onCreate }) {
  const [token, setToken] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token || !amount) return;

    setIsLoading(true);
    try {
      await onCreate({ tokenAddress: token, amount: parseFloat(amount) });
      setToken("");
      setAmount("");
      onClose();
    } catch (error) {
      console.error("Error creating payment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setToken("");
    setAmount("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create New Payment"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Token Select */}
        <div>
          <label
            htmlFor="token"
            className="block text-sm font-medium text-white/80 mb-2"
          >
            Select Token
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <WalletIcon className="h-5 w-5 text-white/40" />
            </div>
            <select
              id="token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full pl-10 pr-10 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer"
              required
            >
              <option value="" disabled className="bg-gray-900 text-white">
                Select a token
              </option>
              {tokenList.map((tokenItem) => (
                <option
                  key={tokenItem.address}
                  value={tokenItem.address}
                  className="bg-gray-900 text-white hover:bg-gray-800"
                >
                  {tokenItem.name} ({tokenItem.symbol})
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="h-4 w-4 text-white/40"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Amount Input */}
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-white/80 mb-2"
          >
            Amount
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSignIcon className="h-5 w-5 text-white/40" />
            </div>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              step="0.01"
              min="0"
              className="w-full pl-10 pr-3 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200 font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading || !token || !amount}
            className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-200 font-medium"
          >
            {isLoading ? "Creating..." : "Create Payment"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
