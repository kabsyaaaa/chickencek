import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client";

export default function DaftarProduk() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getProducts()
      .then(setProducts)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const featured = products[3]; // "Spicy Chicken" pada data awal

  return (
    <div className="flex flex-col flex-1">
      <div className="flex items-center gap-2.5 px-4.5 pt-3 pb-3">
        <button
          onClick={() => navigate("/")}
          className="w-[30px] h-[30px] rounded-xl bg-white border border-line flex items-center justify-center text-sm"
        >
          ←
        </button>
        <h1 className="font-display font-bold text-[16px]">Daftar Produk</h1>
      </div>

      <div className="px-4.5 pb-3.5">
        <button
          onClick={() => navigate("/pesanan/baru")}
          className="w-full bg-orange text-white font-bold text-sm py-3.5 rounded-xl shadow-lg shadow-orange/30"
        >
          ＋ Simpan Pesanan
        </button>
      </div>

      <div className="flex justify-between items-center px-4.5 pb-1.5">
        <h2 className="text-[13.5px] font-extrabold">Semua Produk</h2>
      </div>

      <div className="mx-4.5 bg-white border border-line rounded-2xl px-3.5">
        {loading && <p className="py-4 text-xs text-brown-soft">Memuat produk...</p>}
        {products.map((p) => (
          <div key={p.id} className="flex items-center gap-3 py-3 border-b border-line last:border-none">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FFD9AE] to-[#F2A85E] flex items-center justify-center text-xl shrink-0">
              🍗
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13.5px] font-bold">{p.name}</div>
              <div className="text-[11.5px] text-brown-soft">
                {p.variant} · stok {p.stock} pcs
              </div>
            </div>
            <span className="text-[11.5px] font-bold text-orange-dark bg-orange-tint px-2.5 py-1.5 rounded-lg shrink-0">
              Detail
            </span>
          </div>
        ))}
      </div>

      {featured && (
        <div className="px-4.5 pt-4 pb-4 text-xs leading-relaxed text-brown-soft">
          {featured.desc}
          <div className="mt-2 inline-block text-[11px] font-extrabold text-white bg-orange px-2.5 py-1.5 rounded-lg cursor-pointer">
            TAMBAHKAN
          </div>
        </div>
      )}
    </div>
  );
}
