import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import SecurityLead from "@/models/SecurityLead";

// GET /api/admin/security-leads
export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    let query = {};
    if (status && status !== 'All') {
      query.status = status;
    }
    if (search) {
      query.$or = [
        { societyName: { $regex: search, $options: "i" } },
        { secretaryName: { $regex: search, $options: "i" } },
        { contactNumber: { $regex: search, $options: "i" } },
      ];
    }

    const leads = await SecurityLead.find(query).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: leads });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
