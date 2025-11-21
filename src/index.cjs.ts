import {
  type DateFromUUIDv7Result as _DateFromUUIDv7Result,
  dateFromUUIDv7 as _dateFromUUIDv7,
} from './dateFromUUIDv7.js';
import {
  type UUIDVersionTuple as _UUIDVersionTuple,
  uuidVersionValidation as _uuidVersionValidation,
} from './uuidVersionValidation.js';
import {
  type UUIDv7toBinaryTuple as _UUIDv7toBinaryTuple,
  UUIDv7toBinary as _UUIDv7toBinary,
} from './UUIDv7toBinary.js';
import {
  type UUIDv7toUnsignedIntegerType as _UUIDv7toUnsignedIntegerType,
  UUIDv7toUnsignedInteger as _UUIDv7toUnsignedInteger,
} from './UUIDv7toUnsignedInteger.js';
import {
  type UUIDv7withURNWrapperType as _UUIDv7withURNWrapperType,
  UUIDv7withURNWrapper as _UUIDv7withURNWrapper,
} from './UUIDv7withURNWrapper.js';

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
 * Please migrate to ES modules: `import type { DateFromUUIDv7Result } from 'uuidv7-utilities'`
 * instead of `const { DateFromUUIDv7Result } = require('uuidv7-utilities')`
 */
export type DateFromUUIDv7Result = _DateFromUUIDv7Result;

/**
 * Union type representing possible UUID version identifiers.
 *
 * @deprecated CommonJS support is deprecated and will be removed in future versions
 * Please migrate to ES modules: `import type { UUIDVersionTuple } from 'uuidv7-utilities'`
 * instead of `const { UUIDVersionTuple } = require('uuidv7-utilities')`
 */
export type UUIDVersionTuple = _UUIDVersionTuple;

/**
 * Convert UUIDv7 string to binary representation.
 *
 * @deprecated CommonJS support is deprecated and will be removed in future versions
 * Please migrate to ES modules: `import { UUIDv7toBinary } from 'uuidv7-utilities'`
 * instead of `const { UUIDv7toBinary } = require('uuidv7-utilities')`
 */
export const UUIDv7toBinary = _UUIDv7toBinary;

/**
 * Tuple type representing binary representation of UUIDv7.
 *
 * @deprecated CommonJS support is deprecated and will be removed in future versions
 * Please migrate to ES modules: `import type { UUIDv7toBinaryTuple } from 'uuidv7-utilities'`
 * instead of `const { UUIDv7toBinaryTuple } = require('uuidv7-utilities')`
 */
export type UUIDv7toBinaryTuple = _UUIDv7toBinaryTuple;

/**
 * Type representing the return value of UUIDv7toUnsignedInteger.
 *
 * @deprecated CommonJS support is deprecated and will be removed in future versions
 * Please migrate to ES modules: `import type { UUIDv7toUnsignedIntegerType } from 'uuidv7-utilities'`
 * instead of `const { UUIDv7toUnsignedIntegerType } = require('uuidv7-utilities')`
 */
export type UUIDv7toUnsignedIntegerType = _UUIDv7toUnsignedIntegerType;

/**
 * Convert UUIDv7 to unsigned integer representation.
 *
 * @deprecated CommonJS support is deprecated and will be removed in future versions
 * Please migrate to ES modules: `import { UUIDv7toUnsignedInteger } from 'uuidv7-utilities'`
 *
 */
export const UUIDv7toUnsignedInteger = _UUIDv7toUnsignedInteger;

/**
 * Type representing the return value of UUIDv7withURNWrapper
 *
 * @deprecated CommonJS support is deprecated and will be removed in future versions
 * Please migrate to ES modules: `import type { UUIDv7withURNWrapperType } from 'uuidv7-utilities'`
 * instead of `const { UUIDv7withURNWrapperType } = require('uuidv7-utilities')`
 */
export type UUIDv7withURNWrapperType = _UUIDv7withURNWrapperType;

/**
 * Wrap UUIDv7 in a URN format
 * @deprecated CommonJS support is deprecated and will be removed in future versions
 * Please migrate to ES modules: `import { UUIDv7withURNWrapper } from 'uuidv7-utilities'`
 * instead of `const { UUIDv7withURNWrapper } = require('uuidv7-utilities')`
 */
export const UUIDv7withURNWrapper = _UUIDv7withURNWrapper;
