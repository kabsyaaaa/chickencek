// context/AppContext.jsx — state global: sesi login & data ringkas
import { createContext, useContext, useState, useCallback } from "react";
import { api } from "../api/client";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("chickencek_user");
    return raw ? JSON.parse(raw) : null;
  });
  const [lastOrder, setLastOrder] = useState(null);
  const [remainingStock, setRemainingStock] = useState(null);

  const login = useCallback(async (email, password) => {
    const { token, user } = await api.login(email, password);
    localStorage.setItem("chickencek_token", token);
    localStorage.setItem("chickencek_user", JSON.stringify(user));
    setUser(user);
    return user;
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.logout();
    } finally {
      localStorage.removeItem("chickencek_token");
      localStorage.removeItem("chickencek_user");
      setUser(null);
    }
  }, []);

  const value = {
    user,
    login,
    logout,
    lastOrder,
    setLastOrder,
    remainingStock,
    setRemainingStock,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp harus dipakai di dalam <AppProvider>");
  return ctx;
}
