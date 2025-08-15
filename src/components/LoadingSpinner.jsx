
const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-r from-[#0f172a] to-[#1e293b] flex items-center justify-center">
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-transparent animate-spin" style={{borderColor: '#db5827'}}></div>
        <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-transparent animate-spin" style={{borderColor: '#8b5cf6', animationDelay: '0.2s'}}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="text-white text-2xl font-bold">
                CorePay
            </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
