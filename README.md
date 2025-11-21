# uuidv7-utilities

A lightweight TypeScript utility library for handling UUIDv7 strings and Buffers.

## Features

- **Extract date from UUIDv7** - `dateFromUUIDv7(uuid: string | Buffer): DateFromUUIDv7Result`
  - Supports both string and Buffer inputs
  - Returns JSON object `{ dateToIsoString: string, dateUnixEpoch: number, dateToUTCString: string } | undefined`

- **Find version number from UUID** - `uuidVersionValidation(uuid: string | Buffer): UUIDVersionTuple`
  - Supports both string and Buffer inputs  
  - Returns string `'v1' | 'v2' | 'v3' | 'v4' | 'v5' | 'v6' | 'v7' | 'v8' | 'NilUUID' | 'MaxUUID' | undefined`
  - Conforms to [RFC 9562 Universally Unique Identifiers (UUIDs)](https://www.rfc-editor.org/rfc/rfc9562.html)

- **Convert UUIDv7 to binary** - `UUIDv7toBinary(uuid: string | Buffer): string | undefined` _(New in v2.4.0)_
  - Converts UUIDv7 to 128-bit binary representation
  - Supports both string and Buffer inputs
  - Returns 128-character binary string or `undefined` for invalid/non-v7 UUIDs

- **Convert UUIDv7 to unsigned integer** - `UUIDv7toUnsignedInteger(uuid: string | Buffer): bigint | undefined` _(New in v2.5.0)_
  - Converts UUIDv7 to 128-bit unsigned integer (BigInt)
  - Supports both string and Buffer inputs
  - Returns JavaScript BigInt or `undefined` for invalid/non-v7 UUIDs
  - Useful for mathematical operations, database storage, and numerical comparisons

- **Wrap UUIDv7 with URN prefix** - `UUIDv7withURNWrapper(uuid: string | Buffer): string | undefined` _(New in v2.6.0)_
  - Wraps UUIDv7 with RFC 4122 compliant `urn:uuid:` prefix
  - Supports both string and Buffer inputs
  - Returns URN-formatted string (e.g., `urn:uuid:018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1`) or `undefined` for invalid/non-v7 UUIDs
  - Preserves original UUID case (uppercase, lowercase, or mixed)
  - Useful for semantic web, XML documents, and standards-compliant UUID references

- **Comprehensive Buffer Support** - All functions accept both string and Buffer inputs seamlessly

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

Using the `dateFromUUIDv7` function, you can extract the timestamp from the UUIDv7. It will return `undefined` if the UUID is not a valid UUID string. The `uuidVersionValidation` function will return the UUID version from 1 to 8, or the string `'NilUUID'` or `'MaxUUID'`, and `undefined` if the UUID is not a valid UUID string. The `UUIDv7toBinary` function converts a UUIDv7 to its 128-bit binary representation, useful for bit-level analysis or cryptographic applications. The `UUIDv7toUnsignedInteger` function converts a UUIDv7 to a 128-bit unsigned integer (BigInt), enabling mathematical operations and efficient numerical comparisons. The `UUIDv7withURNWrapper` function wraps a UUIDv7 with the RFC 4122 compliant `urn:uuid:` prefix, useful for semantic web applications and standards-compliant UUID references.

## Usage

### URN Wrapper (New in v2.6.0)

```typescript
import { UUIDv7withURNWrapper } from 'uuidv7-utilities';

const uuidString = '018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1';
const urnWrapped = UUIDv7withURNWrapper(uuidString);

if (urnWrapped) {
    console.log(urnWrapped);  // 'urn:uuid:018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1'
    
    // Use in semantic web applications
    const rdfTriple = `<${urnWrapped}> <http://xmlns.com/foaf/0.1/name> "Example Resource" .`;
    console.log(rdfTriple);
    
    // Use in XML documents
    const xmlReference = `<resource id="${urnWrapped}">...</resource>`;
    console.log(xmlReference);
}

// Also works with Buffer input
const uuidBuffer = Buffer.from([
  0x01, 0x8f, 0xd8, 0xf9, 0x8c, 0x00, 0x7a, 0x4c,
  0x8a, 0x47, 0x1a, 0x6d, 0x4b, 0x90, 0xf3, 0xa1
]);
const urnFromBuffer = UUIDv7withURNWrapper(uuidBuffer);
console.log(urnWrapped === urnFromBuffer);  // true

