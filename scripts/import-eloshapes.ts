import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ─── CSV Parser (handles multiline quoted fields) ────────────────────
function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let current = "";
  let inQuotes = false;
  let row: string[] = [];

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '"') {
      if (inQuotes && text[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      row.push(current.trim());
      current = "";
    } else if ((ch === "\n" || ch === "\r") && !inQuotes) {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(current.trim());
      if (row.length > 1 || row[0] !== "") rows.push(row);
      row = [];
      current = "";
    } else {
      current += ch;
    }
  }
  if (current || row.length > 0) {
    row.push(current.trim());
    if (row.length > 1 || row[0] !== "") rows.push(row);
  }
  return rows;
}

// ─── Types ───────────────────────────────────────────────────────────
interface CsvMouse {
  Name: string;
  Brand: string;
  Model: string;
  Size: string;
  "Length (mm)": string;
  "Width (mm)": string;
  "Height (mm)": string;
  "Weight (grams)": string;
  Shape: string;
  "Hand compatibility": string;
  "Hump placement": string;
  "Front flare": string;
  "Side curvature": string;
  "Thumb rest": string;
  "Ring finger rest": string;
  Sensor: string;
  "Sensor type": string;
  "Sensor position": string;
  DPI: string;
  "Polling rate (Hz)": string;
  "Tracking speed (IPS)": string;
  "Acceleration (G)": string;
  "Side buttons": string;
  "Middle buttons": string;
  "Hot-swap switches": string;
  Switches: string;
  "Scroll wheel encoder": string;
  Material: string;
  Connectivity: string;
}

interface MouseProduct {
  id: string;
  name: string;
  brand: string;
  category: "mouse";
  price_range_usd: [number, number];
  image_url?: string;
  product_url?: string;
  manufacturer_url?: string;
  retailer_urls?: Record<string, string>;
  recommendation_tags: string[];
  data_quality: {
    data_confidence: "low" | "medium" | "high";
    primary_source_type:
      | "lab_test"
      | "community_poll"
      | "expert_judgment"
      | "manufacturer"
      | "mixed";
    source_name?: string;
    last_verified?: string;
    notes?: string;
  };
  rtings_scores?: Record<string, number>;
  core_attributes: {
    category_subtype: "mouse";
    price_tier: string;
    platform_fit: string[];
    connection_type: string[];
    wireless: boolean;
    battery_life_hr?: number;
    latency_class: string;
    software_support: string;
    availability_class: string;
    mouse_handedness: string;
    mouse_weight_g: number;
    mouse_weight_class: string;
    mouse_length_mm: number;
    mouse_width_mm: number;
    mouse_height_mm: number;
    mouse_size_class: string;
    mouse_shape_profile: string;
    mouse_grip_fit: string[];
    mouse_game_fit: string[];
    mouse_button_count: number;
    mouse_button_count_class: string;
    mouse_scroll_features: string[];
    mouse_polling_rate_max_hz: string;
    mouse_sensor_class: string;
    mouse_click_latency_ms?: number;
    mouse_sensor_latency_ms?: number;
    mouse_build_quality: string;
    mouse_feet_quality: string;
    mouse_coating: string;
    mouse_feel_tags: string[];
    mouse_value_pick: boolean;
  };
}

// ─── Mapping Helpers ─────────────────────────────────────────────────

function generateId(brand: string, model: string): string {
  const raw = `${brand} ${model}`;
  return raw
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .replace(/_+/g, "_");
}

function cleanName(rawName: string): string {
  // CSV name has newlines like "ATK\nX1 V2 Extreme" → "ATK X1 V2 Extreme"
  return rawName.replace(/\n/g, " ").replace(/\s+/g, " ").trim();
}

function mapSizeClass(size: string): "small" | "medium" | "large" {
  const s = size.toLowerCase();
  if (s === "small" || s === "fingertip") return "small";
  if (s === "large") return "large";
  return "medium";
}

function mapWeightClass(
  weight: number
): "ultralight" | "light" | "mid" | "medium" | "heavy" {
  if (weight < 50) return "ultralight";
  if (weight < 65) return "light";
  if (weight < 80) return "mid";
  if (weight < 100) return "medium";
  return "heavy";
}

