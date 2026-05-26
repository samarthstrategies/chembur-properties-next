import mongoose from "mongoose";

const PodcastSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    developerName: String,
    projectName: String,
    linkedPropertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
    },
    videoUrl: String,
    thumbnailUrl: String,
    description: String,
    duration: String,
    topics: [String],
    recordedDate: Date,
    accessType: {
      type: String,
      enum: ["free", "lead_unlock", "paid"],
      default: "free",
    },
    price: Number,
    isFeatured: { type: Boolean, default: false },
    isDraft: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Podcast ||
  mongoose.model("Podcast", PodcastSchema);
