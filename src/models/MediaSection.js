import mongoose from "mongoose";

const MediaSectionSchema = new mongoose.Schema(
  {
    image: {
      url: String,
      publicId: String,
    },
    heading: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    buttonText: {
      type: String,
    },
    buttonSlug: {
      type: String,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.models.MediaSection ||
  mongoose.model("MediaSection", MediaSectionSchema);
