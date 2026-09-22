import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Login() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState("asep@chickencek.id");
  const [password, setPassword] = useState("12345678");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-between px-7 py-10 bg-gradient-to-b from-[#FFE9D6] to-appbg">
      <div className="flex flex-col items-center gap-3.5 mt-8">
        <div className="w-24 h-24 rounded-[26px] bg-gradient-to-br from-[#FFB259] to-orange flex items-center justify-center shadow-lg">
          <svg viewBox="0 0 24 24" fill="none" className="w-13 h-13" width="52" height="52">
            <path
              d="M4 12c3-6 13-9 16-6-2 1-3 2-3 4 3 0 5 1 5 3-3 1-5 0-6-1-1 3-4 5-9 5-3-1-4-3-3-5Z"
              fill="#fff"
            />
          </svg>
        </div>
        <div className="font-display font-extrabold text-2xl tracking-tight">
          Chicken<span className="text-orange">Cek</span>
        </div>
        <p className="text-xs text-brown-soft text-center max-w-[200px]">
          Kelola pesanan ayam potong harianmu, lebih rapi dan cepat
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
        <div>
          <label className="text-xs font-bold text-brown-soft block mb-1.5">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3.5 py-3 rounded-xl border-[1.5px] border-line bg-white text-sm outline-none focus:border-orange"
            placeholder="nama@tokoayam.com"
            required
          />
        </div>
        <div>
          <label className="text-xs font-bold text-brown-soft block mb-1.5">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3.5 py-3 rounded-xl border-[1.5px] border-line bg-white text-sm outline-none focus:border-orange"
            placeholder="••••••••"
            required
          />
        </div>

        {error && <p className="text-xs text-red-500 font-semibold">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full bg-orange text-white font-bold text-sm py-3.5 rounded-xl shadow-lg shadow-orange/30 disabled:opacity-60"
        >
          {loading ? "Memproses..." : "Login"}
        </button>
      </form>

      <p className="text-[11.5px] text-brown-soft text-center">
        Belum punya akun? <b className="text-orange-dark">Daftar toko</b>
      </p>
    </div>
  );
}
