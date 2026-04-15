//URL-safe encryption/decryption utilities for sensitive IDs

//Secret key for encryption - in production, store this in environment variables
const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY;

/**
 * Generate a cryptographic key from the secret
 */
async function getKey(): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const keyMaterial = encoder.encode(ENCRYPTION_KEY);

  // Hash the key material to get a consistent 256-bit key
  const keyHash = await crypto.subtle.digest('SHA-256', keyMaterial);

  return crypto.subtle.importKey(
    'raw',
    keyHash,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

/**
 * Encrypt a string value (e.g., application ID)
 * Returns a URL-safe base64 string
 */
export async function encryptId(value: string): Promise<string> {
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(value);

    // Generate a random IV (Initialization Vector)
    const iv = crypto.getRandomValues(new Uint8Array(12));

    const key = await getKey();

    // Encrypt the data
    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      data
    );

    // Combine IV and encrypted data
    const combined = new Uint8Array(iv.length + encrypted.byteLength);
    combined.set(iv, 0);
    combined.set(new Uint8Array(encrypted), iv.length);

    // Convert to URL-safe base64
    return btoa(String.fromCharCode(...combined))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt ID');
  }
}

/**
 * Decrypt an encrypted ID back to original value
 * @param encryptedValue URL-safe base64 encrypted string
 */
export async function decryptId(encryptedValue: string): Promise<string> {
  try {
    // Convert from URL-safe base64 back to regular base64
    let base64 = encryptedValue
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    // Add padding if needed
    while (base64.length % 4) {
      base64 += '=';
    }

    // Decode base64 to binary
    const binary = atob(base64);
    const combined = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      combined[i] = binary.charCodeAt(i);
    }

    // Extract IV (first 12 bytes) and encrypted data (rest)
    const iv = combined.slice(0, 12);
    const encrypted = combined.slice(12);

    const key = await getKey();

    // Decrypt the data
    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      encrypted
    );

    const decoder = new TextDecoder();
    return decoder.decode(decrypted);
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Failed to decrypt ID');
  }
}

/**
 * Synchronous fallback using simple obfuscation (less secure, but works without async)
 * Only use this if you need synchronous operation
 */
export function obfuscateId(value: string): string {
  const encoded = btoa(unescape(encodeURIComponent(value)));
  return encoded
    .split('')
    .reverse()
    .join('')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

/**
 * Deobfuscate a value that was obfuscated with obfuscateId
 */
export function deobfuscateId(obfuscated: string): string {
  try {
    const reversed = obfuscated
      .replace(/-/g, '+')
      .replace(/_/g, '/')
      .split('')
      .reverse()
      .join('');

    // Add padding if needed
    let padded = reversed;
    while (padded.length % 4) {
      padded += '=';
    }

    return decodeURIComponent(escape(atob(padded)));
  } catch (error) {
    console.error('Deobfuscation error:', error);
    throw new Error('Failed to deobfuscate ID');
  }
}
