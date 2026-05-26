import { NextResponse } from "next/server";
import { generateToken, setAuthCookie } from "@/lib/auth";

export async function POST(request) {
  try {
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
