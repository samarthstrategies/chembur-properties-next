import { SignJWT, jwtVerify } from "jose";
// Force hot-reload to sync JWT_SECRET across runtimes

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_change_in_production";
const secretKey = new TextEncoder().encode(JWT_SECRET);
const COOKIE_NAME = "admin_token";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days in seconds

/**
 * Generate a JWT token for the admin
 * @param {object} payload
 * @returns {Promise<string>} token
 */
export async function generateToken(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(secretKey);
}

/**
 * Verify a JWT token
 * @param {string} token
 * @returns {Promise<object|null>} decoded payload or null
 */
export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload;
  } catch {
    return null;
  }
}

/**
 * Set the admin_token httpOnly cookie on a NextResponse
 * @param {import("next/server").NextResponse} response
 * @param {string} token
 */
export function setAuthCookie(response, token) {
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: MAX_AGE,
    path: "/",
  });
}

/**
 * Clear the admin_token cookie on a NextResponse
 * @param {import("next/server").NextResponse} response
 */
export function clearAuthCookie(response) {
  response.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0,
    path: "/",
  });
}

/**
 * Extract the admin_token from an incoming NextRequest
 * @param {import("next/server").NextRequest} request
 * @returns {string|null}
 */
export function getTokenFromRequest(request) {
  return request.cookies.get(COOKIE_NAME)?.value || null;
}
