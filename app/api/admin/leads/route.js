import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";

// GET /api/admin/leads
export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const filter = {};
    if (searchParams.get("status")) filter.status = searchParams.get("status");
    if (searchParams.get("propertyId")) filter.propertyId = searchParams.get("propertyId");
    if (searchParams.get("search")) {
      const regex = { $regex: searchParams.get("search"), $options: "i" };
      filter.$or = [{ name: regex }, { phone: regex }, { email: regex }];
    }
    if (searchParams.get("startDate") || searchParams.get("endDate")) {
      filter.createdAt = {};
      if (searchParams.get("startDate")) filter.createdAt.$gte = new Date(searchParams.get("startDate"));
      if (searchParams.get("endDate")) filter.createdAt.$lte = new Date(searchParams.get("endDate"));
    }

    const [leads, total] = await Promise.all([
      Lead.find(filter)
        .populate("propertyId", "title propertyId")
        .populate("podcastId", "title")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Lead.countDocuments(filter),
    ]);

    return NextResponse.json({
      success: true,
      data: { leads, total, page, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
