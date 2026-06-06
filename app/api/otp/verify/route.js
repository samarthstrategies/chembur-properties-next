import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { phone, otp, name } = await request.json();

    if (!phone || !otp || !name) {
      return NextResponse.json(
        { success: false, message: "Phone, OTP, and Name are required" },
        { status: 400 }
      );
    }

    // TODO: Integrate MSG91 verify OTP API here

    // Mock successful OTP verification (accepts any OTP)
    if (otp.length > 0) {
      return NextResponse.json({
        success: true,
        message: "OTP verified successfully (Mocked)",
      });
    }

    return NextResponse.json(
      { success: false, message: "Invalid OTP" },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
