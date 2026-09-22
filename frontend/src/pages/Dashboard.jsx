import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client";
import StatCard from "../components/StatCard";
import OrderRow from "../components/OrderRow";
import BottomNav from "../components/BottomNav";

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ orderCount: 0, stock: 0 });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const [statsData, ordersData] = await Promise.all([
        api.getStats(),
        api.getOrders(),
      ]);
      setStats(statsData);
      setOrders(ordersData.slice(0, 4));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="flex flex-col flex-1">
      <div className="bg-brown text-white px-4.5 pt-3 pb-4 rounded-b-3xl">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-base">☰</span>
            <h1 className="font-display font-extrabold text-[15px] tracking-wide">
              CHICKENCEK
            </h1>
          </div>
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center relative">
            🔔
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-orange border-[1.5px] border-brown" />
          </div>
        </div>
        <div className="flex gap-2.5 mt-3.5">
          <StatCard icon="📦" label="Hari ini" value={`Pesanan: ${stats.orderCount}`} />
          <StatCard icon="🐔" label="Sisa Ayam" value={`Stok: ${stats.stock}`} />
        </div>
      </div>

      <div className="px-4.5 pt-4 pb-2 flex flex-col gap-3.5 flex-1">
        <button
          onClick={() => navigate("/pesanan/baru")}
          className="flex items-center justify-center gap-2 bg-orange text-white font-bold text-[13.5px] py-3.5 rounded-2xl shadow-lg shadow-orange/30"
        >
          ＋ Tambah Pesanan Baru
        </button>

        <div className="flex justify-between items-center">
          <h2 className="text-[13.5px] font-extrabold">Pesanan Terbaru</h2>
          <span
            onClick={() => navigate("/produk")}
            className="text-[11.5px] text-orange-dark font-bold cursor-pointer"
          >
            Lihat Semua
          </span>
        </div>

        <div className="bg-white border border-line rounded-2xl px-3.5">
          {loading && <p className="py-4 text-xs text-brown-soft">Memuat pesanan...</p>}
          {!loading && orders.length === 0 && (
            <p className="py-4 text-xs text-brown-soft">Belum ada pesanan hari ini.</p>
          )}
          {orders.map((o) => (
            <OrderRow key={o.id} order={o} />
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
