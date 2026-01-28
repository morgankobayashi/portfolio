import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { XMLParser } from "fast-xml-parser";

const app = express();
const PORT = process.env.PORT || 10000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ----- API -----
app.get("/api/letterboxd", async (req, res) => {
  try {
    const username = String(req.query.username || "morgankobayashi");
    const count = Math.min(parseInt(req.query.count || "12", 10) || 12, 20);

    const rssUrl = `https://letterboxd.com/${encodeURIComponent(username)}/rss/`;
    const r = await fetch(rssUrl, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (!r.ok) return res.status(502).json({ error: `RSS fetch failed: ${r.status}` });

    const xml = await r.text();

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "",
      cdataPropName: "cdata",
      trimValues: true,
    });

    const parsed = parser.parse(xml);
    const rawItems = parsed?.rss?.channel?.item ?? [];
    const itemsArr = Array.isArray(rawItems) ? rawItems : [rawItems];

    const items = itemsArr.slice(0, count).map((it) => ({
      title: (it.title?.cdata || it.title || "").toString(),
      link: (it.link || "").toString(),
      pubDate: (it.pubDate || "").toString(),
      description: (it.description?.cdata || it.description || "").toString(),
    }));

    res.set("Cache-Control", "no-store");
    res.json({ profileUrl: `https://letterboxd.com/${username}/`, items });
  } catch {
    res.status(500).json({ error: "Unexpected error" });
  }
});

// ----- Serve Vite build -----
const distPath = path.join(process.cwd(), "dist");
app.use(express.static(distPath));

// SPA fallback for non-API routes (regex, not "*")
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
