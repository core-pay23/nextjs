import { useReadContract, useReadContracts, useWatchContractEvent } from 'wagmi';
import { PaymentGatewayAbi, PaymentGatewayAddress } from '@/lib/contracts/paymentGateway';

export function useMerchantTransactions(shopOwner) {
  // 1) fetch ids
  const idsRes = useReadContract({
    abi: PaymentGatewayAbi, address: PaymentGatewayAddress, functionName: 'getShopOwnerTransactions',
    args: [shopOwner], query: { enabled: !!shopOwner }
  });

  // 2) batch fetch structs
  const ids = Array.isArray(idsRes.data) ? idsRes.data : [];
  const reads = ids.map((id) => ({
    abi: PaymentGatewayAbi,
    address: PaymentGatewayAddress,
    functionName: 'getTransaction',
    args: [id],
  }));
  const txsRes = useReadContracts({ contracts: reads, query: { enabled: ids.length > 0 } });

  // 3) live updates via events (optional)
  useWatchContractEvent({
    address: PaymentGatewayAddress, abi: PaymentGatewayAbi, eventName: 'TransactionPaid',
    enabled: !!shopOwner,
    onLogs: () => idsRes.refetch() // or refine by transactionId
  });

  return {
    ids,
    transactions: (txsRes.data || []).map(r => r.result).filter(Boolean),
    isLoading: idsRes.isLoading || txsRes.isLoading,
    refetch: () => { idsRes.refetch(); txsRes.refetch(); }
  };
}
