import crypto from "crypto";

// Other variables
const hashingAlg = "sha256";
const encryptionAlg = "aes-256-cbc";

export const encrypt = (data: string) => {
  // Create the initial vector
  const initVector = crypto.randomBytes(16).toString("hex");

  // Get the encryption key
  const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
  if (ENCRYPTION_KEY === undefined)
    return "Cannot read ENCRYPTION_KEY because its undefined";

  // Hash the Encryption key to 32 bytes
  const hashedEncryptionKey = crypto
    .createHash(hashingAlg)
    .update(ENCRYPTION_KEY)
    .digest("hex");

  // Hash the initial vector and slice it to 16 bytes
  const hashedInitVector = crypto
    .createHash(hashingAlg)
    .update(initVector)
    .digest("hex")
    .slice(0, 16);

  // Convert encryption key to buffer format
  const bufferEncryptionKey = Buffer.from(hashedEncryptionKey, "hex");

  // Convert initial vector to Buffer format
  const bufferInitialVector = Buffer.from(hashedInitVector);

  // Create cipher
  const cipher = crypto.createCipheriv(
    encryptionAlg,
    bufferEncryptionKey,
    bufferInitialVector
  );

  // Encrypt the data
  const encryptedData =
    cipher.update(data, "utf-8", "hex") + cipher.final("hex");

  return `${initVector}:${encryptedData}`;
};

export const decrypt = (data: string) => {
  // Get the initial vector and data
  const encryptedData = data.split(":")[1];
  const initialVector = data.split(":")[0];

  // Get the encryption key
  const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
  if (ENCRYPTION_KEY === undefined)
    return "Cannot read ENCRYPTION_KEY because its undefined";

  // Hash and slice initial vector to 16 bytes
  const hashedInitVector = crypto
    .createHash(hashingAlg)
    .update(initialVector)
    .digest("hex")
    .slice(0, 16);

  // Hash encryption key
  const hashedEncryptionKey = crypto
    .createHash(hashingAlg)
    .update(ENCRYPTION_KEY)
    .digest("hex");

  // Convert initial vector to buffer format
  const bufferInitVector = Buffer.from(hashedInitVector);

  // Convert encryption key to Buffer
  const bufferEncryptionKey = Buffer.from(hashedEncryptionKey, "hex");

  // Create decipher
  const decipher = crypto.createDecipheriv(
    encryptionAlg,
    bufferEncryptionKey,
    bufferInitVector
  );

  // Decrypt data
  const decrypted =
    decipher.update(encryptedData, "hex", "utf-8") + decipher.final("utf-8");

  return decrypted;
};
