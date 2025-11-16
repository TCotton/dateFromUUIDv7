import assert from 'node:assert';
import { describe, test } from 'node:test';
import { stringify } from './stringify.js';

describe('stringify', () => {
  test('should convert a basic UUID byte array to string format', () => {
    // UUIDv7 example: 01932820-4b90-7000-8000-000000000000
    const uuidBytes = new Uint8Array([
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

    const result = stringify(uuidBytes);
    assert.strictEqual(result, '01932820-4b90-7000-8000-000000000000');
  });

  test('should handle all zeros (nil UUID)', () => {
    const nilUuid = new Uint8Array(16).fill(0);
    const result = stringify(nilUuid);
    assert.strictEqual(result, '00000000-0000-0000-0000-000000000000');
  });

  test('should handle all 0xFF bytes (max UUID)', () => {
    const maxUuid = new Uint8Array(16).fill(0xff);
    const result = stringify(maxUuid);
    assert.strictEqual(result, 'ffffffff-ffff-ffff-ffff-ffffffffffff');
  });

  test('should work with different UUID versions', () => {
    // UUIDv4 example
    const v4Bytes = new Uint8Array([
      0x12,
      0x34,
      0x56,
      0x78,
      0x9a,
      0xbc,
      0x4d,
      0xef, // version 4
      0x80,
      0x12, // variant bits
      0x34,
      0x56,
      0x78,
      0x9a,
      0xbc,
      0xde,
    ]);

    const result = stringify(v4Bytes);
    assert.strictEqual(result, '12345678-9abc-4def-8012-3456789abcde');
  });

  test('should work with offset parameter', () => {
    // Create a larger array with UUID data starting at offset 5
    const largerArray = new Uint8Array([
      0x00,
      0x00,
      0x00,
      0x00,
      0x00, // padding
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
      0xff,
      0xff, // more padding
    ]);

    const result = stringify(largerArray, 5);
    assert.strictEqual(result, '01932820-4b90-7000-8000-000000000000');
  });

  test('should handle mixed case bytes correctly (always lowercase output)', () => {
    const mixedBytes = new Uint8Array([
      0xab, 0xcd, 0xef, 0x12, 0x34, 0x56, 0x78, 0x9a, 0xbc, 0xde, 0xf0, 0x12, 0x34, 0x56, 0x78,
      0x9a,
    ]);

    const result = stringify(mixedBytes);
    assert.strictEqual(result, 'abcdef12-3456-789a-bcde-f0123456789a');
  });

  test('should preserve exact byte values in conversion', () => {
    // Test specific byte patterns that might be problematic
    const testBytes = new Uint8Array([
      0x00, 0x01, 0x0f, 0x10, 0x7f, 0x80, 0xfe, 0xff, 0xaa, 0x55, 0x12, 0x34, 0x56, 0x78, 0x9a,
      0xbc,
    ]);

    const result = stringify(testBytes);
    assert.strictEqual(result, '00010f10-7f80-feff-aa55-123456789abc');
  });

  test('should handle edge case bytes (boundary values)', () => {
    const edgeBytes = new Uint8Array([
      0x00,
      0x01,
      0x7f,
      0x80, // 0, 1, 127, 128
      0xfe,
      0xff, // 254, 255
      0x0a,
      0x0f, // 10, 15 (single hex digits)
      0x10,
      0x1f, // 16, 31
      0xa0,
      0xaf,
      0xf0,
      0xff,
      0x99,
      0xcc,
    ]);

    const result = stringify(edgeBytes);
    assert.strictEqual(result, '00017f80-feff-0a0f-101f-a0aff0ff99cc');
  });

  test('should work with real UUIDv7 timestamp patterns', () => {
    // Simulate a real UUIDv7 with explicit byte values
    const uuidv7Bytes = new Uint8Array([
      // timestamp (48 bits) - manually set bytes for expected result
      0x01,
      0x93,
      0x28,
      0x20,
      0x4b,
      0x90,
      // version and time (16 bits)
      0x70,
      0x00, // version 7 + 12 random bits
      // variant and clock sequence (16 bits)
      0x80,
      0x00, // variant 10 + 14 random bits
      // node (48 bits) - random
      0x12,
      0x34,
      0x56,
      0x78,
      0x9a,
      0xbc,
    ]);

    const result = stringify(uuidv7Bytes);
    assert.strictEqual(result, '01932820-4b90-7000-8000-123456789abc');
  });

  test('should handle arrays created from different sources', () => {
    // Test with regular array converted to Uint8Array
    const regularArray = [
      0x12, 0x34, 0x56, 0x78, 0x9a, 0xbc, 0xde, 0xf0, 0x12, 0x34, 0x56, 0x78, 0x9a, 0xbc, 0xde,
      0xf0,
    ];
    const uint8Array = new Uint8Array(regularArray);

    const result = stringify(uint8Array);
    assert.strictEqual(result, '12345678-9abc-def0-1234-56789abcdef0');
  });

  test('should maintain consistent output format', () => {
    const testCases = [
      {
        input: new Uint8Array([
          0x00, 0x11, 0x22, 0x33, 0x44, 0x55, 0x66, 0x77, 0x88, 0x99, 0xaa, 0xbb, 0xcc, 0xdd, 0xee,
          0xff,
        ]),
        expected: '00112233-4455-6677-8899-aabbccddeeff',
      },
      {
        input: new Uint8Array([
          0xff, 0xee, 0xdd, 0xcc, 0xbb, 0xaa, 0x99, 0x88, 0x77, 0x66, 0x55, 0x44, 0x33, 0x22, 0x11,
          0x00,
        ]),
        expected: 'ffeeddcc-bbaa-9988-7766-554433221100',
      },
    ];

    for (const testCase of testCases) {
      const result = stringify(testCase.input);
      assert.strictEqual(result, testCase.expected);
      // Verify UUID format (8-4-4-4-12 pattern)
      assert.match(result, /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
    }
  });

  test('should handle various offset values correctly', () => {
    // Create a buffer with multiple potential UUID patterns
    const largeBuffer = new Uint8Array(32);

    // Fill first UUID at offset 0
    for (let i = 0; i < 16; i++) {
      largeBuffer[i] = i;
    }

    // Fill second UUID at offset 16
    for (let i = 0; i < 16; i++) {
      largeBuffer[16 + i] = 255 - i;
    }

    const result1 = stringify(largeBuffer, 0);
    assert.strictEqual(result1, '00010203-0405-0607-0809-0a0b0c0d0e0f');

    const result2 = stringify(largeBuffer, 16);
    assert.strictEqual(result2, 'fffefdfc-fbfa-f9f8-f7f6-f5f4f3f2f1f0');
  });

  test('should be consistent with multiple calls', () => {
    const testBytes = new Uint8Array([
      0x01, 0x93, 0x28, 0x20, 0x4b, 0x90, 0x70, 0x00, 0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00,
    ]);

    const result1 = stringify(testBytes);
    const result2 = stringify(testBytes);
    const result3 = stringify(testBytes);

    assert.strictEqual(result1, result2);
    assert.strictEqual(result2, result3);
    assert.strictEqual(result1, '01932820-4b90-7000-8000-000000000000');
  });

  test('should handle performance-critical byte patterns', () => {
    // Test patterns that might reveal performance optimizations
    const patterns = [
      new Uint8Array([
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00,
      ]),
      new Uint8Array([
        0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
        0xff,
      ]),
      new Uint8Array([
        0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa,
        0xaa,
      ]),
      new Uint8Array([
        0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55,
        0x55,
      ]),
    ];

    const expectedResults = [
      '00000000-0000-0000-0000-000000000000',
      'ffffffff-ffff-ffff-ffff-ffffffffffff',
      'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
      '55555555-5555-5555-5555-555555555555',
    ];

    for (let i = 0; i < patterns.length; i++) {
      const result = stringify(patterns[i]);
      assert.strictEqual(result, expectedResults[i]);
    }
  });
});
