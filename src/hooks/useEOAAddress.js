import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

export function useEOAAddress() {
  const [eoaAddress, setEoaAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { address: clientWalletAddress, isConnected } = useAccount();

  const fetchEOAAddress = async (address) => {
    if (!address) {
      setError('No wallet address available');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/get-eoa-address?clientWalletAddress=${address}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch EOA address');
      }

      if (data.success) {
        setEoaAddress(data.data.eoaAddress);
      } else {
        throw new Error(data.error || 'Unknown error occurred');
      }
    } catch (err) {
      console.error('Error fetching EOA address:', err);
      setError(err.message);
      setEoaAddress(null);
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    if (clientWalletAddress && isConnected) {
      fetchEOAAddress(clientWalletAddress);
    }
  };

  useEffect(() => {
    if (isConnected && clientWalletAddress) {
      fetchEOAAddress(clientWalletAddress);
    } else {
      setEoaAddress(null);
      setLoading(false);
      setError(null);
    }
  }, [clientWalletAddress, isConnected]);

  return {
    eoaAddress,
    loading,
    error,
    refetch,
    clientWalletAddress
  };
}