import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import VideoUnlock from "@/models/VideoUnlock";

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const filter = {};
    if (searchParams.get("unlockType")) filter.unlockType = searchParams.get("unlockType");
    if (searchParams.get("startDate") || searchParams.get("endDate")) {
      filter.createdAt = {};
      if (searchParams.get("startDate")) filter.createdAt.$gte = new Date(searchParams.get("startDate"));
      if (searchParams.get("endDate")) filter.createdAt.$lte = new Date(searchParams.get("endDate"));
    }

    const [unlocks, total] = await Promise.all([
      VideoUnlock.find(filter)
        .populate("propertyId", "title")
        .populate("podcastId", "title")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      VideoUnlock.countDocuments(filter),
    ]);

    return NextResponse.json({
      success: true,
      data: { unlocks, total, page, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
