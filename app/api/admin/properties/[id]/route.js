import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Property from "@/models/Property";
import cloudinary from "@/lib/cloudinary";

// GET /api/admin/properties/[id]
export async function GET(request, { params }) {
  try {
    await connectDB();
    const property = await Property.findById(params.id).lean();
    if (!property) {
      return NextResponse.json({ success: false, message: "Property not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: property });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// PUT /api/admin/properties/[id]
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const body = await request.json();
    const property = await Property.findByIdAndUpdate(
      params.id,
      { ...body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    if (!property) {
      return NextResponse.json({ success: false, message: "Property not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: property });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// DELETE /api/admin/properties/[id]
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const property = await Property.findById(params.id).lean();
    if (!property) {
      return NextResponse.json({ success: false, message: "Property not found" }, { status: 404 });
    }

    // Delete all associated Cloudinary images
    const images = [
      property.media?.featuredImage,
      ...(property.media?.galleryImages || []),
      ...(property.media?.floorPlanImages || []),
    ].filter(Boolean);

    for (const url of images) {
      try {
        const parts = url.split("/");
        const filename = parts[parts.length - 1].split(".")[0];
        const folder = parts[parts.length - 2];
        await cloudinary.uploader.destroy(`${folder}/${filename}`);
      } catch {
        // Continue even if individual deletion fails
      }
    }

    await Property.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true, message: "Property deleted" });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
