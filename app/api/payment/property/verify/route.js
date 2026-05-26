import { NextResponse } from "next/server";
import crypto from "crypto";
import { connectDB } from "@/lib/mongodb";
import PropertyAccess from "@/models/PropertyAccess";

export async function POST(request) {
  try {
    await connectDB();
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, propertyId, name, phone, email } =
      await request.json();

    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return NextResponse.json(
        { success: false, message: "Payment details are required" },
        { status: 400 }
      );
    }

    // Verify Razorpay signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest("hex");

    if (expectedSignature !== razorpaySignature) {
      return NextResponse.json(
        { success: false, message: "Payment verification failed" },
        { status: 400 }
      );
    }

    // Generate access token and set expiry (24 hours)
    const accessToken = crypto.randomUUID();
    const accessExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    // Update PropertyAccess record
    const accessRecord = await PropertyAccess.findOneAndUpdate(
      { razorpayOrderId },
      {
        razorpayPaymentId,
        razorpaySignature,
        accessGranted: true,
        accessToken,
        accessExpiresAt,
        name: name || undefined,
        phone: phone || undefined,
        email: email || undefined,
        propertyId: propertyId || undefined,
      },
      { new: true, upsert: true }
    );

    return NextResponse.json({
      success: true,
      accessToken: accessRecord.accessToken,
      message: "Payment verified",
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
