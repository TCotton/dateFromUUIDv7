# uuidv7-utilities

A lightweight TypeScript utility library for handling UUIDv7 strings.

## Features

- Extract date from UUIDv7 string - `dateFromUUIDv7(uuid: unknown): DateFromUUIDv7Result | null`
- returns JSON object `{ dateToIsoString: string, dateUTCTime: number } | null`

## Installation

```bash
npm install uuidv7-utilities
```

## Requirements

- Node.js >= 18.0.0
- Testing on Node versions 18, 20 and 22

## Why you should use UUIDv7

When using a UUID for the primary key of a SQL database tables, for performance reasons, you should use UUIDv7 instead of UUIDv4. UUIDv7 embeds a timestamp in the first 48 bits (6 bytes) representing milliseconds since Unix epoch. 

However, beware that node `crypto.randomUUID()` and the PostgresQL `gen_random_uuid()` return a UUIDv4.

From PostgreSQL 18, use the `uuidv7()` function instead of `gen_random_uuid()` to generate a UUID for a primary key, ex: `user_id       UUID PRIMARY KEY     DEFAULT uuidv7()`

Using this function, you can extact the timestamp from the UUIDv7. It will error if UUID versions under 7 are used, with clear error messages.

## Usage

```typescript
import { dateFromUUIDv7 } from 'uuidv7-utilities';

// Extract date from a UUIDv7
const uuid = '018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1';
const result = dateFromUUIDv7(uuid);

if (result) {
  console.log(result.dateToIsoString); // "2024-06-02T12:43:04.064Z"
  console.log(result.dateUTCTime); // 1717332184064
}
```

### CommonJS

```javascript
const { dateFromUUIDv7 } = require('uuidv7-utilities');

const uuid = '018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1';
const result = dateFromUUIDv7(uuid);

if (result) {
  console.log(result.dateToIsoString);
  console.log(result.dateUTCTime);
}
```

## API

### `dateFromUUIDv7(uuid: unknown): DateFromUUIDv7Result | null`

Extracts date information from a UUIDv7 string. UUIDv7 embeds a timestamp in the first 48 bits (6 bytes) representing milliseconds since Unix epoch.

**Parameters:**
- `uuid` (unknown): The UUID to convert (only string values are processed)

**Returns:**
- `DateFromUUIDv7Result`: Object with extracted date information
  - `dateToIsoString`: ISO 8601 formatted date string
  - `dateUTCTime`: UTC timestamp in milliseconds
- `null`: If the input is not a valid UUID string

**Throws:**
- `Error`: If the UUID format is invalid or is not a valid UUIDv7. If the UUID is v1 to v6 it will throw an error with the UUID version inputted.

## About UUIDv7

UUIDv7 is a time-ordered UUID format that includes a timestamp in the first 48 bits. This library extracts that timestamp and converts it to a JavaScript Date object.
You can read more about UUIDv7 here: [UUIDv7: The Fast, Unique, Ordered Identifier Every Scalable System Needs](https://medium.com/@zahrazolfaghari00/uuidv7-the-fast-unique-ordered-identifier-every-scalable-system-needs-999e57eb0104).

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
