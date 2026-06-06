import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PropertyDetailClient from './PropertyDetailClient';
import { connectDB } from '@/lib/mongodb';
import Property from '@/models/Property';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    await connectDB();
    const property = await Property.findOne({ slug: params.slug, isDraft: false }).lean();
    if (!property) return { title: 'Property Not Found - Chembur Properties' };
    
    return {
      title: `${property.title} | Chembur Properties`,
      description: property.description?.substring(0, 160) || `View details for ${property.title}.`,
    };
  } catch (e) {
    return { title: 'Property Details - Chembur Properties' };
  }
}

export default async function SinglePropertyPage({ params }: { params: { slug: string } }) {
  try {
    await connectDB();
    const property = await Property.findOne({ slug: params.slug, isDraft: false }).populate('realtor').lean();
    
    if (!property) {
      notFound();
    }
    
    // Increment view count (fire and forget)
    Property.findByIdAndUpdate(property._id, { $inc: { viewCount: 1 } }).exec();

    // Check if property is locked
    let propertyData = { ...property, isLocked: false };
    
    if (property.propertyAccess?.isLocked) {
      propertyData = {
        _id: property._id.toString(),
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
        realtor: property.realtor,
        viewCount: property.viewCount,
        isLocked: true,
        accessPrice: property.propertyAccess?.price,
        accessType: property.propertyAccess?.accessType,
      };
    }

    // Force strict JSON serialization so client components don't complain about MongoDB ObjectIDs
    const serializableProperty = JSON.parse(JSON.stringify(propertyData));
    
    // Fetch related properties directly from DB
    const relatedPropertiesRaw = await Property.find({ 
      isDraft: false, 
      _id: { $ne: property._id } 
    }).sort({ createdAt: -1 }).limit(3).lean();
    
    const relatedProperties = JSON.parse(JSON.stringify(relatedPropertiesRaw));

    return <PropertyDetailClient property={serializableProperty} relatedProperties={relatedProperties} />;
  } catch (error) {
    console.error("Error in SinglePropertyPage:", error);
    notFound();
  }
}
