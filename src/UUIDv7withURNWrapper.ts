import { handleBuffer } from './handleBuffer.js';
import { uuidRegex } from './uuidRegex.js';

type UUIDv7withURNWrapperType = string | undefined;

/**
 * Wraps a valid UUIDv7 string or Buffer in a URN (Uniform Resource Name) as per RFC 4122.
 *
 * Accepts a UUIDv7 in string or Buffer form, validates its format and version,
 * and returns the UUID wrapped in a URN string (`urn:uuid:<uuid>`). If the input
 * is not a valid UUIDv7, returns `undefined`.
 *
 * @param {string | Buffer} uuid - The UUIDv7 to wrap, as a string or Buffer.
 * @returns {string | undefined} The URN-wrapped UUIDv7 string if valid, otherwise `undefined`.
 *
 * @example
 * // Valid UUIDv7 string
 * const urn = UUIDv7withURNWrapper('01890b27-ccf7-7def-b6c2-3b8e6e3c8e5f');
 * // urn === 'urn:uuid:01890b27-ccf7-7def-b6c2-3b8e6e3c8e5f'
 *
 * @example
 * // Invalid UUID version
 * const urn = UUIDv7withURNWrapper('01890b27-ccf7-4def-b6c2-3b8e6e3c8e5f');
 * // urn === undefined
 *
 * @example
 * // Buffer input
 * const buf = Buffer.from('01890b27ccf77defb6c23b8e6e3c8e5f', 'hex');
 * const urn = UUIDv7withURNWrapper(buf);
 * // urn === 'urn:uuid:01890b27-ccf7-7def-b6c2-3b8e6e3c8e5f'
 */

const UUIDv7withURNWrapper = (uuid: string | Buffer): UUIDv7withURNWrapperType => {
  const uuidString = handleBuffer(uuid);

  // Validate UUID format using uuidRegex
  const match: RegExpMatchArray | null = uuidRegex(uuidString);
  if (match) {
    // Extract the version from the UUID (13th character, or index 14 in the string with hyphens)
    const version = uuidString.charAt(14);

    // If it's a valid UUIDv7, process it
    if (version === '7') {
      // Wrap with URN prefix per RFC 4122
      return `urn:uuid:${uuidString}`;
    }
    return undefined;
  }
  return undefined;
};

export { UUIDv7withURNWrapper, type UUIDv7withURNWrapperType };
