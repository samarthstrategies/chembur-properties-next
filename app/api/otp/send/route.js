import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { name, phone } = await request.json();

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, message: "Name and phone number are required" },
        { status: 400 }
      );
    }

    // TODO: Integrate MSG91 send OTP API here

    // Mock successful OTP send
    return NextResponse.json({
      success: true,
      message: "OTP sent successfully (Mocked)",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
