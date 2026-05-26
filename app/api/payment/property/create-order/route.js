import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { connectDB } from "@/lib/mongodb";
import Property from "@/models/Property";
import PropertyAccess from "@/models/PropertyAccess";

export async function POST(request) {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || "",
      key_secret: process.env.RAZORPAY_KEY_SECRET || "",
    });

    await connectDB();
    const { propertyId, name, phone, email } = await request.json();

    if (!propertyId || !name || !phone) {
      return NextResponse.json(
        { success: false, message: "propertyId, name, and phone are required" },
        { status: 400 }
      );
    }

    const property = await Property.findById(propertyId).lean();
    if (!property) {
      return NextResponse.json({ success: false, message: "Property not found" }, { status: 404 });
    }

    if (!property.propertyAccess?.isLocked) {
      return NextResponse.json({ success: false, message: "This property is not locked" }, { status: 400 });
    }

    const amount = property.propertyAccess.price * 100; // Convert to paise
    const receipt = `prop_${property.propertyId || property._id}_${Date.now()}`;

    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt,
    });

    // Save pending PropertyAccess record
    await PropertyAccess.create({
      propertyId: property._id,
      name,
      phone,
      email,
      amountPaid: property.propertyAccess.price,
      razorpayOrderId: order.id,
      accessGranted: false,
    });

    return NextResponse.json({
      success: true,
      data: {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        propertyTitle: property.title,
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
