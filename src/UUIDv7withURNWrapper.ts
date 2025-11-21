import { handleBuffer } from './handleBuffer.js';
import { uuidRegex } from './uuidRegex.js';

type UUIDv7withURNWrapperType = string | undefined;

const UUIDv7withURNWrapper = (uuid: string | Buffer): UUIDv7withURNWrapperType => {
  const uuidString = handleBuffer(uuid);

  // Validate UUID format using uuidRegex
  const match: RegExpMatchArray | null = uuidRegex(uuidString);
  if (match) {
    // Extract the version from the UUID (13th character, or index 14 in the string with hyphens)
    const version = uuidString.charAt(14);

    // If it's a valid UUIDv7, process it
    if (version === '7') {
      // Convert each URN wrapper per RFC 4122
      return `urn:uuid:${uuidString}`;
    }
    return undefined;
  }
  return undefined;
};

export { UUIDv7withURNWrapper, type UUIDv7withURNWrapperType };
