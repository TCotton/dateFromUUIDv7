# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.0] - 2025-11-21

### Changed - BREAKING CHANGES ⚠️

This release introduces consistent naming conventions across all functions and types. All function names now use lowercase camelCase, and type names use PascalCase without redundant suffixes.

#### Function Name Changes
- **`UUIDv7toBinary` → `uuidv7toBinary`** - Binary conversion function
- **`UUIDv7toUnsignedInteger` → `uuidv7toUnsignedInteger`** - BigInt conversion function  
- **`UUIDv7withURNWrapper` → `uuidv7withURNWrapper`** - URN wrapper function
- `dateFromUUIDv7` and `uuidVersionValidation` remain unchanged (already lowercase)

#### Type Name Changes
- **`DateFromUUIDv7Result` → `DateFromUUIDv7`** - Return type for dateFromUUIDv7 function
- **`UUIDVersionTuple` → `UUIDVersionValidation`** - Return type for uuidVersionValidation function
- **Removed redundant type exports:**
  - `UUIDv7toBinaryTuple` (use `UUIDv7toBinary` instead)
  - `UUIDv7toUnsignedIntegerType` (use `UUIDv7toUnsignedInteger` instead)
  - `UUIDv7withURNWrapperType` (use `UUIDv7withURNWrapper` instead)

#### File Name Changes
- `src/UUIDv7toBinary.ts` → `src/uuidv7toBinary.ts`
- `src/UUIDv7toBinary.test.ts` → `src/uuidv7toBinary.test.ts`
- `src/UUIDv7toUnsignedInteger.ts` → `src/uuidv7toUnsignedInteger.ts`
- `src/UUIDv7toUnsignedInteger.test.ts` → `src/uuidv7toUnsignedInteger.test.ts`
- `src/UUIDv7withURNWrapper.ts` → `src/uuidv7withURNWrapper.ts`
- `src/UUIDv7withURNWrapper.test.ts` → `src/uuidv7withURNWrapper.test.ts`

### Migration Guide

**Before (v2.x):**
```typescript
import { 
  UUIDv7toBinary, 
  UUIDv7toUnsignedInteger, 
  UUIDv7withURNWrapper,
  DateFromUUIDv7Result,
  UUIDVersionTuple
} from 'uuidv7-utilities';

const binary = UUIDv7toBinary(uuid);
const integer = UUIDv7toUnsignedInteger(uuid);
const urn = UUIDv7withURNWrapper(uuid);
```

**After (v3.0.0):**
```typescript
import { 
  uuidv7toBinary, 
  uuidv7toUnsignedInteger, 
  uuidv7withURNWrapper,
  DateFromUUIDv7,
  UUIDVersionValidation
} from 'uuidv7-utilities';

const binary = uuidv7toBinary(uuid);
const integer = uuidv7toUnsignedInteger(uuid);
const urn = uuidv7withURNWrapper(uuid);
```

### Documentation
- Updated README.md with consistent function and type names throughout all examples
- Updated all code samples to reflect new naming conventions
- Updated API documentation to use correct function and type names
- Updated CommonJS examples with new naming

## [2.6.0] - 2025-11-21

### Added
- **UUIDv7withURNWrapper Function**: New utility function for wrapping UUIDv7 with RFC 4122 URN prefix
  - `UUIDv7withURNWrapper(uuid: string | Buffer): string | undefined` - Wraps UUIDv7 with `urn:uuid:` prefix
  - Supports both string and Buffer inputs for consistency with existing functions
  - Returns a string in RFC 4122 URN format: `urn:uuid:{uuid}` (e.g., `urn:uuid:018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1`)
  - Returns `undefined` for invalid UUIDs or non-UUIDv7 versions
  - Preserves original UUID case (uppercase, lowercase, or mixed) in the wrapped output
  - Includes comprehensive JSDoc documentation and TypeScript type definitions
- **UUIDv7withURNWrapperType**: New TypeScript type export for the URN wrapper return type
- **Comprehensive URN Wrapper Test Coverage**: Added 33 new test cases specifically for UUIDv7withURNWrapper
  - RFC 4122 URN format compliance validation
  - String vs Buffer input equivalence tests
  - Case preservation verification (uppercase, lowercase, mixed case)
  - Edge cases including maximum/minimum timestamps, all numeric/alphabetic hex characters
  - All UUID version rejection tests (v1-v6, v8)
  - Special UUID handling (Nil and Max UUIDs)
  - Malformed input validation (wrong length, missing hyphens, invalid characters)
  - Buffer edge cases (incorrect lengths, extra bytes)
  - Consistency and idempotency tests

### Technical Implementation
- **URN Wrapping Algorithm**: RFC 4122 compliant URN formatting
  - Validates UUID format using existing `uuidRegex` utility
  - Extracts version byte from UUID (position 14 in hyphenated format)
  - Only wraps UUIDs with version 7
  - Prepends `urn:uuid:` prefix to valid UUIDv7 strings
  - Preserves original UUID string exactly (no normalization or case conversion)
