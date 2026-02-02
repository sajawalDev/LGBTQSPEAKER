import mongoose from "mongoose";

const QASchema = new mongoose.Schema({
  question: String,
  answer: String,
});

const FAQSchema = new mongoose.Schema(
  {
    sectionHeading: String,
    sectionSubHeading: String,
    sectionParagraph: String,
    questions: [QASchema],
  },
  { timestamps: true }
);

export default mongoose.models.FAQ || mongoose.model("FAQ", FAQSchema);
