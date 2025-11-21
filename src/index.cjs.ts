import {
  type DateFromUUIDv7 as _DateFromUUIDv7,
  dateFromUUIDv7 as _dateFromUUIDv7,
} from './dateFromUUIDv7.js';
import {
  type UUIDVersionValidation as _UUIDVersionValidation,
  uuidVersionValidation as _uuidVersionValidation,
} from './uuidVersionValidation.js';
import {
  type UUIDv7toBinary as _UUIDv7toBinary,
  uuidv7toBinary as _uuidv7toBinary,
} from './uuidv7toBinary.js';
import {
  type UUIDv7toUnsignedInteger as _UUIDv7toUnsignedInteger,
  uuidv7toUnsignedInteger as _uuidv7toUnsignedInteger,
} from './uuidv7toUnsignedInteger.js';
import {
  type UUIDv7withURNWrapper as _UUIDv7withURNWrapper,
  uuidv7withURNWrapper as _uuidv7withURNWrapper,
} from './uuidv7withURNWrapper.js';

/**
 * Extract date information from a UUIDv7.
 *
 * @deprecated CommonJS support is deprecated and will be removed in future versions
 * Please migrate to ES modules: `import { dateFromUUIDv7 } from 'uuidv7-utilities'`
 * instead of `const { dateFromUUIDv7 } = require('uuidv7-utilities')`
 *
 * @see {@link _dateFromUUIDv7} for the same functionality with ES modules
 */
export const dateFromUUIDv7 = _dateFromUUIDv7;

/**
 * Validate UUID version and return version identifier.
 *
 * @deprecated CommonJS support is deprecated and will be removed in future versions
 * Please migrate to ES modules: `import { uuidVersionValidation } from 'uuidv7-utilities'`
 * instead of `const { uuidVersionValidation } = require('uuidv7-utilities')`
 *
 * @see {@link _uuidVersionValidation} for the same functionality with ES modules
 */
export const uuidVersionValidation = _uuidVersionValidation;

/**
 * Return type for dateFromUUIDv7 function.
 *
 * @deprecated CommonJS support is deprecated and will be removed in future versions
 * Please migrate to ES modules: `import type { DateFromUUIDv7 } from 'uuidv7-utilities'`
 * instead of `const { DateFromUUIDv7 } = require('uuidv7-utilities')`
 */
export type DateFromUUIDv7 = _DateFromUUIDv7;

/**
 * Union type representing possible UUID version identifiers.
 *
 * @deprecated CommonJS support is deprecated and will be removed in future versions
 * Please migrate to ES modules: `import type { UUIDVersionValidation } from 'uuidv7-utilities'`
 * instead of `const { UUIDVersionValidation } = require('uuidv7-utilities')`
 */
export type UUIDVersionValidation = _UUIDVersionValidation;

/**
 * Convert UUIDv7 string to binary representation.
 *
 * @deprecated CommonJS support is deprecated and will be removed in future versions
 * Please migrate to ES modules: `import { uuidv7toBinary } from 'uuidv7-utilities'`
 * instead of `const { uuidv7toBinary } = require('uuidv7-utilities')`
 */
export const uuidv7toBinary = _uuidv7toBinary;

/**
 * Tuple type representing binary representation of UUIDv7.
 *
 * @deprecated CommonJS support is deprecated and will be removed in future versions
 * Please migrate to ES modules: `import type { UUIDv7toBinary } from 'uuidv7-utilities'`
 * instead of `const { UUIDv7toBinary } = require('uuidv7-utilities')`
 */
export type UUIDv7toBinary = _UUIDv7toBinary;

/**
 * Type representing the return value of uuidv7toUnsignedInteger.
 *
 * @deprecated CommonJS support is deprecated and will be removed in future versions
 * Please migrate to ES modules: `import type { UUIDv7toUnsignedInteger } from 'uuidv7-utilities'`
 * instead of `const { UUIDv7toUnsignedInteger } = require('uuidv7-utilities')`
 */
export type UUIDv7toUnsignedInteger = _UUIDv7toUnsignedInteger;

/**
 * Convert UUIDv7 to unsigned integer representation.
 *
 * @deprecated CommonJS support is deprecated and will be removed in future versions
 * Please migrate to ES modules: `import { uuidv7toUnsignedInteger } from 'uuidv7-utilities'`
 *
 */
export const uuidv7toUnsignedInteger = _uuidv7toUnsignedInteger;

/**
 * Type representing the return value of uuidv7withURNWrapper
 *
 * @deprecated CommonJS support is deprecated and will be removed in future versions
 * Please migrate to ES modules: `import type { UUIDv7withURNWrapper } from 'uuidv7-utilities'`
 * instead of `const { UUIDv7withURNWrapper } = require('uuidv7-utilities')`
 */
export type UUIDv7withURNWrapper = _UUIDv7withURNWrapper;

/**
 * Wrap UUIDv7 in a URN format
 * @deprecated CommonJS support is deprecated and will be removed in future versions
 * Please migrate to ES modules: `import { uuidv7withURNWrapper } from 'uuidv7-utilities'`
 * instead of `const { uuidv7withURNWrapper } = require('uuidv7-utilities')`
 */
export const uuidv7withURNWrapper = _uuidv7withURNWrapper;
