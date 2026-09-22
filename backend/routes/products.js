// routes/products.js
import { Router } from "express";
import db from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// GET /api/products — daftar produk beserta sisa stok
router.get("/", requireAuth, async (req, res) => {
  const data = await db.readDB();
  res.json(data.products);
});

export default router;
