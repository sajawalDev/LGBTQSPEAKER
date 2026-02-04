import mongoose from "mongoose";

const FooterItemSchema = new mongoose.Schema({
  label: { type: String, required: true },
  slug: { type: String },
});

const FooterSectionSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  type: {
    type: String,
    enum: ["links", "contact"],
    default: "links",
  },
  items: [FooterItemSchema], // for links
  content: [String], // for contact text blocks
});

const FooterSchema = new mongoose.Schema(
  {
    logoUrl: { type: String },
    logoPublicId: { type: String },
    description: { type: String },
    sections: [FooterSectionSchema],
  },
  { timestamps: true }
);

export default mongoose.models.Footer ||
  mongoose.model("Footer", FooterSchema);
