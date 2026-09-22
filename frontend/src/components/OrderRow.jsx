function initials(name = "") {
  return name.trim().split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
}

export default function OrderRow({ order }) {
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-line last:border-none">
      <div className="w-10 h-10 rounded-full bg-orange-tint text-orange-dark flex items-center justify-center font-extrabold text-sm shrink-0">
        {initials(order.name)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-bold truncate">{order.name}</div>
        <div className="text-xs text-brown-soft">
          {order.menu} · {order.qty} pcs
        </div>
      </div>
      <span className="text-[11px] font-bold text-orange-dark bg-orange-tint px-2.5 py-1.5 rounded-lg shrink-0">
        Detail
      </span>
    </div>
  );
}
