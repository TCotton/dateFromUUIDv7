import { isBuffer } from './isBuffer.js';
import { stringify } from './stringify.js';

/**
 * Converts a Buffer to a UUID string or passes through a string value unchanged.
 *
 * This function accepts either a Buffer or string as input. When a Buffer is provided,
 * it attempts to convert the buffer to a UUID string format using the `stringify` function.
 *
 * **Important: Buffer Size Validation**
 *
 * This function does NOT validate buffer size before conversion. The `stringify` function
 * expects a buffer with exactly 16 bytes (the standard UUID byte length). If a buffer
 * with fewer than 16 bytes is passed:
 * - The function will still attempt to convert it to a string
 * - Accessing undefined array indices will result in "undefined" being inserted into the UUID string
 * - The resulting string will be malformed and will NOT match valid UUID format
 * - Example: A 3-byte buffer may produce a string like "010203undefined-undefined-..."
 *
 * Callers are responsible for ensuring buffers are exactly 16 bytes if they expect
 * valid UUID strings as output. For validation before conversion, consider checking
 * buffer.length === 16 before calling this function.
 *
 * @param {string | Buffer} value - The value to process. Can be either:
 *   - A Buffer (ideally 16 bytes for valid UUID conversion)
 *   - A string (will be returned unchanged)
 *
 * @returns {string} If input is a Buffer, returns the UUID string representation
 *   (which may be malformed if buffer is not 16 bytes). If input is a string,
 *   returns the original string unchanged.
 *
 * @example
 * // Valid 16-byte buffer - produces valid UUID string
 * const validBuffer = Buffer.from([
 *   0x01, 0x93, 0x28, 0x20, 0x4b, 0x90, 0x70, 0x00,
 *   0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
 * ]);
 * handleBuffer(validBuffer); // Returns: "01932820-4b90-7000-8000-000000000000"
 *
 * @example
 * // String input - passes through unchanged
 * handleBuffer("01932820-4b90-7000-8000-000000000000");
 * // Returns: "01932820-4b90-7000-8000-000000000000"
 *
 * @example
 * // Invalid short buffer - produces malformed string with "undefined"
 * const shortBuffer = Buffer.from([0x01, 0x02, 0x03]);
 * handleBuffer(shortBuffer); // Returns malformed string like "010203undefined-undefined-..."
 */
export const handleBuffer = (value: string | Buffer) => {
  if (isBuffer(value)) {
    return stringify(value);
  }
  return value;
};
