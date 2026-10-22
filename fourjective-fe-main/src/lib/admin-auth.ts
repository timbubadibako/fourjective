import crypto from "node:crypto";

const MASTER_PASSWORD = process.env.ADMIN_MASTER_PASSWORD || "fourjective2026";
const SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET ||
  "fourjective-super-secret-key-studio-2026-kuningan-jawabarat";

export const ADMIN_COOKIE_NAME = "fourjective_admin_session";

export function verifyAdminPassword(password: string): boolean {
  if (!password) return false;
  return password.trim() === MASTER_PASSWORD.trim();
}

/**
 * Buat signed token sesi admin sederhana berbasis HMAC
 */
export function createAdminSessionToken(): string {
  const timestamp = Date.now().toString();
  const signature = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(`admin:${timestamp}`)
    .digest("hex");
  return `${timestamp}.${signature}`;
}

/**
 * Verifikasi signed token sesi admin
 */
export function verifyAdminSessionToken(token?: string | null): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [timestamp, signature] = parts;
  const expectedSig = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(`admin:${timestamp}`)
    .digest("hex");

  if (signature !== expectedSig) return false;

  // Sesi berlaku 7 hari (7 * 24 * 60 * 60 * 1000 ms)
  const age = Date.now() - parseInt(timestamp, 10);
  const maxAge = 7 * 24 * 60 * 60 * 1000;
  return age >= 0 && age < maxAge;
}
