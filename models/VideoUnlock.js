import mongoose from "mongoose";

const VideoUnlockSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    email: String,
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: "Property" },
    podcastId: { type: mongoose.Schema.Types.ObjectId, ref: "Podcast" },
    unlockType: { type: String, enum: ["lead_unlock", "paid"] },
    amountPaid: Number,
    razorpayOrderId: String,
    razorpayPaymentId: String,
  },
  { timestamps: true }
);

export default mongoose.models.VideoUnlock ||
  mongoose.model("VideoUnlock", VideoUnlockSchema);
