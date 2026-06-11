import mongoose from "mongoose";

const DesignerSchema = new mongoose.Schema(
  {
    businessName: { 
      type: String, 
      required: true 
    },
    ownerName: { 
      type: String, 
      required: true 
    },
    phone: { 
      type: String, 
      required: true 
    },
    whatsapp: String,
    profilePhoto: String,
    specialization: String,
    area: String,
    isActive: { 
      type: Boolean, 
      default: true 
    },
    isFeatured: { 
      type: Boolean, 
      default: false 
    },
    subscriptionExpiry: Date
  },
  { timestamps: true }
);

export default mongoose.models.Designer || mongoose.model("Designer", DesignerSchema);