// Preserves original case
const upperUuid = '018FD8F9-8C00-7A4C-8A47-1A6D4B90F3A1';
console.log(UUIDv7withURNWrapper(upperUuid));  // 'urn:uuid:018FD8F9-8C00-7A4C-8A47-1A6D4B90F3A1'

// Returns undefined for non-UUIDv7
UUIDv7withURNWrapper('550e8400-e29b-41d4-a716-446655440000');  // undefined (UUIDv4)

// Use cases: Standards-compliant identifiers
const permanentIdentifier = UUIDv7withURNWrapper('018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1');
if (permanentIdentifier) {
    // RFC 4122 compliant URN format
    console.log(permanentIdentifier.startsWith('urn:uuid:'));  // true
}
```

### Unsigned Integer Conversion (New in v2.5.0)

```typescript
import { UUIDv7toUnsignedInteger } from 'uuidv7-utilities';

const uuidString = '018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1';
const unsignedInt = UUIDv7toUnsignedInteger(uuidString);

if (unsignedInt !== undefined) {
    console.log(unsignedInt);  // 2101867564823207501898133786717625249n
    console.log(typeof unsignedInt);  // 'bigint'
    
    // Mathematical comparisons
    const uuid2 = '018fd8f9-8c01-7a4c-8a47-1a6d4b90f3a2';
    const int2 = UUIDv7toUnsignedInteger(uuid2);
    if (int2 !== undefined) {
        console.log(unsignedInt < int2);  // true (first UUID is smaller)
    }
    
    // Convert back to hex for verification
    const hexString = unsignedInt.toString(16).padStart(32, '0');
    console.log(hexString);  // '018fd8f98c007a4c8a471a6d4b90f3a1'
}

// Also works with Buffer input
const uuidBuffer = Buffer.from([
  0x01, 0x8f, 0xd8, 0xf9, 0x8c, 0x00, 0x7a, 0x4c,
  0x8a, 0x47, 0x1a, 0x6d, 0x4b, 0x90, 0xf3, 0xa1
]);
const intFromBuffer = UUIDv7toUnsignedInteger(uuidBuffer);
console.log(unsignedInt === intFromBuffer);  // true

// Returns undefined for non-UUIDv7
UUIDv7toUnsignedInteger('550e8400-e29b-41d4-a716-446655440000');  // undefined (UUIDv4)

// Use cases: Database storage, sorting, comparisons
const uuids = [
    '018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1',
    '018fd8f9-8c01-7a4c-8a47-1a6d4b90f3a2',
    '018fd8f9-8bff-7a4c-8a47-1a6d4b90f3a0'
];

const sorted = uuids
    .map(uuid => ({ uuid, int: UUIDv7toUnsignedInteger(uuid) }))
    .filter(item => item.int !== undefined)
    .sort((a, b) => {
        if (a.int! < b.int!) return -1;
        if (a.int! > b.int!) return 1;
        return 0;
    })
    .map(item => item.uuid);

console.log(sorted);  // Sorted by numerical value
```

### Binary Conversion (New in v2.4.0)

```typescript
import { UUIDv7toBinary } from 'uuidv7-utilities';

const uuidString = '018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1';
const binary = UUIDv7toBinary(uuidString);

if (binary) {
    console.log(binary);  // '0000000110001111110110001111100110001100000000000111101001001100100010100100011100011010110101001011000011110011101000011010011100011011010100101111100100001111001110100001'
    console.log(binary.length);  // 128 (bits)
    
    // Extract version bits (bits 48-51)
    console.log(binary.substring(48, 52));  // '0111' (version 7)
    
    // Extract variant bits (bits 64-65)
    console.log(binary.substring(64, 66));  // '10' (RFC 4122 variant)
}

// Also works with Buffer input
const uuidBuffer = Buffer.from([
  0x01, 0x8f, 0xd8, 0xf9, 0x8c, 0x00, 0x7a, 0x4c,
  0x8a, 0x47, 0x1a, 0x6d, 0x4b, 0x90, 0xf3, 0xa1
]);
const binaryFromBuffer = UUIDv7toBinary(uuidBuffer);
console.log(binary === binaryFromBuffer);  // true