function mapHandedness(
  handCompat: string,
  shape: string
): "right" | "ambi" | "left" | "ergo_right" | "ergo_left" {
  const h = handCompat.toLowerCase();
  const s = shape.toLowerCase();

  if (h === "ambidextrous") return "ambi";
  if (h === "left" && s === "ergonomic") return "ergo_left";
  if (h === "right" && s === "ergonomic") return "ergo_right";
  if (h === "left") return "left";
  // Right + Symmetrical = right-biased ambi, but since schema has "right"
  if (h === "right" && s === "symmetrical") return "right";
  if (h === "right" && s === "hybrid") return "right";
  return "right";
}

function mapShapeProfile(
  humpPlacement: string,
  shape: string
):
  | "low_hump"
  | "mid_hump"
  | "high_hump"
  | "rear_hump"
  | "center_hump"
  | "ergo_hump" {
  if (shape.toLowerCase() === "ergonomic") return "ergo_hump";

  const h = humpPlacement.toLowerCase();
  if (h === "center") return "center_hump";
  if (h.includes("back") && h.includes("minimal")) return "low_hump";
  if (h.includes("back") && h.includes("moderate")) return "rear_hump";
  if (h.includes("back") && h.includes("aggressive")) return "high_hump";
  if (h === "-" || h === "") return "mid_hump";
  return "mid_hump";
}

function mapPollingRate(
  hz: string
): "125" | "500" | "1000" | "2000" | "4000" | "8000" {
  const num = parseInt(hz);
  if (isNaN(num) || num <= 125) return "125";
  if (num <= 500) return "500";
  if (num <= 1000) return "1000";
  if (num <= 2000) return "2000";
  if (num <= 4000) return "4000";
  return "8000";
}

function mapSensorClass(
  sensorName: string
): "basic" | "budget_ok" | "good" | "great" | "flagship" {
  const s = sensorName.toLowerCase();

  // Flagship sensors
  if (
    s.includes("paw3950") ||
    s.includes("xs-1") ||
    s.includes("focus pro 45k") ||
    s.includes("focus pro gen-2") ||
    s.includes("hero 2") ||
    s.includes("aimpoint pro") ||
    s.includes("owl-eye 30k") ||
    s.includes("xero") ||
    s.includes("paw3998") ||
    s.includes("3950iz")
  )
    return "flagship";

  // Great sensors
  if (
    s.includes("paw3395") ||
    s.includes("paw3399") ||
    s.includes("paw3398") ||
    s.includes("paw3392") ||
    s.includes("paw3370") ||
    s.includes("paw3371") ||
    s.includes("pmw3389") ||
    s.includes("pmw3391") ||
    s.includes("pmw3381") ||
    s.includes("hero 25k") ||
    s.includes("focus pro 30k") ||
    s.includes("focus+") ||
    s.includes("focus x 26k") ||
    s.includes("truemove pro") ||
    s.includes("aimpoint") ||
    s.includes("owl-eye 26k") ||
    s.includes("bamf 2.0") ||
    s.includes("bamf 3.0") ||
    s.includes("marksman 26k") ||
    s.includes("hyperx 26k") ||
    s.includes("aimninja")
  )
    return "great";

  // Good sensors
  if (
    s.includes("paw3335") ||
    s.includes("paw3338") ||
    s.includes("paw3349") ||
    s.includes("pmw3360") ||
    s.includes("pmw3366") ||
    s.includes("pmw3367") ||
    s.includes("pmw3359") ||
    s.includes("hero 12k") ||
    s.includes("truemove 3") ||
    s.includes("truemove air") ||
    s.includes("owl-eye 19k") ||
    s.includes("focus x 18k") ||
    s.includes("bamf") ||
    s.includes("marksman s") ||
    s.includes("paw3333") ||
    s.includes("pmw3330") ||
    s.includes("pmw3331")
  )
    return "good";

  // Budget OK sensors
  if (
    s.includes("paw3327") ||
    s.includes("paw3328") ||
    s.includes("paw3311") ||
    s.includes("paw3318") ||
    s.includes("pmw3325") ||
    s.includes("pmw3320") ||
    s.includes("pmw3310") ||
    s.includes("truemove 1") ||
    s.includes("truemove core") ||
    s.includes("hyperx core") ||
    s.includes("paw3305") ||
    s.includes("owl-eye") ||
    s.includes("paw3805") ||
    s.includes("paw3808")
  )
    return "budget_ok";

  // Basic sensors
  if (
    s.includes("paw3104") ||
    s.includes("a3050") ||
    s.includes("a3055") ||
    s.includes("a3305") ||
    s.includes("a3325") ||
    s.includes("adns-3080") ||
    s.includes("adns-3090") ||
    s.includes("adns-3095") ||
    s.includes("bluetrack") ||
    s.includes("laser") ||
    s.includes("darkfield") ||
    s === "-" ||
    s === ""
  )
    return "basic";

  // Default: try to guess from DPI
  return "good";
}