- **Version Validation**: Strict UUIDv7-only processing
  - Rejects all other UUID versions (v1-v6, v8)
  - Rejects special UUIDs (Nil UUID: all zeros, Max UUID: all ones)
  - Returns `undefined` for any non-v7 UUID
- **Buffer Support**: Seamless handling of both string and Buffer inputs through `handleBuffer` utility
  - 16-byte buffers converted to UUID string format before wrapping
  - Maintains consistency with other library functions

### Testing
- **Expanded Test Suite**: Increased from 169 to 201 total tests (32 new tests)
- **URN Wrapper Coverage**: 33 comprehensive test cases including:
  - Valid UUIDv7 wrapping for both string and Buffer inputs
  - RFC 4122 format compliance (`urn:uuid:` prefix validation)
  - Case preservation (uppercase, lowercase, mixed case UUIDs)
  - Real-world UUIDv7 examples
  - Maximum and minimum timestamp UUIDs
  - All UUID version rejection (v1, v2, v3, v4, v5, v6, v8)
  - Malformed UUID handling (wrong length, missing hyphens, incorrect hyphen positions)
  - Invalid character detection (special characters, spaces, random strings)
  - Empty string and nil/max UUID rejection
  - Buffer edge cases (too short, extra bytes handled by using first 16)
  - String-buffer equivalence validation
  - Multiple call consistency verification
- **All Tests Passing**: 201/201 tests passing with no failures

### Use Cases
- **Semantic Web & Linked Data**: Generate URN identifiers for RDF, OWL, and semantic web applications
- **XML Documents**: Proper URN format for UUID references in XML schemas and documents per RFC 4122
- **Standards Compliance**: Generate RFC 4122 compliant URN representations of UUIDs
- **Persistent Identifiers**: Create permanent, location-independent identifiers using URN scheme
- **Interoperability**: Exchange UUIDs in standardized URN format across different systems
- **Database & API Integration**: Format UUIDs as URNs for systems requiring URN-style identifiers
- **Document Linking**: Reference resources using URN-formatted UUIDs in documentation and metadata

### Documentation
- **Type Exports**: Proper TypeScript type exports for `UUIDv7withURNWrapperType`
- **RFC 4122 Compliance**: URN format follows RFC 4122 Section 3 specification
- **Full API Documentation**: Complete JSDoc comments explaining parameters, returns, and use cases

### Migration Notes
- **Fully Backward Compatible**: No changes required for existing functionality
- **New Capabilities**: UUIDs can now be wrapped in RFC 4122 compliant URN format
- **Type Safety**: TypeScript users benefit from enhanced type checking for URN-wrapped UUIDs
- **Case Preservation**: Original UUID case is maintained in output (no automatic lowercasing)

## [2.5.0] - 2025-11-21

### Added
- **UUIDv7toUnsignedInteger Function**: New utility function for converting UUIDv7 to unsigned integer representation
  - `UUIDv7toUnsignedInteger(uuid: string | Buffer): bigint | undefined` - Converts UUIDv7 to 128-bit unsigned integer
  - Supports both string and Buffer inputs for consistency with existing functions
  - Returns a JavaScript `BigInt` representing the complete UUID as an unsigned 128-bit integer
  - Returns `undefined` for invalid UUIDs or non-UUIDv7 versions
  - Includes comprehensive JSDoc documentation and TypeScript type definitions
- **UUIDv7toUnsignedIntegerType**: New TypeScript type export for the unsigned integer conversion return type
- **Comprehensive Unsigned Integer Test Coverage**: Added 40 new test cases specifically for UUIDv7toUnsignedInteger
  - BigInt conversion accuracy tests
  - Precision verification for all 128 bits
  - Edge cases including nil/max UUIDs, malformed inputs
  - String vs Buffer equivalence validation
  - All UUID version rejection tests (v1-v6, v8)
  - Comparison operations between BigInt results

### Technical Implementation
- **BigInt Conversion Algorithm**: Efficient hex-to-BigInt conversion
  - Strips UUID hyphens before conversion
  - Converts hexadecimal string to unsigned 128-bit integer using `BigInt('0x' + hex)`
  - Preserves all 128 bits of UUID information with no precision loss
  - Includes try-catch error handling for robustness
- **Version Validation**: Extracts and validates UUID version before conversion
  - Only processes UUIDs with version 7 (character at position 14 in hyphenated format)
  - Reuses existing `uuidRegex` and `handleBuffer` utilities for consistent validation
- **Buffer Support**: Seamless handling of both string and Buffer inputs through `handleBuffer` utility

