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
  | undefined
  | true
  | false;

type Version = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
type UUID = string;

interface UUIDVersion {
  versionNumber: Version;
  uuid: UUID;
}

const uuidVersionValidation = (
  uuid: UUIDVersion['uuid'],
  versionNumber?: UUIDVersion['versionNumber']
): UUIDVersionTuple => {
  const match: RegExpMatchArray | null = uuidRegex(uuid);
  const isNilUUID = uuid === '00000000-0000-0000-0000-000000000000';
  // Max UUID comparison is case-insensitive to handle both upper and lower case formats
  const isMaxUUID = uuid.toLowerCase() === 'ffffffff-ffff-ffff-ffff-ffffffffffff';

  // When versionNumber is provided, we're in validation mode
  // Nil and Max UUIDs don't have version fields, so return undefined
  if (versionNumber !== undefined) {
    if (isNilUUID || isMaxUUID) {
      return undefined;
    }
  }

  if (isNilUUID) {
    return 'NilUUID' as UUIDVersionTuple;
  }

  if (isMaxUUID) {
    return 'MaxUUID' as UUIDVersionTuple;
  }

  if (match && versionNumber !== undefined) {
    // Validate that versionNumber is an integer between 1 and 8
    if (Number.isInteger(versionNumber) && versionNumber >= 1 && versionNumber <= 8) {
      const version = uuid.charAt(14);
      return Number(version) === versionNumber;
    } else {
      // Invalid versionNumber provided
      return undefined;
    }
  }

  if (match) {
    // Extract the version from the UUID (13th character, or index 14 in the string with hyphens)
    const version = uuid.charAt(14);

    return `v${version}` as UUIDVersionTuple;
  }

  return undefined;
};

export { uuidVersionValidation, type UUIDVersionTuple, type UUIDVersion };
