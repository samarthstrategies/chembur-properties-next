import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Podcast from "@/models/Podcast";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const podcast = await Podcast.findOne({ slug: params.slug, isDraft: false }).lean();

    if (!podcast) {
      return NextResponse.json({ success: false, message: "Podcast not found" }, { status: 404 });
    }

    // Locked podcast — hide videoUrl
    if (podcast.accessType === "lead_unlock" || podcast.accessType === "paid") {
      const { videoUrl, ...safePodcast } = podcast;
      void videoUrl; // suppress unused var
      return NextResponse.json({
        success: true,
        data: {
          ...safePodcast,
          isLocked: true,
          accessType: podcast.accessType,
          price: podcast.price,
        },
      });
    }

    // Free podcast — return full data
    return NextResponse.json({
      success: true,
      data: { ...podcast, isLocked: false },
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
