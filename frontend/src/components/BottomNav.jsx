import { useNavigate, useLocation } from "react-router-dom";

const items = [
  { icon: "🏠", label: "Beranda", path: "/" },
  { icon: "🧾", label: "Pesanan", path: "/pesanan/baru" },
  { icon: "📋", label: "Stok", path: "/produk" },
  { icon: "📈", label: "Laporan", path: "/laporan" },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="flex border-t border-line bg-white px-1.5 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
      {items.map((item) => {
        const active = pathname === item.path;
        return (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className={`flex-1 flex flex-col items-center gap-0.5 py-1 text-[10px] font-bold ${
              active ? "text-orange" : "text-stone-300"
            }`}
          >
            <span className="text-lg leading-none">{item.icon}</span>
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
