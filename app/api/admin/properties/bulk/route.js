import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Property from "@/models/Property";
import cloudinary from "@/lib/cloudinary";

// DELETE /api/admin/properties/bulk
export async function DELETE(request) {
  try {
    await connectDB();
    const { ids } = await request.json();

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ success: false, message: "ids array is required" }, { status: 400 });
    }

    // Fetch properties to get Cloudinary public IDs before deletion
    const properties = await Property.find({ _id: { $in: ids } }).lean();

    // Delete Cloudinary assets
    for (const prop of properties) {
      const images = [
        prop.media?.featuredImage,
        ...(prop.media?.galleryImages || []),
        ...(prop.media?.floorPlanImages || []),
      ].filter(Boolean);

      for (const url of images) {
        try {
          // Extract publicId from Cloudinary URL
          const parts = url.split("/");
          const filename = parts[parts.length - 1].split(".")[0];
          const folder = parts[parts.length - 2];
          await cloudinary.uploader.destroy(`${folder}/${filename}`);
        } catch {
          // Continue even if individual deletion fails
        }
      }
    }

    const result = await Property.deleteMany({ _id: { $in: ids } });
    return NextResponse.json({
      success: true,
      data: { deletedCount: result.deletedCount },
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
