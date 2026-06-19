import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const inputCsvPath = path.join(rootDir, "data", "archiveVideos.csv");
const outputJsPath = path.join(rootDir, "src", "data", "archiveVideos.js");
const CATEGORY_COLORS = ["#d8ead0", "#c9e2be", "#bbd8ad", "#dfeee0", "#b8d2a2", "#d1e5c6"];
const CATEGORY_ALIASES = new Map([
  ["high-school-projects", "campus-projects"],
  ["school-projects", "campus-projects"],
  ["live-performance", "performance"],
  ["vfx", "vfx-shots"],
]);

function parseCsv(content) {
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;

  for (let index = 0; index < content.length; index += 1) {
    const char = content[index];
    const nextChar = content[index + 1];

    if (char === "\r") {
      continue;
    }

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        cell += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(cell);
      cell = "";
      continue;
    }

    if (char === "\n" && !inQuotes) {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
      continue;
    }

    cell += char;
  }

  if (cell.length > 0 || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }

  return rows;
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function titleFromId(categoryId) {
  return String(categoryId || "")
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function titleFromCategory(categoryValue) {
  const normalized = String(categoryValue || "").trim();
  if (!normalized) return "";
  if (normalized.includes("-")) return titleFromId(normalized);
  return normalized.replace(/\s+/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

function parseBoolean(value) {
  const normalized = String(value ?? "")
    .trim()
    .toLowerCase();

  if (!normalized) return true;

  return ["true", "1", "yes", "y"].includes(normalized);
}

function resolveCategoryId(categoryValue) {
  const categoryId = slugify(categoryValue);
  return CATEGORY_ALIASES.get(categoryId) || categoryId;
}

function extractYouTubeId(url) {
  const normalized = String(url ?? "").trim();
  if (!normalized) return "";

  const patterns = [
    /youtube\.com\/watch\?v=([A-Za-z0-9_-]{6,})/i,
    /youtu\.be\/([A-Za-z0-9_-]{6,})/i,
    /youtube\.com\/embed\/([A-Za-z0-9_-]{6,})/i,
    /youtube\.com\/shorts\/([A-Za-z0-9_-]{6,})/i,
  ];

  for (const pattern of patterns) {
    const match = normalized.match(pattern);
    if (match?.[1]) return match[1];
  }

  return "";
}

function buildThumbnailUrl(youtubeId) {
  return `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;
}

function createRecord(headers, values) {
  const record = {};

  headers.forEach((header, index) => {
    record[header] = values[index] ?? "";
  });

  return record;
}

function toJsExport(categories, videos) {
  const payload = `export const archiveCategories = ${JSON.stringify(categories, null, 2)};\n\nexport const archiveVideos = ${JSON.stringify(videos, null, 2)};\n`;
  return payload;
}

async function main() {
  const csvText = await readFile(inputCsvPath, "utf8");
  const rows = parseCsv(csvText).filter((row) => row.some((cell) => String(cell).trim().length > 0));

  if (rows.length < 2) {
    throw new Error("CSV must include a header row and at least one data row.");
  }

  const headers = rows[0].map((header) => String(header).trim());
  const dataRows = rows.slice(1);

  const categoriesMap = new Map();
  const videos = [];

  for (const rowValues of dataRows) {
    const row = createRecord(headers, rowValues);

    if (!parseBoolean(row.isPublic)) {
      continue;
    }

    const categorySource = String(row.category || row.categoryId || "").trim();
    const categoryId = resolveCategoryId(categorySource);
    if (!categoryId) {
      throw new Error(`Missing category for row with title: ${row.title || "(untitled)"}`);
    }

    if (!categoriesMap.has(categoryId)) {
      categoriesMap.set(categoryId, {
        id: categoryId,
        label: titleFromCategory(categorySource) || titleFromId(categoryId),
        color: categoryId === "restricted" ? "#4f5358" : CATEGORY_COLORS[categoriesMap.size % CATEGORY_COLORS.length],
      });
    }

    const derivedYouTubeId = String(row.youtubeId || extractYouTubeId(row.youtubeUrl || "")).trim();
    const youtubeId = derivedYouTubeId;
    const id = slugify(row.id || row.title);

    if (!id) {
      throw new Error("Each row must include id or title.");
    }

    if (!row.title?.trim()) {
      throw new Error(`Missing title for row id: ${id}`);
    }

    if (!youtubeId) {
      throw new Error(`Missing youtubeId/youtubeUrl for row id: ${id}`);
    }

    const year = Number.parseInt(String(row.year || "").trim(), 10);
    if (!Number.isFinite(year)) {
      throw new Error(`Invalid year for row id: ${id}`);
    }

    const video = {
      id,
      title: String(row.title).trim(),
      year,
      categoryId,
      sourceId: youtubeId,
      thumbnail: buildThumbnailUrl(youtubeId),
      duration: String(row.duration || "").trim(),
      notes: String(row.notes || "").trim(),
    };

    videos.push(video);
  }

  const categories = [...categoriesMap.values()];
  const fileText = toJsExport(categories, videos);

  await writeFile(outputJsPath, fileText, "utf8");

  // eslint-disable-next-line no-console
  console.log(`Synced ${videos.length} videos across ${categories.length} categories.`);
}

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error.message || error);
  process.exitCode = 1;
});
