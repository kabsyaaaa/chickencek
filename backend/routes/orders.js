// routes/orders.js
import { Router } from "express";
import db from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();
const PRICE_PER_PCS = 8000;
const STARTING_STOCK = 35; // total stok ayam harian, sesuai desain awal

// GET /api/orders — daftar pesanan terbaru (terbaru dulu)
router.get("/", requireAuth, async (req, res) => {
  const data = await db.readDB();
  const orders = [...data.orders].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  res.json(orders);
});

// GET /api/orders/stats — ringkasan untuk kartu Beranda
router.get("/stats", requireAuth, async (req, res) => {
  const data = await db.readDB();
  const totalOrdered = data.orders.reduce((sum, o) => sum + o.qty, 0);
  const stock = Math.max(0, STARTING_STOCK - totalOrdered);
  res.json({ orderCount: data.orders.length, stock });
});

// POST /api/orders — buat pesanan baru
router.post("/", requireAuth, async (req, res) => {
  const { name, menu, qty, note } = req.body;

  if (!name || !menu || !qty || qty < 1) {
    return res.status(400).json({ message: "Nama, menu, dan jumlah wajib diisi dengan benar." });
  }

  const data = await db.readDB();

  const totalOrdered = data.orders.reduce((sum, o) => sum + o.qty, 0);
  const remainingStock = STARTING_STOCK - totalOrdered;

  if (qty > remainingStock) {
    return res.status(409).json({ message: `Stok ayam tidak cukup. Sisa stok: ${remainingStock} pcs.` });
  }

  data.meta.lastOrderNumber += 1;
  const id = `CK-${data.meta.lastOrderNumber}`;
  const total = qty * PRICE_PER_PCS;

  const order = {
    id,
    name,
    menu,
    qty,
    note: note || "",
    total,
    createdAt: new Date().toISOString(),
  };

  data.orders.push(order);
  await db.writeDB(data);

  const newRemainingStock = remainingStock - qty;

  res.status(201).json({ order, remainingStock: newRemainingStock });
});

export default router;
