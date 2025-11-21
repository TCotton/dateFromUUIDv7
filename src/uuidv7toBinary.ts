import { handleBuffer } from './handleBuffer.js';
import { uuidRegex } from './uuidRegex.js';

type UUIDv7toBinary = string | undefined;

/**
 * Converts a UUIDv7 string or Buffer to its binary (bit string) representation.
 *
 * Validates the input as a UUID, checks that it is version 7, and then
 * returns a string of 128 bits representing the UUID. If the input is not a valid
 * UUIDv7, returns `undefined`.
 *
 * @param {string | Buffer} uuid - The UUIDv7 as a string or Buffer.
 * @returns {string | undefined} The 128-bit binary string representation of the UUIDv7, or `undefined` if invalid.
 *
 * @example
 * // Returns a 128-character binary string
 * uuidv7toBinary('0187f21c-5b8c-7cc2-9c0a-8c5e4e5e4e5e');
 *
 * @example
 * // Returns undefined for invalid UUID
 * uuidv7toBinary('not-a-uuid');
 */

const uuidv7toBinary = (uuid: string | Buffer<ArrayBufferLike>): UUIDv7toBinary => {
  const uuidString = handleBuffer(uuid);

  // Validate UUID format using uuidRegex
  const match: RegExpMatchArray | null = uuidRegex(uuidString);
  if (match) {
    // Extract the version from the UUID (13th character, or index 14 in the string with hyphens)
    const version = uuidString.charAt(14);

    // If it's a valid UUIDv7, process it
    if (version === '7') {
      // Strip dashes
      const hex = uuidString.replace(/-/g, '');

      try {
        // Convert each hex char → 4-bit binary
        return hex
          .split('')
          .map((c) => parseInt(c, 16).toString(2).padStart(4, '0'))
          .join('');
      } catch (_error) {
        return undefined;
      }
    }
    return undefined;
  }
  return undefined;
};

export { uuidv7toBinary, type UUIDv7toBinary };
