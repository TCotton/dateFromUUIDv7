/**
 * Type guard function to check if a value is a Buffer.
 * This function narrows the type of the input value to Buffer if it passes the check.
 * @param {unknown} value - The value to check.
 * @returns {value is Buffer} True if the value is a Buffer, false otherwise.
 */
export const isBuffer = (value: unknown): value is Buffer => Buffer.isBuffer(value);
