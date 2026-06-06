import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

/**
 * POST /api/admin/upload
 * This route handles SERVER-SIDE deletion and returns a signed upload URL/params
 * for client-side direct uploads to Cloudinary.
 *
 * For actual file upload, the client uses Cloudinary's Upload Widget or
 * fetch directly to https://api.cloudinary.com/v1_1/{cloud}/upload
 * with the upload_preset (unsigned).
 *
 * Body for GET signature: { folder, publicId? }
 * Body for DELETE: { publicId } via DELETE method
 */

// POST — Generate a signed upload signature for secure client-side uploads
export async function POST(request) {
  try {
    const { folder = "chemburproperties/gallery", publicId } = await request.json();

    const validFolders = [
      "chemburproperties/gallery",
      "chemburproperties/featured",
      "chemburproperties/floorplans",
      "chemburproperties/podcasts",
      "chemburproperties/realtors",
    ];

    if (!validFolders.includes(folder)) {
      return NextResponse.json({ success: false, message: "Invalid folder" }, { status: 400 });
    }

    const timestamp = Math.round(new Date().getTime() / 1000);
    const paramsToSign = {
      timestamp,
      folder,
      ...(publicId ? { public_id: publicId } : {}),
    };

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET
    );

    return NextResponse.json({
      success: true,
      data: {
        signature,
        timestamp,
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        folder,
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// DELETE — Delete a file from Cloudinary by publicId
export async function DELETE(request) {
  try {
    const { publicId } = await request.json();
    if (!publicId) {
      return NextResponse.json({ success: false, message: "publicId is required" }, { status: 400 });
    }

    const result = await cloudinary.uploader.destroy(publicId);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
