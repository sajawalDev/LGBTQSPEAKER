import mongoose from "mongoose";

const NewsletterFieldSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, default: "text" },
    placeholder: { type: String },
  },
  { _id: true }
);

const NewsletterSchema = new mongoose.Schema(
  {
    heading: { type: String, required: true },
    subHeading: { type: String },
    buttonText: { type: String, default: "Subscribe" },
    fields: [NewsletterFieldSchema],
  },
  { timestamps: true }
);

export default mongoose.models.Newsletter ||
  mongoose.model("Newsletter", NewsletterSchema);
