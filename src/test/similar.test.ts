import { describe, it, expect } from "vitest";
import { getSimilarProducts } from "@/lib/scoring/similar";

describe("getSimilarProducts", () => {
  it("returns null for invalid product ID", async () => {
    const result = await getSimilarProducts("mouse", "nonexistent_product_id_xyz");
    expect(result).toBeNull();
  });

  it("returns null for invalid category", async () => {
    const result = await getSimilarProducts("invalid" as any, "some_id");
    expect(result).toBeNull();
  });

  it("finds similar mouse products and excludes source", async () => {
    const { getMouseProducts } = await import("@/data/products");
    const mice = await getMouseProducts();
    expect(mice.length).toBeGreaterThan(0);
    const sourceProduct = mice[0];

    const result = await getSimilarProducts("mouse", sourceProduct.id);
    expect(result).not.toBeNull();
    expect(result!.sourceProduct.id).toBe(sourceProduct.id);
    expect(result!.recommendations.topPicks.length).toBeGreaterThan(0);

    const allResultIds = [
      ...result!.recommendations.topPicks.map((sp) => sp.product.id),
      ...result!.recommendations.alternates.map((sp) => sp.product.id),
    ];
    expect(allResultIds).not.toContain(sourceProduct.id);
  });

  it("finds similar audio products and excludes source", async () => {
    const { getAudioProducts } = await import("@/data/products");
    const audio = await getAudioProducts();
    expect(audio.length).toBeGreaterThan(0);
    const sourceProduct = audio[0];

    const result = await getSimilarProducts("audio", sourceProduct.id);
    expect(result).not.toBeNull();
    expect(result!.sourceProduct.id).toBe(sourceProduct.id);
    expect(result!.recommendations.topPicks.length).toBeGreaterThan(0);

    const allResultIds = [
      ...result!.recommendations.topPicks.map((sp) => sp.product.id),
      ...result!.recommendations.alternates.map((sp) => sp.product.id),
    ];
    expect(allResultIds).not.toContain(sourceProduct.id);
  });

  it("finds similar keyboard products and excludes source", async () => {
    const { getKeyboardProducts } = await import("@/data/products");
    const keyboards = await getKeyboardProducts();
    expect(keyboards.length).toBeGreaterThan(0);
    const sourceProduct = keyboards[0];

    const result = await getSimilarProducts("keyboard", sourceProduct.id);
    expect(result).not.toBeNull();
    expect(result!.sourceProduct.id).toBe(sourceProduct.id);
    expect(result!.recommendations.topPicks.length).toBeGreaterThan(0);

    const allResultIds = [
      ...result!.recommendations.topPicks.map((sp) => sp.product.id),
      ...result!.recommendations.alternates.map((sp) => sp.product.id),
    ];
    expect(allResultIds).not.toContain(sourceProduct.id);
  });

  it("finds similar monitor products and excludes source", async () => {
    const { getMonitorProducts } = await import("@/data/products");
    const monitors = await getMonitorProducts();
    expect(monitors.length).toBeGreaterThan(0);
    const sourceProduct = monitors[0];

    const result = await getSimilarProducts("monitor", sourceProduct.id);
    expect(result).not.toBeNull();
    expect(result!.sourceProduct.id).toBe(sourceProduct.id);
    expect(result!.recommendations.topPicks.length).toBeGreaterThan(0);

    const allResultIds = [
      ...result!.recommendations.topPicks.map((sp) => sp.product.id),
      ...result!.recommendations.alternates.map((sp) => sp.product.id),
    ];
    expect(allResultIds).not.toContain(sourceProduct.id);
  });

  it("returns scored products sorted by score descending", async () => {
    const { getMouseProducts } = await import("@/data/products");
    const mice = await getMouseProducts();
    expect(mice.length).toBeGreaterThan(0);
    const sourceProduct = mice[0];

    const result = await getSimilarProducts("mouse", sourceProduct.id);
    expect(result).not.toBeNull();

    // Top picks should be sorted by score descending
    const topScores = result!.recommendations.topPicks.map((sp) => sp.score);
    for (let i = 1; i < topScores.length; i++) {
      expect(topScores[i]).toBeLessThanOrEqual(topScores[i - 1]);
    }
  });
});
