import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Location from "@/models/Location";
import Feature from "@/models/Feature";
import PropertyType from "@/models/PropertyType";
import slugify from "slugify";

export async function POST() {
  try {
    await connectDB();

    // ── Seed Locations ─────────────────────────────────────────────────────────
    const locationNames = [
      "Chembur",
      "Bandra (W)",
      "Bhakti Park",
      "Bhandup",
      "BKC Bandra Kurla Complex",
      "CBD Belapur",
      "CBD Navi Mumbai",
      "Ajmera Island",
      "Govandi",
      "Deonar",
      "Sion",
      "Wadala",
      "Tilaknagar",
    ];

    const locationDocs = locationNames.map((name) => ({
      name,
      slug: slugify(name, { lower: true, strict: true }),
    }));

    await Location.insertMany(locationDocs, { ordered: false }).catch(() => {});

    // ── Seed Features ──────────────────────────────────────────────────────────
    const featureNames = [
      "Balcony",
      "Gym",
      "Common Lift",
      "Intercom Facility",
      "Lobby",
      "Reserved Parking",
      "Roof Top Amenities",
      "Society Compound",
      "Rain Water Harvesting",
      "Close to BKC Connector",
      "Close to Chembur Harbour Line",
      "Close to SCLR",
    ];

    const featureDocs = featureNames.map((name) => ({
      name,
      slug: slugify(name, { lower: true, strict: true }),
    }));

    await Feature.insertMany(featureDocs, { ordered: false }).catch(() => {});

    // ── Seed Property Types ────────────────────────────────────────────────────
    const propertyTypes = [
      // Residential
      { name: "Apartment", category: "Residential" },
      { name: "Bunglow", category: "Residential" },
      { name: "Activity Teen", category: "Residential" },
      // Commercial
      { name: "Office", category: "Commercial" },
      { name: "Shop", category: "Commercial" },
      { name: "Warehouse", category: "Commercial" },
      { name: "Industrial Gala", category: "Commercial" },
      { name: "Commercial Space", category: "Commercial" },
      { name: "Commercial Godown", category: "Commercial" },
    ];

    const propertyTypeDocs = propertyTypes.map((t) => ({
      ...t,
      slug: slugify(t.name, { lower: true, strict: true }),
    }));

    await PropertyType.insertMany(propertyTypeDocs, { ordered: false }).catch(() => {});

    return NextResponse.json({
      success: true,
      message: "Seed completed",
      data: {
        locations: locationNames.length,
        features: featureNames.length,
        propertyTypes: propertyTypes.length,
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
