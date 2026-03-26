/**
 * Curated Loadouts
 *
 * Pre-built loadouts using real product IDs from the product database.
 * Each loadout can contain multiple items per category.
 */

import type { Loadout } from "@/types/loadout";

export const CURATED_LOADOUTS: readonly Loadout[] = [
  {
    id: "budget-fps-setup",
    name: "Budget FPS Setup",
    description:
      "A punchy starter kit for competitive FPS gaming. Magnetic hall-effect keyboard with rapid trigger, a wireless ultralight mouse, gaming IEM with detachable mic, and a 280Hz monitor — all under $260.",
    items: [
      {
        productId: "mchose_l7_pro",
        category: "mouse",
        addedAt: 1700000000000,
      },
      {
        productId: "steelseries_tusq",
        category: "audio",
        addedAt: 1700000000000,
      },
      {
        productId: "mchose_ace_60_pro",
        category: "keyboard",
        addedAt: 1700000000000,
      },
      {
        productId: "asus_tuf_vg259qm",
        category: "monitor",
        addedAt: 1700000000000,
      },
    ],
    totalPriceRange: [290, 344],
    createdAt: 1700000000000,
    updatedAt: 1743120000000,
    tags: ["budget", "fps", "hall-effect", "rapid-trigger"],
    curatedBy: "gearmatch",
  },
  {
    id: "premium-productivity-pack",
    name: "Premium Productivity Pack",
    description:
      "High-end peripherals for professionals who want comfort, quality, and multi-device support. Great for long work sessions and content creation.",
    items: [
      {
        productId: "logitech_mx_master_4",
        category: "mouse",
        addedAt: 1700000000000,
      },
      {
        productId: "audeze_maxwell",
        category: "audio",
        addedAt: 1700000000000,
      },
      {
        productId: "keychron_q5_max",
        category: "keyboard",
        addedAt: 1700000000000,
      },
      {
        productId: "dell_u2725qe",
        category: "monitor",
        addedAt: 1700000000000,
      },
    ],
    totalPriceRange: [990, 1180],
    createdAt: 1700000000000,
    updatedAt: 1743120000000,
    tags: ["premium", "productivity", "ergonomic", "multi-device"],
    curatedBy: "gearmatch",
  },
  {
    id: "competitive-esports-kit",
    name: "Competitive Esports Kit",
    description:
      "Low-latency, high-performance gear built for ranked play. Every component is chosen for speed — 8K Hz polling, rapid trigger keyboard, and a QD-OLED monitor with sub-1ms response.",
    items: [
      {
        productId: "logitech_g_pro_x_superlight_2_dex",
        category: "mouse",
        addedAt: 1700000000000,
      },
      {
        productId: "hyperx_cloud_alpha_wireless",
        category: "audio",
        addedAt: 1700000000000,
      },
      {
        productId: "wooting_80he",
        category: "keyboard",
        addedAt: 1700000000000,
      },
      {
        productId: "dell_alienware_aw2725df",
        category: "monitor",
        addedAt: 1700000000000,
      },
    ],
    totalPriceRange: [1030, 1285],
    createdAt: 1700000000000,
    updatedAt: 1743120000000,
    tags: ["esports", "competitive", "low-latency", "performance"],
    curatedBy: "gearmatch",
  },
  {
    id: "streaming-pro-loadout",
    name: "Streaming Pro Loadout",
    description:
      "Optimised for streamers who need excellent mic quality, comfortable typing for chat, and a vibrant OLED display. The latest Logitech G Pro X2 SUPERSTRIKE keeps latency pro-grade.",
    items: [
      {
        productId: "logitech_g_pro_x2_superstrike",
        category: "mouse",
        addedAt: 1700000000000,
      },
      {
        productId: "razer_blackshark_v2_pro_wireless_2023",
        category: "audio",
        addedAt: 1700000000000,
      },
      {
        productId: "wooting_60he_v2",
        category: "keyboard",
        addedAt: 1700000000000,
      },
      {
        productId: "asus_rog_swift_oled_pg27aqdm",
        category: "monitor",
        addedAt: 1700000000000,
      },
    ],
    totalPriceRange: [870, 1120],
    createdAt: 1700000000000,
    updatedAt: 1743120000000,
    tags: ["streaming", "content-creation", "oled", "mic-quality"],
    curatedBy: "gearmatch",
  },
] as const;
