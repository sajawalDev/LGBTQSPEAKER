import mongoose from "mongoose";

const BlogBlockSchema = new mongoose.Schema(
  {
    type: {
      type: String, // "heading" | "paragraph"
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    bold: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const BlogSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      default: "main-blog",
      unique: true,
    },

    title: { type: String, required: true },

    author: {
      type: String,
      default: "Shannon Whittington",
    },

    publishedAt: {
      type: Date,
      required: true,
    },

    coverImage: {
      type: String,
      required: true,
    },

    intro: {
      type: String, // FIRST paragraph under image
      required: true,
    },

    blocks: {
      type: [BlogBlockSchema],
      default: [],
    },

    tags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);