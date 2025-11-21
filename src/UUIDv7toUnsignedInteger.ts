import { handleBuffer } from './handleBuffer.js';
import { uuidRegex } from './uuidRegex.js';

type UUIDv7toUnsignedIntegerType = bigint | undefined;

/**
 * Converts a UUIDv7 string or Buffer to its unsigned integer representation.
 *
 * Validates the input as a UUID, checks that it is version 7, and then
 * returns a BigInt representing the complete 128-bit UUID value. If the input is not a valid
 * UUIDv7, returns `undefined`.
 *
 * @param {string | Buffer} uuid - The UUIDv7 as a string or Buffer.
 * @returns {bigint | undefined} The 128-bit unsigned integer representation of the UUIDv7, or `undefined` if invalid.
 *
 * @example
 * // Returns a BigInt
 * UUIDv7toUnsignedInteger('018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1');
 *
 * @example
 * // Returns undefined for invalid UUID
 * UUIDv7toUnsignedInteger('not-a-uuid');
 */

const UUIDv7toUnsignedInteger = (uuid: string | Buffer): UUIDv7toUnsignedIntegerType => {
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
        // Convert hexadecimal string to BigInt
        return BigInt(`0x${hex}`);
      } catch (_error) {
        return undefined;
      }
    }
    return undefined;
  }
  return undefined;
};

export { type UUIDv7toUnsignedIntegerType, UUIDv7toUnsignedInteger };
