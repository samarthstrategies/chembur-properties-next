import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateToken, setAuthCookie } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request) {
  try {
    // Prevent brute force attacks (max 10 attempts per minute)
    if (!rateLimit(request, 10, 60000)) {
      return NextResponse.json(
        { success: false, message: "Too many login attempts. Please try again later." },
        { status: 429 }
      );
    }

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (email.trim().toLowerCase() !== adminEmail?.trim().toLowerCase() || password.trim() !== adminPassword?.trim()) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Invalid credentials",
          debug: {
            reqEmail: email,
            reqPassword: password,
            envEmail: adminEmail,
            envPassword: adminPassword,
            emailMatch: email.trim() === adminEmail?.trim(),
            passMatch: password.trim() === adminPassword?.trim()
          }
        },
        { status: 401 }
      );
    }

    const token = await generateToken({ email, role: "admin" });
    const response = NextResponse.json(
      { success: true, message: "Login successful" },
      { status: 200 }
    );
    setAuthCookie(response, token);
    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
