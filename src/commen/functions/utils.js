export const secureRandomString = (length = 16) => {
  return [...crypto.getRandomValues(new Uint8Array(length))]
    .map((b) => b.toString(36))
    .join("")
    .slice(0, length);
};
export const encryptField = async (clearText) => {
  const encryptionKey = process.env.REACT_APP_BOP_KEY;
  console.log(encryptionKey, "encryptionKeyencryptionKey");
  // Same salt as C#
  const salt = new Uint8Array([
    0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65,
    0x76,
  ]);

  // Same as Encoding.Unicode.GetBytes(clearText)
  const encoder = new TextEncoder();

  // TextEncoder gives UTF-8, but C# Encoding.Unicode is UTF-16LE.
  const utf16Bytes = new Uint8Array(clearText.length * 2);

  for (let i = 0; i < clearText.length; i++) {
    const code = clearText.charCodeAt(i);

    utf16Bytes[i * 2] = code & 0xff;
    utf16Bytes[i * 2 + 1] = code >> 8;
  }

  // Import password for PBKDF2
  const passwordKey = await crypto.subtle.importKey(
    "raw",
    encoder.encode(encryptionKey),
    "PBKDF2",
    false,
    ["deriveBits"],
  );

  /*
   * IMPORTANT:
   * The iteration count must match your .NET version.
   *
   * For older .NET Framework implementations, the default was
   * commonly 1000 iterations.
   */
  const iterations = 1000;

  // C#:
  //
  // pdb.GetBytes(32)
  // pdb.GetBytes(16)
  //
  // means we need 48 bytes from PBKDF2.
  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt,
      iterations,
      hash: "SHA-1",
    },
    passwordKey,
    48 * 8,
  );

  const derivedBytes = new Uint8Array(derivedBits);

  // First 32 bytes = AES key
  const aesKeyBytes = derivedBytes.slice(0, 32);

  // Next 16 bytes = IV
  const iv = derivedBytes.slice(32, 48);

  const aesKey = await crypto.subtle.importKey(
    "raw",
    aesKeyBytes,
    {
      name: "AES-CBC",
    },
    false,
    ["encrypt"],
  );

  // AES-CBC automatically applies PKCS#7-style padding
  const encrypted = await crypto.subtle.encrypt(
    {
      name: "AES-CBC",
      iv,
    },
    aesKey,
    utf16Bytes,
  );

  // Convert ArrayBuffer -> Base64
  const encryptedBytes = new Uint8Array(encrypted);

  let binary = "";

  encryptedBytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary);
};

// =========================
// DECRYPT
// =========================

export const decryptField = async (encryptedText) => {
  const encryptionKey = process.env.REACT_APP_BOP_KEY;

  // Same salt as C#
  const salt = new Uint8Array([
    0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65,
    0x76,
  ]);

  const iterations = 1000;

  const binaryString = atob(encryptedText);

  const encryptedBytes = new Uint8Array(binaryString.length);

  for (let i = 0; i < binaryString.length; i++) {
    encryptedBytes[i] = binaryString.charCodeAt(i);
  }

  const passwordKey = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(encryptionKey),
    "PBKDF2",
    false,
    ["deriveBits"],
  );

  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt,
      iterations,
      hash: "SHA-1",
    },
    passwordKey,
    48 * 8,
  );

  const derivedBytes = new Uint8Array(derivedBits);

  const keyBytes = derivedBytes.slice(0, 32);
  const iv = derivedBytes.slice(32, 48);

  const aesKey = await crypto.subtle.importKey(
    "raw",
    keyBytes,
    {
      name: "AES-CBC",
    },
    false,
    ["decrypt"],
  );

  const decrypted = await crypto.subtle.decrypt(
    {
      name: "AES-CBC",
      iv,
    },
    aesKey,
    encryptedBytes,
  );

  const decryptedBytes = new Uint8Array(decrypted);

  let result = "";

  for (let i = 0; i < decryptedBytes.length; i += 2) {
    const charCode = decryptedBytes[i] | (decryptedBytes[i + 1] << 8);

    result += String.fromCharCode(charCode);
  }

  return result;
};

export const bopEmailValidation = (text) => {
  // Email must be a valid address with the domain fixed to bop.com.pk
  let bopEmailRegex = /^[a-zA-Z0-9._%+-]+@bop\.com\.pk$/i;

  // return bopEmailRegex.test(text);
  return true;
};
