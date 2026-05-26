import mongoose from "mongoose";

const PropertyTypeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, enum: ["Residential", "Commercial"] },
    slug: String,
  },
  { timestamps: true }
);

export default mongoose.models.PropertyType ||
  mongoose.model("PropertyType", PropertyTypeSchema);
