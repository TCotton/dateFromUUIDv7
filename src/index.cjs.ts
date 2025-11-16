import {
  type DateFromUUIDv7Result as _DateFromUUIDv7Result,
  dateFromUUIDv7 as _dateFromUUIDv7,
} from './dateFromUUIDv7.js';
import {
  type UUIDVersionTuple as _UUIDVersionTuple,
  uuidVersionValidation as _uuidVersionValidation,
} from './uuidVersionValidation.js';

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
 * Please migrate to ES modules: `import { DateFromUUIDv7Result } from 'uuidv7-utilities'`
 * instead of `const { DateFromUUIDv7Result } = require('uuidv7-utilities')`
 */
export type DateFromUUIDv7Result = _DateFromUUIDv7Result;

/**
 * Union type representing possible UUID version identifiers.
 *
 * @deprecated CommonJS support is deprecated and will be removed in future versions
 * Please migrate to ES modules: `import { UUIDVersionTuple } from 'uuidv7-utilities'`
 * instead of `const { UUIDVersionTuple } = require('uuidv7-utilities')`
 */
export type UUIDVersionTuple = _UUIDVersionTuple;
