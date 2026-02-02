import mongoose from "mongoose";

const GalleryImageSchema = new mongoose.Schema(
  {
    imageUrl: { type: String, required: true },
    publicId: { type: String, required: true },
  },
  { timestamps: true }
);

const GallerySchema = new mongoose.Schema(
  {
    sectionHeading: String,
    sectionSubHeading: String,
    sectionParagraph: String,
    images: [GalleryImageSchema],
  },
  { timestamps: true }
);

export default mongoose.models.Gallery ||
  mongoose.model("Gallery", GallerySchema);
