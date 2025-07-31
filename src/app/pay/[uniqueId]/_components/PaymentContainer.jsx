"use client";

import { useState } from "react";
import PaymentReview from "./PaymentReview";
import PaymentTransaction from "./PaymentTransaction";
import PaymentSuccess from "./PaymentSuccess";
import PaymentProgress from "./PaymentProgress";

const PAYMENT_STEPS = {
  REVIEW: "review",
  TRANSACTION: "transaction",
  SUCCESS: "success",
};

const PaymentContainer = ({ paymentData }) => {
  const [currentStep, setCurrentStep] = useState(PAYMENT_STEPS.REVIEW);
  const [transactionHash, setTransactionHash] = useState(null);

  const handleNextStep = () => {
    switch (currentStep) {
      case PAYMENT_STEPS.REVIEW:
        setCurrentStep(PAYMENT_STEPS.TRANSACTION);
        break;
      case PAYMENT_STEPS.TRANSACTION:
        setCurrentStep(PAYMENT_STEPS.SUCCESS);
        break;
    }
  };

  const handleTransactionSuccess = (txHash) => {
    setTransactionHash(txHash);
    setCurrentStep(PAYMENT_STEPS.SUCCESS);
  };

  const renderStep = () => {
    switch (currentStep) {
      case PAYMENT_STEPS.REVIEW:
        return (
          <PaymentReview
            paymentData={paymentData}
            onNext={handleNextStep}
          />
        );
      case PAYMENT_STEPS.TRANSACTION:
        return (
          <PaymentTransaction
            paymentData={paymentData}
            onSuccess={handleTransactionSuccess}
          />
        );
      case PAYMENT_STEPS.SUCCESS:
        return (
          <PaymentSuccess
            paymentData={paymentData}
            transactionHash={transactionHash}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-[560px]">
        {/* Payment Progress */}
        <PaymentProgress currentStep={currentStep} />
        
        {/* Payment Card */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default PaymentContainer;
