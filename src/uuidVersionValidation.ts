import { uuidRegex } from './uuidRegex.js';
type UUIDVersionTuple =
  | 'v1'
  | 'v2'
  | 'v3'
  | 'v4'
  | 'v5'
  | 'v6'
  | 'v7'
  | 'v8'
  | 'NilUUID'
  | 'MaxUUID'
  | undefined;

const uuidVersionValidation = (uuid: string): UUIDVersionTuple => {
  const match: RegExpMatchArray | null = uuidRegex(uuid);
  const isNilUUID = uuid === '00000000-0000-0000-0000-000000000000';
  // Max UUID comparison is case-insensitive to handle both upper and lower case formats
  const isMaxUUID = uuid.toLowerCase() === 'ffffffff-ffff-ffff-ffff-ffffffffffff';

  if (match) {
    // Extract the version from the UUID (13th character, or index 14 in the string with hyphens)
    const version = uuid.charAt(14);

    // Object literal mapping for version characters to version strings
    const versionMap = {
      '1': 'v1',
      '2': 'v2',
      '3': 'v3',
      '4': 'v4',
      '5': 'v5',
      '6': 'v6',
      '7': 'v7',
      '8': 'v8',
    } as const;

    // Return the appropriate version string or undefined if not found
    return versionMap[version as keyof typeof versionMap] || undefined;
  }

  if (isNilUUID) {
    return 'NilUUID';
  }

  if (isMaxUUID) {
    return 'MaxUUID';
  }

  return undefined;
};

export { uuidVersionValidation, type UUIDVersionTuple };
