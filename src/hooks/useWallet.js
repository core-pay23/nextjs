import { useAccount, useConnect, useDisconnect, useBalance, useChainId, useSwitchChain } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useQuery } from '@tanstack/react-query';
import { somniaTestnet } from 'viem/chains';

// Hook for wallet connection state and actions
export const useWallet = () => {
  const { address, isConnected, isConnecting, isDisconnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
  const { disconnect } = useDisconnect();
  const { openConnectModal } = useConnectModal();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  return {
    // Connection state
    address,
    isConnected,
    isConnecting,
    isDisconnected,
    chainId,
    
    // Actions
    connect,
    disconnect,
    openConnectModal,
    switchChain,
    
    // Connectors
    connectors,
    
    // Loading states
    isLoading,
    pendingConnector,
    
    // Errors
    error,
  };
};

// Hook for wallet balance
export const useWalletBalance = (token = null) => {
  const { address, isConnected } = useAccount();
  
  const balanceQuery = useBalance({
    address,
    token, // null for native token, token address for ERC20
    enabled: isConnected && !!address,
  });

  console.log("Balance Query:", balanceQuery);

  return {
    balance: balanceQuery.data,
    isLoading: balanceQuery.isLoading,
    error: balanceQuery.error,
    refetch: balanceQuery.refetch,
  };
};

// Hook for payment gateway specific functionality
export const usePaymentGateway = () => {
  const { address, isConnected } = useAccount();
  
  // Mock payment history - replace with actual contract calls
  const paymentHistoryQuery = useQuery({
    queryKey: ['payments', address],
    queryFn: async () => {
      if (!address) return [];
      
      // Mock data - replace with actual contract interaction
      await new Promise(resolve => setTimeout(resolve, 1000));
      return [
        {
          id: '1',
          amount: '0.1 ETH',
          recipient: '0x742d35Cc647C2dF9F',
          timestamp: new Date().toISOString(),
          status: 'completed',
          txHash: '0x123...abc',
        },
        {
          id: '2',
          amount: '0.05 ETH',
          recipient: '0x891f45Ac589D8eF7B',
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          status: 'pending',
          txHash: '0x456...def',
        },
      ];
    },
    enabled: isConnected && !!address,
    staleTime: 30 * 1000, // 30 seconds
  });

  // Mock pending payments
  const pendingPaymentsQuery = useQuery({
    queryKey: ['pendingPayments', address],
    queryFn: async () => {
      if (!address) return [];
      
      // Mock data - replace with actual contract interaction
      await new Promise(resolve => setTimeout(resolve, 800));
      return [
        {
          id: 'p1',
          amount: '0.2 ETH',
          recipient: '0x123...456',
          dueDate: new Date(Date.now() + 86400000).toISOString(),
          description: 'Monthly subscription',
        },
        {
          id: 'p2',
          amount: '0.15 ETH',
          recipient: '0x789...abc',
          dueDate: new Date(Date.now() + 172800000).toISOString(),
          description: 'Service payment',
        },
      ];
    },
    enabled: isConnected && !!address,
    staleTime: 60 * 1000, // 1 minute
  });

  return {
    // Payment history
    paymentHistory: paymentHistoryQuery.data || [],
    isLoadingHistory: paymentHistoryQuery.isLoading,
    historyError: paymentHistoryQuery.error,
    
    // Pending payments
    pendingPayments: pendingPaymentsQuery.data || [],
    isLoadingPending: pendingPaymentsQuery.isLoading,
    pendingError: pendingPaymentsQuery.error,
    
    // Refetch functions
    refetchHistory: paymentHistoryQuery.refetch,
    refetchPending: pendingPaymentsQuery.refetch,
  };
};

// Hook for network status and switching
export const useNetwork = () => {
  const chainId = useChainId();
  const { switchChain, isLoading: isSwitching, error } = useSwitchChain();
  
  const supportedChains = {
    [somniaTestnet.id]: 'Somnia Testnet',
  };

  const currentNetwork = supportedChains[chainId] || 'Unknown Network';
  const isTestnet = chainId === somniaTestnet.id;

  return {
    chainId,
    currentNetwork,
    isTestnet,
    supportedChains,
    switchChain,
    isSwitching,
    error,
  };
};

// Hook for connection status and management
export const useConnectionStatus = () => {
  const { isConnected, isConnecting, isDisconnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  
  const connectWallet = () => {
    if (openConnectModal) {
      openConnectModal();
    }
  };

  return {
    isConnected,
    isConnecting,
    isDisconnected,
    connectWallet,
  };
};
