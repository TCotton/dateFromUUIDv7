import assert from 'node:assert';
import { test } from 'node:test';
import { dateFromUUIDv7 } from './index.js';

test('dateFromUUIDv7 - extracts date from valid UUIDv7', () => {
  // UUIDv7 with timestamp for 2024-01-01T00:00:00.000Z
  // Timestamp: 1704067200000 (0x018cc251f400)
  const uuid = '018cc251-f400-7000-8000-000000000000';
  const date = dateFromUUIDv7(uuid);

  assert.strictEqual(date.getTime(), 1704067200000);
});

test('dateFromUUIDv7 - throws error for invalid UUID format', () => {
  const invalidUuid = 'not-a-uuid';

  assert.throws(() => dateFromUUIDv7(invalidUuid), {
    name: 'Error',
    message: 'Invalid UUIDv7 format',
  });
});

test('dateFromUUIDv7 - throws error for non-UUIDv7 (wrong version)', () => {
  // UUID with version 4 instead of 7
  const uuidv4 = '018cfdf8-8000-4000-8000-000000000000';

  assert.throws(() => dateFromUUIDv7(uuidv4), {
    name: 'Error',
    message: 'Invalid UUIDv7 format',
  });
});

test('dateFromUUIDv7 - handles different timestamps correctly', () => {
  // Timestamp: 1700000000000 (0x018bcfe56800)
  const uuid = '018bcfe5-6800-7000-8000-000000000000';
  const date = dateFromUUIDv7(uuid);

  assert.strictEqual(date.getTime(), 1700000000000);
});
