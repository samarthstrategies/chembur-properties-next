import mongoose from "mongoose";

const RealtorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    companyName: { type: String },
    contactNumber: { type: String },
    photograph: { type: String },
    reraNumber: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Realtor || mongoose.model("Realtor", RealtorSchema);
