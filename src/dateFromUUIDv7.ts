type DateFromUUIDv7Result =
  | {
      dateToIsoString: string;
      dateUnixEpoch: number;
      dateToUTCString: string;
    }
  | undefined;

const dateFromUUIDv7 = (uuid: string): DateFromUUIDv7Result => {
  // Check if the string matches UUID format (with hyphens) first
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-([1-7])[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  const match = uuid.match(uuidRegex);

  if (match) {
    // Extract the version from the UUID (13th character, or index 14 in the string with hyphens)
    const version = uuid.charAt(14);

    // If it's a valid UUIDv7, process it
    if (version === '7') {
      try {
        // First 12 hex digits = 48 bits of timestamp (milliseconds since epoch)
        const hex = uuid.replace(/-/g, '');
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
