import assert from 'node:assert';
import { describe, it } from 'node:test';
import { uuidRegex } from './uuidRegex.js';

describe('uuidRegex', () => {
  it('correctly identifies valid UUIDs', () => {
    const validUuids = [
      'cc863758-b714-11f0-b576-c586e8619134',
      'f1b2d4e5-2e34-21a3-9c78-123456abcdef',
      '4384b27d-2698-3cad-8ecd-2b804a6dc803',
      '8d5d59a0-b60b-4e2b-9d67-7c5ab53f9e5b',
      'a4b10451-0bda-5091-84d4-4eccefb8bc64',
      '1e2f3a4b-5c6d-6f78-90ab-cdef12345678',
      '018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1',
      'd8a1c4e2-12f3-8a4b-91de-5f63bc7a249e',
    ];
    for (const uuid of validUuids) {
      assert.notStrictEqual(uuidRegex(uuid), null);
    }
  });
  it('correctly identifies invalid UUIDs', () => {
    const invalidUuids = [
      'cc863758b71411f0b576c586e8619134',
      'not-a-hex',
      'cc863758-b714-11f0-b576-c586e8619134g',
      'cc863758-b714-11f0-b576-c586e8619134asdfa',
      'd8a1c4e212f38a4b91de5f63bc7a249e',
    ];
    for (const uuid of invalidUuids) {
      assert.strictEqual(uuidRegex(uuid), null);
    }
  });
});
