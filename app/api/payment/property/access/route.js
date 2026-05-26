import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import PropertyAccess from "@/models/PropertyAccess";
import Property from "@/models/Property";

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const propertySlug = searchParams.get("propertySlug");
    const accessToken = searchParams.get("accessToken");

    if (!propertySlug || !accessToken) {
      return NextResponse.json(
        { success: false, message: "propertySlug and accessToken are required" },
        { status: 400 }
      );
    }

    // Find the property first
    const property = await Property.findOne({ slug: propertySlug, isDraft: false }).lean();
    if (!property) {
      return NextResponse.json({ success: false, message: "Property not found" }, { status: 404 });
    }

    // Find the access record
    const accessRecord = await PropertyAccess.findOne({ accessToken }).lean();

    if (!accessRecord) {
      return NextResponse.json({ success: false, message: "Access denied or expired" }, { status: 403 });
    }

    if (!accessRecord.accessGranted) {
      return NextResponse.json({ success: false, message: "Access not granted" }, { status: 403 });
    }

    if (new Date() > new Date(accessRecord.accessExpiresAt)) {
      return NextResponse.json({ success: false, message: "Access denied or expired" }, { status: 403 });
    }

    if (accessRecord.propertyId.toString() !== property._id.toString()) {
      return NextResponse.json({ success: false, message: "Access denied or expired" }, { status: 403 });
    }

    // All checks passed — return full property
    return NextResponse.json({
      success: true,
      data: { ...property, isLocked: false },
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
