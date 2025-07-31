export default function StatCard({ title, value, icon: Icon, iconBgColor, iconColor }) {
  return (
    <div className="bg-slate-900/40 backdrop-blur-lg border border-white/10 rounded-xl p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-white/60">{title}</p>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
        <div className={`h-10 w-10 ${iconBgColor} rounded-lg flex items-center justify-center`}>
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
}