// Returns undefined for non-UUIDv7
UUIDv7toBinary('550e8400-e29b-41d4-a716-446655440000');  // undefined (UUIDv4)
```

### String UUIDs

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

### Buffer UUIDs

```typescript
import { dateFromUUIDv7, uuidVersionValidation } from 'uuidv7-utilities';

// UUID as Buffer (16 bytes)
const uuidBuffer = Buffer.from([
  0x01, 0x8f, 0xd8, 0xf9, 0x8c, 0x00, 0x7a, 0x4c, 
  0x8a, 0x47, 0x1a, 0x6d, 0x4b, 0x90, 0xf3, 0xa1
]);

const uuid = uuidVersionValidation(uuidBuffer);
if (uuid === 'v7') {
    const result = dateFromUUIDv7(uuidBuffer);
    if (result) {
        console.log(result.dateToIsoString);     // '2024-06-02T12:43:04.064Z'
        console.log(result.dateUnixEpoch);       // 1717332184064
        console.log(result.dateToUTCString);     // 'Sun, 02 Jun 2024 12:43:04 GMT'
    }
}
```

### Mixed Usage

```typescript
import { dateFromUUIDv7, uuidVersionValidation } from 'uuidv7-utilities';

// Both string and Buffer produce identical results
const uuidString = '018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1';
const uuidBuffer = Buffer.from([
  0x01, 0x8f, 0xd8, 0xf9, 0x8c, 0x00, 0x7a, 0x4c,
  0x8a, 0x47, 0x1a, 0x6d, 0x4b, 0x90, 0xf3, 0xa1
]);

const stringResult = dateFromUUIDv7(uuidString);
const bufferResult = dateFromUUIDv7(uuidBuffer);

// Results are identical
console.log(stringResult?.dateUnixEpoch === bufferResult?.dateUnixEpoch); // true
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

### CommonJS

**⚠️ DEPRECATED** - CommonJS support is deprecated and will be removed in a future version. Please migrate to ES modules.

```javascript
const { dateFromUUIDv7, uuidVersionValidation, UUIDv7toBinary, UUIDv7toUnsignedInteger, UUIDv7withURNWrapper } = require('uuidv7-utilities');

const uuidString = '018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1';
const uuid = uuidVersionValidation(uuidString);
if (uuid === 'v7') {
    const result = dateFromUUIDv7(uuidString);
    if (result) {
        console.log(result.dateToIsoString);     // '2024-06-02T12:43:04.064Z'
        console.log(result.dateUnixEpoch);       // 1717332184064
        console.log(result.dateToUTCString);     // 'Sun, 02 Jun 2024 12:43:04 GMT'
    }
    
    const binary = UUIDv7toBinary(uuidString);
    console.log(binary?.length);  // 128
    
    const unsignedInt = UUIDv7toUnsignedInteger(uuidString);
    console.log(typeof unsignedInt);  // 'bigint'
    
    const urnWrapped = UUIDv7withURNWrapper(uuidString);
    console.log(urnWrapped);  // 'urn:uuid:018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1'
}
```

**Migration to ES Modules:**
```typescript
// Before (CommonJS - deprecated)
const { dateFromUUIDv7 } = require('uuidv7-utilities');

// After (ES Modules - recommended)
import { dateFromUUIDv7 } from 'uuidv7-utilities';
```

## API

### `UUIDv7withURNWrapper(uuid: string | Buffer): string | undefined` _(New in v2.6.0)_

Wraps a UUIDv7 with the RFC 4122 compliant URN prefix `urn:uuid:`. This function validates the UUID and, if it's a valid UUIDv7, returns it in URN format for use in standards-compliant applications.

**Parameters:**
- `uuid` (string | Buffer): The UUIDv7 to wrap
  - **string**: Must be a valid UUIDv7 string format (e.g., '018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1')
  - **Buffer**: Must be exactly 16 bytes representing a UUIDv7

**Returns:**
- `string`: URN-formatted UUID string (e.g., 'urn:uuid:018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1')
  - Always starts with `urn:uuid:` prefix per RFC 4122
  - Preserves the original UUID case exactly (no normalization)
  - Includes the complete UUID with standard hyphenation
- `undefined`: If the UUID is not a valid UUIDv7, malformed, or a different UUID version

