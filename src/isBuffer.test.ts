import assert from 'node:assert';
import { describe, it } from 'node:test';
import { isBuffer } from './isBuffer.js';

describe('isBuffer', () => {
  it('should return true for Buffer instances', () => {
    const buffer1 = Buffer.from('hello');
    const buffer2 = Buffer.alloc(10);
    const buffer3 = Buffer.allocUnsafe(5);
    const buffer4 = Buffer.from([1, 2, 3, 4, 5]);
    const buffer5 = Buffer.from('test', 'utf8');

    assert.strictEqual(isBuffer(buffer1), true);
    assert.strictEqual(isBuffer(buffer2), true);
    assert.strictEqual(isBuffer(buffer3), true);
    assert.strictEqual(isBuffer(buffer4), true);
    assert.strictEqual(isBuffer(buffer5), true);
  });

  it('should return false for non-Buffer values', () => {
    assert.strictEqual(isBuffer('string'), false);
    assert.strictEqual(isBuffer(123), false);
    assert.strictEqual(isBuffer(true), false);
    assert.strictEqual(isBuffer(false), false);
    assert.strictEqual(isBuffer(null), false);
    assert.strictEqual(isBuffer(undefined), false);
    assert.strictEqual(isBuffer({}), false);
    assert.strictEqual(isBuffer([]), false);
    assert.strictEqual(isBuffer([1, 2, 3]), false);
    assert.strictEqual(isBuffer(new Date()), false);
    assert.strictEqual(isBuffer(/regex/), false);
    assert.strictEqual(
      isBuffer(() => {}),
      false
    );
  });

  it('should return false for Uint8Array (which is similar to Buffer but not a Buffer)', () => {
    const uint8Array = new Uint8Array([1, 2, 3, 4, 5]);
    assert.strictEqual(isBuffer(uint8Array), false);
  });

  it('should return false for ArrayBuffer', () => {
    const arrayBuffer = new ArrayBuffer(8);
    assert.strictEqual(isBuffer(arrayBuffer), false);
  });

  it('should return false for objects that look like buffers', () => {
    const fakeBuffer = {
      type: 'Buffer',
      data: [1, 2, 3],
    };
    const bufferLike = {
      length: 5,
      0: 65,
      1: 66,
      2: 67,
    };

    assert.strictEqual(isBuffer(fakeBuffer), false);
    assert.strictEqual(isBuffer(bufferLike), false);
  });

  it('should work as a type guard', () => {
    const value: unknown = Buffer.from('test');

    if (isBuffer(value)) {
      // Since isBuffer doesn't have proper type guard signature, we need to assert the type
      const buffer = value as Buffer;
      assert.strictEqual(buffer.toString(), 'test');
      assert.strictEqual(typeof buffer.length, 'number');
    } else {
      assert.fail('Expected value to be a Buffer');
    }
  });
  it('should handle edge cases', () => {
    // Empty buffer
    const emptyBuffer = Buffer.alloc(0);
    assert.strictEqual(isBuffer(emptyBuffer), true);

    // Very large buffer
    const largeBuffer = Buffer.alloc(1024 * 1024); // 1MB
    assert.strictEqual(isBuffer(largeBuffer), true);
  });
  it('should handle 16-byte UUID buffer', () => {
    const originalBuf = Buffer.from([
      149, 236, 195, 128, 175, 233, 17, 228, 155, 108, 117, 27, 102, 221, 84, 30,
    ]);

    assert.strictEqual(isBuffer(originalBuf), true);
  });
  it('should handle non-Buffer UUID-like buffers', () => {
    const buf = Buffer.from('95ecc380afe911e49b6c751b66dd541e', 'hex');
    assert.strictEqual(isBuffer(buf), true);
  });
});
