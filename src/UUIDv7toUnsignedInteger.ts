import { handleBuffer } from './handleBuffer.js';
import { uuidRegex } from './uuidRegex.js';

type UUIDv7toUnsignedIntegerType = bigint | undefined;

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