**Use Cases:**
- **Semantic Web & Linked Data**: Generate URN identifiers for RDF, OWL, and semantic web applications
- **XML Documents**: Proper URN format for UUID references in XML schemas and documents per RFC 4122
- **Standards Compliance**: Generate RFC 4122 compliant URN representations of UUIDs
- **Persistent Identifiers**: Create permanent, location-independent identifiers using the URN scheme
- **Interoperability**: Exchange UUIDs in standardized URN format across different systems
- **Database & API Integration**: Format UUIDs as URNs for systems requiring URN-style identifiers
- **Document Linking**: Reference resources using URN-formatted UUIDs in documentation and metadata

**Examples:**
```typescript
// String input
const urn = UUIDv7withURNWrapper('018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1');
console.log(urn);  // 'urn:uuid:018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1'

// Buffer input  
const buffer = Buffer.from([0x01, 0x8f, 0xd8, 0xf9, 0x8c, 0x00, 0x7a, 0x4c, 0x8a, 0x47, 0x1a, 0x6d, 0x4b, 0x90, 0xf3, 0xa1]);
UUIDv7withURNWrapper(buffer);  // Same URN string

// Case preservation
const lowerUuid = '018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1';
const upperUuid = '018FD8F9-8C00-7A4C-8A47-1A6D4B90F3A1';
console.log(UUIDv7withURNWrapper(lowerUuid));  // 'urn:uuid:018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1'
console.log(UUIDv7withURNWrapper(upperUuid));  // 'urn:uuid:018FD8F9-8C00-7A4C-8A47-1A6D4B90F3A1'

// Use in RDF/semantic web
const uuid = '018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1';
const urn = UUIDv7withURNWrapper(uuid);
if (urn) {
    const rdfTriple = `<${urn}> <http://xmlns.com/foaf/0.1/name> "Resource Name" .`;
    console.log(rdfTriple);
}

// Use in XML documents
const uuid2 = '018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1';
const urn2 = UUIDv7withURNWrapper(uuid2);
if (urn2) {
    const xmlElement = `<resource id="${urn2}">Content</resource>`;
    console.log(xmlElement);
}

// RFC 4122 compliance verification
const uuid3 = '018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1';
const urn3 = UUIDv7withURNWrapper(uuid3);
if (urn3) {
    console.log(urn3.startsWith('urn:uuid:'));  // true
    console.log(urn3.includes(uuid3));  // true
}

// Non-UUIDv7 returns undefined
UUIDv7withURNWrapper('550e8400-e29b-41d4-a716-446655440000');  // undefined (UUIDv4)
UUIDv7withURNWrapper('00000000-0000-0000-0000-000000000000');  // undefined (Nil UUID)
UUIDv7withURNWrapper('invalid-uuid');  // undefined
```

**RFC 4122 Compliance:**
- Follows RFC 4122 Section 3 specification for UUID URN namespace
- URN format: `urn:uuid:{UUID}` where UUID is in standard 8-4-4-4-12 format
- Only wraps valid UUIDv7 (version 7) UUIDs
- Preserves UUID case to maintain data fidelity

### `UUIDv7toUnsignedInteger(uuid: string | Buffer): bigint | undefined` _(New in v2.5.0)_

Converts a UUIDv7 to its 128-bit unsigned integer representation as a JavaScript BigInt. This function parses the UUID and returns a BigInt that represents the complete 128-bit value as an unsigned integer.

**Parameters:**
- `uuid` (string | Buffer): The UUIDv7 to convert
  - **string**: Must be a valid UUIDv7 string format (e.g., '018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1')
  - **Buffer**: Must be exactly 16 bytes representing a UUIDv7

**Returns:**
- `bigint`: 128-bit unsigned integer representation of the UUID
  - JavaScript BigInt type (requires Node.js >= 10.4.0 or modern browsers)
  - Preserves all 128 bits with no precision loss
  - Range: 0 to 340282366920938463463374607431768211455 (2^128 - 1)
  - Supports all standard BigInt operations (arithmetic, comparison, bitwise)
- `undefined`: If the UUID is not a valid UUIDv7, malformed, or a different UUID version

**Use Cases:**
- **Database Storage**: Store UUIDs as NUMERIC/DECIMAL types in databases supporting 128-bit integers
- **Mathematical Operations**: Perform arithmetic or bitwise operations on UUID values
- **Sorting & Comparison**: Direct numerical comparison without string parsing overhead
- **Cryptographic Applications**: Use integer representation for cryptographic operations
- **Binary Protocols**: Efficient transmission in binary-optimized protocols
- **Performance**: Faster comparisons using native integer operations vs string manipulation

**Examples:**
```typescript
// String input
const bigInt = UUIDv7toUnsignedInteger('018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1');
console.log(bigInt);  // 2101867564823207501898133786717625249n
console.log(typeof bigInt);  // 'bigint'

