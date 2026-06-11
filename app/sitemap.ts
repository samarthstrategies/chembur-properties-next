import { MetadataRoute } from "next";
import { connectDB } from "@/lib/mongodb";
import Property from "@/models/Property";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://chemburproperties.com";

  // Static routes
  const staticRoutes = [
    "",
    "/properties",
    "/about",
    "/contact",
    "/win-gold",
    "/premium",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  try {
    await connectDB();
    
    // Fetch active properties for dynamic routes
    const properties = await Property.find({ isDraft: false }).select("slug updatedAt").lean();
    
    const propertyRoutes = properties.map((property) => ({
      url: `${baseUrl}/properties/${property.slug}`,
      lastModified: property.updatedAt ? new Date(property.updatedAt).toISOString() : new Date().toISOString(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    }));

    return [...staticRoutes, ...propertyRoutes];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    // Return at least static routes if DB fails
    return staticRoutes;
  }
}
