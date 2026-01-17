/**
 * Timer utility for tests
 * Useful for waiting on animations or async operations
 */
export const timer = {
  /**
   * Wait for specified milliseconds
   * @param ms - Milliseconds to wait
   */
  wait: (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },
};

export default timer;
