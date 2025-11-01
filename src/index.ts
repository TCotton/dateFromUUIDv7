
const dateFromUUIDv7=(uuid: unknown): Date | null => {
    if (typeof uuid !== 'string') return null;

    // Check if the string matches UUID format (with hyphens) first
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-([1-7])[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    const match = uuid.match(uuidRegex);

    if (match) {
        // Extract the version from the UUID (13th character, or index 14 in the string with hyphens)
        const version = uuid.charAt(14);

        if (version === '1') {
            throw new Error('The entered UUID appears to be V1, but a UUIDv7 is required.');
        }

        if (version === '2') {
            throw new Error('The entered UUID appears to be V2, but a UUIDv7 is required.');
        }

        if (version === '3') {
            throw new Error('The entered UUID appears to be V3, but a UUIDv7 is required.');
        }

        if (version === '4') {
            throw new Error('The entered UUID appears to be V4, but a UUIDv7 is required.');
        }

        if (version === '5') {
            throw new Error('The entered UUID appears to be V5, but a UUIDv7 is required.');
        }

        if (version === '6') {
            throw new Error('The entered UUID appears to be V6, but a UUIDv7 is required.');
        }

        // If it's a valid UUIDv7, process it
        if (version === '7') {
            try {
                // First 12 hex digits = 48 bits of timestamp (milliseconds since epoch)
                const hex = uuid.replace(/-/g, '');
                const timestampHex = hex.slice(0, 12);
                const timestampMs = parseInt(timestampHex, 16);

                // Convert to Date
                return new Date(timestampMs);
            } catch {
                return null;
            }
        }
    }

    // If it doesn't match UUID format at all, return null
    return null;
}

export { dateFromUUIDv7 };
