# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.2.0] - 2025-11-04

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