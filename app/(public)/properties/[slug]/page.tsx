import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PropertyDetailClient from './PropertyDetailClient';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/properties/${params.slug}`);
    if (!res.ok) return { title: 'Property Not Found - Chembur Properties' };
    const data = await res.json();
    const property = data.data || data.property || data;
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/properties/${params.slug}`, { next: { revalidate: 60 } });
    
    if (!res.ok) {
      notFound();
    }
    
    const data = await res.json();
    const property = data.data || data.property || data;
    
    // Also fetch related properties (simplified for now, just fetch recent)
    const relatedRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/properties?limit=3`, { next: { revalidate: 60 } });
    const relatedData = await relatedRes.json();
    const relatedProperties = Array.isArray(relatedData.data?.properties) ? relatedData.data.properties : Array.isArray(relatedData.properties) ? relatedData.properties : Array.isArray(relatedData.data) ? relatedData.data : [];

    return <PropertyDetailClient property={property} relatedProperties={relatedProperties.filter((p: any) => p._id !== property._id).slice(0, 3)} />;
  } catch (error) {
    notFound();
  }
}
