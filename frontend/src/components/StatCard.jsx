export default function StatCard({ icon, label, value }) {
  return (
    <div className="flex-1 bg-white/10 rounded-2xl px-3 py-2.5 flex items-center gap-2">
      <div className="w-7 h-7 rounded-lg bg-orange flex items-center justify-center text-sm shrink-0">
        {icon}
      </div>
      <div>
        <div className="text-[10px] opacity-75">{label}</div>
        <div className="text-sm font-extrabold">{value}</div>
      </div>
    </div>
  );
}
