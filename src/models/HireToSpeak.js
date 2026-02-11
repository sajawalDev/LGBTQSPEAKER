import mongoose from "mongoose";

const HireToSpeakSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    eventDate: { type: String, required: true },
    eventLocation: { type: String, required: true },
    audienceSize: { type: String, required: true },
    eventTopic: { type: String, required: true },
    additionalInfo: { type: String, required: true },

    status: {
      type: String,
      enum: ["pending", "done"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.HireToSpeak ||
  mongoose.model("HireToSpeak", HireToSpeakSchema);
