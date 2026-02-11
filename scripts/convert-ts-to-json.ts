/**
 * Validate Product JSON Data
 *
 * Reads each JSON product file, validates with Zod schemas, and rewrites
 * with consistent formatting. Use this after editing product JSON files
 * to ensure data integrity.
 *
 * Run with: npm run convert:products
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

import {
  mouseProductArraySchema,
  audioProductArraySchema,
  keyboardProductArraySchema,
  monitorProductArraySchema,
} from "../src/lib/schemas/product-schemas";

import type { z } from "zod";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(__dirname, "../src/data/products");

interface CategoryConfig {
  name: string;
  schema: z.ZodType;
  file: string;
}

const categories: CategoryConfig[] = [
  { name: "mice", schema: mouseProductArraySchema, file: "mice.json" },
  { name: "audio", schema: audioProductArraySchema, file: "audio.json" },
  { name: "keyboards", schema: keyboardProductArraySchema, file: "keyboards.json" },
  { name: "monitors", schema: monitorProductArraySchema, file: "monitors.json" },
];

let hasErrors = false;

for (const cat of categories) {
  console.log(`\n=== ${cat.name} ===`);

  const filePath = path.join(dataDir, cat.file);
  let raw: string;
  let data: unknown[];
  try {
    raw = fs.readFileSync(filePath, "utf-8");
    data = JSON.parse(raw) as unknown[];
  } catch (err) {
    hasErrors = true;
    console.error(`  ❌ Failed to read/parse ${cat.file}: ${err}`);
    continue;
  }

  console.log(`  Products: ${data.length}`);

  // Validate with Zod
  const result = cat.schema.safeParse(data);
  if (!result.success) {
    hasErrors = true;
    console.error(`  ❌ Validation FAILED for ${cat.name}:`);
    for (const issue of result.error.issues) {
      const pathStr = issue.path.join(".");
      console.error(`    [${pathStr}] ${issue.message}`);
    }
    continue;
  }

  console.log(`  ✓ Validation passed`);

  // Rewrite with consistent formatting
  const output = JSON.stringify(data, null, 2);
  fs.writeFileSync(filePath, output + "\n", "utf-8");

  const sizeKB = (Buffer.byteLength(output, "utf-8") / 1024).toFixed(1);
  console.log(`  ✓ Wrote ${filePath} (${data.length} products, ${sizeKB} KB)`);
}

console.log("");
if (hasErrors) {
  console.error("❌ Validation finished with errors");
  process.exit(1);
} else {
  console.log("✅ All categories validated successfully");
}
