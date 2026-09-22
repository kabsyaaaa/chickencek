// middleware/auth.js
// Session token sederhana disimpan di memori server (Map).
// Cukup untuk pengembangan / prototipe. Untuk produksi, ganti dengan
// JWT bertanda tangan (jsonwebtoken) atau session store (Redis, dll).

export const sessions = new Map(); // token -> userId

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token || !sessions.has(token)) {
    return res.status(401).json({ message: "Sesi tidak valid, silakan login kembali." });
  }

  req.userId = sessions.get(token);
  next();
}
