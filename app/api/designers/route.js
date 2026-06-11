import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Designer from "@/models/Designer";

// GET /api/designers
export async function GET() {
  try {
    await connectDB();

    const query = {
      isActive: true,
      subscriptionExpiry: { $gt: new Date() }
    };

    const designers = await Designer.find(query)
      .select("businessName ownerName phone whatsapp profilePhoto specialization area isFeatured")
      .sort({ isFeatured: -1, createdAt: -1 })
      .limit(5)
      .lean();

    return NextResponse.json({ success: true, data: designers });
  } catch (error) {
    // Fail silently on public API
    return NextResponse.json({ success: true, data: [] });
  }
}
