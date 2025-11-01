import assert from 'node:assert';
import { describe, it } from 'node:test';
import { dateFromUUIDv7 } from './index.js';

describe('dateFromUUIDv7', () => {

    it('returns null if not a string', () => {
        // Test number
        const number = 1234567890;
        assert.strictEqual(dateFromUUIDv7(number), null);

        // Test boolean (true)
        const booleanTrue = true;
        assert.strictEqual(dateFromUUIDv7(booleanTrue), null);

        // Test boolean (false)
        const booleanFalse = false;
        assert.strictEqual(dateFromUUIDv7(booleanFalse), null);

        // Test null
        const nullValue = null;
        assert.strictEqual(dateFromUUIDv7(nullValue), null);

        // Test undefined
        const undefinedValue = undefined;
        assert.strictEqual(dateFromUUIDv7(undefinedValue), null);

        // Test object
        const object = { key: 'value' };
        assert.strictEqual(dateFromUUIDv7(object), null);

        // Test array
        const array = [1, 2, 3];
        assert.strictEqual(dateFromUUIDv7(array), null);

        // Test function
        const func = () => 'test';
        assert.strictEqual(dateFromUUIDv7(func), null);

        // Test Date object
        const date = new Date();
        assert.strictEqual(dateFromUUIDv7(date), null);

        // Test RegExp
        const regex = /test/;
        assert.strictEqual(dateFromUUIDv7(regex), null);

        // Test Symbol
        const symbol = Symbol('test');
        assert.strictEqual(dateFromUUIDv7(symbol), null);

        // Test BigInt
        const bigint = BigInt(123);
        assert.strictEqual(dateFromUUIDv7(bigint), null);

        // Test empty array
        const emptyArray: unknown[] = [];
        assert.strictEqual(dateFromUUIDv7(emptyArray), null);

        // Test empty object
        const emptyObject = {};
        assert.strictEqual(dateFromUUIDv7(emptyObject), null);
    })

    it('returns null if not a HEX string', () => {
        // Test string with non-hex characters
        const notAHex = 'not-a-hex';
        assert.strictEqual(dateFromUUIDv7(notAHex), null);

        // Test string with special characters
        const specialChars = '!@#$%^&*()';
        assert.strictEqual(dateFromUUIDv7(specialChars), null);

        // Test string with spaces
        const withSpaces = '123 456 789';
        assert.strictEqual(dateFromUUIDv7(withSpaces), null);

        // Test string with letters outside hex range (g-z)
        const nonHexLetters = 'ghijklmnopqrstuvwxyz';
        assert.strictEqual(dateFromUUIDv7(nonHexLetters), null);

        // Test string with mixed valid hex and invalid characters
        const mixedChars = '123abc-xyz-789';
        assert.strictEqual(dateFromUUIDv7(mixedChars), null);

        // Test empty string
        const emptyString = '';
        assert.strictEqual(dateFromUUIDv7(emptyString), null);

        // Test string with only spaces
        const onlySpaces = '   ';
        assert.strictEqual(dateFromUUIDv7(onlySpaces), null);

        // Test string with newlines and tabs
        const whitespace = 'abc\n123\t456';
        assert.strictEqual(dateFromUUIDv7(whitespace), null);

        // Test string with unicode characters
        const unicode = '123αβγ456';
        assert.strictEqual(dateFromUUIDv7(unicode), null);

        // Test string with emojis
        const emojis = '123🚀456🎉';
        assert.strictEqual(dateFromUUIDv7(emojis), null);

        // Test string with numbers and punctuation
        const numbersAndPunctuation = '123.456,789';
        assert.strictEqual(dateFromUUIDv7(numbersAndPunctuation), null);

        // Test string with uppercase and lowercase mixed with invalid chars
        const mixedCase = 'AbC123XyZ';
        assert.strictEqual(dateFromUUIDv7(mixedCase), null);

        // Test string that looks like UUID but has invalid characters
        const fakeUuid = '018cc251-f400-7000-8000-00000000000g';
        assert.strictEqual(dateFromUUIDv7(fakeUuid), null);

        // Test string with underscores
        const withUnderscores = '123_abc_def';
        assert.strictEqual(dateFromUUIDv7(withUnderscores), null);

        // Test string with plus and minus signs
        const withSigns = '+123-abc';
        assert.strictEqual(dateFromUUIDv7(withSigns), null);
    });

    it('returns null if HEX string length is not 32 characters long', ()=> {
        const tooShort = '1234567890abcdef'; // 16 characters
        assert.strictEqual(dateFromUUIDv7(tooShort), null);

        const tooLong = '1234567890abcdef1234567890abcdef12'; // 34 characters
        assert.strictEqual(dateFromUUIDv7(tooLong), null);
    })

    it('throws an error with a message of \'The entered UUID appears to be V1, but a UUIDv7 is required.\'', () => {
        const v1UuidArray = [
            'cc863758-b714-11f0-b576-c586e8619134',
            'cc863b72-b714-11f0-b576-c586e8619134',
            'cc863e74-b714-11f0-b576-c586e8619134',
            'cc863f64-b714-11f0-b576-c586e8619134',
            'cc864036-b714-11f0-b576-c586e8619134'
        ];
        
        // Test each UUID v1 in the array
        for (const v1Uuid of v1UuidArray) {
            assert.throws(() => dateFromUUIDv7(v1Uuid), {
                name: 'Error',
                message: 'The entered UUID appears to be V1, but a UUIDv7 is required.'
            });
        }
    })

    it('throws an error with a message of \'The entered UUID appears to be V2, but a UUIDv7 is required.\'', () => {
        const v2UuidArray = [
            'e2a1f3c4-1d23-21f2-8f56-abcdef123456',
            'f1b2d4e5-2e34-21a3-9c78-123456abcdef',
            'a3c4b5d6-3f45-21b4-8a12-789abc456def',
            'b4d5e6f7-4a56-21c5-8b34-456def123abc',
            'c5e6f7a8-5b67-21d6-9d56-abcdef789123'
        ]

        // Test each UUID v2 in the array
        for (const v2Uuid of v2UuidArray) {
            assert.throws(() => dateFromUUIDv7(v2Uuid), {
                name: 'Error',
                message: 'The entered UUID appears to be V2, but a UUIDv7 is required.'
            });
        }
    })

    it('throws an error with a message of \'The entered UUID appears to be V3, but a UUIDv7 is required.\'', () => {
        const v3UuidArray = [
            '4384b27d-2698-3cad-8ecd-2b804a6dc803',
            '4b5e4949-1838-35cd-97f8-1cea76b9c9e0',
            'ff202ab9-4510-3381-b982-8e3f20311b59',
            '6387c277-391f-3c16-8b52-3cd7847aa443',
            '375c7f49-7604-34e6-bf90-42a8d83affa8'
        ];

        // Test each UUID v2 in the array
        for (const v3Uuid of v3UuidArray) {
            assert.throws(() => dateFromUUIDv7(v3Uuid), {
                name: 'Error',
                message: 'The entered UUID appears to be V3, but a UUIDv7 is required.'
            });
        }
    })


        /*   it.skip('dateFromUUIDv7 - extracts date from valid UUIDv7', () => {
               // UUIDv7 with timestamp for 2024-01-01T00:00:00.000Z
               // Timestamp: 1704067200000 (0x018cc251f400)
               const uuid = '018cc251-f400-7000-8000-000000000000';
               const date = dateFromUUIDv7(uuid);

               assert.strictEqual(date.getTime(), 1704067200000);
           });

           it('dateFromUUIDv7 - throws error for invalid UUID format', () => {
               const invalidUuid = 'not-a-uuid';

               assert.throws(() => dateFromUUIDv7(invalidUuid), {
                   name: 'Error',
                   message: 'Invalid UUIDv7 format',
               });
           });

           it('dateFromUUIDv7 - throws error for non-UUIDv7 (wrong version)', () => {
               // UUID with version 4 instead of 7
               const uuidv4 = '018cfdf8-8000-4000-8000-000000000000';

               assert.throws(() => dateFromUUIDv7(uuidv4), {
                   name: 'Error',
                   message: 'Invalid UUIDv7 format',
               });
           });

           it.skip('dateFromUUIDv7 - handles different timestamps correctly', () => {
               // Timestamp: 1700000000000 (0x018bcfe56800)
               const uuid = '018bcfe5-6800-7000-8000-000000000000';
               const date = dateFromUUIDv7(uuid);

               assert.strictEqual(date.getTime(), 1700000000000);
           });*/

})
