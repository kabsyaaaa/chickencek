import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function StrukSukses() {
  const navigate = useNavigate();
  const { lastOrder, remainingStock } = useApp();

  useEffect(() => {
    if (!lastOrder) navigate("/", { replace: true });
  }, [lastOrder, navigate]);

  if (!lastOrder) return null;

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col items-center gap-2.5 px-5 pt-8 pb-4">
        <div className="w-[58px] h-[58px] rounded-full bg-appgreen-tint text-appgreen flex items-center justify-center text-2xl">
          ✓
        </div>
        <div className="font-display font-extrabold text-[15px]">Pesanan Berhasil Disimpan!</div>
      </div>

      <div className="mx-4.5 bg-white border border-line rounded-2xl p-4">
        <div className="text-[11px] font-extrabold text-orange-dark">Rincian Pesanan</div>
        <div className="text-[10.5px] text-brown-soft mb-2.5">No: {lastOrder.id}</div>

        <Row k="Nama Pembeli" v={lastOrder.name} />
        <Row k="Menu Ayam" v={lastOrder.menu} />
        <Row k="Jumlah" v={`${lastOrder.qty} pcs`} />
        {lastOrder.note && <Row k="Catatan" v={lastOrder.note} />}

        <div className="flex justify-between items-center mt-2 pt-2.5 border-t-[1.5px] border-line">
          <span className="text-sm font-bold">Total Bayar</span>
          <span className="text-lg font-extrabold text-orange-dark">
            Rp {lastOrder.total.toLocaleString("id-ID")}
          </span>
        </div>
      </div>

      <div className="mx-4.5 mt-3.5 bg-[#FFF7E2] border border-[#F5E3AE] rounded-xl px-3 py-2.5 text-[11.5px] font-bold text-[#8A6A16] flex gap-2 items-center">
        📦 Sisa Stok Ayam: {remainingStock} pcs
      </div>

      <div className="mt-auto px-4.5 pb-4.5 pt-4">
        <button
          onClick={() => navigate("/")}
          className="w-full bg-orange text-white font-bold text-sm py-3.5 rounded-xl shadow-lg shadow-orange/30"
        >
          Kembali ke Beranda
        </button>
      </div>
    </div>
  );
}

function Row({ k, v }) {
  return (
    <div className="flex justify-between text-[12.5px] py-1.5 border-b border-dashed border-line last:border-none">
      <span className="text-brown-soft">{k}</span>
      <span className="font-bold">{v}</span>
    </div>
  );
}
