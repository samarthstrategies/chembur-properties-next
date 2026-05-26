import { NextResponse } from "next/server";
import crypto from "crypto";
import { connectDB } from "@/lib/mongodb";
import Podcast from "@/models/Podcast";
import VideoUnlock from "@/models/VideoUnlock";
import Lead from "@/models/Lead";

export async function POST(request) {
  try {
    await connectDB();
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, podcastId, name, phone, email } =
      await request.json();

    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return NextResponse.json(
        { success: false, message: "Payment details are required" },
        { status: 400 }
      );
    }

    // Verify Razorpay signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest("hex");

    if (expectedSignature !== razorpaySignature) {
      return NextResponse.json(
        { success: false, message: "Payment verification failed" },
        { status: 400 }
      );
    }

    const podcast = await Podcast.findById(podcastId).lean();
    if (!podcast) {
      return NextResponse.json({ success: false, message: "Podcast not found" }, { status: 404 });
    }

    const accessToken = crypto.randomUUID();

    // Save VideoUnlock and Lead records
    await Promise.all([
      VideoUnlock.create({
        name, phone, email, podcastId,
        unlockType: "paid",
        amountPaid: podcast.price,
        razorpayOrderId,
        razorpayPaymentId,
      }),
      Lead.create({
        name, phone, email, podcastId,
        unlockType: "paid",
        razorpayOrderId,
        razorpayPaymentId,
        amountPaid: podcast.price,
        source: "podcast_paid_unlock",
        status: "New",
      }),
    ]);

    return NextResponse.json({
      success: true,
      videoUrl: podcast.videoUrl,
      accessToken,
      message: "Payment verified",
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
