const SIGNATURE_PREFIX = "sha256=";

export async function verifyMetaSignature(
  body: ArrayBuffer,
  signatureHeader: string | null,
  appSecret: string,
) {
  if (!signatureHeader || !signatureHeader.startsWith(SIGNATURE_PREFIX)) {
    return false;
  }

  const signatureHex = signatureHeader.slice(SIGNATURE_PREFIX.length);
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(appSecret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const mac = await crypto.subtle.sign("HMAC", key, body);
  const computed = toHex(new Uint8Array(mac));

  return timingSafeEqual(computed, signatureHex);
}

function toHex(bytes: Uint8Array) {
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeEqual(a: string, b: string) {
  if (a.length !== b.length) {
    return false;
  }

  let result = 0;
  for (let i = 0; i < a.length; i += 1) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return result === 0;
}
