import assert from 'node:assert';
import { describe, test } from 'node:test';
import { handleBuffer } from './handleBuffer.js';

describe('handleBuffer', () => {
  test('should convert Buffer to UUID string format', () => {
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

    const result = handleBuffer(uuidBuffer);
    assert.strictEqual(result, '01932820-4b90-7000-8000-000000000000');
    assert.strictEqual(typeof result, 'string');
  });

  test('should return string input unchanged', () => {
    const uuidString = '01932820-4b90-7000-8000-000000000000';

    const result = handleBuffer(uuidString);
    assert.strictEqual(result, uuidString);
    assert.strictEqual(typeof result, 'string');
  });

  test('should handle nil UUID buffer (all zeros)', () => {
    const nilUuidBuffer = Buffer.from([
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00,
    ]);

    const result = handleBuffer(nilUuidBuffer);
    assert.strictEqual(result, '00000000-0000-0000-0000-000000000000');
  });

  test('should handle max UUID buffer (all 0xFF)', () => {
    const maxUuidBuffer = Buffer.from([
      0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
      0xff,
    ]);

    const result = handleBuffer(maxUuidBuffer);
    assert.strictEqual(result, 'ffffffff-ffff-ffff-ffff-ffffffffffff');
  });

  test('should handle different UUID versions as buffers', () => {
    // UUIDv4 example
    const uuidv4Buffer = Buffer.from([
      0x12, 0x34, 0x56, 0x78, 0x9a, 0xbc, 0x4d, 0xef, 0x80, 0x12, 0x34, 0x56, 0x78, 0x9a, 0xbc,
      0xde,
    ]);

    const result = handleBuffer(uuidv4Buffer);
    assert.strictEqual(result, '12345678-9abc-4def-8012-3456789abcde');
  });

  test('should handle empty string input', () => {
    const result = handleBuffer('');
    assert.strictEqual(result, '');
    assert.strictEqual(typeof result, 'string');
  });

  test('should handle non-UUID string input', () => {
    const nonUuidString = 'hello-world-this-is-not-a-uuid';

    const result = handleBuffer(nonUuidString);
    assert.strictEqual(result, nonUuidString);
    assert.strictEqual(typeof result, 'string');
  });

  test('should handle malformed UUID string input', () => {
    const malformedUuid = '12345678-9abc-4def-80';

    const result = handleBuffer(malformedUuid);
    assert.strictEqual(result, malformedUuid);
    assert.strictEqual(typeof result, 'string');
  });

  test('should convert buffer created from existing UUID string', () => {
    const originalUuid = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';

    // Convert UUID string to buffer and back
    const hex = originalUuid.replace(/-/g, '');
    const buffer = Buffer.from(hex, 'hex');

    const result = handleBuffer(buffer);
    assert.strictEqual(result, originalUuid);
  });

  test('should handle buffer with mixed case values', () => {
    const mixedBuffer = Buffer.from([
      0xab, 0xcd, 0xef, 0x12, 0x34, 0x56, 0x78, 0x9a, 0xbc, 0xde, 0xf0, 0x12, 0x34, 0x56, 0x78,
      0x9a,
    ]);

    const result = handleBuffer(mixedBuffer);
    assert.strictEqual(result, 'abcdef12-3456-789a-bcde-f0123456789a');
  });

  test('should return malformed string for invalid buffer sizes', () => {
    // Short buffer - should return malformed output
    const shortBuffer = Buffer.from([0x01, 0x02, 0x03]);

    const result = handleBuffer(shortBuffer);
    assert.strictEqual(typeof result, 'string');

    // Should not match valid UUID format
    assert.doesNotMatch(result, /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);

    // Should contain 'undefined' from stringify function
    assert.ok(result.includes('undefined'));
  });

  test('should return malformed string for empty buffer', () => {
    const emptyBuffer = Buffer.alloc(0);

    const result = handleBuffer(emptyBuffer);
    assert.strictEqual(typeof result, 'string');

    // Should not match valid UUID format
    assert.doesNotMatch(result, /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);

    // Should contain 'undefined' or 'nan' from stringify function
    assert.ok(result.includes('undefined') || result.includes('nan'));
  });

  test('should maintain round-trip conversion for valid buffers', () => {
    const testUuids = [
      '01932820-4b90-7000-8000-000000000000', // UUIDv7
      '12345678-9abc-4def-8012-3456789abcde', // UUIDv4
      '00000000-0000-0000-0000-000000000000', // Nil UUID
      'ffffffff-ffff-ffff-ffff-ffffffffffff', // Max UUID
    ];

    for (const uuid of testUuids) {
      // Convert to buffer and back through handleBuffer
      const hex = uuid.replace(/-/g, '');
      const buffer = Buffer.from(hex, 'hex');
      const result = handleBuffer(buffer);

      assert.strictEqual(result, uuid);
    }
  });

  test('should handle consistent input types correctly', () => {
    const testCases = [
      // String inputs should pass through unchanged
      {
        input: '01932820-4b90-7000-8000-000000000000',
        expected: '01932820-4b90-7000-8000-000000000000',
      },
      { input: 'not-a-uuid', expected: 'not-a-uuid' },
      { input: '', expected: '' },

      // Buffer inputs should be converted
      {
        input: Buffer.from([
          0x01, 0x93, 0x28, 0x20, 0x4b, 0x90, 0x70, 0x00, 0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
          0x00,
        ]),
        expected: '01932820-4b90-7000-8000-000000000000',
      },
    ];

    for (const testCase of testCases) {
      const result = handleBuffer(testCase.input);
      assert.strictEqual(result, testCase.expected);
      assert.strictEqual(typeof result, 'string');
    }
  });

  test('should be pure function with no side effects', () => {
    const originalString = '01932820-4b90-7000-8000-000000000000';
    const originalBuffer = Buffer.from([
      0x01, 0x93, 0x28, 0x20, 0x4b, 0x90, 0x70, 0x00, 0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00,
    ]);

    // Save original values
    const originalBufferCopy = Buffer.from(originalBuffer);

    // Call handleBuffer multiple times
    const result1 = handleBuffer(originalString);
    const result2 = handleBuffer(originalBuffer);
    const result3 = handleBuffer(originalString);
    const result4 = handleBuffer(originalBuffer);

    // Check that inputs are unchanged
    assert.strictEqual(originalString, '01932820-4b90-7000-8000-000000000000');
    assert.deepStrictEqual(originalBuffer, originalBufferCopy);

    // Check that results are consistent
    assert.strictEqual(result1, result3);
    assert.strictEqual(result2, result4);
    assert.strictEqual(result1, '01932820-4b90-7000-8000-000000000000');
    assert.strictEqual(result2, '01932820-4b90-7000-8000-000000000000');
  });

  test('should handle edge cases for type validation', () => {
    // Test with various UUID versions to ensure type detection works
    const versionTestCases = [
      // UUIDv1
      {
        buffer: Buffer.from([
          0xcc, 0x86, 0x37, 0x58, 0xb7, 0x14, 0x11, 0xf0, 0xb5, 0x76, 0xc5, 0x86, 0xe8, 0x61, 0x91,
          0x34,
        ]),
        expected: 'cc863758-b714-11f0-b576-c586e8619134',
      },
      // UUIDv4
      {
        buffer: Buffer.from([
          0x8d, 0x5d, 0x59, 0xa0, 0xb6, 0x0b, 0x4e, 0x2b, 0x9d, 0x67, 0x7c, 0x5a, 0xb5, 0x3f, 0x9e,
          0x5b,
        ]),
        expected: '8d5d59a0-b60b-4e2b-9d67-7c5ab53f9e5b',
      },
      // UUIDv7
      {
        buffer: Buffer.from([
          0x01, 0x8f, 0xd8, 0xf9, 0x8c, 0x00, 0x7a, 0x4c, 0x8a, 0x47, 0x1a, 0x6d, 0x4b, 0x90, 0xf3,
          0xa1,
        ]),
        expected: '018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1',
      },
    ];

    for (const testCase of versionTestCases) {
      const result = handleBuffer(testCase.buffer);
      assert.strictEqual(result, testCase.expected);

      // Verify the result is a valid UUID format
      assert.match(result, /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
    }
  });

  test('should handle performance consistently', () => {
    // Test with large arrays to ensure consistent performance
    const testBuffer = Buffer.from([
      0x01, 0x93, 0x28, 0x20, 0x4b, 0x90, 0x70, 0x00, 0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00,
    ]);
    const testString = '01932820-4b90-7000-8000-000000000000';

    const iterations = 100;
    const results = [];

    // Test multiple calls for consistency
    for (let i = 0; i < iterations; i++) {
      results.push(handleBuffer(testBuffer));
      results.push(handleBuffer(testString));
    }

    // Verify all results are consistent
    for (let i = 0; i < results.length; i += 2) {
      assert.strictEqual(results[i], testString); // Buffer conversion
      assert.strictEqual(results[i + 1], testString); // String passthrough
    }
  });
});
