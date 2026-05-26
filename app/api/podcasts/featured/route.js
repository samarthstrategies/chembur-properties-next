import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Podcast from "@/models/Podcast";

export async function GET() {
  try {
    await connectDB();
    const podcasts = await Podcast.find({ isFeatured: true, isDraft: false })
      .select("-videoUrl")
      .sort({ createdAt: -1 })
      .limit(4)
      .lean();
    return NextResponse.json({ success: true, data: podcasts });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