function mapConnectivity(conn: string): {
  wireless: boolean;
  connection_type: string[];
} {
  const c = conn.toLowerCase();
  if (c === "wireless") {
    return {
      wireless: true,
      connection_type: ["wireless_2_4_dongle"],
    };
  }
  return {
    wireless: false,
    connection_type: ["wired_usb"],
  };
}

function mapButtonCount(
  sideButtons: string,
  middleButtons: string
): number {
  const side = parseInt(sideButtons) || 0;
  const middle = parseInt(middleButtons) || 0;
  // Base buttons: left click, right click, middle click (scroll)
  return side + middle + 3;
}

function mapButtonCountClass(
  count: number
): "low" | "medium" | "high" | "mmo_grid" {
  if (count <= 5) return "low";
  if (count <= 8) return "medium";
  if (count <= 11) return "high";
  return "mmo_grid";
}

function mapCoating(material: string): "matte" | "glossy" | "rubberized" | "mixed" {
  const m = material.toLowerCase();
  if (m.includes("carbon fiber")) return "matte";
  if (m.includes("magnesium")) return "matte";
  return "matte"; // most gaming mice are matte by default
}

function mapLatencyClass(
  pollingRate: number,
  wireless: boolean
): "very_low" | "low" | "medium" | "high" {
  if (pollingRate >= 4000) return "very_low";
  if (pollingRate >= 1000) return "low";
  if (pollingRate >= 500) return "medium";
  return "high";
}

function deriveGripFit(
  shapeProfile: string,
  sizeClass: string,
  handedness: string
): string[] {
  // Ergo mice are generally palm/claw
  if (handedness.includes("ergo")) return ["palm", "claw"];

  switch (shapeProfile) {
    case "low_hump":
      return sizeClass === "small"
        ? ["claw", "fingertip"]
        : ["claw", "fingertip", "palm"];
    case "mid_hump":
      return ["claw", "palm"];
    case "high_hump":
    case "rear_hump":
      return sizeClass === "large" ? ["palm", "claw"] : ["palm", "claw"];
    case "center_hump":
      return ["claw", "palm"];
    case "ergo_hump":
      return ["palm", "claw"];
    default:
      return ["claw"];
  }
}

function deriveGameFit(
  sensorClass: string,
  pollingRate: number,
  weightClass: string,
  buttonCount: number
): string[] {
  if (buttonCount >= 12) return ["mmo", "general"];
  if (buttonCount >= 9) return ["mmo", "moba", "general"];

  if (
    sensorClass === "flagship" ||
    (sensorClass === "great" && pollingRate >= 1000)
  ) {
    if (weightClass === "ultralight" || weightClass === "light") {
      return ["fps", "general"];
    }
    return ["fps", "moba", "general"];
  }

  if (sensorClass === "good" || sensorClass === "great") {
    return ["general", "fps"];
  }

  if (sensorClass === "basic" || sensorClass === "budget_ok") {
    return ["general", "productivity"];
  }

  return ["general"];
}

function deriveFeelTags(csv: CsvMouse, mapped: Partial<MouseProduct["core_attributes"]>): string[] {
  const tags: string[] = [];

  // Size-based
  if (mapped.mouse_size_class === "small") tags.push("small_hands_friendly");
  if (mapped.mouse_size_class === "large") tags.push("large_hands_friendly");

  // Weight-based
  if (mapped.mouse_weight_class === "ultralight") tags.push("ultralight");

  // Shape-based
  if (mapped.mouse_handedness?.includes("ergo")) tags.push("ergonomic", "ergo_right");
  if (mapped.mouse_handedness === "ambi") tags.push("safe_shape");

  // Features
  if (csv["Hot-swap switches"] === "Yes") tags.push("hot_swap_switches");
  if (csv["Thumb rest"] === "Yes") tags.push("thumb_rest");

  // Material
  if (csv.Material?.toLowerCase().includes("carbon fiber")) tags.push("premium_feel");
  if (csv.Material?.toLowerCase().includes("magnesium")) tags.push("premium_feel");

  // Button count
  if ((mapped.mouse_button_count || 0) >= 9) tags.push("mmo_buttons", "mmo_friendly");

  // Sensor/performance
  if (mapped.mouse_sensor_class === "flagship") tags.push("competitive", "fast");

  // Wireless portability
  if (mapped.wireless && (mapped.mouse_weight_class === "ultralight" || mapped.mouse_weight_class === "light")) {
    tags.push("portable");
  }

  return [...new Set(tags)];
}

