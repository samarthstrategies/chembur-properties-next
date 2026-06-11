import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import SecurityLead from "@/models/SecurityLead";

// PUT /api/admin/security-leads/[id]
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const body = await request.json();
    
    const lead = await SecurityLead.findByIdAndUpdate(
      params.id,
      { status: body.status },
      { new: true, runValidators: true }
    );
    
    if (!lead) {
      return NextResponse.json({ success: false, message: "Lead not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: lead });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
