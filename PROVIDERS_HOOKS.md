# Providers and Hooks Documentation

This document describes the providers and hooks architecture for the Somnia Payment Gateway dashboard, built with TanStack Query and RainbowKit.

## Architecture Overview

### Providers
- **AppProviders**: Main provider wrapper that includes TanStack Query and RainbowKit
- **DashboardProvider**: Dashboard-specific context for managing dashboard state

### Hooks
- **Dashboard Hooks**: Data fetching and management for dashboard features
- **Wallet Hooks**: Wallet connection, balance, and blockchain interactions

## Setup

### 1. Environment Variables
Copy `.env.example` to `.env.local` and configure:

```bash
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
```

Get your WalletConnect Project ID from [WalletConnect Cloud](https://cloud.walletconnect.com/).

### 2. Provider Structure

The app is wrapped with providers in this order:
```jsx
<AppProviders>
  <DashboardProvider> // Only in dashboard routes
    <YourComponent />
  </DashboardProvider>
</AppProviders>
```

## Available Hooks

### Dashboard Hooks

#### `useDashboardStats()`
Fetches main dashboard statistics.
```jsx
const { data: stats, isLoading, error } = useDashboardStats();
```

#### `useRevenueData()`
Fetches revenue trends and growth data.
```jsx
const { data: revenueData, isLoading } = useRevenueData();
```

#### `useGenreDistribution()`
Fetches genre distribution data for charts.
```jsx
const { data: genres, isLoading } = useGenreDistribution();
```

#### `useStudioUsage()`
Fetches studio usage statistics for the last 7 days.
```jsx
const { data: usage, isLoading } = useStudioUsage();
```

#### `useArtists()`
Fetches artists data for the table.
```jsx
const { data: artists, isLoading } = useArtists();
```

#### `useRefreshDashboard()`
Mutation hook for refreshing all dashboard data.
```jsx
const { mutate: refreshDashboard, isLoading: isRefreshing } = useRefreshDashboard();
```

### Wallet Hooks

#### `useWallet()`
Main wallet connection and state management.
```jsx
const { 
  address, 
  isConnected, 
  connect, 
  disconnect, 
  chainId 
} = useWallet();
```

#### `useWalletBalance(token?)`
Fetches wallet balance for native or ERC20 tokens.
```jsx
const { balance, isLoading, error } = useWalletBalance();
const { balance: tokenBalance } = useWalletBalance('0x...'); // ERC20 token
```

#### `usePaymentGateway()`
Payment gateway specific functionality.
```jsx
const { 
  paymentHistory, 
  pendingPayments, 
  isLoadingHistory 
} = usePaymentGateway();
```

#### `useNetwork()`
Network information and switching.
```jsx
const { 
  chainId, 
  currentNetwork, 
  isTestnet, 
  switchChain 
} = useNetwork();
```

#### `useConnectionStatus()`
Simple connection status and actions.
```jsx
const { 
  isConnected, 
  isConnecting, 
  connectWallet 
} = useConnectionStatus();
```

## Components

### `WalletConnection`
Pre-built wallet connection component with RainbowKit integration.
```jsx
<WalletConnection showNetwork={true} />
```

### `WalletInfo`
Displays wallet address and network information.
```jsx
<WalletInfo />
```

## TanStack Query Configuration

The query client is configured with:
- **Stale Time**: 60 seconds default
- **Refetch on Window Focus**: Disabled
- **Dev Tools**: Available in development

### Query Keys
All query keys are exported from `QUERY_KEYS`:
```jsx
import { QUERY_KEYS } from '@/hooks';

// Available keys:
QUERY_KEYS.dashboardStats
QUERY_KEYS.revenueData
QUERY_KEYS.genreDistribution
QUERY_KEYS.studioUsage
QUERY_KEYS.artists
```

## RainbowKit Configuration

Configured with:
- **Dark Theme**: Purple accent color (#7c3aed)
- **Supported Chains**: Ethereum, Polygon, Optimism, Arbitrum, Base
- **Testnet**: Sepolia (development only)
- **Modal Size**: Compact

## Usage Examples

### Basic Dashboard Component
```jsx
'use client';

import { useDashboardStats, useWallet } from '@/hooks';

function Dashboard() {
  const { data: stats, isLoading } = useDashboardStats();
  const { isConnected } = useWallet();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      {isConnected && <p>Wallet connected!</p>}
      <p>Total Tracks: {stats?.totalTracks}</p>
    </div>
  );
}
```

### Wallet Integration
```jsx
'use client';

import { useWallet, useWalletBalance } from '@/hooks';
import { WalletConnection } from '@/components/dashboard/WalletConnection';

function WalletDemo() {
  const { isConnected, address } = useWallet();
  const { balance } = useWalletBalance();

  return (
    <div>
      <WalletConnection />
      {isConnected && (
        <div>
          <p>Address: {address}</p>
          <p>Balance: {balance?.formatted} {balance?.symbol}</p>
        </div>
      )}
    </div>
  );
}
```

## Error Handling

All hooks include error states:
```jsx
const { data, isLoading, error } = useDashboardStats();

if (error) {
  return <div>Error: {error.message}</div>;
}
```

## Data Refetching

Manually refetch data:
```jsx
const { refetch } = useDashboardStats();
const { refetchHistory } = usePaymentGateway();

// Refetch specific query
refetch();

// Or use the refresh mutation to invalidate all dashboard data
const { mutate: refreshAll } = useRefreshDashboard();
refreshAll();
```

## Notes

- All hooks are client-side only (`'use client'` directive required)
- Mock data is currently used - replace API functions with real endpoints
- Dashboard provider automatically tracks wallet connection state
- Query stale times are optimized per data type (stats: 5min, revenue: 10min, etc.)
