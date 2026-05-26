import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Feature from "@/models/Feature";
import slugify from "slugify";

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { name } = await request.json();
    const slug = slugify(name, { lower: true, strict: true });
    const feature = await Feature.findByIdAndUpdate(params.id, { name, slug }, { new: true });
    if (!feature) return NextResponse.json({ success: false, message: "Feature not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: feature });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const feature = await Feature.findByIdAndDelete(params.id);
    if (!feature) return NextResponse.json({ success: false, message: "Feature not found" }, { status: 404 });
    return NextResponse.json({ success: true, message: "Feature deleted" });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
