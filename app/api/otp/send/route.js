import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { name, phone, propertyId } = await request.json();

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, message: "Name and phone number are required" },
        { status: 400 }
      );
    }

    const authKey = process.env.MSG91_AUTH_KEY;
    const templateId = process.env.MSG91_TEMPLATE_ID;

    if (!authKey || !templateId) {
      console.warn("MSG91 Credentials not found in .env.local. Mocking OTP send.");
      // Mock successful OTP send
      return NextResponse.json({
        success: true,
        message: "OTP sent successfully (Mocked)",
      });
    }

    // MSG91 Send OTP API
    // Ensure phone has country code (defaulting to 91 for India if exactly 10 digits)
    const mobileNumber = phone.length === 10 ? `91${phone}` : phone;

    const url = `https://control.msg91.com/api/v5/otp?template_id=${templateId}&mobile=${mobileNumber}`;
    
    const msg91Res = await fetch(url, {
      method: 'POST',
      headers: {
        'authkey': authKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // We can pass extra variables if the template requires them, e.g., name
        name: name
      })
    });

    const data = await msg91Res.json();

    if (data.type === 'error') {
      throw new Error(data.message || 'Failed to send OTP via MSG91');
    }

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