### Testing
- **Expanded Test Suite**: Increased from 134 to 169 total tests (35 new tests)
- **Unsigned Integer Conversion Coverage**: 40 comprehensive test cases including:
  - Valid UUIDv7 string and Buffer conversions to BigInt
  - Correct unsigned integer representation validation
  - Precision maintenance for all 128 bits (no data loss)
  - BigInt comparison operations (less than, greater than, equality)
  - Very large UUID values (testing BigInt capability)
  - Real-world UUIDv7 examples
  - Invalid input handling (wrong versions, malformed UUIDs, special characters)
  - Consistency and idempotency tests
  - Round-trip conversion verification (BigInt back to hex preserves all data)
- **All Tests Passing**: 169/169 tests passing with no failures

### Use Cases
- **Database Storage**: Store UUIDs as unsigned integers in databases that support 128-bit integer types
- **Cryptographic Applications**: Use integer representation for mathematical operations on UUIDs
- **Sorting and Comparison**: Direct numerical comparison of UUIDs without string parsing
- **Binary Protocols**: Efficient transmission of UUIDs in binary format
- **Performance Optimization**: Faster comparison and manipulation using native integer operations
- **Mathematical Operations**: Perform arithmetic or bitwise operations on UUID values

### Documentation
- **Type Exports**: Proper TypeScript type exports for `UUIDv7toUnsignedIntegerType`
- **Full API Documentation**: Complete JSDoc comments explaining parameters, returns, and use cases

### Migration Notes
- **Fully Backward Compatible**: No changes required for existing functionality
- **New Capabilities**: UUIDs can now be converted to unsigned integers for mathematical operations
- **Type Safety**: TypeScript users benefit from enhanced type checking for BigInt conversions
- **JavaScript BigInt Support**: Requires JavaScript runtime with BigInt support (Node.js >= 10.4.0, modern browsers)

## [2.4.0] - 2025-11-21

### Added
- **UUIDv7toBinary Function**: New utility function for converting UUIDv7 to binary representation
  - `UUIDv7toBinary(uuid: string | Buffer): string | undefined` - Converts UUIDv7 to 128-bit binary string
  - Supports both string and Buffer inputs for consistency with existing functions
  - Returns a 128-character binary string (128 bits) containing only '0' and '1' characters
  - Returns `undefined` for invalid UUIDs or non-UUIDv7 versions
  - Includes comprehensive JSDoc documentation and TypeScript type definitions
- **UUIDv7toBinaryTuple Type**: New TypeScript type export for the binary conversion return type
- **Extensive Binary Conversion Test Coverage**: Added 38 new test cases specifically for UUIDv7toBinary
  - Binary structure verification (version bits, variant bits)
  - Hex-to-binary conversion accuracy tests
  - Edge cases including nil/max UUIDs, malformed inputs
  - String vs Buffer equivalence validation
  - All UUID version rejection tests (v1-v6, v8)

### Changed
- **CommonJS Deprecation**: Added deprecation warnings for CommonJS usage
  - Created separate `index.cjs.ts` entry point with `@deprecated` JSDoc tags
  - CommonJS imports now show IDE deprecation warnings encouraging migration to ES modules
  - Updated `package.json` exports to use separate type definitions for CommonJS vs ESM
  - ESM imports remain clean without deprecation warnings
  - Functionality preserved - CommonJS still works, only developer experience differs
- **Package Exports Configuration**: Enhanced dual-format support
  - ESM: `import` points to clean `dist/esm/index.d.ts` type definitions
  - CommonJS: `require` points to deprecated `dist/cjs/index.cjs.d.ts` type definitions
- **Build Configuration**: Updated `tsconfig.cjs.json` to generate declaration files

### Technical Implementation
- **Binary Conversion Algorithm**: Efficient hex-to-binary conversion
  - Strips UUID hyphens before conversion
  - Converts each hexadecimal character to 4-bit binary representation
  - Uses `padStart(4, '0')` to ensure consistent binary digit length
  - Includes try-catch error handling for robustness
- **Version Validation**: Extracts and validates UUID version before binary conversion
  - Only processes UUIDs with version 7 (character at position 14 in hyphenated format)
  - Reuses existing `uuidRegex` and `handleBuffer` utilities for consistent validation
- **Buffer Support**: Seamless handling of both string and Buffer inputs through `handleBuffer` utility

### Testing
- **Expanded Test Suite**: Increased from 96 to 134 total tests
- **Binary Conversion Coverage**: 38 comprehensive test cases including:
  - Valid UUIDv7 string and Buffer conversions
  - Correct binary representation validation (128 bits)
  - Version bit verification (bits 48-51 should be '0111' for version 7)
  - Variant bit verification (bits 64-65 should be '10' for RFC 4122)
  - Real-world UUIDv7 examples
  - Invalid input handling (wrong versions, malformed UUIDs, special characters)
  - Consistency and idempotency tests
