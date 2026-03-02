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
      "A solid starter kit for competitive FPS gaming without breaking the bank. Lightweight mouse, decent headset, responsive keyboard, and a fast 1080p monitor.",
    items: [
      {
        productId: "logitech_g305",
        category: "mouse",
        addedAt: 1700000000000,
      },
      {
        productId: "attack_shark_x3",
        category: "mouse",
        addedAt: 1700000000000,
      },
      {
        productId: "steelseries_arctis_nova_3",
        category: "audio",
        addedAt: 1700000000000,
      },
      {
        productId: "redragon_k552_kumara_rgb",
        category: "keyboard",
        addedAt: 1700000000000,
      },
      {
        productId: "aoc_24g2",
        category: "monitor",
        addedAt: 1700000000000,
      },
    ],
    totalPriceRange: [264, 364],
    createdAt: 1700000000000,
    updatedAt: 1700000000000,
    tags: ["budget", "fps", "starter"],
    curatedBy: "gearmatch",
  },
  {
    id: "premium-productivity-pack",
    name: "Premium Productivity Pack",
    description:
      "High-end peripherals for professionals who want comfort, quality, and multi-device support. Great for long work sessions and content creation.",
    items: [
      {
        productId: "logitech_mx_master_3s",
        category: "mouse",
        addedAt: 1700000000000,
      },
      {
        productId: "logitech_mx_ergo",
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
    totalPriceRange: [880, 1070],
    createdAt: 1700000000000,
    updatedAt: 1700000000000,
    tags: ["premium", "productivity", "ergonomic", "multi-device"],
    curatedBy: "gearmatch",
  },
  {
    id: "competitive-esports-kit",
    name: "Competitive Esports Kit",
    description:
      "Low-latency, high-performance gear built for ranked play. Every component is chosen for speed — 4K+ Hz polling, rapid trigger keyboard, and a fast OLED monitor.",
    items: [
      {
        productId: "razer_viper_v3_pro",
        category: "mouse",
        addedAt: 1700000000000,
      },
      {
        productId: "pulsar_x2",
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
    totalPriceRange: [1190, 1435],
    createdAt: 1700000000000,
    updatedAt: 1700000000000,
    tags: ["esports", "competitive", "low-latency", "performance"],
    curatedBy: "gearmatch",
  },
  {
    id: "streaming-pro-loadout",
    name: "Streaming Pro Loadout",
    description:
      "Optimised for streamers who need great mic quality, comfortable typing for chat, and a vibrant display. Dual audio options for streaming vs. gaming sessions.",
    items: [
      {
        productId: "logitech_g_pro_x_superlight_2",
        category: "mouse",
        addedAt: 1700000000000,
      },
      {
        productId: "razer_blackshark_v3_pro",
        category: "audio",
        addedAt: 1700000000000,
      },
      {
        productId: "steelseries_arctis_nova_7",
        category: "audio",
        addedAt: 1700000000000,
      },
      {
        productId: "wooting_60he_v2",
        category: "keyboard",
        addedAt: 1700000000000,
      },
      {
        productId: "dell_alienware_aw2524h",
        category: "monitor",
        addedAt: 1700000000000,
      },
    ],
    totalPriceRange: [799, 1089],
    createdAt: 1700000000000,
    updatedAt: 1700000000000,
    tags: ["streaming", "content-creation", "mic-quality"],
    curatedBy: "gearmatch",
  },
] as const;
