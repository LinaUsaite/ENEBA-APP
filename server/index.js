import express from "express";
import cors from "cors";
import Database from "better-sqlite3";
import Fuse from "fuse.js";

const app = express();
app.use(cors());

const db = new Database("games.db");

// 1) Main table
db.exec(`
  CREATE TABLE IF NOT EXISTS games (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    region TEXT NOT NULL,
    platform TEXT NOT NULL,
    cover_url TEXT NOT NULL,
    from_price REAL NOT NULL,
    discount_percent INTEGER NOT NULL,
    price REAL NOT NULL,
    cashback REAL NOT NULL,
    likes INTEGER NOT NULL
  );
`);

// 2) FTS5 virtual table (fuzzy / full-text)
db.exec(`
  CREATE VIRTUAL TABLE IF NOT EXISTS games_fts
  USING fts5(
    title,
    platform,
    region,
    content='games',
    content_rowid='id'
  );
`);

// 3) Triggers to keep FTS in sync with games table
db.exec(`
  CREATE TRIGGER IF NOT EXISTS games_ai AFTER INSERT ON games BEGIN
    INSERT INTO games_fts(rowid, title, platform, region)
    VALUES (new.id, new.title, new.platform, new.region);
  END;

  CREATE TRIGGER IF NOT EXISTS games_ad AFTER DELETE ON games BEGIN
    INSERT INTO games_fts(games_fts, rowid, title, platform, region)
    VALUES ('delete', old.id, old.title, old.platform, old.region);
  END;

  CREATE TRIGGER IF NOT EXISTS games_au AFTER UPDATE ON games BEGIN
    INSERT INTO games_fts(games_fts, rowid, title, platform, region)
    VALUES ('delete', old.id, old.title, old.platform, old.region);

    INSERT INTO games_fts(rowid, title, platform, region)
    VALUES (new.id, new.title, new.platform, new.region);
  END;
`);

// 4) Seed if empty
const count = db.prepare("SELECT COUNT(*) AS c FROM games").get().c;

if (count === 0) {
  const insert = db.prepare(`
    INSERT INTO games (title, region, platform, cover_url, from_price, discount_percent, price, cashback, likes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insert.run(
    "EA SPORTS FIFA 23",
    "GLOBAL",
    "EA App",
    "/images/fifa23.jpg",
    69.99,
    70,
    19.99,
    2.5,
    2846
  );

  insert.run(
    "Red Dead Redemption 2",
    "EUROPE",
    "Xbox Live",
    "/images/rdr2.jpg",
    69.99,
    66,
    29.99,
    3.0,
    2846
  );

  insert.run(
    "Split Fiction",
    "EUROPE",
    "Nintendo",
    "/images/split-fiction.jpg",
    69.99,
    66,
    36.25,
    3.99,
    2846
  );
}

// Helper: convert "split fiction" -> "split* fiction*"
function toFtsQuery(input) {
  const cleaned = input
    .toLowerCase()
    .trim()
    .replace(/["']/g, "")          // remove quotes
    .replace(/[^a-z0-9\s]/g, " ")  // keep letters/numbers/spaces
    .split(/\s+/)
    .filter(Boolean);

  // prefix match: word* word*
  return cleaned.map((w) => `${w}*`).join(" ");
}

app.get("/", (req, res) => {
  res.send("OK ✅ Use /list or /list?search=");
});

// ✅ /list + /list?search=... (FTS5 fuzzy)
app.get("/list", (req, res) => {
  const search = (req.query.search || "").toString().trim();

  // no search -> return all
  if (!search) {
    const rows = db.prepare("SELECT * FROM games ORDER BY id DESC;").all();
    return res.json({ items: rows });
  }

  const ftsQuery = toFtsQuery(search);

  // if user typed only symbols/spaces, fallback
  if (!ftsQuery) {
    const rows = db.prepare("SELECT * FROM games ORDER BY id DESC;").all();
    return res.json({ items: rows });
  }

  const rows = db
    .prepare(`
      SELECT g.*
      FROM games_fts f
      JOIN games g ON g.id = f.rowid
      WHERE games_fts MATCH ?
      ORDER BY bm25(games_fts) ASC
      LIMIT 50;
    `)
    .all(ftsQuery);

    if (rows.length === 0) {
  const all = db.prepare("SELECT * FROM games").all();

  const fuse = new Fuse(all, {
    keys: ["title", "platform", "region"],
    threshold: 0.4, // mažiau = griežčiau, daugiau = laisviau
    ignoreLocation: true,
    minMatchCharLength: 2,
  });

  rows = fuse.search(search).slice(0, 50).map((r) => r.item);}

  res.json({ items: rows });
});

app.listen(3000, () => console.log("✅ API running http://localhost:3000"));