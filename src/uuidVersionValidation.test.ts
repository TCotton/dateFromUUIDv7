import assert from 'node:assert';
import { describe, it } from 'node:test';
import { uuidVersionValidation } from './uuidVersionValidation.js';

describe('uuidVersionValidation', () => {
  it('should return v1 for a version 1 UUID', () => {
    const v1UuidArray = [
      'cc863758-b714-11f0-b576-c586e8619134',
      'cc863b72-b714-11f0-b576-c586e8619134',
      'cc863e74-b714-11f0-b576-c586e8619134',
      'cc863f64-b714-11f0-b576-c586e8619134',
      'cc864036-b714-11f0-b576-c586e8619134',
    ];
    for (const v1Uuid of v1UuidArray) {
      assert.strictEqual(uuidVersionValidation(v1Uuid), 'v1');
    }
  });

  it('should return v1 for a version 1 UUID buffer', () => {
    // Convert UUIDv1 strings to buffers and test
    const v1UuidBuffer = Buffer.from([
      0xcc, 0x86, 0x37, 0x58, 0xb7, 0x14, 0x11, 0xf0, 0xb5, 0x76, 0xc5, 0x86, 0xe8, 0x61, 0x91,
      0x34,
    ]);
    assert.strictEqual(uuidVersionValidation(v1UuidBuffer), 'v1');
  });

  it('should return v2 for a version 2 UUID', () => {
    const v2UuidArray = [
      'e2a1f3c4-1d23-21f2-8f56-abcdef123456',
      'f1b2d4e5-2e34-21a3-9c78-123456abcdef',
      'a3c4b5d6-3f45-21b4-8a12-789abc456def',
      'b4d5e6f7-4a56-21c5-8b34-456def123abc',
      'c5e6f7a8-5b67-21d6-9d56-abcdef789123',
    ];
    for (const v2Uuid of v2UuidArray) {
      assert.strictEqual(uuidVersionValidation(v2Uuid), 'v2');
    }
  });

  it('should return v2 for a version 2 UUID buffer', () => {
    // Convert UUIDv2 string to buffer and test
    const v2UuidBuffer = Buffer.from([
      0xe2, 0xa1, 0xf3, 0xc4, 0x1d, 0x23, 0x21, 0xf2, 0x8f, 0x56, 0xab, 0xcd, 0xef, 0x12, 0x34,
      0x56,
    ]);
    assert.strictEqual(uuidVersionValidation(v2UuidBuffer), 'v2');
  });

  it('should return v3 for a version 3 UUID', () => {
    const v3UuidArray = [
      '4384b27d-2698-3cad-8ecd-2b804a6dc803',
      '4b5e4949-1838-35cd-97f8-1cea76b9c9e0',
      'ff202ab9-4510-3381-b982-8e3f20311b59',
      '6387c277-391f-3c16-8b52-3cd7847aa443',
      '375c7f49-7604-34e6-bf90-42a8d83affa8',
    ];
    for (const v3Uuid of v3UuidArray) {
      assert.strictEqual(uuidVersionValidation(v3Uuid), 'v3');
    }
  });

  it('should return v3 for a version 3 UUID buffer', () => {
    const v3UuidBuffer = Buffer.from([
      0x43, 0x84, 0xb2, 0x7d, 0x26, 0x98, 0x3c, 0xad, 0x8e, 0xcd, 0x2b, 0x80, 0x4a, 0x6d, 0xc8,
      0x03,
    ]);
    assert.strictEqual(uuidVersionValidation(v3UuidBuffer), 'v3');
  });

  it('should return v4 for a version 4 UUID', () => {
    const v4UuidArray = [
      '8d5d59a0-b60b-4e2b-9d67-7c5ab53f9e5b',
      'ad2f0b7c-5c76-4f48-8f5a-9f2bba3a5f3a',
      '1f3e4b8b-6a12-4f0d-b6b9-29879dbd63f1',
      'be17d42a-2e5e-4c44-a6ef-12b1b01931a7',
      'c34b1ed2-90df-45e2-95c3-6c293de72dbe',
    ];
    for (const v4Uuid of v4UuidArray) {
      assert.strictEqual(uuidVersionValidation(v4Uuid), 'v4');
    }
  });

  it('should return v4 for a version 4 UUID buffer', () => {
    const v4UuidBuffer = Buffer.from([
      0x8d, 0x5d, 0x59, 0xa0, 0xb6, 0x0b, 0x4e, 0x2b, 0x9d, 0x67, 0x7c, 0x5a, 0xb5, 0x3f, 0x9e,
      0x5b,
    ]);
    assert.strictEqual(uuidVersionValidation(v4UuidBuffer), 'v4');
  });

  it('should return v5 for a version 5 UUID', () => {
    const v5UuidArray = [
      'a4b10451-0bda-5091-84d4-4eccefb8bc64',
      '2fc64824-7f44-57aa-8e5e-51e39c5d4ff8',
      'b4f1f73c-87a4-5715-8357-261a89d26005',
      '2d36c929-9466-52aa-9588-16f4515b6a92',
      '15215d4a-dfdb-5361-a44a-b1d97db0a8b1',
    ];
    for (const v5Uuid of v5UuidArray) {
      assert.strictEqual(uuidVersionValidation(v5Uuid), 'v5');
    }
  });

  it('should return v5 for a version 5 UUID buffer', () => {
    const v5UuidBuffer = Buffer.from([
      0xa4, 0xb1, 0x04, 0x51, 0x0b, 0xda, 0x50, 0x91, 0x84, 0xd4, 0x4e, 0xcc, 0xef, 0xb8, 0xbc,
      0x64,
    ]);
    assert.strictEqual(uuidVersionValidation(v5UuidBuffer), 'v5');
  });

  it('should return v6 for a version 6 UUID', () => {
    const v6UuidArray = [
      '1e2f3a4b-5c6d-6f78-90ab-cdef12345678',
      '2a3b4c5d-6e7f-6a8b-91cd-0123456789ab',
      '3c4d5e6f-7a8b-6b9c-92de-abcdef012345',
      '4d5e6f7a-8b9c-6c0d-93ef-1234567890ab',
      '5e6f7a8b-9c0d-6d1e-94f0-abcdef123456',
    ];
    for (const v6Uuid of v6UuidArray) {
      assert.strictEqual(uuidVersionValidation(v6Uuid), 'v6');
    }
  });

  it('should return v6 for a version 6 UUID buffer', () => {
    const v6UuidBuffer = Buffer.from([
      0x1e, 0x2f, 0x3a, 0x4b, 0x5c, 0x6d, 0x6f, 0x78, 0x90, 0xab, 0xcd, 0xef, 0x12, 0x34, 0x56,
      0x78,
    ]);
    assert.strictEqual(uuidVersionValidation(v6UuidBuffer), 'v6');
  });

  it('should return v7 for a version 7 UUID', () => {
    const v7UuidArray = [
      '018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1',
      '018fd8fa-0b50-7a6d-8f25-5b12ce7a9032',
      '018fd8fb-1122-7a9e-92d8-0cfe134ae487',
      '018fd8fc-22d1-7ace-b321-4c92d7bb5fa6',
      '018fd8fd-33e0-7af0-a054-d8e8bcf76e9c',
    ];
    for (const v7Uuid of v7UuidArray) {
      assert.strictEqual(uuidVersionValidation(v7Uuid), 'v7');
    }
  });

  it('should return v7 for a version 7 UUID buffer', () => {
    const v7UuidBuffer = Buffer.from([
      0x01, 0x8f, 0xd8, 0xf9, 0x8c, 0x00, 0x7a, 0x4c, 0x8a, 0x47, 0x1a, 0x6d, 0x4b, 0x90, 0xf3,
      0xa1,
    ]);
    assert.strictEqual(uuidVersionValidation(v7UuidBuffer), 'v7');
  });

  it('should return v8 for a version 8 UUID', () => {
    const v8UuidArray = [
      'd8a1c4e2-12f3-8a4b-91de-5f63bc7a249e',
      'e9b2d5f3-23a4-8b5c-82ef-6a74cd8b35af',
      'fab3e6d4-34b5-8c6d-93f0-7b85de9c46b0',
      '0bc4f7e5-45c6-8d7e-a401-8c96efa357c1',
      '1cd508f6-56d7-8e8f-b512-9da7f0b468d2',
    ];
    for (const v8Uuid of v8UuidArray) {
      assert.strictEqual(uuidVersionValidation(v8Uuid), 'v8');
    }
  });

  it('should return v8 for a version 8 UUID buffer', () => {
    const v8UuidBuffer = Buffer.from([
      0xd8, 0xa1, 0xc4, 0xe2, 0x12, 0xf3, 0x8a, 0x4b, 0x91, 0xde, 0x5f, 0x63, 0xbc, 0x7a, 0x24,
      0x9e,
    ]);
    assert.strictEqual(uuidVersionValidation(v8UuidBuffer), 'v8');
  });

  it('should return NilUUID for the nil UUID', () => {
    const NilUUIDArray = [
      '00000000-0000-0000-0000-000000000000',
      '00000000-0000-0000-0000-000000000000',
      '00000000-0000-0000-0000-000000000000',
      '00000000-0000-0000-0000-000000000000',
      '00000000-0000-0000-0000-000000000000',
    ];
    for (const NilUUID of NilUUIDArray) {
      assert.strictEqual(uuidVersionValidation(NilUUID), 'NilUUID');
    }
  });

  it('should return NilUUID for the nil UUID buffer', () => {
    const nilUuidBuffer = Buffer.from([
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00,
    ]);
    assert.strictEqual(uuidVersionValidation(nilUuidBuffer), 'NilUUID');
  });

  it('should return MaxUUID for the max UUID', () => {
    const MaxUUIDArray = [
      'ffffffff-ffff-ffff-ffff-ffffffffffff',
      'ffffffff-ffff-ffff-ffff-ffffffffffff',
      'ffffffff-ffff-ffff-ffff-ffffffffffff',
      'ffffffff-ffff-ffff-ffff-ffffffffffff',
      'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF',
    ];
    for (const MaxUUID of MaxUUIDArray) {
      assert.strictEqual(uuidVersionValidation(MaxUUID), 'MaxUUID');
    }
  });

  it('should return MaxUUID for the max UUID buffer', () => {
    const maxUuidBuffer = Buffer.from([
      0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
      0xff,
    ]);
    assert.strictEqual(uuidVersionValidation(maxUuidBuffer), 'MaxUUID');
  });

  it('should return undefined for an invalid UUID', () => {
    const invalidUuidArray = [
      '018fd8f9-8c00-a4c-8a47-1a6ds4b90f3a1',
      '018fd8f9-8c0a4c-8a47-1a6ds4b90f3a1',
      '018fd8fb-1122-9e-92d8-0cfe134ae487',
      '018fd8fc-22d1-hace-b321-4c9Ss2d7bb5fa6',
      '018fd8fc-22d1-dfce-b321-4c9Ss2d7bb5fa6',
    ];
    for (const inUiud of invalidUuidArray) {
      assert.strictEqual(uuidVersionValidation(inUiud), undefined);
    }
  });

  it('should return undefined for malformed buffers', () => {
    // Test with short buffers that will produce malformed strings
    const shortBuffer = Buffer.from([0x01, 0x02, 0x03]);
    assert.strictEqual(uuidVersionValidation(shortBuffer), undefined);

    // Test with empty buffer
    const emptyBuffer = Buffer.alloc(0);
    assert.strictEqual(uuidVersionValidation(emptyBuffer), undefined);
  });

  it('should handle string vs buffer equivalence for all UUID versions', () => {
    const testCases = [
      {
        version: 'v1',
        buffer: Buffer.from([
          0xcc, 0x86, 0x37, 0x58, 0xb7, 0x14, 0x11, 0xf0, 0xb5, 0x76, 0xc5, 0x86, 0xe8, 0x61, 0x91,
          0x34,
        ]),
        string: 'cc863758-b714-11f0-b576-c586e8619134',
      },
      {
        version: 'v2',
        buffer: Buffer.from([
          0xe2, 0xa1, 0xf3, 0xc4, 0x1d, 0x23, 0x21, 0xf2, 0x8f, 0x56, 0xab, 0xcd, 0xef, 0x12, 0x34,
          0x56,
        ]),
        string: 'e2a1f3c4-1d23-21f2-8f56-abcdef123456',
      },
      {
        version: 'v3',
        buffer: Buffer.from([
          0x43, 0x84, 0xb2, 0x7d, 0x26, 0x98, 0x3c, 0xad, 0x8e, 0xcd, 0x2b, 0x80, 0x4a, 0x6d, 0xc8,
          0x03,
        ]),
        string: '4384b27d-2698-3cad-8ecd-2b804a6dc803',
      },
      {
        version: 'v4',
        buffer: Buffer.from([
          0x8d, 0x5d, 0x59, 0xa0, 0xb6, 0x0b, 0x4e, 0x2b, 0x9d, 0x67, 0x7c, 0x5a, 0xb5, 0x3f, 0x9e,
          0x5b,
        ]),
        string: '8d5d59a0-b60b-4e2b-9d67-7c5ab53f9e5b',
      },
      {
        version: 'v5',
        buffer: Buffer.from([
          0xa4, 0xb1, 0x04, 0x51, 0x0b, 0xda, 0x50, 0x91, 0x84, 0xd4, 0x4e, 0xcc, 0xef, 0xb8, 0xbc,
          0x64,
        ]),
        string: 'a4b10451-0bda-5091-84d4-4eccefb8bc64',
      },
      {
        version: 'v6',
        buffer: Buffer.from([
          0x1e, 0x2f, 0x3a, 0x4b, 0x5c, 0x6d, 0x6f, 0x78, 0x90, 0xab, 0xcd, 0xef, 0x12, 0x34, 0x56,
          0x78,
        ]),
        string: '1e2f3a4b-5c6d-6f78-90ab-cdef12345678',
      },
      {
        version: 'v7',
        buffer: Buffer.from([
          0x01, 0x8f, 0xd8, 0xf9, 0x8c, 0x00, 0x7a, 0x4c, 0x8a, 0x47, 0x1a, 0x6d, 0x4b, 0x90, 0xf3,
          0xa1,
        ]),
        string: '018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1',
      },
      {
        version: 'v8',
        buffer: Buffer.from([
          0xd8, 0xa1, 0xc4, 0xe2, 0x12, 0xf3, 0x8a, 0x4b, 0x91, 0xde, 0x5f, 0x63, 0xbc, 0x7a, 0x24,
          0x9e,
        ]),
        string: 'd8a1c4e2-12f3-8a4b-91de-5f63bc7a249e',
      },
      {
        version: 'NilUUID',
        buffer: Buffer.from([
          0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
          0x00,
        ]),
        string: '00000000-0000-0000-0000-000000000000',
      },
      {
        version: 'MaxUUID',
        buffer: Buffer.from([
          0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
          0xff,
        ]),
        string: 'ffffffff-ffff-ffff-ffff-ffffffffffff',
      },
    ];

    for (const testCase of testCases) {
      // Both buffer and string should return the same result
      const bufferResult = uuidVersionValidation(testCase.buffer);
      const stringResult = uuidVersionValidation(testCase.string);

      assert.strictEqual(
        bufferResult,
        testCase.version,
        `Buffer test failed for ${testCase.version}`
      );
      assert.strictEqual(
        stringResult,
        testCase.version,
        `String test failed for ${testCase.version}`
      );
      assert.strictEqual(bufferResult, stringResult, `Results don't match for ${testCase.version}`);
    }
  });
});
