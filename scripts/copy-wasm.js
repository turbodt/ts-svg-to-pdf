import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const cRepo = process.env.SVG_TO_PDF_C_REPO;

if (!cRepo) {
  throw new Error("SVG_TO_PDF_C_REPO is not set.");
}

const source = resolve(cRepo, "wasm/dist/svg-to-pdf.wasm");
const target = resolve(root, "dist/svg-to-pdf.wasm");

if (!existsSync(source)) {
  throw new Error(`WASM artifact not found: ${source}`);
}

mkdirSync(dirname(target), { recursive: true });
copyFileSync(source, target);
