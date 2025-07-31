export default function ChartCard({ children, className = "" }) {
  return (
    <div className={`bg-slate-900/40 backdrop-blur-lg border border-white/10 rounded-xl p-6 ${className}`}>
      {children}
    </div>
  );
}
