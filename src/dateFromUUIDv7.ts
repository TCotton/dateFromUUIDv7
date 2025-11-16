import { uuidRegex } from './uuidRegex.js';

type DateFromUUIDv7Result =
  | {
      dateToIsoString: string;
      dateUnixEpoch: number;
      dateToUTCString: string;
    }
  | undefined;

const dateFromUUIDv7 = (uuid: string): DateFromUUIDv7Result => {
  // Validate UUID format using uuidRegex
  const match: RegExpMatchArray | null = uuidRegex(uuid);

  if (match) {
    // Extract the version from the UUID (13th character, or index 14 in the string with hyphens)
    const version: string = uuid.charAt(14);

    // If it's a valid UUIDv7, process it
    if (version === '7') {
      try {
        // First 12 hex digits = 48 bits of timestamp (milliseconds since epoch)
        const hex: string = uuid.replace(/-/g, '');
        const timestampHex: string = hex.slice(0, 12);
        const timestampMs: number = parseInt(timestampHex, 16);

        // Convert to Date
        const date: Date = new Date(timestampMs);
        return {
          dateToIsoString: date.toISOString(),
          dateUnixEpoch: date.getTime(),
          dateToUTCString: date.toUTCString(),
        };
      } catch (_error: unknown) {
        return undefined;
      }
    }
  }
  return undefined;
};

export { dateFromUUIDv7, type DateFromUUIDv7Result };
