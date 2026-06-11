import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Designer from "@/models/Designer";

// GET /api/admin/designers
export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const isActive = searchParams.get("isActive");

    let query = {};
    if (isActive !== null) {
      query.isActive = isActive === "true";
    }

    const designers = await Designer.find(query).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: designers });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// POST /api/admin/designers
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const designer = await Designer.create(body);
    return NextResponse.json({ success: true, data: designer }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
