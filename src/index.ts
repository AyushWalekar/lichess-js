// Main client export
export {
  createLichessClient,
  type LichessClient,
  type LichessClientConfig,
} from "./client";

// Re-export all types from the generated client
export * from "./generated/types.gen";

// Re-export the raw SDK functions if needed
export * as LichessSDK from "./generated/sdk.gen";
