import mongoose from "mongoose";

const SecurityLeadSchema = new mongoose.Schema(
  {
    societyName: { 
      type: String, 
      required: true 
    },
    secretaryName: { 
      type: String, 
      required: true 
    },
    contactNumber: { 
      type: String, 
      required: true 
    },
    status: {
      type: String,
      enum: [
        "New",
        "Contacted", 
        "Converted",
        "Not Interested"
      ],
      default: "New"
    }
  }, 
  { timestamps: true }
);

export default mongoose.models.SecurityLead || mongoose.model("SecurityLead", SecurityLeadSchema);
