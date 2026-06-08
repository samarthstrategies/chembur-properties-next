import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";

export async function POST(request) {
  try {
    const { phone, otp, name, propertyId } = await request.json();

    if (!phone || !otp || !name) {
      return NextResponse.json(
        { success: false, message: "Phone, OTP, and Name are required" },
        { status: 400 }
      );
    }

    const authKey = process.env.MSG91_AUTH_KEY;
    
    // 1. Verify OTP with MSG91
    if (authKey) {
      const mobileNumber = phone.length === 10 ? `91${phone}` : phone;
      const url = `https://control.msg91.com/api/v5/otp/verify?otp=${otp}&mobile=${mobileNumber}`;
      
      const msg91Res = await fetch(url, {
        method: 'GET', // MSG91 verify is typically a GET request
        headers: {
          'authkey': authKey
        }
      });
      
      const data = await msg91Res.json();
      
      if (data.type === 'error') {
        return NextResponse.json({ success: false, message: data.message || "Invalid OTP" }, { status: 400 });
      }
    } else {
      // Mock verification
      if (!otp || otp.length === 0) {
        return NextResponse.json({ success: false, message: "Invalid OTP" }, { status: 400 });
      }
      console.warn("MSG91 Credentials not found. Mocking OTP verification.");
    }

    // 2. Capture Lead in Database
    await connectDB();
    
    // Check if we already have a lead for this exact property and phone
    const existingLead = await Lead.findOne({ phone, propertyId });
    
    if (!existingLead && propertyId) {
      await Lead.create({
        name,
        phone,
        propertyId,
        source: "OTP_Unlock",
        status: "New"
      });
    } else if (!propertyId) {
      // If no property ID, just capture the lead generally
      const existingGeneral = await Lead.findOne({ phone, propertyId: null });
      if (!existingGeneral) {
         await Lead.create({
          name,
          phone,
          source: "OTP_Unlock",
          status: "New"
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
