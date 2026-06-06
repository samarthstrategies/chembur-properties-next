import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Realtor from "@/models/Realtor";
import Property from "@/models/Property";

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const payload = await request.json();
    const realtor = await Realtor.findByIdAndUpdate(params.id, payload, { new: true }).lean();
    if (!realtor) return NextResponse.json({ success: false, message: "Realtor not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: realtor });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const realtor = await Realtor.findByIdAndDelete(params.id);
    if (!realtor) return NextResponse.json({ success: false, message: "Realtor not found" }, { status: 404 });
    // Optional: Also remove realtor from properties
    await Property.updateMany({ realtor: params.id }, { $unset: { realtor: 1 } });
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
