import assert from 'node:assert';
import { describe, test } from 'node:test';
import { uuidv7toUnsignedInteger } from './index.js';

describe('uuidv7toUnsignedInteger', () => {
  test('should convert a valid UUIDv7 string to BigInt', () => {
    const uuidv7 = '01932820-4b90-7000-8000-000000000000';
    const result = uuidv7toUnsignedInteger(uuidv7);

    assert.strictEqual(typeof result, 'bigint');
    assert.strictEqual(result !== undefined, true);
  });

  test('should convert a valid UUIDv7 buffer to BigInt', () => {
    // UUIDv7 example: 01932820-4b90-7000-8000-000000000000
    const uuidBuffer = Buffer.from([
      0x01,
      0x93,
      0x28,
      0x20, // time_hi
      0x4b,
      0x90, // time_mid
      0x70,
      0x00, // time_low and version
      0x80,
      0x00, // variant and clock_seq
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00, // node
    ]);

    const result = uuidv7toUnsignedInteger(uuidBuffer);

    assert.strictEqual(typeof result, 'bigint');
    assert.strictEqual(result !== undefined, true);
  });

  test('should produce correct unsigned integer for known UUIDv7', () => {
    // Test with a simple UUIDv7: all zeros except version and variant
    const uuidv7 = '00000000-0000-7000-8000-000000000000';
    const result = uuidv7toUnsignedInteger(uuidv7);

    // Hex string without dashes: 00000000000070008000000000000000
    // This should convert to BigInt(0x00000000000070008000000000000000)
    const expected = BigInt('0x00000000000070008000000000000000');

    assert.strictEqual(result, expected);
  });

  test('should handle UUIDv7 with all hex characters (0-9, a-f)', () => {
    const uuidv7 = '01234567-89ab-7cde-8f01-23456789abcd';
    const result = uuidv7toUnsignedInteger(uuidv7);

    // Hex without dashes: 0123456789ab7cde8f0123456789abcd
    const expected = BigInt('0x0123456789ab7cde8f0123456789abcd');

    assert.strictEqual(result, expected);
  });

  test('should handle UUIDv7 with uppercase hex characters', () => {
    const uuidv7 = '01932820-4B90-7000-8000-000000000000';
    const result = uuidv7toUnsignedInteger(uuidv7);

    assert.strictEqual(typeof result, 'bigint');
    assert.strictEqual(result !== undefined, true);

    // Should be same as lowercase
    const lowercaseResult = uuidv7toUnsignedInteger('01932820-4b90-7000-8000-000000000000');
    assert.strictEqual(result, lowercaseResult);
  });

  test('should handle UUIDv7 with mixed case hex characters', () => {
    const uuidv7 = '01932820-4b90-7AbC-8DeF-0123456789Aa';
    const result = uuidv7toUnsignedInteger(uuidv7);

    assert.strictEqual(typeof result, 'bigint');
    assert.strictEqual(result !== undefined, true);

    const expected = BigInt('0x019328204b907AbC8DeF0123456789Aa');
    assert.strictEqual(result, expected);
  });

  test('should return undefined for invalid UUID format', () => {
    const invalidUuid = 'not-a-valid-uuid';
    const result = uuidv7toUnsignedInteger(invalidUuid);

    assert.strictEqual(result, undefined);
  });

  test('should return undefined for non-UUIDv7 (wrong version)', () => {
    // UUIDv4
    const uuidv4 = '550e8400-e29b-41d4-a716-446655440000';
    const result = uuidv7toUnsignedInteger(uuidv4);

    assert.strictEqual(result, undefined);
  });

  test('should return undefined for UUIDv1', () => {
    const uuidv1 = '550e8400-e29b-11d4-a716-446655440000';
    const result = uuidv7toUnsignedInteger(uuidv1);

    assert.strictEqual(result, undefined);
  });

  test('should return undefined for UUIDv3', () => {
    const uuidv3 = '550e8400-e29b-31d4-a716-446655440000';
    const result = uuidv7toUnsignedInteger(uuidv3);

    assert.strictEqual(result, undefined);
  });

  test('should return undefined for UUIDv4', () => {
    const uuidv4 = '550e8400-e29b-41d4-a716-446655440000';
    const result = uuidv7toUnsignedInteger(uuidv4);

    assert.strictEqual(result, undefined);
  });

  test('should return undefined for UUIDv5', () => {
    const uuidv5 = '550e8400-e29b-51d4-a716-446655440000';
    const result = uuidv7toUnsignedInteger(uuidv5);

    assert.strictEqual(result, undefined);
  });

  test('should return undefined for UUIDv6', () => {
    const uuidv6 = '550e8400-e29b-61d4-a716-446655440000';
    const result = uuidv7toUnsignedInteger(uuidv6);

    assert.strictEqual(result, undefined);
  });

  test('should return undefined for UUIDv8', () => {
    const uuidv8 = '550e8400-e29b-81d4-a716-446655440000';
    const result = uuidv7toUnsignedInteger(uuidv8);

    assert.strictEqual(result, undefined);
  });

  test('should return undefined for empty string', () => {
    const result = uuidv7toUnsignedInteger('');

    assert.strictEqual(result, undefined);
  });

  test('should return undefined for malformed UUID string', () => {
    const malformed = '01932820-4b90-7000-8000';
    const result = uuidv7toUnsignedInteger(malformed);

    assert.strictEqual(result, undefined);
  });

  test('should return undefined for UUID with invalid characters', () => {
    const invalidChars = '0193282g-4b90-7000-8000-000000000000';
    const result = uuidv7toUnsignedInteger(invalidChars);

    assert.strictEqual(result, undefined);
  });

  test('should return undefined for UUID with wrong hyphen positions', () => {
    const wrongHyphens = '019328204-b907-0008-0000-00000000000';
    const result = uuidv7toUnsignedInteger(wrongHyphens);

    assert.strictEqual(result, undefined);
  });

  test('should return undefined for non-16-byte buffer', () => {
    const shortBuffer = Buffer.from([0x01, 0x93, 0x28, 0x20]);
    const result = uuidv7toUnsignedInteger(shortBuffer);

    assert.strictEqual(result, undefined);
  });

  test('should return undefined for empty buffer', () => {
    const emptyBuffer = Buffer.from([]);
    const result = uuidv7toUnsignedInteger(emptyBuffer);

    assert.strictEqual(result, undefined);
  });

  test('should return undefined for non-UUIDv7 buffer (version 4)', () => {
    // UUIDv4 buffer with version 4 at correct position
    const uuidv4Buffer = Buffer.from([
      0x55, 0x0e, 0x84, 0x00, 0xe2, 0x9b, 0x41, 0xd4, 0xa7, 0x16, 0x44, 0x66, 0x55, 0x44, 0x00,
      0x00,
    ]);
    const result = uuidv7toUnsignedInteger(uuidv4Buffer);

    assert.strictEqual(result, undefined);
  });

  test('should correctly convert hex to BigInt', () => {
    // Test with known hex -> BigInt conversions
    const uuidv7 = '01234567-89ab-7cde-8f01-23456789abcd';
    const result = uuidv7toUnsignedInteger(uuidv7);

    // Verify the conversion
    const hexString = '0123456789ab7cde8f0123456789abcd';
    const expectedBigInt = BigInt(`0x${hexString}`);

    assert.strictEqual(result, expectedBigInt);
  });

  test('should be consistent with multiple calls for the same UUIDv7', () => {
    const uuidv7 = '01932820-4b90-7000-8000-000000000000';

    const result1 = uuidv7toUnsignedInteger(uuidv7);
    const result2 = uuidv7toUnsignedInteger(uuidv7);
    const result3 = uuidv7toUnsignedInteger(uuidv7);

    assert.strictEqual(result1, result2);
    assert.strictEqual(result2, result3);
  });

  test('should handle string vs buffer equivalence for UUIDv7', () => {
    const uuidString = '01932820-4b90-7000-8000-000000000000';
    const uuidBuffer = Buffer.from([
      0x01, 0x93, 0x28, 0x20, 0x4b, 0x90, 0x70, 0x00, 0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00,
    ]);

    const resultString = uuidv7toUnsignedInteger(uuidString);
    const resultBuffer = uuidv7toUnsignedInteger(uuidBuffer);

    assert.strictEqual(resultString, resultBuffer);
  });

  test('should handle real-world UUIDv7 examples', () => {
    // Some realistic UUIDv7 examples
    const examples = [
      '018b6e6c-7d7e-7000-8000-000000000000',
      '018b6e6c-7d7e-7abc-9def-0123456789ab',
      '01932820-ffff-7fff-bfff-ffffffffffff',
    ];

    for (const uuid of examples) {
      const result = uuidv7toUnsignedInteger(uuid);

      assert.notStrictEqual(result, undefined);
      assert.strictEqual(typeof result, 'bigint');

      // Verify it's a positive BigInt
      assert.strictEqual(result !== undefined && result >= BigInt(0), true);
    }
  });

  test('should handle edge case: UUIDv7 with all zeros in timestamp', () => {
    const uuidv7 = '00000000-0000-7000-8000-000000000000';
    const result = uuidv7toUnsignedInteger(uuidv7);

    assert.notStrictEqual(result, undefined);
    assert.strictEqual(typeof result, 'bigint');

    const expected = BigInt('0x00000000000070008000000000000000');
    assert.strictEqual(result, expected);
  });

  test('should handle edge case: UUIDv7 with max timestamp', () => {
    const uuidv7 = 'ffffffff-ffff-7000-8000-000000000000';
    const result = uuidv7toUnsignedInteger(uuidv7);

    assert.notStrictEqual(result, undefined);
    assert.strictEqual(typeof result, 'bigint');

    const expected = BigInt('0xffffffffffff70008000000000000000');
    assert.strictEqual(result, expected);
  });

  test('should return undefined for string with special characters', () => {
    const specialChars = '!@#$%^&*()';
    const result = uuidv7toUnsignedInteger(specialChars);

    assert.strictEqual(result, undefined);
  });

  test('should return undefined for string with spaces', () => {
    const withSpaces = '01932820 4b90 7000 8000 000000000000';
    const result = uuidv7toUnsignedInteger(withSpaces);

    assert.strictEqual(result, undefined);
  });

  test('should verify BigInt is always positive for valid UUIDv7', () => {
    const validUUIDs = [
      '01932820-4b90-7000-8000-000000000000',
      '00000000-0000-7000-8000-000000000000',
      'ffffffff-ffff-7fff-bfff-ffffffffffff',
      '018b6e6c-7d7e-7abc-9def-0123456789ab',
    ];

    for (const uuid of validUUIDs) {
      const result = uuidv7toUnsignedInteger(uuid);
      assert.notStrictEqual(result, undefined);
      if (result !== undefined) {
        assert.strictEqual(result >= BigInt(0), true);
      }
    }
  });

  test('should handle conversion accuracy for specific hex values', () => {
    // Test specific hex to BigInt conversions
    const uuidv7 = 'abcdef01-2345-7678-9abc-def012345678';
    const result = uuidv7toUnsignedInteger(uuidv7);

    assert.notStrictEqual(result, undefined);

    const expected = BigInt('0xabcdef01234576789abcdef012345678');
    assert.strictEqual(result, expected);
  });

  test('should handle buffer with version 7 correctly', () => {
    // Create a buffer that represents a valid UUIDv7
    // Format: xxxxxxxx-xxxx-7xxx-yxxx-xxxxxxxxxxxx where y is 8, 9, a, or b
    const buffer = Buffer.from([
      0xab,
      0xcd,
      0xef,
      0x01, // timestamp high
      0x23,
      0x45, // timestamp mid
      0x76,
      0x78, // version (7) + timestamp low
      0x9a,
      0xbc, // variant (10xx) + clock sequence
      0xde,
      0xf0,
      0x12,
      0x34,
      0x56,
      0x78, // node
    ]);

    const result = uuidv7toUnsignedInteger(buffer);

    assert.notStrictEqual(result, undefined);
    assert.strictEqual(typeof result, 'bigint');

    // Verify it matches the string conversion
    const stringUuid = 'abcdef01-2345-7678-9abc-def012345678';
    const stringResult = uuidv7toUnsignedInteger(stringUuid);
    assert.strictEqual(result, stringResult);
  });

  test('should handle buffer longer than 16 bytes by using first 16 bytes', () => {
    // Buffer that's 17 bytes - handleBuffer will only use first 16 bytes
    const longBuffer = Buffer.from([
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
      0xff, // This extra byte is ignored by stringify
    ]);

    const result = uuidv7toUnsignedInteger(longBuffer);

    // Should process the first 16 bytes as a valid UUIDv7
    assert.notStrictEqual(result, undefined);
    assert.strictEqual(typeof result, 'bigint');

    // Should match the result from a proper 16-byte buffer
    const properBuffer = Buffer.from([
      0x01, 0x93, 0x28, 0x20, 0x4b, 0x90, 0x70, 0x00, 0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00,
    ]);
    const expectedResult = uuidv7toUnsignedInteger(properBuffer);
    assert.strictEqual(result, expectedResult);
  });

  test('should handle UUIDv7 with different valid variant bits', () => {
    // Valid variant bits for RFC 4122 are: 10xx (8, 9, a, b in hex)
    const variants = [
      '01932820-4b90-7000-8000-000000000000', // variant 8 (1000)
      '01932820-4b90-7000-9000-000000000000', // variant 9 (1001)
      '01932820-4b90-7000-a000-000000000000', // variant a (1010)
      '01932820-4b90-7000-b000-000000000000', // variant b (1011)
    ];

    for (const uuid of variants) {
      const result = uuidv7toUnsignedInteger(uuid);
      assert.notStrictEqual(result, undefined);
      assert.strictEqual(typeof result, 'bigint');
    }
  });

  test('should verify BigInt value preserves all UUID information', () => {
    const uuidv7 = '01932820-4b90-7000-8000-000000000000';
    const result = uuidv7toUnsignedInteger(uuidv7);

    assert.notStrictEqual(result, undefined);

    // Convert back to hex to verify no information loss
    const hexResult = result?.toString(16).padStart(32, '0');
    const expectedHex = '019328204b9070008000000000000000';

    assert.strictEqual(hexResult, expectedHex);
  });

  test('should maintain precision for all 128 bits', () => {
    // Test that we don't lose any precision in the conversion
    const testCases = [
      { uuid: '00000000-0000-7000-8000-000000000001', hex: '00000000000070008000000000000001' },
      { uuid: 'ffffffff-ffff-7fff-bfff-fffffffffffe', hex: 'ffffffffffff7fffbffffffffffffffe' },
      { uuid: '12345678-9abc-7def-8012-3456789abcde', hex: '123456789abc7def80123456789abcde' },
    ];

    for (const { uuid, hex } of testCases) {
      const result = uuidv7toUnsignedInteger(uuid);
      assert.notStrictEqual(result, undefined);

      const expected = BigInt(`0x${hex}`);
      assert.strictEqual(result, expected);
    }
  });

  test('should handle comparison operations between BigInt results', () => {
    const uuid1 = '00000000-0000-7000-8000-000000000000';
    const uuid2 = 'ffffffff-ffff-7fff-bfff-ffffffffffff';

    const result1 = uuidv7toUnsignedInteger(uuid1);
    const result2 = uuidv7toUnsignedInteger(uuid2);

    assert.notStrictEqual(result1, undefined);
    assert.notStrictEqual(result2, undefined);

    if (result1 !== undefined && result2 !== undefined) {
      assert.strictEqual(result1 < result2, true);
      assert.strictEqual(result2 > result1, true);
      assert.strictEqual(result1 !== result2, true);
    }
  });
});
