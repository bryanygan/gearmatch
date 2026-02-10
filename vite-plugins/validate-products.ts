import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import type { Plugin } from "vite";

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

export function validateProducts(): Plugin {
  return {
    name: "validate-products",
    buildStart() {
      const errors: string[] = [];
      const summary: string[] = [];

      for (const cat of categories) {
        const filePath = path.join(dataDir, cat.file);

        if (!fs.existsSync(filePath)) {
          errors.push(`${cat.name}: file not found at ${filePath}`);
          continue;
        }

        let data: unknown;
        try {
          const raw = fs.readFileSync(filePath, "utf-8");
          data = JSON.parse(raw);
        } catch (e) {
          errors.push(`${cat.name}: failed to parse JSON — ${e instanceof Error ? e.message : e}`);
          continue;
        }

        const result = cat.schema.safeParse(data);
        if (!result.success) {
          const issues = result.error.issues
            .slice(0, 10)
            .map((issue) => `  [${issue.path.join(".")}] ${issue.message}`)
            .join("\n");
          const extra = result.error.issues.length > 10
            ? `\n  ... and ${result.error.issues.length - 10} more issues`
            : "";
          errors.push(`${cat.name}: validation failed\n${issues}${extra}`);
          continue;
        }

        summary.push(`${cat.name}: ${(data as unknown[]).length} products ✓`);
      }

      if (errors.length > 0) {
        this.error(
          `Product data validation failed:\n\n${errors.join("\n\n")}`
        );
      }

      console.log(`[validate-products] All product data valid — ${summary.join(", ")}`);
    },
  };
}
