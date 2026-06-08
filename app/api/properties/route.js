import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Property from "@/models/Property";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const skip = (page - 1) * limit;

    const filter = { isDraft: false };

    if (searchParams.get("category")) filter.category = searchParams.get("category");
    if (searchParams.get("type")) {
      const types = searchParams.get("type").split(",");
      filter.propertyStatus = { $in: types };
    }
    if (searchParams.get("propertyType")) filter.propertyType = { $in: [searchParams.get("propertyType")] };
    if (searchParams.get("location")) filter.location = { $in: [searchParams.get("location")] };
    if (searchParams.get("isWinGold") === "true") filter["badges.isWinGold"] = true;
    if (searchParams.get("isPremium") === "true") filter["badges.isPremium"] = true;
    if (searchParams.get("isFeatured") === "true") filter.isFeatured = true;
    if (searchParams.get("bedrooms")) filter["specs.bedrooms"] = parseInt(searchParams.get("bedrooms"));

    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    if (minPrice || maxPrice) {
      filter["pricing.salePrice"] = {};
      if (minPrice) filter["pricing.salePrice"].$gte = parseInt(minPrice);
      if (maxPrice) filter["pricing.salePrice"].$lte = parseInt(maxPrice);
    }

    if (searchParams.get("search")) {
      filter.$or = [
        { title: { $regex: searchParams.get("search"), $options: "i" } },
        { location: { $in: [new RegExp(searchParams.get("search"), "i")] } },
      ];
    }

    // Only return safe public fields (no full description for listing)
    const publicFields = {
      title: 1, slug: 1, excerpt: 1, category: 1, propertyType: 1,
      propertyStatus: 1, location: 1, pricing: 1, specs: 1,
      "media.featuredImage": 1, "media.galleryImages": 1,
      "media.propertyVideoUrl": 1, badges: 1, isFeatured: 1,
      "propertyAccess.isLocked": 1, "propertyAccess.price": 1,
      "propertyAccess.accessType": 1, tags: 1, viewCount: 1,
      propertyId: 1, createdAt: 1,
    };

    const [properties, total] = await Promise.all([
      Property.find(filter, publicFields).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Property.countDocuments(filter),
    ]);

    return NextResponse.json({
      success: true,
      data: { properties, total, page, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
