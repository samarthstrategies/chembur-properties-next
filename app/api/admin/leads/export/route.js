import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";

// GET /api/admin/leads/export — returns CSV
export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);

    const filter = {};
    if (searchParams.get("status")) filter.status = searchParams.get("status");
    if (searchParams.get("propertyId")) filter.propertyId = searchParams.get("propertyId");
    if (searchParams.get("startDate") || searchParams.get("endDate")) {
      filter.createdAt = {};
      if (searchParams.get("startDate")) filter.createdAt.$gte = new Date(searchParams.get("startDate"));
      if (searchParams.get("endDate")) filter.createdAt.$lte = new Date(searchParams.get("endDate"));
    }

    const leads = await Lead.find(filter)
      .populate("propertyId", "title propertyId")
      .sort({ createdAt: -1 })
      .lean();

    // Build CSV
    const headers = ["Name", "Phone", "Email", "Property", "Status", "Source", "Created At"];
    const rows = leads.map((l) => [
      l.name || "",
      l.phone || "",
      l.email || "",
      l.propertyId?.title || "",
      l.status || "",
      l.source || "",
      new Date(l.createdAt).toISOString(),
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const date = new Date().toISOString().split("T")[0];
    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="leads-${date}.csv"`,
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
