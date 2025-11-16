import { handleBuffer } from './handleBuffer.js';
import { uuidRegex } from './uuidRegex.js';

type DateFromUUIDv7Result =
  | {
      dateToIsoString: string;
      dateUnixEpoch: number;
      dateToUTCString: string;
    }
  | undefined;

const dateFromUUIDv7 = (uuid: string | Buffer): DateFromUUIDv7Result => {
  const uuidString = handleBuffer(uuid);
  // Validate UUID format using uuidRegex
  const match: RegExpMatchArray | null = uuidRegex(uuidString);

  if (match) {
    // Extract the version from the UUID (13th character, or index 14 in the string with hyphens)
    const version = uuidString.charAt(14);

    // If it's a valid UUIDv7, process it
    if (version === '7') {
      try {
        // First 12 hex digits = 48 bits of timestamp (milliseconds since epoch)
        const hex = uuidString.replace(/-/g, '');
        const timestampHex = hex.slice(0, 12);
        const timestampMs = parseInt(timestampHex, 16);

        // Convert to Date
        const date = new Date(timestampMs);
        return {
          dateToIsoString: date.toISOString(),
          dateUnixEpoch: date.getTime(),
          dateToUTCString: date.toUTCString(),
        };
      } catch (_error) {
        return undefined;
      }
    }
  }
  return undefined;
};

export { dateFromUUIDv7, type DateFromUUIDv7Result };
