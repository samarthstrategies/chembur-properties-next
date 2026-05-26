import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Podcast from "@/models/Podcast";

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const skip = (page - 1) * limit;

    const filter = { isDraft: false };
    if (searchParams.get("isFeatured") === "true") filter.isFeatured = true;
    if (searchParams.get("propertyId")) filter.linkedPropertyId = searchParams.get("propertyId");

    const [podcasts, total] = await Promise.all([
      Podcast.find(filter)
        .select("-videoUrl") // Hide video URL in list
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Podcast.countDocuments(filter),
    ]);

    return NextResponse.json({
      success: true,
      data: { podcasts, total, page, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
