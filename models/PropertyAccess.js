import mongoose from "mongoose";

const PropertyAccessSchema = new mongoose.Schema(
  {
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: String,
    accessType: { type: String, enum: ["paid"], default: "paid" },
    amountPaid: Number,
    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,
    accessGranted: { type: Boolean, default: false },
    accessToken: String,
    accessExpiresAt: Date,
  },
  { timestamps: true }
);

export default mongoose.models.PropertyAccess ||
  mongoose.model("PropertyAccess", PropertyAccessSchema);
