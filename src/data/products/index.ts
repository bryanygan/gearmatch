/**
 * Consolidated Product Data Index
 *
 * Re-exports all product data from consolidated files.
 * This provides a clean import interface for the rest of the application.
 */

// Mouse products
export { allMouseProducts } from "./mice";

// Audio products
export { allAudioProducts } from "./audio";

// Keyboard products
export { allKeyboardProducts } from "./keyboards";

// Monitor products
export { allMonitorProducts, monitorProductCount } from "./monitors";
