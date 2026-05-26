import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import PropertyType from "@/models/PropertyType";
import slugify from "slugify";

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { name, category } = await request.json();
    const slug = slugify(name, { lower: true, strict: true });
    const type = await PropertyType.findByIdAndUpdate(params.id, { name, category, slug }, { new: true });
    if (!type) return NextResponse.json({ success: false, message: "PropertyType not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: type });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const type = await PropertyType.findByIdAndDelete(params.id);
    if (!type) return NextResponse.json({ success: false, message: "PropertyType not found" }, { status: 404 });
    return NextResponse.json({ success: true, message: "Property type deleted" });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
