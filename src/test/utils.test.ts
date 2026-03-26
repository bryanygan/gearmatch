import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn utility", () => {
  it("merges class names", () => {
    const result = cn("foo", "bar");
    expect(result).toBe("foo bar");
  });

  it("handles conditional classes", () => {
    const result = cn("base", false && "hidden", true && "visible");
    expect(result).toBe("base visible");
  });

  it("handles undefined and null", () => {
    const result = cn("base", undefined, null, "end");
    expect(result).toBe("base end");
  });

  it("handles empty string", () => {
    const result = cn("");
    expect(result).toBe("");
  });

  it("handles no arguments", () => {
    const result = cn();
    expect(result).toBe("");
  });

  it("merges tailwind classes correctly (tw-merge)", () => {
    // tw-merge should resolve conflicts - later class wins
    const result = cn("px-4", "px-6");
    expect(result).toBe("px-6");
  });

  it("merges conflicting tailwind responsive classes", () => {
    const result = cn("text-sm", "text-lg");
    expect(result).toBe("text-lg");
  });

  it("keeps non-conflicting tailwind classes", () => {
    const result = cn("px-4", "py-6", "text-sm");
    expect(result).toContain("px-4");
    expect(result).toContain("py-6");
    expect(result).toContain("text-sm");
  });

  it("handles array inputs", () => {
    const result = cn(["foo", "bar"], "baz");
    expect(result).toContain("foo");
    expect(result).toContain("bar");
    expect(result).toContain("baz");
  });

  it("handles object syntax", () => {
    const result = cn({ active: true, disabled: false });
    expect(result).toBe("active");
  });
});
