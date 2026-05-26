import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Podcast from "@/models/Podcast";
import slugify from "slugify";

// GET /api/admin/podcasts
export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const filter = {};
    if (searchParams.get("accessType")) filter.accessType = searchParams.get("accessType");
    if (searchParams.get("isFeatured") === "true") filter.isFeatured = true;
    if (searchParams.get("search")) {
      filter.$or = [
        { title: { $regex: searchParams.get("search"), $options: "i" } },
        { developerName: { $regex: searchParams.get("search"), $options: "i" } },
      ];
    }

    const [podcasts, total] = await Promise.all([
      Podcast.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
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

// POST /api/admin/podcasts
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    if (!body.title) {
      return NextResponse.json({ success: false, message: "title is required" }, { status: 400 });
    }
    const slug = slugify(body.title, { lower: true, strict: true });
    const podcast = await Podcast.create({ ...body, slug });
    return NextResponse.json({ success: true, data: podcast }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
