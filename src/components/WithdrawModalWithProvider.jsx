'use client';

import WithdrawModal from './WithdrawModal';
import { useWithdrawModal } from '@/providers/WithdrawModalProvider';

export default function WithdrawModalWithProvider({ onWithdraw }) {
  const {
    isWithdrawModalOpen: isOpen,
    closeWithdrawModal: onClose,
    withdrawModalState,
    setWithdrawModalState,
    withdrawData,
    setWithdrawData
  } = useWithdrawModal();

  return (
    <WithdrawModal
      isOpen={isOpen}
      onClose={onClose}
      onWithdraw={onWithdraw}
      withdrawModalState={withdrawModalState}
      setWithdrawModalState={setWithdrawModalState}
      withdrawData={withdrawData}
      setWithdrawData={setWithdrawData}
    />
  );
}
