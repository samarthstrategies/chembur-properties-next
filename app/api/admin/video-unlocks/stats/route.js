import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import VideoUnlock from "@/models/VideoUnlock";

export async function GET() {
  try {
    await connectDB();

    const [totalUnlocks, paidUnlocks, leadUnlocks, revenueResult] = await Promise.all([
      VideoUnlock.countDocuments(),
      VideoUnlock.countDocuments({ unlockType: "paid" }),
      VideoUnlock.countDocuments({ unlockType: "lead_unlock" }),
      VideoUnlock.aggregate([
        { $match: { unlockType: "paid" } },
        { $group: { _id: null, total: { $sum: "$amountPaid" } } },
      ]),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        totalUnlocks,
        paidUnlocks,
        leadUnlocks,
        totalRevenue: revenueResult[0]?.total || 0,
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
