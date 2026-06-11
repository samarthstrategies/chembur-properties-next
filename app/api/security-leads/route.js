import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import SecurityLead from "@/models/SecurityLead";

// POST /api/security-leads
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    
    // Validate required fields
    const { societyName, secretaryName, contactNumber } = body;
    if (!societyName || !secretaryName || !contactNumber) {
      return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 });
    }

    const lead = await SecurityLead.create({
      societyName,
      secretaryName,
      contactNumber,
      status: "New"
    });

    return NextResponse.json({ success: true, data: lead }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
