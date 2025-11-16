# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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