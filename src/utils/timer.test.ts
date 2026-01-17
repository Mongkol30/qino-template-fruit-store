import { describe, expect, it } from 'vitest';

import timer from './timer';

describe('utils/timer', () => {
  it('should export wait function', () => {
    expect(timer.wait).toBeDefined();
    expect(typeof timer.wait).toBe('function');
  });

  it('should return a promise', () => {
    const result = timer.wait(0);
    expect(result).toBeInstanceOf(Promise);
  });

  it('should resolve after specified time', async () => {
    const start = Date.now();
    await timer.wait(50);
    const elapsed = Date.now() - start;

    // Allow some tolerance for timing
    expect(elapsed).toBeGreaterThanOrEqual(40);
    expect(elapsed).toBeLessThan(150);
  });

  it('should resolve with void', async () => {
    const result = await timer.wait(0);
    expect(result).toBeUndefined();
  });
});
