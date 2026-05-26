import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const lead = await Lead.findById(params.id)
      .populate("propertyId")
      .populate("podcastId")
      .lean();
    if (!lead) return NextResponse.json({ success: false, message: "Lead not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: lead });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { status } = await request.json();
    const validStatuses = ["New", "Contacted", "Converted", "Not Interested"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ success: false, message: "Invalid status" }, { status: 400 });
    }
    const lead = await Lead.findByIdAndUpdate(params.id, { status }, { new: true });
    if (!lead) return NextResponse.json({ success: false, message: "Lead not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: lead });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
