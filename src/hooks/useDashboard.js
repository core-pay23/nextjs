import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Mock API functions - replace with your actual API calls
const fetchDashboardStats = async () => {
  // Mock data - replace with actual API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    totalTracks: 247,
    storageUsed: '84GB',
    activeSessions: 12,
    revenue: '$12.4K',
  };
};

const fetchRevenueData = async () => {
  // Mock data - replace with actual API call
  await new Promise(resolve => setTimeout(resolve, 800));
  return {
    monthly: [
      { month: 'Jan', revenue: 8400 },
      { month: 'Feb', revenue: 9200 },
      { month: 'Mar', revenue: 11100 },
      { month: 'Apr', revenue: 10800 },
      { month: 'May', revenue: 12400 },
      { month: 'Jun', revenue: 11900 },
    ],
    growth: 12.5,
  };
};

const fetchGenreDistribution = async () => {
  // Mock data - replace with actual API call
  await new Promise(resolve => setTimeout(resolve, 600));
  return [
    { genre: 'Electronic', percentage: 35, color: '#8b5cf6' },
    { genre: 'Hip Hop', percentage: 25, color: '#06b6d4' },
    { genre: 'Rock', percentage: 20, color: '#10b981' },
    { genre: 'Pop', percentage: 15, color: '#f59e0b' },
    { genre: 'Jazz', percentage: 5, color: '#ef4444' },
  ];
};

const fetchStudioUsage = async () => {
  // Mock data - replace with actual API call
  await new Promise(resolve => setTimeout(resolve, 700));
  return [
    { day: 'Mon', hours: 8 },
    { day: 'Tue', hours: 6 },
    { day: 'Wed', hours: 9 },
    { day: 'Thu', hours: 7 },
    { day: 'Fri', hours: 10 },
    { day: 'Sat', hours: 5 },
    { day: 'Sun', hours: 4 },
  ];
};

const fetchArtists = async () => {
  // Mock data - replace with actual API call
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
    {
      id: 1,
      name: 'Alex Johnson',
      email: 'alex@example.com',
      tracks: 23,
      revenue: '$2,840',
      lastActive: '2 hours ago',
      status: 'active',
    },
    {
      id: 2,
      name: 'Maria Garcia',
      email: 'maria@example.com',
      tracks: 45,
      revenue: '$5,920',
      lastActive: '1 day ago',
      status: 'active',
    },
    {
      id: 3,
      name: 'David Chen',
      email: 'david@example.com',
      tracks: 12,
      revenue: '$1,560',
      lastActive: '3 days ago',
      status: 'inactive',
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      tracks: 67,
      revenue: '$8,340',
      lastActive: '5 hours ago',
      status: 'active',
    },
  ];
};

// Query keys
export const QUERY_KEYS = {
  dashboardStats: ['dashboard', 'stats'],
  revenueData: ['dashboard', 'revenue'],
  genreDistribution: ['dashboard', 'genres'],
  studioUsage: ['dashboard', 'studio-usage'],
  artists: ['dashboard', 'artists'],
};

// Dashboard hooks
export const useDashboardStats = () => {
  return useQuery({
    queryKey: QUERY_KEYS.dashboardStats,
    queryFn: fetchDashboardStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useRevenueData = () => {
  return useQuery({
    queryKey: QUERY_KEYS.revenueData,
    queryFn: fetchRevenueData,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useGenreDistribution = () => {
  return useQuery({
    queryKey: QUERY_KEYS.genreDistribution,
    queryFn: fetchGenreDistribution,
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
};

export const useStudioUsage = () => {
  return useQuery({
    queryKey: QUERY_KEYS.studioUsage,
    queryFn: fetchStudioUsage,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useArtists = () => {
  return useQuery({
    queryKey: QUERY_KEYS.artists,
    queryFn: fetchArtists,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Mutation hooks for data updates
export const useRefreshDashboard = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      // Simulate refresh action
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true };
    },
    onSuccess: () => {
      // Invalidate all dashboard queries to refetch data
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};

// Utility hook for invalidating specific queries
export const useInvalidateQuery = () => {
  const queryClient = useQueryClient();
  
  return (queryKey) => {
    queryClient.invalidateQueries({ queryKey });
  };
};
