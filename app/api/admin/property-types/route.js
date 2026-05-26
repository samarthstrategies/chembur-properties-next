import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import PropertyType from "@/models/PropertyType";
import slugify from "slugify";

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const filter = {};
    if (searchParams.get("category")) filter.category = searchParams.get("category");
    const types = await PropertyType.find(filter).sort({ name: 1 }).lean();
    return NextResponse.json({ success: true, data: types });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const { name, category } = await request.json();
    if (!name || !category) {
      return NextResponse.json({ success: false, message: "name and category are required" }, { status: 400 });
    }
    const slug = slugify(name, { lower: true, strict: true });
    const type = await PropertyType.create({ name, category, slug });
    return NextResponse.json({ success: true, data: type }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
