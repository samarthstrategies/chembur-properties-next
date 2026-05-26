import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Property from "@/models/Property";

export async function GET() {
  try {
    await connectDB();
    const properties = await Property.find({ "badges.isPremium": true, isDraft: false })
      .select("title slug excerpt category propertyType propertyStatus location pricing specs media badges propertyAccess propertyId")
      .sort({ createdAt: -1 })
      .limit(8)
      .lean();
    return NextResponse.json({ success: true, data: properties });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
