import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Location from "@/models/Location";
import slugify from "slugify";

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { name } = await request.json();
    const slug = slugify(name, { lower: true, strict: true });
    const location = await Location.findByIdAndUpdate(params.id, { name, slug }, { new: true });
    if (!location) return NextResponse.json({ success: false, message: "Location not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: location });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const location = await Location.findByIdAndDelete(params.id);
    if (!location) return NextResponse.json({ success: false, message: "Location not found" }, { status: 404 });
    return NextResponse.json({ success: true, message: "Location deleted" });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
