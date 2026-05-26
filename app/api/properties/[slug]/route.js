import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Property from "@/models/Property";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const property = await Property.findOne({ slug: params.slug, isDraft: false }).lean();

    if (!property) {
      return NextResponse.json({ success: false, message: "Property not found" }, { status: 404 });
    }

    // Increment view count (non-blocking)
    Property.findByIdAndUpdate(property._id, { $inc: { viewCount: 1 } }).exec();

    // If property is locked — return partial data only
    if (property.propertyAccess?.isLocked) {
      return NextResponse.json({
        success: true,
        data: {
          _id: property._id,
          title: property.title,
          slug: property.slug,
          excerpt: property.excerpt,
          category: property.category,
          propertyType: property.propertyType,
          propertyStatus: property.propertyStatus,
          location: property.location,
          pricing: property.pricing,
          specs: {
            carpetArea: property.specs?.carpetArea,
            areaPostfix: property.specs?.areaPostfix,
            bedrooms: property.specs?.bedrooms,
            bathrooms: property.specs?.bathrooms,
          },
          media: {
            featuredImage: property.media?.featuredImage,
            galleryImages: property.media?.galleryImages?.slice(0, 3),
          },
          badges: property.badges,
          propertyId: property.propertyId,
          viewCount: property.viewCount,
          // Lock info
          isLocked: true,
          accessPrice: property.propertyAccess?.price,
          accessType: property.propertyAccess?.accessType,
        },
      });
    }

    // Full property — unlocked
    return NextResponse.json({ success: true, data: { ...property, isLocked: false } });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
