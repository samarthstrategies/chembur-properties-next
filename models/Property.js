import mongoose from "mongoose";

const FloorDetailSchema = new mongoose.Schema({
  floorNumber: String,
  bhkType: String,
  carpetArea: String,
  status: { type: String, enum: ["Available", "Sold"], default: "Available" },
});

const PropertySchema = new mongoose.Schema(
  {
    propertyId: { type: String, unique: true },
    title: { type: String, required: true },
    reraNumber: String,
    reraPossessionDate: String,
    slug: { type: String, unique: true },
    excerpt: String,
    description: String,
    author: { type: String, default: "Jeetu Chhaabria" },
    realtor: { type: mongoose.Schema.Types.ObjectId, ref: 'Realtor' },
    dateOfPost: { type: Date, default: Date.now },
    category: { type: String, enum: ["Residential", "Commercial"] },
    propertyType: [String],
    propertyStatus: [String],
    location: [String],
    mapEmbedUrl: String,
    pricing: {
      salePrice: Number,
      oldPrice: Number,
      pricePrefix: String,
      pricePostfix: String,
      licenceFee: Number,
      securityDeposit: String,
    },
    specs: {
      carpetArea: Number,
      areaPostfix: { type: String, default: "sq ft" },
      lotSize: Number,
      lotSizePostfix: String,
      bedrooms: Number,
      bathrooms: Number,
      parking: Number,
      yearBuilt: Number,
      totalFloors: Number,
    },
    features: [String],
    connectivity: [String],
    floorDetails: [FloorDetailSchema],
    media: {
      featuredImage: String,
      galleryImages: [String],
      floorPlanImages: [String],
      propertyVideoUrl: String,
    },
    badges: {
      isWinGold: { type: Boolean, default: false },
      winGoldDetails: String,
      isPremium: { type: Boolean, default: false },
      premiumNote: String,
      isUnderconstruction: { type: Boolean, default: false },
      isResale: { type: Boolean, default: false },
      isPremiumUnderconstruction: { type: Boolean, default: false },
      isPremiumResale: { type: Boolean, default: false },
    },
    podcast: {
      hasPodcast: { type: Boolean, default: false },
      podcastId: { type: mongoose.Schema.Types.ObjectId, ref: "Podcast" },
      accessType: {
        type: String,
        enum: ["free", "lead_unlock", "paid"],
        default: "free",
      },
      price: Number,
    },
    propertyAccess: {
      isLocked: { type: Boolean, default: false },
      accessType: { type: String, enum: ["free", "paid"], default: "free" },
      price: Number,
    },
    isFeatured: { type: Boolean, default: false },
    isDraft: { type: Boolean, default: false },
    tags: [String],
    metaTitle: String,
    metaDescription: String,
    viewCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Text index for search
PropertySchema.index({ title: "text", excerpt: "text", tags: "text" });

export default mongoose.models.Property ||
  mongoose.model("Property", PropertySchema);
