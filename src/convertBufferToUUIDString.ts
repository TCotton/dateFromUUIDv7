import { stringify } from './stringify.js';

/**
 * Converts a Buffer containing UUID bytes to UUID string format.
 *
 * @param originalBuf - A Buffer containing the UUID bytes (should be 16 bytes for valid UUIDs)
 * @returns A UUID string in the format XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 *
 * @example
 * ```typescript
 * const uuidBuffer = Buffer.from([
 *   0x01, 0x8f, 0xd8, 0xf9, 0x8c, 0x00, 0x7a, 0x4c,
 *   0x8a, 0x47, 0x1a, 0x6d, 0x4b, 0x90, 0xf3, 0xa1
 * ]);
 * const uuidString = convertBufferToUUIDString(uuidBuffer);
 * // Returns: '018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1'
 * ```
 *
 * @remarks
 * - Supports all UUID versions (v1-v8) and special cases (Nil, Max UUIDs)
 * - Buffers must be exactly 16 bytes for valid UUID conversion
 * - Invalid or malformed Buffers will produce non-standard UUID strings containing 'undefined' or 'nan'
 */
const convertBufferToUUIDString = (originalBuf: Buffer): string => {
  return stringify(originalBuf);
};

export { convertBufferToUUIDString };
