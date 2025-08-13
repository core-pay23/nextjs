import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAccount } from 'wagmi';

// Query key for EOA address
export const QUERY_KEYS = {
  eoaAddress: (clientWalletAddress) => ['eoa-address', clientWalletAddress],
};

// Function to fetch EOA address from API
const fetchEOAAddress = async (clientWalletAddress) => {
  if (!clientWalletAddress) {
    throw new Error('No wallet address available');
  }

  const response = await fetch(`/api/get-eoa-address?clientWalletAddress=${clientWalletAddress}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to fetch EOA address');
  }

  if (data.success) {
    return data.data.eoaAddress;
  } else {
    throw new Error(data.error || 'Unknown error occurred');
  }
};

// Hook to get EOA address with TanStack Query
export function useEOAAddress() {
  const { address: clientWalletAddress, isConnected } = useAccount();
  const queryClient = useQueryClient();

  const { data: eoaAddress, isLoading: loading, error, refetch } = useQuery({
    queryKey: QUERY_KEYS.eoaAddress(clientWalletAddress),
    queryFn: () => fetchEOAAddress(clientWalletAddress),
    enabled: isConnected && !!clientWalletAddress, // Only fetch when connected and address is available
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });

  // Function to manually refetch
  const refetchEOAAddress = () => {
    if (clientWalletAddress) {
      return refetch();
    }
  };

  // Function to invalidate and refetch
  const invalidateEOAAddress = () => {
    if (clientWalletAddress) {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.eoaAddress(clientWalletAddress) });
    }
  };

  return {
    eoaAddress,
    loading,
    error: error?.message || null,
    refetch: refetchEOAAddress,
    invalidate: invalidateEOAAddress,
    clientWalletAddress
  };
}
