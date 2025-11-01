# dateFromUUIDv7

A lightweight TypeScript utility library for extracting dates from UUIDv7 strings.

## Installation

```bash
npm install datefromuuidv7
```

## Requirements

- Node.js >= 20.0.0

## Usage

```typescript
import { dateFromUUIDv7 } from 'datefromuuidv7';

// Extract date from a UUIDv7
const uuid = '018cc251-f400-7000-8000-000000000000';
const date = dateFromUUIDv7(uuid);

console.log(date.toISOString()); // 2024-01-01T00:00:00.000Z
console.log(date.getTime()); // 1704067200000
```

### CommonJS

```javascript
const { dateFromUUIDv7 } = require('datefromuuidv7');

const uuid = '018cc251-f400-7000-8000-000000000000';
const date = dateFromUUIDv7(uuid);

console.log(date.toISOString());
```

## API

### `dateFromUUIDv7(uuid: string): Date`

Extracts a Date object from a UUIDv7 string. UUIDv7 embeds a timestamp in the first 48 bits (6 bytes) representing milliseconds since Unix epoch.

**Parameters:**
- `uuid` (string): The UUIDv7 string to convert

**Returns:**
- `Date`: Date object extracted from the UUID

**Throws:**
- `Error`: If the UUID format is invalid or is not a valid UUIDv7

## About UUIDv7

UUIDv7 is a time-ordered UUID format that includes a timestamp in the first 48 bits. This library extracts that timestamp and converts it to a JavaScript Date object.

## Development

This project uses:
- **TypeScript** for type-safe code
- **Biome** for linting and formatting
- **Node.js test runner** for testing

### Scripts

```bash
# Build the project
npm run build

# Run tests
npm test

# Format and lint code
npm run check

# Format code only
npm run format

# Lint code only
npm run lint
```

## License

ISC
