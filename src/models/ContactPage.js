import mongoose from "mongoose";

const InputSchema = new mongoose.Schema(
  {
    label: String,
    type: {
      type: String,
      enum: ["text", "email", "textarea"],
      default: "text",
    },
    placeholder: String,
  },
  { _id: false }
);

const ContactPageSchema = new mongoose.Schema(
  {
    heroHeading: String,
    heroSubHeading: String,
    heroContent: String,

    phoneHeading: String,
    phoneNumber: String,

    emailHeading: String,
    emailAddress: String,

    formHeading: String,
    inputs: [InputSchema],
    buttonText: String,
  },
  { timestamps: true }
);

export default mongoose.models.ContactPage ||
  mongoose.model("ContactPage", ContactPageSchema);
