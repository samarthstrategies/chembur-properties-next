import mongoose from "mongoose";

const FeatureSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: String,
  },
  { timestamps: true }
);

export default mongoose.models.Feature ||
  mongoose.model("Feature", FeatureSchema);