function deriveRecommendationTags(
  mapped: MouseProduct["core_attributes"]
): string[] {
  const tags: string[] = [];

  if (mapped.mouse_sensor_class === "flagship" && mapped.mouse_weight_class === "ultralight")
    tags.push("top_tier_competitive_fps");
  if (mapped.mouse_weight_class === "ultralight") tags.push("ultralight");
  if (mapped.mouse_sensor_class === "flagship") tags.push("esports_grade_sensor");
  if (parseInt(mapped.mouse_polling_rate_max_hz) >= 4000) tags.push("high_polling");
  if (mapped.wireless) tags.push("wireless");
  if (mapped.mouse_handedness.includes("ergo")) tags.push("ergonomic");
  if (mapped.mouse_button_count >= 9) tags.push("mmo_buttons");

  return tags;
}

function derivePriceTier(price: number): string {
  if (price <= 25) return "budget";
  if (price <= 45) return "lower_midrange";
  if (price <= 70) return "midrange";
  if (price <= 100) return "upper_midrange";
  if (price <= 160) return "premium";
  return "flagship";
}

// ─── Fuzzy Matching ──────────────────────────────────────────────────

function normalizeForMatch(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[^a-z0-9 ]/g, "")
    .trim();
}

function fuzzyMatch(a: string, b: string): number {
  const na = normalizeForMatch(a);
  const nb = normalizeForMatch(b);

  if (na === nb) return 1.0;

  // Check containment
  if (na.includes(nb) || nb.includes(na)) return 0.9;

  // Token overlap
  const tokensA = na.split(" ");
  const tokensB = nb.split(" ");
  const common = tokensA.filter((t) => tokensB.includes(t));
  const overlap = (2 * common.length) / (tokensA.length + tokensB.length);
  return overlap;
}

// ─── Main ────────────────────────────────────────────────────────────

