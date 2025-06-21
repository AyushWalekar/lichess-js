/**
 * Example usage of the Lichess TypeScript client
 *
 * Before running this example:
 * 1. Generate a personal access token at https://lichess.org/account/oauth/token
 * 2. Set the LICHESS_TOKEN environment variable
 * 3. Run: npx tsx example.ts
 */

import { createLichessClient } from "./src/index";

// Create a client with your Lichess token
// Get your token at: https://lichess.org/account/oauth/token
const lichess = createLichessClient({
  token: process.env.LICHESS_TOKEN || "your-token-here",
});

async function main() {
  try {
    // Get your account information
    console.log("Getting account info...");
    const account = await lichess.accountMe();
    console.log(`Hello, ${account.data?.username}!`);

    // Get user status for multiple users
    console.log("\nGetting user statuses...");
    const userStatus = await lichess.apiUsersStatus({
      query: {
        ids: "thibault,maia1,maia5",
        withGameIds: true,
      },
    });
    console.log("User statuses:", userStatus.data);

    // Get public user information
    console.log("\nGetting user profile...");
    const user = await lichess.apiUser({
      path: {
        username: "thibault",
      },
    });
    console.log("User profile:", user.data);

    // Get puzzle dashboard
    console.log("\nGetting puzzle dashboard...");
    const puzzles = await lichess.apiPuzzleDashboard({
      path: {
        days: 30,
      },
    });
    console.log("Puzzle dashboard:", puzzles.data);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Run the example
if (require.main === module) {
  main();
}
