"use client";

const PaymentProgress = ({ currentStep }) => {
  const steps = [
    { id: "review", label: "Review", icon: "👁️" },
    { id: "connect", label: "Connect", icon: "🔗" },
    { id: "transaction", label: "Pay", icon: "💳" },
    { id: "success", label: "Success", icon: "✅" },
  ];

  const getCurrentStepIndex = () => {
    return steps.findIndex(step => step.id === currentStep);
  };

  const currentIndex = getCurrentStepIndex();

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            {/* Step Circle */}
            <div className="flex items-center">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                  transition-all duration-300 ease-in-out
                  ${
                    index <= currentIndex
                      ? "bg-blue-500 text-white border-2 border-blue-500"
                      : "bg-slate-900/40 text-white/60 border-2 border-white/10"
                  }
                `}
              >
                {index < currentIndex ? (
                  <svg
                    className="w-5 h-5"
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
                  <span>{index + 1}</span>
                )}
              </div>
              
              {/* Step Label */}
              <div className="ml-3">
                <div
                  className={`
                    text-sm font-medium transition-colors duration-300
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
              <div className="flex-1 mx-4">
                <div
                  className={`
                    h-0.5 transition-colors duration-300
                    ${
                      index < currentIndex
                        ? "bg-blue-500"
                        : "bg-white/10"
                    }
                  `}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentProgress;
