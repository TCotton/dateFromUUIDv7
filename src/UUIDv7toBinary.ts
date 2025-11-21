import { handleBuffer } from './handleBuffer.js';
import { uuidRegex } from './uuidRegex.js';

type UUIDv7toBinaryTuple =
    | string | undefined;

const UUIDv7toBinary = (uuid: string | Buffer): UUIDv7toBinaryTuple => {
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

            // Convert each hex char → 4-bit binary
            return hex
                .split('')
                .map(c => parseInt(c, 16).toString(2).padStart(4, '0'))
                .join('');

            } catch (_error) {
                return undefined;
            }
        }
        return undefined;
    }
    return undefined;
}

export { UUIDv7toBinary, UUIDv7toBinaryTuple };