import { useState, useEffect, useRef } from "react";
import Modal from "@/components/Modal";
import { DollarSignIcon, WalletIcon } from "@/components/dashboard/Icons";
import { tokenList } from "@/lib/tokenlist";
import QRCode from "qrcode";

const createUrl =(uniqueId) => {
  return window.location.origin + `/pay/${uniqueId}`;
};

export default function CreatePaymentModal({
  isOpen,
  onClose,
  onCreate,
  paymentModalState,
  setPaymentModalState,
  paymentData,
  setPaymentData
}) {
  const [token, setToken] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const qrCodeRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token || !amount) return;

    setIsLoading(true);
    try {
      await onCreate({ tokenAddress: token, amount: parseFloat(amount) });
      setToken("");
      setAmount("");
      // Don't call onClose() here - let the parent handle modal state
      // The parent will set paymentModalState to "success" which will show success UI
    } catch (error) {
      console.error("Error creating payment:", error);
      // Only close on error if you want to, or keep it open to show error
      // For now, keep it open to allow retry
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setToken("");
    setAmount("");
    setPaymentModalState("create");
    setPaymentData(null);
    onClose();
  };

  // Generate QR code when payment data changes
  useEffect(() => {
    if (paymentModalState === "success" && paymentData && qrCodeRef.current) {
      // Clear previous QR code
      qrCodeRef.current.innerHTML = '';
      
      const url = createUrl(paymentData.payment.uniqueId);
      
      QRCode.toDataURL(url, {
        width: 180,
        margin: 1,
        color: {
          dark: '#0b111d',
          light: '#ffffff'
        }
      })
      .then(dataURL => {
        const img = document.createElement('img');
        img.src = dataURL;
        img.style.display = 'block';
        img.style.margin = '0 auto';
        qrCodeRef.current.appendChild(img);
      })
      .catch(error => {
        console.error('Error generating QR code:', error);
      });
    }
  }, [paymentModalState, paymentData]);

  if(paymentData){
    console.log("Payment Data:", paymentData);
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create New Payment"
      size="md"
    >
      {paymentModalState === "create" && (
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
      )}

      {paymentModalState === "success" && paymentData && (
        (() => {
          // Find token info from tokenList
          const tokenInfo = tokenList.find(t => t.address === paymentData.payment.tokenAddress);
          const url = createUrl(paymentData.payment.uniqueId);
          
          // Copy to clipboard handler
          const handleCopy = async () => {
            try {
              await navigator.clipboard.writeText(url);
              // Optional: Add toast notification here
            } catch (err) {
              console.error('Failed to copy: ', err);
            }
          };

          return (
            <div className="flex flex-col items-center justify-center text-center space-y-6">
              {/* Success Header */}
              <div className="flex flex-col items-center space-y-3">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500/20 to-green-500/20 backdrop-blur-sm border border-emerald-500/30 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white">
                  Payment Link Created
                </h3>
                <p className="text-white/60 text-sm">
                  Share this link with your customer to receive payment
                </p>
              </div>

              {/* Payment Details Card */}
              <div className="w-full bg-slate-900/40 backdrop-blur-lg border border-white/10 rounded-xl p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {/* Token Logo */}
                    {tokenInfo?.logoURI && (
                      <img 
                        src={tokenInfo.logoURI} 
                        alt={tokenInfo.symbol} 
                        className="w-10 h-10 rounded-full bg-slate-800 border border-white/10"
                      />
                    )}
                    <div className="text-left">
                      <p className="text-white font-medium">{tokenInfo?.name || 'Unknown Token'}</p>
                      <p className="text-white/60 text-sm">{tokenInfo?.symbol || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">{paymentData.payment.amount}</p>
                    <p className="text-white/60 text-sm">{tokenInfo?.symbol || ''}</p>
                  </div>
                </div>
              </div>

              {/* QR Code */}
              <div className="bg-white p-4 rounded-xl shadow-lg">
                <div ref={qrCodeRef} className="flex items-center justify-center"></div>
              </div>

              {/* Payment URL with copy button */}
              <div className="w-full space-y-2">
                <label className="block text-sm font-medium text-white/80">Payment URL</label>
                <div className="flex items-center bg-slate-900/40 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden">
                  <input
                    type="text"
                    value={url}
                    readOnly
                    className="flex-1 bg-transparent text-white/80 text-sm font-mono px-3 py-3 focus:outline-none select-all"
                    style={{ minWidth: 0 }}
                  />
                  <button
                    onClick={handleCopy}
                    type="button"
                    className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 flex items-center space-x-2 font-medium"
                    title="Copy URL"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="9" y="9" width="13" height="13" rx="2" />
                      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                    </svg>
                    <span className="hidden sm:inline">Copy</span>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 w-full pt-2">
                <button
                  onClick={handleClose}
                  className="flex-1 px-4 py-3 bg-slate-900/40 backdrop-blur-sm border border-white/10 hover:bg-white/10 text-white rounded-lg transition-all duration-200 font-medium"
                >
                  Close
                </button>
                <button
                  onClick={() => setPaymentModalState("create")}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white rounded-lg font-medium transition-all duration-200"
                >
                  Create Another
                </button>
              </div>
            </div>
          );
        })()
      )}
    </Modal>
  );
}
