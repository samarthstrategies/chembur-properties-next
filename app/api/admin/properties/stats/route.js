import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Property from "@/models/Property";

export async function GET() {
  try {
    await connectDB();

    const [
      total,
      residential,
      commercial,
      featured,
      winGold,
      premium,
      draft,
      recentProperties,
    ] = await Promise.all([
      Property.countDocuments(),
      Property.countDocuments({ category: "Residential" }),
      Property.countDocuments({ category: "Commercial" }),
      Property.countDocuments({ isFeatured: true }),
      Property.countDocuments({ "badges.isWinGold": true }),
      Property.countDocuments({ "badges.isPremium": true }),
      Property.countDocuments({ isDraft: true }),
      Property.find().sort({ createdAt: -1 }).limit(5).select("title category pricing.salePrice createdAt isDraft").lean(),
    ]);

    return NextResponse.json({
      success: true,
      data: { total, residential, commercial, featured, winGold, premium, draft, recentProperties },
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
