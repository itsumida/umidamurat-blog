import fs from "fs";
import path from "path";

const viewsFilePath = path.join(process.cwd(), "data", "views.json");

interface ViewsData {
  [slug: string]: number;
}

// Ensure data directory and file exist
function ensureViewsFile() {
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(viewsFilePath)) {
    fs.writeFileSync(viewsFilePath, JSON.stringify({}));
  }
}

export function getViews(slug: string): number {
  ensureViewsFile();
  const data = JSON.parse(fs.readFileSync(viewsFilePath, "utf8")) as ViewsData;
  return data[slug] || 0;
}

export function getAllViews(): ViewsData {
  ensureViewsFile();
  return JSON.parse(fs.readFileSync(viewsFilePath, "utf8")) as ViewsData;
}

export function incrementViews(slug: string): number {
  ensureViewsFile();
  const data = JSON.parse(fs.readFileSync(viewsFilePath, "utf8")) as ViewsData;
  data[slug] = (data[slug] || 0) + 1;
  fs.writeFileSync(viewsFilePath, JSON.stringify(data, null, 2));
  return data[slug];
}
