import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Feature from "@/models/Feature";
import slugify from "slugify";

export async function GET() {
  try {
    await connectDB();
    const features = await Feature.find().sort({ name: 1 }).lean();
    return NextResponse.json({ success: true, data: features });
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
    const feature = await Feature.create({ name, slug });
    return NextResponse.json({ success: true, data: feature }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
