/**
 * Generate a 6-digit code using a cryptographically secure random number generator
 * @returns A 6-digit code as a string
 */
export function generateCode(): string {
  // Generate 3 random bytes
  const randomCode = require('crypto').randomBytes(3);

  // Create a SHA-256 hash of the random bytes
  const hash = require('crypto')
    .createHash('sha256')
    .update(randomCode)
    .digest('hex');

  // Convert the first 6 characters of the hash to an integer and take modulo 1000000 to ensure it's a 6-digit number
  const sixDigits = parseInt(hash.substring(0, 6), 16) % 1000000;

  // Convert the number to a string and pad with leading zeros if necessary to ensure it is 6 digits long
  const code = sixDigits.toString().padStart(6, '0');

  // Return the generated code
  return code;
}
