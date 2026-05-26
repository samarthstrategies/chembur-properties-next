import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Location from "@/models/Location";
import slugify from "slugify";

export async function GET() {
  try {
    await connectDB();
    const locations = await Location.find().sort({ name: 1 }).lean();
    return NextResponse.json({ success: true, data: locations });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const { name } = await request.json();
    if (!name) return NextResponse.json({ success: false, message: "name is required" }, { status: 400 });
    const slug = slugify(name, { lower: true, strict: true });
    const location = await Location.create({ name, slug });
    return NextResponse.json({ success: true, data: location }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