// Buffer input  
const buffer = Buffer.from([0x01, 0x8f, 0xd8, 0xf9, 0x8c, 0x00, 0x7a, 0x4c, 0x8a, 0x47, 0x1a, 0x6d, 0x4b, 0x90, 0xf3, 0xa1]);
UUIDv7toUnsignedInteger(buffer);  // Same BigInt value

// Mathematical comparisons
const int1 = UUIDv7toUnsignedInteger('018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1');
const int2 = UUIDv7toUnsignedInteger('018fd8f9-8c01-7a4c-8a47-1a6d4b90f3a2');
if (int1 !== undefined && int2 !== undefined) {
    console.log(int1 < int2);  // true
    console.log(int2 - int1);  // 281474976710657n (difference)
}

// Convert back to hex
if (bigInt !== undefined) {
    const hexString = bigInt.toString(16).padStart(32, '0');
    console.log(hexString);  // '018fd8f98c007a4c8a471a6d4b90f3a1'
}

// Sorting UUIDs numerically
const uuids = ['018fd8f9-8c01-...', '018fd8f9-8c00-...', '018fd8f9-8c02-...'];
const sorted = uuids
    .map(uuid => ({ uuid, int: UUIDv7toUnsignedInteger(uuid) }))
    .filter(item => item.int !== undefined)
    .sort((a, b) => {
        if (a.int! < b.int!) return -1;
        if (a.int! > b.int!) return 1;
        return 0;
    })
    .map(item => item.uuid);

// Non-UUIDv7 returns undefined
UUIDv7toUnsignedInteger('550e8400-e29b-41d4-a716-446655440000');  // undefined (UUIDv4)
UUIDv7toUnsignedInteger('invalid-uuid');  // undefined
```

**BigInt Support:**
- Requires JavaScript runtime with BigInt support
- Node.js >= 10.4.0
- All modern browsers (Chrome 67+, Firefox 68+, Safari 14+, Edge 79+)

### `UUIDv7toBinary(uuid: string | Buffer): string | undefined` _(New in v2.4.0)_

Converts a UUIDv7 to its 128-bit binary representation. This function returns a string of 128 characters containing only '0' and '1', representing the complete binary form of the UUID.

**Parameters:**
- `uuid` (string | Buffer): The UUIDv7 to convert
  - **string**: Must be a valid UUIDv7 string format (e.g., '018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1')
  - **Buffer**: Must be exactly 16 bytes representing a UUIDv7

**Returns:**
- `string`: 128-character binary string (e.g., '00000001100011111101100011111001...')
  - Contains only '0' and '1' characters
  - Always exactly 128 characters long for valid UUIDv7
  - Each hexadecimal character is converted to 4 binary digits
- `undefined`: If the UUID is not a valid UUIDv7, malformed, or a different UUID version

**Use Cases:**
- Bit-level UUID analysis and manipulation
- Cryptographic applications requiring binary representation
- Direct bit field extraction (version, variant, timestamp, etc.)
- Binary format storage or transmission
- Educational/debugging purposes to visualize UUID structure

**Examples:**
```typescript
// String input
const binary = UUIDv7toBinary('018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1');
console.log(binary?.length);  // 128

// Buffer input  
const buffer = Buffer.from([0x01, 0x8f, 0xd8, 0xf9, 0x8c, 0x00, 0x7a, 0x4c, 0x8a, 0x47, 0x1a, 0x6d, 0x4b, 0x90, 0xf3, 0xa1]);
UUIDv7toBinary(buffer);  // Same 128-bit binary string

