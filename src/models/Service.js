import mongoose from "mongoose";

const ContentBlockSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["heading", "paragraph", "image"],
    required: true,
  },
  value: String,
  image: {
    url: String,
    publicId: String,
  },
});

const ServiceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // tab name
    heading: String,
    subHeading: String,

    blocks: [ContentBlockSchema],

    button: {
      text: String,
      slug: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Service ||
  mongoose.model("Service", ServiceSchema);
