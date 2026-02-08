import mongoose from "mongoose";

const FreeVideoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true, // needed to delete from Cloudinary
    },
  },
  { timestamps: true }
);

export default mongoose.models.FreeVideo ||
  mongoose.model("FreeVideo", FreeVideoSchema);
