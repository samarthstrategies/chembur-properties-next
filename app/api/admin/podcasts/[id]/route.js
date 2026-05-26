import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Podcast from "@/models/Podcast";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const podcast = await Podcast.findById(params.id).lean();
    if (!podcast) return NextResponse.json({ success: false, message: "Podcast not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: podcast });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const body = await request.json();
    const podcast = await Podcast.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
    if (!podcast) return NextResponse.json({ success: false, message: "Podcast not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: podcast });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const podcast = await Podcast.findByIdAndDelete(params.id);
    if (!podcast) return NextResponse.json({ success: false, message: "Podcast not found" }, { status: 404 });
    return NextResponse.json({ success: true, message: "Podcast deleted" });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
