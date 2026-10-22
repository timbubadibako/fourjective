import crypto from "node:crypto";

/**
 * Cloudflare R2 Presigner (Native Node.js Crypto - Zero Extra Packages)
 */
const R2_ACCESS_KEY_ID =
  process.env.R2_ACCESS_KEY_ID || "70d3bdc416f90d3620358da429c41289";

const R2_SECRET_ACCESS_KEY =
  process.env.R2_SECRET_ACCESS_KEY ||
  "0f010baf77e75b18720422b3c30c55d9ed08d094dcdd2478fd48b21fd67b68ef";

const R2_ACCOUNT_ID =
  process.env.R2_ACCOUNT_ID || "94e5d6f0f0d71f25e4c297560fec3ae3";

const R2_BUCKET = process.env.R2_BUCKET || "fourjectiv";

const HOST = `${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;

function hmac(key: Buffer | string, str: string): Buffer {
  return crypto.createHmac("sha256", key).update(str).digest();
}

export function createR2PresignedUrl({
  key,
  method = "GET",
  expiresIn = 3600,
}: {
  key: string;
  method?: "GET" | "PUT" | "DELETE";
  expiresIn?: number;
}): string {
  const now = new Date();
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, "");
  const dateStamp = amzDate.slice(0, 8);
  const credentialScope = `${dateStamp}/auto/s3/aws4_request`;

  const queryParams: [string, string][] = [
    ["X-Amz-Algorithm", "AWS4-HMAC-SHA256"],
    ["X-Amz-Credential", `${R2_ACCESS_KEY_ID}/${credentialScope}`],
    ["X-Amz-Date", amzDate],
    ["X-Amz-Expires", expiresIn.toString()],
    ["X-Amz-SignedHeaders", "host"],
  ];

  queryParams.sort((a, b) => a[0].localeCompare(b[0]));
  const canonicalQuery = queryParams
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join("&");

  const cleanKey = key.replace(/^\/+/, "");
  const canonicalUri = `/${R2_BUCKET}/${cleanKey
    .split("/")
    .map(encodeURIComponent)
    .join("/")}`;
  const canonicalHeaders = `host:${HOST}\n`;
  const signedHeaders = "host";
  const payloadHash = "UNSIGNED-PAYLOAD";

  const canonicalRequest = [
    method,
    canonicalUri,
    canonicalQuery,
    canonicalHeaders,
    signedHeaders,
    payloadHash,
  ].join("\n");

  const algorithm = "AWS4-HMAC-SHA256";
  const stringToSign = [
    algorithm,
    amzDate,
    credentialScope,
    crypto.createHash("sha256").update(canonicalRequest).digest("hex"),
  ].join("\n");

  const kDate = hmac(`AWS4${R2_SECRET_ACCESS_KEY}`, dateStamp);
  const kRegion = hmac(kDate, "auto");
  const kService = hmac(kRegion, "s3");
  const kSigning = hmac(kService, "aws4_request");
  const signature = crypto
    .createHmac("sha256", kSigning)
    .update(stringToSign)
    .digest("hex");

  return `https://${HOST}${canonicalUri}?${canonicalQuery}&X-Amz-Signature=${signature}`;
}
