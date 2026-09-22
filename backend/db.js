// db.js — penyimpanan sederhana berbasis file JSON.
// Untuk produksi sungguhan, ganti bagian ini dengan database asli
// (PostgreSQL, MySQL, MongoDB, dll) — struktur fungsi di bawah bisa
// dipakai sebagai acuan nama fungsi yang perlu diimplementasikan ulang.

import { readFile, writeFile } from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, "db.json");

async function readDB() {
  const raw = await readFile(DB_PATH, "utf-8");
  return JSON.parse(raw);
}

async function writeDB(data) {
  await writeFile(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export default { readDB, writeDB };