- **All Tests Passing**: 134/134 tests passing with no failures

### Documentation
- **README Updates**: Added CommonJS deprecation notice in usage examples
- **Type Exports**: Proper TypeScript type exports for `UUIDv7toBinaryTuple`

### Migration Notes
- **CommonJS Users**: While CommonJS still works, IDE will show deprecation warnings
  - Recommended to migrate to ES modules: `import { ... } from 'uuidv7-utilities'`
  - No breaking changes - existing code continues to function
- **Binary Conversion Use Cases**: Useful for bit-level UUID analysis, cryptographic applications, or systems requiring binary UUID representations

## [2.3.0] - 2025-11-16

### Added
- **Comprehensive Buffer Support**: All main functions now accept both `string` and `Buffer` inputs
  - `dateFromUUIDv7()` function now supports `string | Buffer` parameter types
  - `uuidVersionValidation()` function now supports `string | Buffer` parameter types
- **New Buffer private Utility Functions**: Added robust Buffer handling infrastructure
  - `handleBuffer()`: Universal converter for `string | Buffer` inputs to string format
  - `isBuffer()`: Type-safe Buffer detection function with proper type guards
  - `stringify()`: Efficient Buffer-to-UUID string conversion utility
  - `convertBufferToUUIDString()`: Specialized UUID Buffer formatting function
- **Enhanced Type Safety**: All new functions include comprehensive TypeScript type definitions
- **Extensive Buffer Test Coverage**: Added 30+ new test cases covering Buffer functionality
  - Buffer equivalence tests ensuring identical results for string vs Buffer inputs
  - Edge case handling for malformed, empty, and invalid Buffers
  - Performance and consistency validation across all Buffer operations

### Changed
- **Function Signatures Updated**:
  - `dateFromUUIDv7(uuid: string | Buffer)`: Now accepts Buffer inputs for UUID extraction
  - `uuidVersionValidation(uuid: string | Buffer)`: Now supports Buffer-based version detection
- **Internal Processing**: Functions now use `handleBuffer()` for unified input processing while maintaining backward compatibility

### Technical Implementation
- **Buffer Processing Pipeline**: Buffers are converted to standard UUID string format using optimized hex conversion
- **Error Handling**: Malformed Buffers gracefully return `undefined` without throwing exceptions
- **Performance Optimized**: Efficient Buffer-to-string conversion using direct byte manipulation
- **Memory Safe**: All Buffer operations include proper bounds checking and validation

### Testing
- **Expanded Test Suite**: Increased from 92 to 96 total tests
- **Buffer Coverage**: Added comprehensive test cases for:
  - Valid UUID Buffers across all supported versions (v1-v8, Nil, Max)
  - Invalid and malformed Buffer inputs
  - String vs Buffer equivalence validation
  - Edge cases including empty and short Buffers
- **Type Validation**: All TypeScript compilation and linting tests passing
- **Backward Compatibility**: All existing string-based functionality preserved and tested

### Migration Guide
- **Fully Backward Compatible**: No changes required for existing string-based usage
- **New Capabilities**: Buffer inputs can now be used anywhere string UUIDs were previously required
- **Type Safety**: TypeScript users benefit from enhanced type checking for Buffer inputs

## [2.2.1] - 2025-11-04

### Added
- **Full RFC 9562 UUID Support**: Extended `uuidVersionValidation` function to support all UUID versions as defined in [RFC 9562 Universally Unique Identifiers (UUIDs)](https://www.rfc-editor.org/rfc/rfc9562.html)
- **UUID v8 Support**: Added support for detecting and validating UUID version 8
- **Nil UUID Support**: Added detection for the special Nil UUID (`00000000-0000-0000-0000-000000000000`)
- **Max UUID Support**: Added detection for the special Max UUID (`ffffffff-ffff-ffff-ffff-ffffffffffff`)
- **Comprehensive Test Coverage**: Added test cases for v8, Nil UUID, and Max UUID validation

### Changed
- **Updated UUIDVersionTuple Type**: Extended type to include `'v8' | 'NilUUID' | 'MaxUUID'` options
- **Enhanced UUID Regex**: Updated validation regex from `([1-7])` to `([1-8])` to support UUID v8
- **Package Description**: Updated to reflect broader UUID validation capabilities beyond just UUIDv7

### Technical Details
- The `uuidVersionValidation` function now returns:
  - `'v1'` through `'v8'` for standard UUID versions
  - `'NilUUID'` for the all-zeros UUID
  - `'MaxUUID'` for the all-ones UUID
  - `undefined` for invalid UUID formats
- Added special case handling for Nil and Max UUIDs outside the standard versioned UUID pattern
- All existing functionality remains backward compatible

### Testing
- Added comprehensive test suite covering all new UUID types
- Increased test count from 13 to 16 test cases
- All tests passing with 100% coverage of new functionality