import assert from 'node:assert';
import { describe, it } from 'node:test';
import { dateFromUUIDv7 } from './dateFromUUIDv7.js';

describe('dateFromUUIDv7', () => {
  it('throws an error if not a valid UUID format', () => {
    // Test string with non-hex characters
    const notAHex = 'not-a-hex';
    assert.throws(() => dateFromUUIDv7(notAHex), {
      name: 'Error',
      message: 'Fails to match UUID format. Please check the input and try again.',
    });

    // Test string with special characters
    const specialChars = '!@#$%^&*()';
    assert.throws(() => dateFromUUIDv7(specialChars), {
      name: 'Error',
      message: 'Fails to match UUID format. Please check the input and try again.',
    });

    // Test string with spaces
    const withSpaces = '123 456 789';
    assert.throws(() => dateFromUUIDv7(withSpaces), {
      name: 'Error',
      message: 'Fails to match UUID format. Please check the input and try again.',
    });

    // Test string with letters outside hex range (g-z)
    const nonHexLetters = 'ghijklmnopqrstuvwxyz';
    assert.throws(() => dateFromUUIDv7(nonHexLetters), {
      name: 'Error',
      message: 'Fails to match UUID format. Please check the input and try again.',
    });

    // Test string with mixed valid hex and invalid characters
    const mixedChars = '123abc-xyz-789';
    assert.throws(() => dateFromUUIDv7(mixedChars), {
      name: 'Error',
      message: 'Fails to match UUID format. Please check the input and try again.',
    });

    // Test empty string
    const emptyString = '';
    assert.throws(() => dateFromUUIDv7(emptyString), {
      name: 'Error',
      message: 'Fails to match UUID format. Please check the input and try again.',
    });

    // Test string with only spaces
    const onlySpaces = '   ';
    assert.throws(() => dateFromUUIDv7(onlySpaces), {
      name: 'Error',
      message: 'Fails to match UUID format. Please check the input and try again.',
    });

    // Test string with newlines and tabs
    const whitespace = 'abc\n123\t456';
    assert.throws(() => dateFromUUIDv7(whitespace), {
      name: 'Error',
      message: 'Fails to match UUID format. Please check the input and try again.',
    });

    // Test string with unicode characters
    const unicode = '123αβγ456';
    assert.throws(() => dateFromUUIDv7(unicode), {
      name: 'Error',
      message: 'Fails to match UUID format. Please check the input and try again.',
    });

    // Test string with emojis
    const emojis = '123🚀456🎉';
    assert.throws(() => dateFromUUIDv7(emojis), {
      name: 'Error',
      message: 'Fails to match UUID format. Please check the input and try again.',
    });

    // Test string with numbers and punctuation
    const numbersAndPunctuation = '123.456,789';
    assert.throws(() => dateFromUUIDv7(numbersAndPunctuation), {
      name: 'Error',
      message: 'Fails to match UUID format. Please check the input and try again.',
    });

    // Test string with uppercase and lowercase mixed with invalid chars
    const mixedCase = 'AbC123XyZ';
    assert.throws(() => dateFromUUIDv7(mixedCase), {
      name: 'Error',
      message: 'Fails to match UUID format. Please check the input and try again.',
    });

    // Test string that looks like UUID but has invalid characters
    const fakeUuid = '018cc251-f400-7000-8000-00000000000g';
    assert.throws(() => dateFromUUIDv7(fakeUuid), {
      name: 'Error',
      message: 'Fails to match UUID format. Please check the input and try again.',
    });

    // Test string with underscores
    const withUnderscores = '123_abc_def';
    assert.throws(() => dateFromUUIDv7(withUnderscores), {
      name: 'Error',
      message: 'Fails to match UUID format. Please check the input and try again.',
    });

    // Test string with plus and minus signs
    const withSigns = '+123-abc';
    assert.throws(() => dateFromUUIDv7(withSigns), {
      name: 'Error',
      message: 'Fails to match UUID format. Please check the input and try again.',
    });
  });

  it("throws an error with a message of 'The entered UUID appears to be V1, but a UUIDv7 is required.'", () => {
    const v1UuidArray = [
      'cc863758-b714-11f0-b576-c586e8619134',
      'cc863b72-b714-11f0-b576-c586e8619134',
      'cc863e74-b714-11f0-b576-c586e8619134',
      'cc863f64-b714-11f0-b576-c586e8619134',
      'cc864036-b714-11f0-b576-c586e8619134',
    ];

    // Test each UUID v1 in the array
    for (const v1Uuid of v1UuidArray) {
      assert.throws(() => dateFromUUIDv7(v1Uuid), {
        name: 'Error',
        message: 'The entered UUID appears to be V1, but a UUIDv7 is required.',
      });
    }
  });

  it("throws an error with a message of 'The entered UUID appears to be V2, but a UUIDv7 is required.'", () => {
    const v2UuidArray = [
      'e2a1f3c4-1d23-21f2-8f56-abcdef123456',
      'f1b2d4e5-2e34-21a3-9c78-123456abcdef',
      'a3c4b5d6-3f45-21b4-8a12-789abc456def',
      'b4d5e6f7-4a56-21c5-8b34-456def123abc',
      'c5e6f7a8-5b67-21d6-9d56-abcdef789123',
    ];

    // Test each UUID v2 in the array
    for (const v2Uuid of v2UuidArray) {
      assert.throws(() => dateFromUUIDv7(v2Uuid), {
        name: 'Error',
        message: 'The entered UUID appears to be V2, but a UUIDv7 is required.',
      });
    }
  });

  it("throws an error with a message of 'The entered UUID appears to be V3, but a UUIDv7 is required.'", () => {
    const v3UuidArray = [
      '4384b27d-2698-3cad-8ecd-2b804a6dc803',
      '4b5e4949-1838-35cd-97f8-1cea76b9c9e0',
      'ff202ab9-4510-3381-b982-8e3f20311b59',
      '6387c277-391f-3c16-8b52-3cd7847aa443',
      '375c7f49-7604-34e6-bf90-42a8d83affa8',
    ];

    // Test each UUID v3 in the array
    for (const v3Uuid of v3UuidArray) {
      assert.throws(() => dateFromUUIDv7(v3Uuid), {
        name: 'Error',
        message: 'The entered UUID appears to be V3, but a UUIDv7 is required.',
      });
    }
  });

  it("throws an error with a message of 'The entered UUID appears to be V4, but a UUIDv7 is required.'", () => {
    const v4UuidArray = [
      '8d5d59a0-b60b-4e2b-9d67-7c5ab53f9e5b',
      'ad2f0b7c-5c76-4f48-8f5a-9f2bba3a5f3a',
      '1f3e4b8b-6a12-4f0d-b6b9-29879dbd63f1',
      'be17d42a-2e5e-4c44-a6ef-12b1b01931a7',
      'c34b1ed2-90df-45e2-95c3-6c293de72dbe',
    ];

    // Test each UUID v4 in the array
    for (const v4Uuid of v4UuidArray) {
      assert.throws(() => dateFromUUIDv7(v4Uuid), {
        name: 'Error',
        message: 'The entered UUID appears to be V4, but a UUIDv7 is required.',
      });
    }
  });

  it("throws an error with a message of 'The entered UUID appears to be V5, but a UUIDv7 is required.'", () => {
    const v5UuidArray = [
      'a4b10451-0bda-5091-84d4-4eccefb8bc64',
      '2fc64824-7f44-57aa-8e5e-51e39c5d4ff8',
      'b4f1f73c-87a4-5715-8357-261a89d26005',
      '2d36c929-9466-52aa-9588-16f4515b6a92',
      '15215d4a-dfdb-5361-a44a-b1d97db0a8b1',
    ];
    // Test each UUID v5 in the array
    for (const v5Uuid of v5UuidArray) {
      assert.throws(() => dateFromUUIDv7(v5Uuid), {
        name: 'Error',
        message: 'The entered UUID appears to be V5, but a UUIDv7 is required.',
      });
    }
  });

  it("throws an error with a message of 'The entered UUID appears to be V6, but a UUIDv7 is required.'", () => {
    const v6UuidArray = [
      '1e2f3a4b-5c6d-6f78-90ab-cdef12345678',
      '2a3b4c5d-6e7f-6a8b-91cd-0123456789ab',
      '3c4d5e6f-7a8b-6b9c-92de-abcdef012345',
      '4d5e6f7a-8b9c-6c0d-93ef-1234567890ab',
      '5e6f7a8b-9c0d-6d1e-94f0-abcdef123456',
    ];
    // Test each UUID v6 in the array
    for (const v6Uuid of v6UuidArray) {
      assert.throws(() => dateFromUUIDv7(v6Uuid), {
        name: 'Error',
        message: 'The entered UUID appears to be V6, but a UUIDv7 is required.',
      });
    }
  });

  it('returns a date object for valid UUIDv7', () => {
    const uuidv7 = '018fd8fa-02d5-7c9a-8fb9-45d938b8f091';
    const result = dateFromUUIDv7(uuidv7);

    assert.ok(result !== null);
    assert.ok(typeof result === 'object');
    assert.ok('dateToIsoString' in result);
    assert.ok('dateUTCTime' in result);
  });

  it('returns a date object for valid UUIDv7 and correct timestamp extraction', () => {
    const uuidv7 = '018fd8fa-02d5-7c9a-8fb9-45d938b8f091';
    const result = dateFromUUIDv7(uuidv7);

    // Test that it returns the correct object structure
    assert.ok(result !== null);
    assert.ok(typeof result === 'object');

    // Test the timestamp value
    assert.strictEqual(result?.dateUTCTime, 1717332214485);

    // Test the ISO string representation
    assert.strictEqual(result?.dateToIsoString, '2024-06-02T12:43:34.485Z');
  });

  it('returns a Date object for valid UUIDv7 in an array and correct timestamp extraction', () => {
    const v7UuidTestCases = [
      {
        uuid: '018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1',
        expectedTimestamp: 1717332184064,
        expectedISO: '2024-06-02T12:43:04.064Z',
      },
      {
        uuid: '018fd8fa-0b50-7a6d-8f25-5b12ce7a9032',
        expectedTimestamp: 1717332216656,
        expectedISO: '2024-06-02T12:43:36.656Z',
      },
      {
        uuid: '018fd8fb-1122-7a9e-92d8-0cfe134ae487',
        expectedTimestamp: 1717332283682,
        expectedISO: '2024-06-02T12:44:43.682Z',
      },
      {
        uuid: '018fd8fc-22d1-7ace-b321-4c92d7bb5fa6',
        expectedTimestamp: 1717332353745,
        expectedISO: '2024-06-02T12:45:53.745Z',
      },
      {
        uuid: '018fd8fd-33e0-7af0-a054-d8e8bcf76e9c',
        expectedTimestamp: 1717332423648,
        expectedISO: '2024-06-02T12:47:03.648Z',
      },
    ];

    // Test each UUID v7 in the array
    for (const testCase of v7UuidTestCases) {
      const result = dateFromUUIDv7(testCase.uuid);

      // Test that it returns the correct object structure
      assert.ok(result !== null);
      assert.ok(typeof result === 'object');

      // Test that the timestamp is extracted correctly
      assert.strictEqual(result?.dateUTCTime, testCase.expectedTimestamp);

      // Test the ISO string representation
      assert.strictEqual(result?.dateToIsoString, testCase.expectedISO);
    }
  });
});
