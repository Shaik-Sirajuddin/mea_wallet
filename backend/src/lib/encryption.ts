import bcrypt from "bcrypt";
import { createCipheriv, createDecipheriv, randomBytes } from "crypto";
import { encode } from "hi-base32";

export const encryptPassword = async (rawPassword: string) => {
  return await bcrypt.hash(rawPassword, 10);
};
export const encryptData = async (data: string) => {
  return await bcrypt.hash(data, 10);
};
export const comparePassword = async (
  data: string,
  encryptPassword: string
) => {
  return bcrypt.compareSync(data, encryptPassword);
};

/**
 * Symmetric encryption
 */
const algorithm = "aes-256-cbc";
const key = Buffer.from(process.env.AES_KEY!, "base64");

/**
 * @param iv Buffer or base64 string
 */
export function encryptSym(text: string, iv: Buffer | string): string {
  let decodedIV: Buffer;
  if (typeof iv === "string") {
    decodedIV = Buffer.from(iv, "base64");
  } else {
    decodedIV = iv;
  }
  const cipher = createCipheriv(algorithm, key, decodedIV);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

/**
 * @param iv Buffer or base64 string
 */
export function decryptSym(encryptedText: string, iv: Buffer | string): string {
  let decodedIV: Buffer;
  if (typeof iv === "string") {
    decodedIV = Buffer.from(iv, "base64");
  } else {
    decodedIV = iv;
  }
  const decipher = createDecipheriv(algorithm, key, decodedIV);
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

export function generateTOTPSecret() {
  let bytes = randomBytes(20);
  return encode(bytes).replace(/=/g, "").substring(0, 24);
}
