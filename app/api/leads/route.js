import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";

export async function POST(request) {
  try {
    await connectDB();
    const { name, phone, email, propertyId, source } = await request.json();

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, message: "name and phone are required" },
        { status: 400 }
      );
    }

    await Lead.create({
      name,
      phone,
      email,
      propertyId: propertyId || undefined,
      source: source || "contact_form",
      status: "New",
    });

    return NextResponse.json({
      success: true,
      message: "Thank you, we will contact you soon",
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
