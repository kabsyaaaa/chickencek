// api/client.js — satu tempat untuk semua pemanggilan ke backend

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

function getToken() {
  return localStorage.getItem("chickencek_token");
}

async function request(path, { method = "GET", body, auth = true } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Terjadi kesalahan pada server.");
  }
  return data;
}

export const api = {
  login: (email, password) =>
    request("/auth/login", { method: "POST", body: { email, password }, auth: false }),
  logout: () => request("/auth/logout", { method: "POST" }),
  getProducts: () => request("/products"),
  getOrders: () => request("/orders"),
  getStats: () => request("/orders/stats"),
  createOrder: (payload) => request("/orders", { method: "POST", body: payload }),
};
