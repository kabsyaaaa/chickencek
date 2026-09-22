import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client";
import { useApp } from "../context/AppContext";

export default function InputPesanan() {
  const navigate = useNavigate();
  const { setLastOrder, setRemainingStock } = useApp();

  const [name, setName] = useState("");
  const [menu, setMenu] = useState("Original");
  const [qty, setQty] = useState(2);
  const [note, setNote] = useState("Saus sambal ekstra banyak ya");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setError("");
    setSaving(true);
    try {
      const { order, remainingStock } = await api.createOrder({
        name: name || "Pelanggan",
        menu,
        qty,
        note,
      });
      setLastOrder(order);
      setRemainingStock(remainingStock);
      navigate("/pesanan/sukses");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="flex items-center gap-2.5 px-4.5 pt-3 pb-3">
        <button
          onClick={() => navigate("/")}
          className="w-7.5 h-7.5 w-[30px] h-[30px] rounded-xl bg-white border border-line flex items-center justify-center text-sm"
        >
          ←
        </button>
        <h1 className="font-display font-bold text-[16px]">Input Pesanan Baru</h1>
      </div>

      <div className="flex-1 px-4.5 pb-4 flex flex-col gap-4 overflow-y-auto">
        <div>
          <label className="text-xs font-bold text-brown-soft block mb-1.5">Nama Pembeli</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Contoh: Asep"
            className="w-full px-3.5 py-3 rounded-xl border-[1.5px] border-line bg-white text-sm outline-none focus:border-orange"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-brown-soft block mb-1.5">Pilih Menu Ayam</label>
          <div className="flex gap-2.5">
            {["Original", "Crispy"].map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setMenu(opt)}
                className={`flex-1 py-3 rounded-xl border-[1.5px] text-[13px] font-bold ${
                  menu === opt
                    ? "border-orange bg-orange-tint text-orange-dark"
                    : "border-line bg-white text-brown-soft"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-brown-soft block mb-1.5">Jumlah</label>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="w-9 h-9 rounded-[10px] border-[1.5px] border-orange bg-orange-tint text-orange-dark text-lg font-bold flex items-center justify-center"
            >
              −
            </button>
            <span className="text-lg font-extrabold min-w-[20px] text-center">{qty}</span>
            <button
              type="button"
              onClick={() => setQty((q) => q + 1)}
              className="w-9 h-9 rounded-[10px] border-[1.5px] border-orange bg-orange-tint text-orange-dark text-lg font-bold flex items-center justify-center"
            >
              ＋
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <label className="text-xs font-bold text-brown-soft block mb-1.5">Catatan Tambahan</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={4}
            placeholder="Contoh: Saus sambal ekstra banyak ya"
            className="w-full px-3.5 py-3 rounded-xl border-[1.5px] border-line bg-white text-sm outline-none focus:border-orange resize-none"
          />
        </div>

        {error && <p className="text-xs text-red-500 font-semibold">{error}</p>}
      </div>

      <div className="px-4.5 pb-4.5">
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full bg-orange text-white font-bold text-sm py-3.5 rounded-xl shadow-lg shadow-orange/30 disabled:opacity-60"
        >
          {saving ? "Menyimpan..." : "Simpan Pesanan"}
        </button>
      </div>
    </div>
  );
}
