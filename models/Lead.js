import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: String,
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: "Property" },
    podcastId: { type: mongoose.Schema.Types.ObjectId, ref: "Podcast" },
    unlockType: { type: String, enum: ["lead_unlock", "paid"] },
    razorpayOrderId: String,
    razorpayPaymentId: String,
    amountPaid: Number,
    status: {
      type: String,
      enum: ["New", "Contacted", "Converted", "Not Interested"],
      default: "New",
    },
    source: String,
    formData: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true }
);

export default mongoose.models.Lead || mongoose.model("Lead", LeadSchema);
