import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Designer from "@/models/Designer";
import cloudinary from "@/lib/cloudinary";

// PUT /api/admin/designers/[id]
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const body = await request.json();
    const designer = await Designer.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );
    if (!designer) {
      return NextResponse.json({ success: false, message: "Designer not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: designer });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// DELETE /api/admin/designers/[id]
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const designer = await Designer.findById(params.id).lean();
    if (!designer) {
      return NextResponse.json({ success: false, message: "Designer not found" }, { status: 404 });
    }

    // Delete associated Cloudinary profile photo
    if (designer.profilePhoto) {
      try {
        const parts = designer.profilePhoto.split("/");
        // Extract filename and folder (assuming typical structure like /chemburproperties/designers/abc.jpg)
        const filename = parts[parts.length - 1].split(".")[0];
        const folder = parts.length > 1 ? parts[parts.length - 2] : null;
        if (folder && folder !== "upload") {
           await cloudinary.uploader.destroy(`${folder}/${filename}`);
        } else {
           // Fallback for different URL structure
           await cloudinary.uploader.destroy(filename);
        }
      } catch (err) {
        console.error("Cloudinary deletion failed:", err);
      }
    }

    await Designer.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true, message: "Designer deleted" });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
