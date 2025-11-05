import assert from 'node:assert';
import { describe, it } from 'node:test';
import { uuidVersionValidation } from './index.js';

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

  // Tests for the new optional versionNumber parameter
  describe('with versionNumber parameter', () => {
    it('should return true when UUID matches the specified version number', () => {
      // Test v1 UUID with versionNumber 1
      assert.strictEqual(uuidVersionValidation('cc863758-b714-11f0-b576-c586e8619134', 1), true);

      // Test v4 UUID with versionNumber 4
      assert.strictEqual(uuidVersionValidation('8d5d59a0-b60b-4e2b-9d67-7c5ab53f9e5b', 4), true);

      // Test v7 UUID with versionNumber 7
      assert.strictEqual(uuidVersionValidation('018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1', 7), true);
    });

    it('should return false when UUID does not match the specified version number', () => {
      // Test v1 UUID with versionNumber 4 (should be false)
      assert.strictEqual(uuidVersionValidation('cc863758-b714-11f0-b576-c586e8619134', 4), false);

      // Test v4 UUID with versionNumber 7 (should be false)
      assert.strictEqual(uuidVersionValidation('8d5d59a0-b60b-4e2b-9d67-7c5ab53f9e5b', 7), false);

      // Test v7 UUID with versionNumber 1 (should be false)
      assert.strictEqual(uuidVersionValidation('018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1', 1), false);
    });

    it('should test all version numbers with their corresponding UUIDs', () => {
      const testCases = [
        { uuid: 'cc863758-b714-11f0-b576-c586e8619134', version: 1 }, // v1
        { uuid: 'e2a1f3c4-1d23-21f2-8f56-abcdef123456', version: 2 }, // v2
        { uuid: '4384b27d-2698-3cad-8ecd-2b804a6dc803', version: 3 }, // v3
        { uuid: '8d5d59a0-b60b-4e2b-9d67-7c5ab53f9e5b', version: 4 }, // v4
        { uuid: 'a4b10451-0bda-5091-84d4-4eccefb8bc64', version: 5 }, // v5
        { uuid: '1e2f3a4b-5c6d-6f78-90ab-cdef12345678', version: 6 }, // v6
        { uuid: '018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1', version: 7 }, // v7
        { uuid: 'd8a1c4e2-12f3-8a4b-91de-5f63bc7a249e', version: 8 }, // v8
      ];

      for (const { uuid, version } of testCases) {
        // Should return true for matching version
        assert.strictEqual(
          uuidVersionValidation(uuid, version),
          true,
          `UUID ${uuid} should match version ${version}`
        );

        // Should return false for non-matching versions
        const otherVersions = [1, 2, 3, 4, 5, 6, 7, 8].filter((v) => v !== version);
        for (const otherVersion of otherVersions) {
          assert.strictEqual(
            uuidVersionValidation(uuid, otherVersion),
            false,
            `UUID ${uuid} should not match version ${otherVersion}`
          );
        }
      }
    });

    it('should return undefined for invalid UUIDs even with versionNumber parameter', () => {
      const invalidUuids = [
        'invalid-uuid',
        '018fd8f9-8c00-a4c-8a47-1a6ds4b90f3a1',
        'not-a-uuid-at-all',
      ];

      for (const invalidUuid of invalidUuids) {
        for (const version of [1, 2, 3, 4, 5, 6, 7, 8]) {
          assert.strictEqual(
            uuidVersionValidation(invalidUuid, version),
            undefined,
            `Invalid UUID ${invalidUuid} should return undefined even with version ${version}`
          );
        }
      }
    });

    it('should handle special UUIDs (Nil and Max) with versionNumber parameter', () => {
      const nilUuid = '00000000-0000-0000-0000-000000000000';
      const maxUuid = 'ffffffff-ffff-ffff-ffff-ffffffffffff';

      // Nil and Max UUIDs don't match the regex pattern (no valid version),
      // so they fall through to the special case handling and return their special values
      for (const version of [1, 2, 3, 4, 5, 6, 7, 8]) {
        assert.strictEqual(
          uuidVersionValidation(nilUuid, version),
          'NilUUID',
          `Nil UUID with version parameter ${version} should return 'NilUUID'`
        );
        assert.strictEqual(
          uuidVersionValidation(maxUuid, version),
          'MaxUUID',
          `Max UUID with version parameter ${version} should return 'MaxUUID'`
        );
      }
    });
  });
});
