import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";
import VideoUnlock from "@/models/VideoUnlock";
import Podcast from "@/models/Podcast";

export async function POST(request) {
  try {
    await connectDB();
    const { name, phone, email, propertyId, podcastId } = await request.json();

    if (!name || !phone) {
      return NextResponse.json({ success: false, message: "name and phone are required" }, { status: 400 });
    }

    if (!podcastId) {
      return NextResponse.json({ success: false, message: "podcastId is required" }, { status: 400 });
    }

    const podcast = await Podcast.findById(podcastId).lean();
    if (!podcast) {
      return NextResponse.json({ success: false, message: "Podcast not found" }, { status: 404 });
    }

    if (podcast.accessType !== "lead_unlock") {
      return NextResponse.json(
        { success: false, message: "This podcast requires payment to unlock" },
        { status: 403 }
      );
    }

    // Save lead and video unlock in parallel
    await Promise.all([
      Lead.create({
        name, phone, email,
        propertyId: propertyId || undefined,
        podcastId,
        unlockType: "lead_unlock",
        status: "New",
        source: "podcast_unlock",
      }),
      VideoUnlock.create({
        name, phone, email,
        propertyId: propertyId || undefined,
        podcastId,
        unlockType: "lead_unlock",
      }),
    ]);

    return NextResponse.json({
      success: true,
      videoUrl: podcast.videoUrl,
      message: "Unlocked successfully",
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
