// models/Seo.js
import mongoose from "mongoose";

const SeoSchema = new mongoose.Schema(
  {
    page: {
      type: String,
      required: true,
      unique: true,
      enum: ["home", "about", "media", "services", "blog", "contact","terms&conditions","cookiepolicy","privacypolicy"],
    },

    title: {
      type: String,
      trim: true,
      default: "",
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    keywords: {
      type: String,
      trim: true,
      default: "",
    },

    canonical: {
      type: String,
      trim: true,
      default: "",
    },

    ogTitle: {
      type: String,
      trim: true,
      default: "",
    },

    ogDescription: {
      type: String,
      trim: true,
      default: "",
    },

    ogImage: {
      type: String,
      trim: true,
      default: "",
    },

    noIndex: {
      type: Boolean,
      default: false,
    },

    noFollow: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model overwrite in dev / hot reload
export default mongoose.models.Seo || mongoose.model("Seo", SeoSchema);
