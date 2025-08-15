"use client";

import React from "react";

const PaymentProgress = ({ currentStep }) => {
  const steps = [
    { id: "review", label: "Review", icon: "👁️" },
    { id: "transaction", label: "Pay", icon: "💳" },
    { id: "success", label: "Success", icon: "✅" },
  ];

  const getCurrentStepIndex = () => {
    return steps.findIndex(step => step.id === currentStep);
  };

  const currentIndex = getCurrentStepIndex();

  return (
    <div className="mb-4">
      {/* Progress Container - Centered with max width */}
      <div className="flex items-center justify-center">
        <div className="flex items-center justify-center w-full max-w-md mx-auto">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              {/* Step Circle and Label Container */}
              <div className="flex flex-col items-center">
                {/* Step Circle */}
                <div
                  className={`
                    w-10 h-10 min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px] 
                    rounded-full flex items-center justify-center text-xs font-medium
                    transition-all duration-300 ease-in-out relative flex-shrink-0
                    ${
                      index <= currentIndex
                        ? "bg-blue-500 text-white border-2 border-blue-500 shadow-lg shadow-blue-500/25"
                        : "bg-slate-900/40 text-white/60 border-2 border-white/10"
                    }
                  `}
                >
                  {index < currentIndex ? (
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <span className="text-xs font-semibold">{index + 1}</span>
                  )}
                </div>
                
                {/* Step Label */}
                <div className="mt-2 text-center">
                  <div
                    className={`
                      text-xs font-medium transition-colors duration-300 whitespace-nowrap
                      ${
                        index <= currentIndex
                          ? "text-white"
                          : "text-white/60"
                      }
                    `}
                  >
                    {step.label}
                  </div>
                </div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 min-w-[60px] mx-3 mb-3">
                  <div
                    className={`
                      h-0.5 transition-colors duration-300 relative
                      ${
                        index < currentIndex
                          ? "bg-blue-500"
                          : "bg-white/10"
                      }
                    `}
                  >
                    {/* Animated progress line for current step */}
                    {index === currentIndex - 1 && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-transparent animate-pulse" />
                    )}
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentProgress;
