# uuidv7-utilities

A lightweight TypeScript utility library for extracting timestamps from UUIDv7 strings.

## Features

- ✅ Extract JavaScript `Date` object from UUIDv7 strings
- ✅ Validates UUID format and version
- ✅ TypeScript support with full type definitions
- ✅ Supports both ESM and CommonJS
- ✅ Comprehensive error handling for UUID v1-v6
- ✅ Zero dependencies
- ✅ Lightweight (~4KB)

## Installation

```bash
npm install uuidv7-utilities
```

## Requirements

- Node.js >= 20.0.0
- TypeScript >= 5.0.0 (if using TypeScript)
- Tested on Node.js versions 18.x, 20.x, and 22.x

## Why you should use UUIDv7

When using a UUID for the primary key of a SQL database tables, for performance reasons, you should use UUIDv7 instead of UUIDv4. UUIDv7 embeds a timestamp in the first 48 bits (6 bytes) representing milliseconds since Unix epoch. 

However, beware that node `crypto.randomUUID()` and the PostgresQL `gen_random_uuid()` return a UUIDv4.

From PostgreSQL 18, use the `uuidv7()` function instead of `gen_random_uuid()` to generate a UUID for a primary key, ex: `user_id       UUID PRIMARY KEY     DEFAULT uuidv7()`

Using this function, you can extact the timestamp from the UUIDv7. It will error if UUID versions under 7 are used, with clear error messages.

## Usage

### ESM (ES Modules)

```typescript
import { dateFromUUIDv7 } from 'uuidv7-utilities';

// Extract date from a UUIDv7
const uuid = '018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1';
const date = dateFromUUIDv7(uuid);

if (date) {
  console.log(date.toISOString());     // "2024-06-02T12:43:04.064Z"
  console.log(date.getTime());         // 1717332184064
  console.log(date.getFullYear());     // 2024
}

// Handle different UUID versions
try {
  const uuidv4 = '550e8400-e29b-41d4-a716-446655440000';
  const date = dateFromUUIDv7(uuidv4);
} catch (error) {
  console.error(error.message); // "The entered UUID appears to be V4, but a UUIDv7 is required."
}

// Handle invalid input
const result = dateFromUUIDv7('not-a-uuid');
console.log(result); // null
```

### CommonJS

```javascript
const { dateFromUUIDv7 } = require('uuidv7-utilities');

const uuid = '018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1';
const date = dateFromUUIDv7(uuid);

if (date) {
  console.log(date.toISOString()); // "2024-06-02T12:43:04.064Z"
  console.log(date.getTime());     // 1717332184064
}
```

## API

### `dateFromUUIDv7(uuid: unknown): Date | null`

Extracts a JavaScript `Date` object from a UUIDv7 string. UUIDv7 embeds a timestamp in the first 48 bits (6 bytes) representing milliseconds since Unix epoch.

**Parameters:**
- `uuid` (unknown): The input to validate and convert. Only string UUIDs are processed.

**Returns:**
- `Date`: JavaScript Date object extracted from the UUIDv7 timestamp
- `null`: If the input is not a string, not a valid UUID format, or not a UUIDv7

**Throws:**
- `Error`: If the input is a valid UUID but not version 7:
  - `"The entered UUID appears to be V1, but a UUIDv7 is required."`
  - `"The entered UUID appears to be V2, but a UUIDv7 is required."`
  - `"The entered UUID appears to be V3, but a UUIDv7 is required."`
  - `"The entered UUID appears to be V4, but a UUIDv7 is required."`
  - `"The entered UUID appears to be V5, but a UUIDv7 is required."`
  - `"The entered UUID appears to be V6, but a UUIDv7 is required."`

**Example UUIDv7:**
```
018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1
│       │    │
│       │    └── Version 7 (indicated by '7' in position 14)
│       └────── Random data
└───────────── 48-bit timestamp (milliseconds since Unix epoch)
```

## About UUIDv7

UUIDv7 is a time-ordered UUID format introduced in [RFC 9562](https://tools.ietf.org/rfc/rfc9562.txt) that includes a timestamp in the first 48 bits. This makes UUIDs sortable by creation time and improves database performance for indexed operations.

**Key benefits of UUIDv7:**
- **Time-ordered**: Natural chronological sorting
- **Database-friendly**: Better performance for primary keys and indexes
- **Future-proof**: Official RFC standard
- **Collision-resistant**: Combines timestamp with random data

**Learn more:**
- [RFC 9562: UUIDs](https://tools.ietf.org/rfc/rfc9562.txt)
- [UUIDv7: The Fast, Unique, Ordered Identifier Every Scalable System Needs](https://medium.com/@zahrazolfaghari00/uuidv7-the-fast-unique-ordered-identifier-every-scalable-system-needs-999e57eb0104)

## Development

This project uses:
- **TypeScript** for type-safe development
- **Biome** for fast linting and formatting
- **Node.js test runner** for testing
- **Dual package exports** (ESM + CommonJS)
- **GitHub Actions** for CI/CD

### Scripts

```bash
# Install dependencies
npm install

# Build the project (ESM + CommonJS)
npm run build

# Run tests
npm test

# Format and lint code
npm run check

# Format code only
npm run format

# Lint code only  
npm run lint

# Fix lint issues
npm run lint:fix
```

### Project Structure

```
src/
├── dateFromUUIDv7.ts       # Main function
├── dateFromUUIDv7.test.ts  # Test suite
└── index.ts                # Export entry point

dist/
├── esm/                    # ES Modules build
└── cjs/                    # CommonJS build
```

## Testing

The library includes comprehensive tests covering:
- ✅ Input validation (non-strings, invalid formats)
- ✅ UUID version detection and error handling (V1-V6)
- ✅ Timestamp extraction accuracy
- ✅ Date object creation and methods
- ✅ Edge cases and error conditions

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and add tests
4. Run tests: `npm test`
5. Run linting: `npm run check`
6. Commit your changes: `git commit -m 'Add amazing feature'`
7. Push to the branch: `git push origin feature/amazing-feature`
8. Open a Pull Request

## Publishing

This project uses automated publishing via GitHub Actions:

1. Update version: `npm version patch|minor|major`
2. Push to main: `git push origin main`
3. GitHub Actions will automatically publish to NPM if tests pass

## License

MIT - see [LICENSE](LICENSE) file for details.

## Related

- [uuid](https://www.npmjs.com/package/uuid) - Generate UUIDs (including UUIDv7)
- [uuidv7](https://www.npmjs.com/package/uuidv7) - Generate UUIDv7 specifically
