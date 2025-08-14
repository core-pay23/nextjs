'use client';

import { createContext, useContext, useState } from 'react';

const WithdrawModalContext = createContext();

export function WithdrawModalProvider({ children }) {
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [withdrawModalState, setWithdrawModalState] = useState('create'); // 'create' or 'success'
  const [withdrawData, setWithdrawData] = useState(null);

  const openWithdrawModal = () => {
    setIsWithdrawModalOpen(true);
  };

  const closeWithdrawModal = () => {
    setIsWithdrawModalOpen(false);
    setWithdrawModalState('create');
    setWithdrawData(null);
  };

  return (
    <WithdrawModalContext.Provider
      value={{
        isWithdrawModalOpen,
        setIsWithdrawModalOpen,
        withdrawModalState,
        setWithdrawModalState,
        withdrawData,
        setWithdrawData,
        openWithdrawModal,
        closeWithdrawModal
      }}
    >
      {children}
    </WithdrawModalContext.Provider>
  );
}

export function useWithdrawModal() {
  const context = useContext(WithdrawModalContext);
  if (!context) {
    throw new Error('useWithdrawModal must be used within a WithdrawModalProvider');
  }
  return context;
}
