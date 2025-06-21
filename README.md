# lichess-js

A modern JavaScript/TypeScript client for the Lichess API, generated from the official OpenAPI specification.

## Features

- 🎯 **Type-safe**: Full TypeScript support with auto-generated types
- 🔄 **Up-to-date**: Generated from the latest Lichess OpenAPI specification
- 🚀 **Modern**: Uses Fetch API with ESM modules
- 🔑 **Authentication**: Built-in support for Personal Access Tokens
- 📦 **Tree-shakable**: Only import what you need
- 🌐 **Universal**: Works in Node.js and modern browsers

## Installation

```bash
npm install lichess-js
# or
pnpm add lichess-js
# or
yarn add lichess-js
```

## Quick Start

1. **Get your API token**: Visit [Lichess Personal Access Tokens](https://lichess.org/account/oauth/token) to generate a token.

2. **Use the client**:

```typescript
import { createLichessClient } from "lichess-js";

// Create client with your token
const lichess = createLichessClient({
  token: "your-personal-access-token",
});

// Get your account info
const account = await lichess.accountMe();
console.log(`Hello, ${account.data?.username}!`);

// Get user status
const userStatus = await lichess.apiUsersStatus({
  query: {
    ids: "thibault,maia1,maia5",
    withGameIds: true,
  },
});
console.log("User statuses:", userStatus.data);

// Get recent games
const games = await lichess.apiGamesUser({
  path: {
    username: "thibault",
  },
  query: {
    max: 10,
  },
});
console.log("Recent games:", games.data);
```

## Configuration

### Basic Configuration

```typescript
import { createLichessClient } from "lichess-js";

const lichess = createLichessClient({
  token: "your-token",
  baseUrl: "https://lichess.org", // optional, defaults to https://lichess.org
});
```

### Environment Variables

For security, store your token in environment variables:

```typescript
const lichess = createLichessClient({
  token: process.env.LICHESS_TOKEN!,
});
```

## API Coverage

This client provides access to all Lichess API endpoints including:

- **Account**: Profile, preferences, kid mode
- **Users**: Public user information, status, activity
- **Games**: Export games, ongoing games, game analysis
- **Puzzles**: Puzzle dashboard, activity, themes
- **Teams**: Team information, members, join/leave
- **Tournaments**: Arena and Swiss tournaments
- **Studies**: Chess studies and chapters
- **Board**: Play games with physical boards
- **Bot**: Bot account functionality
- **Broadcasts**: Live game broadcasts
- **And much more...**

## Examples

### Get User Information

```typescript
// Get public user profile
const user = await lichess.apiUser({
  path: { username: "thibault" },
});
console.log(user.data);

// Get multiple users' online status
const statuses = await lichess.apiUsersStatus({
  query: {
    ids: "thibault,maia1,maia5",
    withGameIds: true,
  },
});
```

### Export Games

```typescript
// Export user's games
const games = await lichess.apiGamesUser({
  path: { username: "thibault" },
  query: {
    since: Date.now() - 7 * 24 * 60 * 60 * 1000, // Last 7 days
    max: 20,
  },
});
```

### Puzzle Activity

```typescript
// Get puzzle dashboard
const puzzles = await lichess.apiPuzzleDashboard({
  path: { days: 30 },
});

// Get puzzle activity
const activity = await lichess.apiPuzzleActivity({
  query: { max: 50 },
});
```

### Team Management

```typescript
// Get team information
const team = await lichess.teamShow({
  path: { teamId: "lichess-swiss" },
});

// Get team members
const members = await lichess.teamIdUsers({
  path: { teamId: "lichess-swiss" },
});
```

## Error Handling

The client returns response objects with both data and error information:

```typescript
try {
  const account = await lichess.accountMe();

  if (account.error) {
    console.error("API Error:", account.error);
    return;
  }

  console.log("Account:", account.data);
} catch (error) {
  console.error("Network Error:", error);
}
```

## Rate Limiting

Lichess APIs are rate-limited. The client will return appropriate HTTP status codes (429) when rate limits are exceeded. Always handle these gracefully:

```typescript
const response = await lichess.accountMe();

if (response.response?.status === 429) {
  console.log("Rate limited. Please wait before making more requests.");
  // Wait 60 seconds as recommended by Lichess documentation
  await new Promise((resolve) => setTimeout(resolve, 60000));
}
```

## Type Safety

All API responses are fully typed. You get complete IntelliSense support:

```typescript
const account = await lichess.accountMe();

// TypeScript knows the exact shape of the response
if (account.data) {
  console.log(account.data.username); // ✅ Type-safe
  console.log(account.data.profile?.realName); // ✅ Optional chaining
  // console.log(account.data.invalidField); // ❌ TypeScript error
}
```

## Development

This package is generated from the official Lichess OpenAPI specification using [Hey API](https://heyapi.dev/).

### Building from Source

```bash
# Clone the repository
git clone https://github.com/yourusername/lichess-ts.git
cd lichess-ts

# Install dependencies
pnpm install

# Generate client from OpenAPI spec
pnpm run generate

# Build the package
pnpm run build
```

### Project Scripts

- `pnpm run generate` - Generate TypeScript client from OpenAPI spec
- `pnpm run build` - Build the package for distribution
- `pnpm run clean` - Clean generated files and build output

### Updating the API

To update to the latest Lichess API:

1. Download the latest `lichess-openapi.json` from Lichess
2. Replace the existing file
3. Run `pnpm run generate && pnpm run build`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Lichess.org](https://lichess.org) for providing the excellent chess platform and API
- [Hey API](https://heyapi.dev/) for the powerful OpenAPI code generation tools
- The TypeScript and Node.js communities for the amazing ecosystem

## Related Projects

- [Lichess API Documentation](https://lichess.org/api)
- [Hey API OpenAPI TypeScript](https://github.com/hey-api/openapi-ts)
- [Lichess Database](https://database.lichess.org/) - Download games and puzzles

## Support

- [Lichess Discord](https://discord.gg/lichess) - Get help with the Lichess API
- [GitHub Issues](https://github.com/yourusername/lichess-ts/issues) - Report bugs or request features
