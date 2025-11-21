import assert from 'node:assert';
import { describe, test } from 'node:test';
import { UUIDv7withURNWrapper } from './UUIDv7withURNWrapper.js';

describe('UUIDv7withURNWrapper', () => {
  test('should wrap a valid UUIDv7 string with URN prefix', () => {
    const uuidv7 = '01932820-4b90-7000-8000-000000000000';
    const result = UUIDv7withURNWrapper(uuidv7);

    assert.strictEqual(result, 'urn:uuid:01932820-4b90-7000-8000-000000000000');
  });

  test('should wrap a valid UUIDv7 buffer with URN prefix', () => {
    // UUIDv7 example: 01932820-4b90-7000-8000-000000000000
    const uuidBuffer = Buffer.from([
      0x01, 0x93, 0x28, 0x20, 0x4b, 0x90, 0x70, 0x00, 0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00,
    ]);

    const result = UUIDv7withURNWrapper(uuidBuffer);

    assert.strictEqual(result, 'urn:uuid:01932820-4b90-7000-8000-000000000000');
  });

  test('should produce same result for string and buffer input', () => {
    const uuidString = '01932820-4b90-7000-8000-000000000000';
    const uuidBuffer = Buffer.from([
      0x01, 0x93, 0x28, 0x20, 0x4b, 0x90, 0x70, 0x00, 0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00,
    ]);

    const stringResult = UUIDv7withURNWrapper(uuidString);
    const bufferResult = UUIDv7withURNWrapper(uuidBuffer);

    assert.strictEqual(stringResult, bufferResult);
  });

  test('should wrap real-world UUIDv7 example', () => {
    const uuidv7 = '018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1';
    const result = UUIDv7withURNWrapper(uuidv7);

    assert.strictEqual(result, 'urn:uuid:018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1');
  });

  test('should wrap UUIDv7 with uppercase letters', () => {
    const uuidv7 = '018FD8F9-8C00-7A4C-8A47-1A6D4B90F3A1';
    const result = UUIDv7withURNWrapper(uuidv7);

    assert.strictEqual(result, 'urn:uuid:018FD8F9-8C00-7A4C-8A47-1A6D4B90F3A1');
  });

  test('should wrap UUIDv7 with mixed case letters', () => {
    const uuidv7 = '018Fd8F9-8c00-7A4c-8a47-1A6d4B90f3A1';
    const result = UUIDv7withURNWrapper(uuidv7);

    assert.strictEqual(result, 'urn:uuid:018Fd8F9-8c00-7A4c-8a47-1A6d4B90f3A1');
  });

  test('should return undefined for UUIDv1', () => {
    const uuidv1 = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
    const result = UUIDv7withURNWrapper(uuidv1);

    assert.strictEqual(result, undefined);
  });

  test('should return undefined for UUIDv2', () => {
    const uuidv2 = '000003e8-2d3e-21ed-8100-325096b39f47';
    const result = UUIDv7withURNWrapper(uuidv2);

    assert.strictEqual(result, undefined);
  });

  test('should return undefined for UUIDv3', () => {
    const uuidv3 = 'a3bb189e-8bf9-3888-9912-ace4e6543002';
    const result = UUIDv7withURNWrapper(uuidv3);

    assert.strictEqual(result, undefined);
  });

  test('should return undefined for UUIDv4', () => {
    const uuidv4 = '550e8400-e29b-41d4-a716-446655440000';
    const result = UUIDv7withURNWrapper(uuidv4);

    assert.strictEqual(result, undefined);
  });

  test('should return undefined for UUIDv5', () => {
    const uuidv5 = '886313e1-3b8a-5372-9b90-0c9aee199e5d';
    const result = UUIDv7withURNWrapper(uuidv5);

    assert.strictEqual(result, undefined);
  });

  test('should return undefined for UUIDv6', () => {
    const uuidv6 = '1d19dad6-ba7b-6810-80b4-00c04fd430c8';
    const result = UUIDv7withURNWrapper(uuidv6);

    assert.strictEqual(result, undefined);
  });

  test('should return undefined for UUIDv8', () => {
    const uuidv8 = '0000000a-000b-8000-8000-0000000c000d';
    const result = UUIDv7withURNWrapper(uuidv8);

    assert.strictEqual(result, undefined);
  });

  test('should return undefined for malformed UUID (wrong length)', () => {
    const invalidUuid = '01932820-4b90-7000-8000-0000000000';
    const result = UUIDv7withURNWrapper(invalidUuid);

    assert.strictEqual(result, undefined);
  });

  test('should return undefined for malformed UUID (missing hyphens)', () => {
    const invalidUuid = '019328204b90700080000000000000000';
    const result = UUIDv7withURNWrapper(invalidUuid);

    assert.strictEqual(result, undefined);
  });

  test('should return undefined for malformed UUID (wrong hyphen positions)', () => {
    const invalidUuid = '01932-8204-b90-7000-8000-000000000000';
    const result = UUIDv7withURNWrapper(invalidUuid);

    assert.strictEqual(result, undefined);
  });

  test('should return undefined for empty string', () => {
    const result = UUIDv7withURNWrapper('');

    assert.strictEqual(result, undefined);
  });

  test('should return undefined for invalid characters in UUID', () => {
    const invalidUuid = '01932820-4b90-7000-8000-00000000000g';
    const result = UUIDv7withURNWrapper(invalidUuid);

    assert.strictEqual(result, undefined);
  });

  test('should return undefined for UUID with special characters', () => {
    const invalidUuid = '01932820-4b90-7000-8000-00000000000@';
    const result = UUIDv7withURNWrapper(invalidUuid);

    assert.strictEqual(result, undefined);
  });

  test('should return undefined for UUID with spaces', () => {
    const invalidUuid = '01932820-4b90-7000-8000-00000000 000';
    const result = UUIDv7withURNWrapper(invalidUuid);

    assert.strictEqual(result, undefined);
  });

  test('should return undefined for nil UUID', () => {
    const nilUuid = '00000000-0000-0000-0000-000000000000';
    const result = UUIDv7withURNWrapper(nilUuid);

    assert.strictEqual(result, undefined);
  });

  test('should return undefined for max UUID', () => {
    const maxUuid = 'ffffffff-ffff-ffff-ffff-ffffffffffff';
    const result = UUIDv7withURNWrapper(maxUuid);

    assert.strictEqual(result, undefined);
  });

  test('should return undefined for buffer with incorrect length (too short)', () => {
    const invalidBuffer = Buffer.from([0x01, 0x93, 0x28, 0x20, 0x4b]);
    const result = UUIDv7withURNWrapper(invalidBuffer);

    assert.strictEqual(result, undefined);
  });

  test('should handle buffer with extra bytes (uses first 16 bytes)', () => {
    // stringify function only reads first 16 bytes, so this creates a valid UUIDv7
    // Same as: 01932820-4b90-7000-8000-000000000000
    const bufferWithExtra = Buffer.from([
      0x01,
      0x93,
      0x28,
      0x20,
      0x4b,
      0x90,
      0x70,
      0x00,
      0x80,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0xff, // Extra byte (ignored)
    ]);
    const result = UUIDv7withURNWrapper(bufferWithExtra);

    // Should successfully wrap since first 16 bytes form a valid UUIDv7
    assert.strictEqual(result, 'urn:uuid:01932820-4b90-7000-8000-000000000000');
  });

  test('should wrap UUIDv7 buffer that represents a v7 UUID', () => {
    // UUIDv7: 018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1
    const uuidBuffer = Buffer.from([
      0x01, 0x8f, 0xd8, 0xf9, 0x8c, 0x00, 0x7a, 0x4c, 0x8a, 0x47, 0x1a, 0x6d, 0x4b, 0x90, 0xf3,
      0xa1,
    ]);

    const result = UUIDv7withURNWrapper(uuidBuffer);

    assert.strictEqual(result, 'urn:uuid:018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1');
  });

  test('should return undefined for buffer representing UUIDv4', () => {
    // UUIDv4: 550e8400-e29b-41d4-a716-446655440000
    const uuidv4Buffer = Buffer.from([
      0x55, 0x0e, 0x84, 0x00, 0xe2, 0x9b, 0x41, 0xd4, 0xa7, 0x16, 0x44, 0x66, 0x55, 0x44, 0x00,
      0x00,
    ]);

    const result = UUIDv7withURNWrapper(uuidv4Buffer);

    assert.strictEqual(result, undefined);
  });

  test('should preserve original UUID case in URN wrapper', () => {
    const uuidLower = '018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1';
    const uuidUpper = '018FD8F9-8C00-7A4C-8A47-1A6D4B90F3A1';

    const resultLower = UUIDv7withURNWrapper(uuidLower);
    const resultUpper = UUIDv7withURNWrapper(uuidUpper);

    assert.strictEqual(resultLower, 'urn:uuid:018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1');
    assert.strictEqual(resultUpper, 'urn:uuid:018FD8F9-8C00-7A4C-8A47-1A6D4B90F3A1');
    assert.notStrictEqual(resultLower, resultUpper);
  });

  test('should handle UUIDv7 with all numeric hex characters', () => {
    const uuidv7 = '01234567-89ab-7cde-8012-345678901234';
    const result = UUIDv7withURNWrapper(uuidv7);

    assert.strictEqual(result, 'urn:uuid:01234567-89ab-7cde-8012-345678901234');
  });

  test('should handle UUIDv7 with all alphabetic hex characters', () => {
    const uuidv7 = 'abcdefab-cdef-7abc-bdef-abcdefabcdef';
    const result = UUIDv7withURNWrapper(uuidv7);

    assert.strictEqual(result, 'urn:uuid:abcdefab-cdef-7abc-bdef-abcdefabcdef');
  });

  test('should conform to RFC 4122 URN format', () => {
    const uuidv7 = '018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1';
    const result = UUIDv7withURNWrapper(uuidv7);

    // URN should start with 'urn:uuid:' as per RFC 4122
    assert.strictEqual(result?.startsWith('urn:uuid:'), true);
    assert.strictEqual(result?.includes(uuidv7), true);
  });

  test('should return undefined for random string input', () => {
    const randomString = 'this-is-not-a-uuid-string-at-all';
    const result = UUIDv7withURNWrapper(randomString);

    assert.strictEqual(result, undefined);
  });

  test('should return undefined for numeric input converted to string', () => {
    const numericString = '12345678901234567890123456789012';
    const result = UUIDv7withURNWrapper(numericString);

    assert.strictEqual(result, undefined);
  });

  test('should verify URN wrapper is consistent across multiple calls', () => {
    const uuidv7 = '018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1';

    const result1 = UUIDv7withURNWrapper(uuidv7);
    const result2 = UUIDv7withURNWrapper(uuidv7);
    const result3 = UUIDv7withURNWrapper(uuidv7);

    assert.strictEqual(result1, result2);
    assert.strictEqual(result2, result3);
  });
});
