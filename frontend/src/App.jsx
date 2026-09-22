import { Routes, Route, Navigate } from "react-router-dom";
import { useApp } from "./context/AppContext";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import InputPesanan from "./pages/InputPesanan";
import DaftarProduk from "./pages/DaftarProduk";
import StrukSukses from "./pages/StrukSukses";

function PrivateRoute({ children }) {
  const { user } = useApp();
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <div className="min-h-screen bg-appbg flex justify-center">
      <div className="w-full max-w-md min-h-screen bg-appbg flex flex-col">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/pesanan/baru"
            element={
              <PrivateRoute>
                <InputPesanan />
              </PrivateRoute>
            }
          />
          <Route
            path="/produk"
            element={
              <PrivateRoute>
                <DaftarProduk />
              </PrivateRoute>
            }
          />
          <Route
            path="/pesanan/sukses"
            element={
              <PrivateRoute>
                <StrukSukses />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}