// Extract specific bit fields
const binaryStr = UUIDv7toBinary('018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1');
if (binaryStr) {
    const versionBits = binaryStr.substring(48, 52);  // '0111' = version 7
    const variantBits = binaryStr.substring(64, 66);  // '10' = RFC 4122
}

// Non-UUIDv7 returns undefined
UUIDv7toBinary('550e8400-e29b-41d4-a716-446655440000');  // undefined (UUIDv4)
UUIDv7toBinary('invalid-uuid');  // undefined
```

### `dateFromUUIDv7(uuid: string | Buffer): DateFromUUIDv7Result`

Extracts date information from a UUIDv7 string or Buffer. UUIDv7 embeds a timestamp in the first 48 bits (6 bytes) representing milliseconds since Unix epoch.

**Parameters:**
- `uuid` (string | Buffer): The UUID to convert
  - **string**: Must be a valid UUIDv7 string format (e.g., '018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1')
  - **Buffer**: Must be exactly 16 bytes representing a UUID

**Returns:**
- `DateFromUUIDv7Result`: Object with extracted date information
    - `dateToIsoString`: ISO 8601 formatted date string (e.g., '2024-06-02T12:43:04.064Z')
    - `dateUnixEpoch`: Unix timestamp in milliseconds (e.g., 1717332184064)
    - `dateToUTCString`: UTC date string (e.g., 'Sun, 02 Jun 2024 12:43:04 GMT')
- `undefined`: If the UUID is not a valid UUIDv7 or malformed

### `uuidVersionValidation(uuid: string | Buffer): UUIDVersionTuple`

Returns the UUID version, from 1 to 8, or the string `'NilUUID'` or `'MaxUUID'`, and `undefined` if the UUID is not a valid UUID format.

**Parameters:**
- `uuid` (string | Buffer): The UUID to validate
  - **string**: UUID string in standard format (e.g., '018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1')
  - **Buffer**: 16-byte Buffer representing a UUID

**Returns:**
- `UUIDVersionTuple`: The UUID version identifier
  - `'v1'` through `'v8'`: Standard UUID versions
  - `'NilUUID'`: For the all-zeros UUID (00000000-0000-0000-0000-000000000000)
  - `'MaxUUID'`: For the all-ones UUID (ffffffff-ffff-ffff-ffff-ffffffffffff)
- `undefined`: If the UUID is not a valid UUID format

**Examples:**
```typescript
// String input
uuidVersionValidation('018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1'); // 'v7'

// Buffer input  
const buffer = Buffer.from([0x01, 0x8f, 0xd8, 0xf9, /* ... */]);
uuidVersionValidation(buffer); // 'v7'

// Invalid input
uuidVersionValidation('invalid-uuid'); // undefined
```

## Buffer Support

**As of version 2.3.0**, all functions support both string and Buffer inputs.
**As of version 2.4.0**, the new `UUIDv7toBinary` function also supports both input types.
**As of version 2.5.0**, the new `UUIDv7toUnsignedInteger` function also supports both input types.
**As of version 2.6.0**, the new `UUIDv7withURNWrapper` function also supports both input types.

### Why Buffer Support?
- **Database Compatibility**: Many databases store UUIDs as binary data (16 bytes)
- **Performance**: Avoids string conversion overhead when working with binary UUID data
- **Memory Efficiency**: Buffers use less memory than string representations
- **API Compatibility**: Seamless integration with existing Buffer-based UUID workflows

### Buffer Requirements
- Must be exactly **16 bytes** long
- Contains the raw UUID bytes in standard network byte order
- Invalid or malformed Buffers return `undefined` gracefully

### Buffer Conversion
The library automatically converts Buffers to string format internally:
- Converts 16-byte Buffer to standard UUID string format
- Handles all UUID versions and special cases (Nil, Max UUIDs)
- Maintains identical results for equivalent string and Buffer inputs

```typescript
// These produce identical results
const uuidString = '018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1';
const uuidBuffer = Buffer.from([0x01, 0x8f, 0xd8, 0xf9, 0x8c, 0x00, 0x7a, 0x4c, 0x8a, 0x47, 0x1a, 0x6d, 0x4b, 0x90, 0xf3, 0xa1]);

dateFromUUIDv7(uuidString);  // Same result
dateFromUUIDv7(uuidBuffer);  // Same result
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

MIT
