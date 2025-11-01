/**
 * Extracts a Date object from a UUIDv7 string
 * UUIDv7 embeds a timestamp in the first 48 bits (6 bytes) representing milliseconds since Unix epoch
 *
 * @param uuid - The UUIDv7 string to convert
 * @returns Date object extracted from the UUID
 * @throws Error if the UUID format is invalid
 *
 * @example
 * ```typescript
 * const uuid = '01234567-89ab-7cde-f012-3456789abcde';
 * const date = dateFromUUIDv7(uuid);
 * console.log(date); // Date corresponding to the UUID timestamp
 * ```
 */
export function dateFromUUIDv7(uuid: string): Date {
  // Validate UUID format
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  if (!uuidRegex.test(uuid)) {
    throw new Error('Invalid UUIDv7 format');
  }

  // Remove hyphens and get the first 12 hex characters (48 bits)
  const hex = uuid.replace(/-/g, '').substring(0, 12);

  // Convert hex to decimal (milliseconds since Unix epoch)
  const timestamp = Number.parseInt(hex, 16);

  // Check if timestamp is valid
  if (Number.isNaN(timestamp)) {
    throw new Error('Invalid timestamp in UUID');
  }

  return new Date(timestamp);
}
