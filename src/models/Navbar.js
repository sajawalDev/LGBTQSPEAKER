import mongoose from "mongoose";

const NavItemSchema = new mongoose.Schema({
  label: { type: String, required: true },
  href: { type: String, required: true },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
});

const NavButtonSchema = new mongoose.Schema({
  text: String,
  href: String,
  variant: { type: String, default: "primary" },
  isActive: { type: Boolean, default: true },
});

const NavbarSchema = new mongoose.Schema(
  {
    logo: {
      url: String,
      alt: String,
    },
    menuItems: [NavItemSchema],
    button: NavButtonSchema,
    socials: {
      linkedin: String,
      youtube: String,
      instagram: String,
      twitter: String,
      tiktok: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Navbar ||
  mongoose.model("Navbar", NavbarSchema);
