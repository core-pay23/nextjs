// Dashboard hooks
export {
  useDashboardStats,
  useRevenueData,
  useGenreDistribution,
  useStudioUsage,
  useArtists,
  useRefreshDashboard,
  useInvalidateQuery,
  QUERY_KEYS,
} from './useDashboard';

// Wallet and blockchain hooks
export {
  useWallet,
  useWalletBalance,
  usePaymentGateway,
  useNetwork,
  useConnectionStatus,
} from './useWallet';

// EOA Address hook
export { useEOAAddress } from './useEOAAddress';
