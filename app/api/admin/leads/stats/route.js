import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";

export async function GET() {
  try {
    await connectDB();
    const [total, newLeads, contacted, converted, notInterested, recentLeads] =
      await Promise.all([
        Lead.countDocuments(),
        Lead.countDocuments({ status: "New" }),
        Lead.countDocuments({ status: "Contacted" }),
        Lead.countDocuments({ status: "Converted" }),
        Lead.countDocuments({ status: "Not Interested" }),
        Lead.find()
          .sort({ createdAt: -1 })
          .limit(5)
          .populate("propertyId", "title")
          .lean(),
      ]);

    return NextResponse.json({
      success: true,
      data: {
        total,
        new: newLeads,
        contacted,
        converted,
        notInterested,
        recentLeads,
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