function main() {
  const dryRun = process.argv.includes("--dry-run");
  const nonFlagArgs = process.argv.slice(2).filter((a) => !a.startsWith("--"));
  const csvPath = nonFlagArgs[0] || "C:/Users/prinp/Downloads/eloshapes_mouse_data_v1.csv";

  console.log("=== Eloshapes CSV → GearMatch Mouse Import ===\n");

  // Read CSV
  console.log("Reading CSV...");
  const csvRaw = readFileSync(csvPath, "utf-8");
  const rows = parseCSV(csvRaw);
  const headers = rows[0];
  const csvMice: CsvMouse[] = rows.slice(1).map((r) => {
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => (obj[h] = r[i] || ""));
    return obj as unknown as CsvMouse;
  });
  console.log(`Parsed ${csvMice.length} mice from CSV\n`);

  // Read existing database
  const dbPath = join(__dirname, "..", "src", "data", "products", "mice.json");
  console.log("Reading existing database...");
  const existingMice: MouseProduct[] = JSON.parse(readFileSync(dbPath, "utf-8"));
  console.log(`Existing database: ${existingMice.length} mice\n`);

  // Build lookup maps
  const existingById = new Map<string, MouseProduct>();
  const existingByName = new Map<string, MouseProduct>();
  existingMice.forEach((m) => {
    existingById.set(m.id, m);
    existingByName.set(normalizeForMatch(m.name), m);
  });

  // Process CSV mice
  let newCount = 0;
  let updatedCount = 0;
  let skippedCount = 0;
  const processedIds = new Set<string>();
  const result: MouseProduct[] = [...existingMice]; // Start with existing

  for (const csv of csvMice) {
    // Clean the name (CSV has Brand\nModel format)
    const cleanedName = cleanName(csv.Name);
    const brand = csv.Brand.trim();
    const model = csv.Model.trim();

    if (!brand || !model) {
      skippedCount++;
      continue;
    }

    const fullName = `${brand} ${model}`;
    const id = generateId(brand, model);

    // Skip if we already processed this ID (duplicate in CSV)
    if (processedIds.has(id)) {
      continue;
    }
    processedIds.add(id);

    // Parse numeric fields
    const length = parseFloat(csv["Length (mm)"]);
    const width = parseFloat(csv["Width (mm)"]);
    const height = parseFloat(csv["Height (mm)"]);
    const weight = parseFloat(csv["Weight (grams)"]);
    const pollingRate = parseInt(csv["Polling rate (Hz)"]);

    // Skip mice with missing critical data
    if (isNaN(weight) || isNaN(length) || isNaN(width) || isNaN(height)) {
      skippedCount++;
      continue;
    }

    // Map fields
    const sizeClass = mapSizeClass(csv.Size);
    const weightClass = mapWeightClass(weight);
    const handedness = mapHandedness(csv["Hand compatibility"], csv.Shape);
    const shapeProfile = mapShapeProfile(csv["Hump placement"], csv.Shape);
    const pollingRateMapped = mapPollingRate(csv["Polling rate (Hz)"]);
    const sensorClass = mapSensorClass(csv.Sensor);
    const connectivity = mapConnectivity(csv.Connectivity);
    const buttonCount = mapButtonCount(csv["Side buttons"], csv["Middle buttons"]);
    const buttonCountClass = mapButtonCountClass(buttonCount);
    const coating = mapCoating(csv.Material);
    const latencyClass = mapLatencyClass(pollingRate || 1000, connectivity.wireless);

    const gripFit = deriveGripFit(shapeProfile, sizeClass, handedness);
    const gameFit = deriveGameFit(sensorClass, pollingRate || 1000, weightClass, buttonCount);

    const partialCore: Partial<MouseProduct["core_attributes"]> = {
      mouse_size_class: sizeClass,
      mouse_weight_class: weightClass,
      mouse_weight_g: weight,
      mouse_handedness: handedness,
      mouse_button_count: buttonCount,
      mouse_sensor_class: sensorClass,
      wireless: connectivity.wireless,
    };

    const feelTags = deriveFeelTags(csv, partialCore);
    const coreAttributes: MouseProduct["core_attributes"] = {
      category_subtype: "mouse",
      price_tier: "midrange", // Will be updated by PricesAPI
      platform_fit: ["pc"],
      connection_type: connectivity.connection_type,
      wireless: connectivity.wireless,
      latency_class: latencyClass,
      software_support: "basic",
      availability_class: "easy",
      mouse_handedness: handedness,
      mouse_weight_g: weight,
      mouse_weight_class: weightClass,
      mouse_length_mm: length,
      mouse_width_mm: width,
      mouse_height_mm: height,
      mouse_size_class: sizeClass,
      mouse_shape_profile: shapeProfile,
      mouse_grip_fit: gripFit,
      mouse_game_fit: gameFit,
      mouse_button_count: buttonCount,
      mouse_button_count_class: buttonCountClass,
      mouse_scroll_features: [],
      mouse_polling_rate_max_hz: pollingRateMapped,
      mouse_sensor_class: sensorClass,
      mouse_build_quality: "good",
      mouse_feet_quality: "ok",
      mouse_coating: coating,
      mouse_feel_tags: feelTags,
      mouse_value_pick: false,
    };

    const recommendationTags = deriveRecommendationTags(coreAttributes);

    // Check if this mouse exists in the database
    let existingMatch: MouseProduct | undefined;

    // Try exact ID match
    if (existingById.has(id)) {
      existingMatch = existingById.get(id);
    }

    // Try fuzzy name match
    if (!existingMatch) {
      const normalizedName = normalizeForMatch(fullName);
      if (existingByName.has(normalizedName)) {
        existingMatch = existingByName.get(normalizedName);
      }
    }

    // Try fuzzy matching against all existing mice
    if (!existingMatch) {
      let bestScore = 0;
      let bestMatch: MouseProduct | undefined;
      for (const existing of existingMice) {
        const score = fuzzyMatch(fullName, existing.name);
        if (score > bestScore && score >= 0.85) {
          bestScore = score;
          bestMatch = existing;
        }
      }
      if (bestMatch) {
        existingMatch = bestMatch;
      }
    }

    if (existingMatch) {
      // Update existing mouse with CSV data where it differs
      const idx = result.findIndex((m) => m.id === existingMatch!.id);
      if (idx === -1) continue;

      let changed = false;
      const existing = result[idx];
      const ca = existing.core_attributes;

      // Update dimensions if different (CSV data is very precise from eloshapes)
      if (Math.abs(ca.mouse_length_mm - length) > 0.5) {
        ca.mouse_length_mm = length;
        changed = true;
      }
      if (Math.abs(ca.mouse_width_mm - width) > 0.5) {
        ca.mouse_width_mm = width;
        changed = true;
      }
      if (Math.abs(ca.mouse_height_mm - height) > 0.5) {
        ca.mouse_height_mm = height;
        changed = true;
      }
      if (Math.abs(ca.mouse_weight_g - weight) > 1) {
        ca.mouse_weight_g = weight;
        ca.mouse_weight_class = weightClass;
        changed = true;
      }

      // Update polling rate if CSV has higher value
      if (parseInt(pollingRateMapped) > parseInt(ca.mouse_polling_rate_max_hz)) {
        ca.mouse_polling_rate_max_hz = pollingRateMapped;
        ca.latency_class = latencyClass;
        changed = true;
      }

      // Update sensor class if CSV suggests better
      const sensorRank = { basic: 0, budget_ok: 1, good: 2, great: 3, flagship: 4 };
      if (
        (sensorRank[sensorClass as keyof typeof sensorRank] ?? 0) >
        (sensorRank[ca.mouse_sensor_class as keyof typeof sensorRank] ?? 0)
      ) {
        ca.mouse_sensor_class = sensorClass;
        changed = true;
      }

      // Update size class from eloshapes (they're the authority on this)
      if (ca.mouse_size_class !== sizeClass) {
        ca.mouse_size_class = sizeClass;
        changed = true;
      }

      if (changed) {
        updatedCount++;
      }
    } else {
      // New mouse - create entry
      const newMouse: MouseProduct = {
        id,
        name: fullName,
        brand,
        category: "mouse",
        price_range_usd: [0, 0], // Will be filled by PricesAPI
        product_url: `https://www.amazon.com/s?k=${encodeURIComponent(fullName)}&tag=gearmatch-20`,
        recommendation_tags: recommendationTags,
        data_quality: {
          data_confidence: "low",
          primary_source_type: "manufacturer",
          source_name: "eloshapes",
          last_verified: "2026-03",
          notes: "Auto-imported from eloshapes CSV. Specs need verification.",
        },
        core_attributes: coreAttributes,
      };

      result.push(newMouse);
      newCount++;
    }
  }

  // Sort by brand then name
  result.sort((a, b) => {
    const brandCmp = a.brand.localeCompare(b.brand);
    if (brandCmp !== 0) return brandCmp;
    return a.name.localeCompare(b.name);
  });

  console.log("=== Import Summary ===");
  console.log(`CSV mice parsed: ${csvMice.length}`);
  console.log(`Unique mice in CSV: ${processedIds.size}`);
  console.log(`Existing mice: ${existingMice.length}`);
  console.log(`New mice added: ${newCount}`);
  console.log(`Existing mice updated: ${updatedCount}`);
  console.log(`Skipped (missing data): ${skippedCount}`);
  console.log(`Final database size: ${result.length}`);

  if (dryRun) {
    console.log("\n[DRY RUN] No files written.");

    // Show sample new mice
    const newMice = result.filter(
      (m) => !existingById.has(m.id) && !existingByName.has(normalizeForMatch(m.name))
    );
    console.log("\nSample new mice (first 10):");
    newMice.slice(0, 10).forEach((m) => {
      console.log(`  ${m.name} (${m.brand}) - ${m.core_attributes.mouse_weight_g}g ${m.core_attributes.mouse_size_class} ${m.core_attributes.wireless ? "wireless" : "wired"}`);
    });
  } else {
    // Write output
    writeFileSync(dbPath, JSON.stringify(result, null, 2) + "\n");
    console.log(`\nWritten to ${dbPath}`);

    // Save import report
    const outputDir = join(__dirname, "output");
    if (!existsSync(outputDir)) mkdirSync(outputDir, { recursive: true });
    const reportPath = join(outputDir, "eloshapes-import-report.json");
    writeFileSync(
      reportPath,
      JSON.stringify(
        {
          timestamp: new Date().toISOString(),
          csvMiceCount: csvMice.length,
          uniqueCsvMice: processedIds.size,
          existingMiceCount: existingMice.length,
          newMiceAdded: newCount,
          existingMiceUpdated: updatedCount,
          skipped: skippedCount,
          finalDatabaseSize: result.length,
        },
        null,
        2
      )
    );
    console.log(`Report saved to ${reportPath}`);
  }
}

main();
