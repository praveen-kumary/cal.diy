import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(fileURLToPath(import.meta.url), "../..");
const targets = new Set(["node_modules", ".next", ".turbo", "dist"]);

function clean(dir) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }

  for (const entry of entries) {
    if (entry.name === ".git") continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (targets.has(entry.name)) {
        fs.rmSync(fullPath, { recursive: true, force: true });
      } else {
        clean(fullPath);
      }
    }
  }
}

clean(rootDir);
