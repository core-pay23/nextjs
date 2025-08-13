import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

// Cache to store ongoing requests
const requestCache = new Map();

export function useEOAAddress() {
  const [eoaAddress, setEoaAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { address: clientWalletAddress, isConnected } = useAccount();
  const cacheKey = clientWalletAddress || 'no-address';

  const fetchEOAAddress = async (address) => {
    if (!address) {
      setError('No wallet address available');
      setLoading(false);
      return;
    }

    // Check if there's already an ongoing request for this address
    if (requestCache.has(cacheKey)) {
      // Return the existing promise
      return requestCache.get(cacheKey);
    }

    try {
      setLoading(true);
      setError(null);

      // Create a new promise for this request
      const requestPromise = (async () => {
        try {
          const response = await fetch(`/api/get-eoa-address?clientWalletAddress=${address}`);
          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch EOA address');
          }

          if (data.success) {
            setEoaAddress(data.data.eoaAddress);
            return data.data.eoaAddress;
          } else {
            throw new Error(data.error || 'Unknown error occurred');
          }
        } finally {
          // Remove from cache when done
          requestCache.delete(cacheKey);
        }
      })();

      // Store the promise in cache
      requestCache.set(cacheKey, requestPromise);

      // Wait for the request to complete
      const result = await requestPromise;
      return result;
    } catch (err) {
      console.error('Error fetching EOA address:', err);
      setError(err.message);
      setEoaAddress(null);
      // Remove from cache on error
      requestCache.delete(cacheKey);
      throw err;
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
  }, [clientWalletAddress, isConnected, cacheKey]);

  return {
    eoaAddress,
    loading,
    error,
    refetch,
    clientWalletAddress
  };
}
