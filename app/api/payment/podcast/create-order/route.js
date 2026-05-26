import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { connectDB } from "@/lib/mongodb";
import Podcast from "@/models/Podcast";

export async function POST(request) {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || "",
      key_secret: process.env.RAZORPAY_KEY_SECRET || "",
    });

    await connectDB();
    const { podcastId, name, phone } = await request.json();

    if (!podcastId || !name || !phone) {
      return NextResponse.json(
        { success: false, message: "podcastId, name, and phone are required" },
        { status: 400 }
      );
    }

    const podcast = await Podcast.findById(podcastId).lean();
    if (!podcast) {
      return NextResponse.json({ success: false, message: "Podcast not found" }, { status: 404 });
    }

    if (podcast.accessType !== "paid") {
      return NextResponse.json(
        { success: false, message: "This podcast does not require payment" },
        { status: 400 }
      );
    }

    const amount = podcast.price * 100; // Convert to paise
    const receipt = `podcast_${podcast._id}_${Date.now()}`;

    const order = await razorpay.orders.create({ amount, currency: "INR", receipt });

    return NextResponse.json({
      success: true,
      data: {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        podcastTitle: podcast.title,
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
