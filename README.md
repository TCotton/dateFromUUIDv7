# uuidv7-utilities

A lightweight TypeScript utility library for handling UUIDv7 strings.

## Features

- Extract date from UUIDv7 string - `dateFromUUIDv7(uuid: string): DateFromUUIDv7Result`
- returns JSON object `{ dateToIsoString: string, dateUnixEpoch: number, dateToUTCString: string } | undefined`

- Find version number from UUID string - `uuidVersionValidation(uuid: string, versionNumber?: number): UUIDVersionTuple`
- returns string `'v1' | 'v2' | 'v3' | 'v4' | 'v5' | 'v6' | 'v7' |  'v8' | 'NilUUID' | 'MaxUUID' | undefined` when called without the optional parameter
- returns boolean `true | false` when called with the optional `versionNumber` parameter to check for a specific version
- this conforms to [RFC 9562 Universally Unique Identifiers (UUIDs)](https://www.rfc-editor.org/rfc/rfc9562.html)

## Installation

```bash
npm install uuidv7-utilities
```

## Requirements

- Node.js >= 18.0.0
- Testing on Node versions 18, 20 and 22

## Why you should use UUIDv7

When using a UUID for the primary key of a SQL database tables, for performance reasons, you should use UUIDv7 instead of UUIDv4. UUIDv7 embeds a timestamp in the first 48 bits (6 bytes) representing milliseconds since Unix epoch. 

However, beware - node `crypto.randomUUID()` and the PostgresQL `gen_random_uuid()` return a UUIDv4.

From PostgreSQL 18, use the `uuidv7()` function instead of `gen_random_uuid()` to generate a UUID for a primary key, ex: `user_id       UUID PRIMARY KEY     DEFAULT uuidv7()`

A UUID v7 creation NPM library is [uuidv7](https://www.npmjs.com/package/uuidv7) by [LiosK](https://github.com/LiosK).

Using the `dateFromUUIDv7` function, you can extract the timestamp from the UUIDv7. It will return `undefined` if the UUID is not a valid UUID string. The `uuidVersionValidation` function will return the UUID version from 1 to 8, or the string `'NilUUID'` or `'MaxUUID'`, and `undefined` if the UUID is not a valid UUID string.

## Usage

```typescript
import { dateFromUUIDv7, uuidVersionValidation } from 'uuidv7-utilities';

const uuidString = '018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1';
const uuid = uuidVersionValidation(uuidString);
if (uuid === 'v7') {
    const result = dateFromUUIDv7(uuidString);
    if (result) {
        console.log(result.dateToIsoString);     // '2024-06-02T12:43:04.064Z'
        console.log(result.dateUnixEpoch);       // 1717332184064
        console.log(result.dateToUTCString);     // 'Sun, 02 Jun 2024 12:43:04 GMT'
    }
}
```
or

```typescript
import { dateFromUUIDv7, uuidVersionValidation } from 'uuidv7-utilities';

const uuidString = '018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1';
const uuid = uuidVersionValidation(uuidString);
console.log(uuid);  // 'v7'
const result = dateFromUUIDv7(uuidString);
if (result) {
    console.log(result.dateToIsoString);     // '2024-06-02T12:43:04.064Z'
    console.log(result.dateUnixEpoch);       // 1717332184064
    console.log(result.dateToUTCString);     // 'Sun, 02 Jun 2024 12:43:04 GMT'
}
```
You can also pass an optional `versionNumber` parameter to `uuidVersionValidation` to check for a specific version.

```typescript
import { uuidVersionValidation } from 'uuidv7-utilities';

const uuidString = '018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1';
const uuid = uuidVersionValidation(uuidString, 7);
console.log(uuid);  // true
```

### CommonJS

```javascript
const { dateFromUUIDv7, uuidVersionValidation } = require('uuidv7-utilities');

const uuidString = '018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1';

// Check if it's a version 7 UUID using boolean return
if (uuidVersionValidation(uuidString, 7)) {
    const result = dateFromUUIDv7(uuidString);
    if (result) {
        console.log(result.dateToIsoString);     // '2024-06-02T12:43:04.064Z'
        console.log(result.dateUnixEpoch);       // 1717332184064
        console.log(result.dateToUTCString);     // 'Sun, 02 Jun 2024 12:43:04 GMT'
    }
}
```

## API

### `dateFromUUIDv7(uuid: string): DateFromUUIDv7Result`

Extracts date information from a UUIDv7 string. UUIDv7 embeds a timestamp in the first 48 bits (6 bytes) representing milliseconds since Unix epoch.

**Parameters:**
- `uuid` (string): The UUID to convert (must be a valid UUIDv7 string)

**Returns:**
- `DateFromUUIDv7Result`: Object with extracted date information
    - `dateToIsoString`: ISO 8601 formatted date string (e.g., '2024-06-02T12:43:04.064Z')
    - `dateUnixEpoch`: Unix timestamp in milliseconds (e.g., 1717332184064)
    - `dateToUTCString`: UTC date string (e.g., 'Sun, 02 Jun 2024 12:43:04 GMT')
- `undefined`: If the UUID is not a valid UUID string

### `uuidVersionValidation(uuid: string, versionNumber?: number): UUIDVersionTuple`

Returns the UUID version, from 1 to 8, or the string `'NilUUID'` or `'MaxUUID'`, and `undefined` if the UUID is not a valid UUID string. When the optional `versionNumber` parameter is provided, returns a boolean indicating whether the UUID matches the specified version.

**Parameters:**
- `uuid` (string): The UUID to validate
- `versionNumber` (number, optional): Specific version number (1-8) to check against

**Returns:**
- When called without `versionNumber`:
  - `string`: The UUID version number, ex: `'v7'`, `'NilUUID'`, `'MaxUUID'`
  - `undefined`: If the UUID is not a valid UUID string
- When called with `versionNumber`:
  - `boolean`: `true` if the UUID matches the specified version, `false` otherwise
  - `string`: `'NilUUID'` or `'MaxUUID'` for special UUIDs (regardless of versionNumber)
  - `undefined`: If the UUID is not a valid UUID string

**Examples:**
```typescript
// Get version string
uuidVersionValidation('018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1')  // Returns 'v7'

// Check for specific version
uuidVersionValidation('018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1', 7)  // Returns true
uuidVersionValidation('018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1', 4)  // Returns false

// Special UUIDs
uuidVersionValidation('00000000-0000-0000-0000-000000000000')     // Returns 'NilUUID'
```

## About UUIDv7

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
