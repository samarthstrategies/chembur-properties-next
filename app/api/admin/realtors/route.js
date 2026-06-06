import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Realtor from "@/models/Realtor";

export async function GET() {
  try {
    await connectDB();
    const realtors = await Realtor.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: realtors });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const payload = await request.json();
    if (!payload.name) return NextResponse.json({ success: false, message: "name is required" }, { status: 400 });
    const realtor = await Realtor.create(payload);
    return NextResponse.json({ success: true, data: realtor }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
