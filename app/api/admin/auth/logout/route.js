import { NextResponse } from "next/server";
import { clearAuthCookie } from "@/lib/auth";

export async function POST() {
  try {
    const response = NextResponse.json(
      { success: true, message: "Logged out" },
      { status: 200 }
    );
    clearAuthCookie(response);
    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
