import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Property from "@/models/Property";
import slugify from "slugify";

// GET /api/admin/properties
export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const filter = {};
    if (searchParams.get("category")) filter.category = searchParams.get("category");
    if (searchParams.get("isWinGold") === "true") filter["badges.isWinGold"] = true;
    if (searchParams.get("isPremium") === "true") filter["badges.isPremium"] = true;
    if (searchParams.get("isFeatured") === "true") filter.isFeatured = true;
    if (searchParams.get("isDraft") !== null && searchParams.get("isDraft") !== "")
      filter.isDraft = searchParams.get("isDraft") === "true";
    if (searchParams.get("location")) filter.location = searchParams.get("location");
    if (searchParams.get("search")) {
      filter.$or = [
        { title: { $regex: searchParams.get("search"), $options: "i" } },
        { propertyId: { $regex: searchParams.get("search"), $options: "i" } },
      ];
    }

    const [properties, total] = await Promise.all([
      Property.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Property.countDocuments(filter),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        properties,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// POST /api/admin/properties
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    if (!body.title || !body.category) {
      return NextResponse.json(
        { success: false, message: "title and category are required" },
        { status: 400 }
      );
    }

    // Auto-generate slug and propertyId
    const slug = slugify(body.title, { lower: true, strict: true });
    const propertyId = `RH-${Date.now()}-property`;

    const property = await Property.create({ ...body, slug, propertyId });
    return NextResponse.json({ success: true, data: property }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
