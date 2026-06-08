import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";

export async function POST(request) {
  try {
    const { name, phone, propertyId } = await request.json();

    if (!name || !phone || !propertyId) {
      return NextResponse.json(
        { success: false, message: "Name, phone, and propertyId are required" },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if we already have a lead for this exact property and phone
    const existingLead = await Lead.findOne({ phone, propertyId });

    if (!existingLead) {
      await Lead.create({
        name,
        phone,
        propertyId,
        source: "Silent_Property_View",
        status: "New"
      });
    }

    return NextResponse.json({ success: true, message: "Silent lead captured" });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
