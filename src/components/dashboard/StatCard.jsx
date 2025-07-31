export default function StatCard({ title, value, icon: Icon, iconBgColor, iconColor, isLoading = false }) {
  return (
    <div className="bg-slate-900/40 backdrop-blur-lg border border-white/10 rounded-xl p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-white/60">{title}</p>
          {isLoading ? (
            <div className="h-8 w-16 bg-white/10 animate-pulse rounded mt-1"></div>
          ) : (
            <p className="text-2xl font-semibold">{value}</p>
          )}
        </div>
        <div className={`h-10 w-10 ${iconBgColor} rounded-lg flex items-center justify-center ${isLoading ? 'opacity-50' : ''}`}>
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
}
