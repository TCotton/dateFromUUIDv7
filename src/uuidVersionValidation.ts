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

  if (match) {
    // Extract the version from the UUID (13th character, or index 14 in the string with hyphens)
    const version = uuid.charAt(14);

    return `v${version}` as UUIDVersionTuple;
  }

  if (uuid === '00000000-0000-0000-0000-000000000000') {
    return 'NilUUID' as UUIDVersionTuple;
  }

  if (uuid.toLowerCase() === 'ffffffff-ffff-ffff-ffff-ffffffffffff') {
    return 'MaxUUID' as UUIDVersionTuple;
  }

  return undefined;
};

export { uuidVersionValidation, type UUIDVersionTuple };
