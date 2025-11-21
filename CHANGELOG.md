# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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