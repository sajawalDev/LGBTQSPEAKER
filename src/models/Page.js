import mongoose from "mongoose";

const SectionSchema = new mongoose.Schema(
  {
    type: {
      type: String, // hero, carousel, services, faq, etc.
      required: true,
      trim: true,
    },

    order: {
      type: Number,
      required: true,
      index: true,
    },

    data: {
      type: mongoose.Schema.Types.Mixed, // section-specific content
      default: {},
    },
  },
  {
    _id: true,
    timestamps: true, // ✅ helpful later for audit/history
  }
);

const PageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true, // ✅ faster lookups by slug
    },

    sections: {
      type: [SectionSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Page ||
  mongoose.model("Page", PageSchema);
