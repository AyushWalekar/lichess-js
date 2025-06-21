import { client } from "./generated/client.gen";
import * as api from "./generated/sdk.gen";

export interface LichessClientConfig {
  /**
   * Your Lichess Personal Access Token
   * Get one at: https://lichess.org/account/oauth/token
   */
  token: string;
  /**
   * Base URL for the Lichess API
   * @default "https://lichess.org"
   */
  baseUrl?: string;
}

/**
 * Create a configured Lichess API client
 *
 * @param config - Configuration object with token and optional baseUrl
 * @returns Configured client instance with all API methods
 *
 * @example
 * ```typescript
 * import { createLichessClient } from 'lichess-ts-client';
 *
 * const lichess = createLichessClient({
 *   token: 'your-personal-access-token'
 * });
 *
 * // Use the client
 * const account = await lichess.apiAccount();
 * const userStatus = await lichess.apiUsersStatus({ ids: 'thibault,maia1' });
 * ```
 */
export function createLichessClient(config: LichessClientConfig) {
  // Configure the client with authentication
  client.setConfig({
    baseUrl: config.baseUrl || "https://lichess.org",
    headers: {
      Authorization: `Bearer ${config.token}`,
      "User-Agent": "lichess-ts-client/0.1.0",
    },
  });

  // Return all API methods bound to the configured client
  return api;
}

export type LichessClient = ReturnType<typeof createLichessClient>;

/**
 * Default export for convenience
 */
export default createLichessClient;
