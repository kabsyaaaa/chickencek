// routes/auth.js
import { Router } from "express";
import crypto from "crypto";
import db from "../db.js";
import { sessions } from "../middleware/auth.js";

const router = Router();

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email dan password wajib diisi." });
  }

  const data = await db.readDB();
  const user = data.users.find(
    (u) => u.email.toLowerCase() === String(email).toLowerCase()
  );

  // NOTE: password dibandingkan sebagai plaintext untuk kesederhanaan prototipe.
  // Di produksi, WAJIB hash password (misal dengan bcrypt) saat mendaftar
  // dan gunakan bcrypt.compare() di sini.
  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Email atau password salah." });
  }

  const token = crypto.randomBytes(24).toString("hex");
  sessions.set(token, user.id);

  res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email },
  });
});

// POST /api/auth/logout
router.post("/logout", (req, res) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (token) sessions.delete(token);
  res.json({ ok: true });
});

export default router;
