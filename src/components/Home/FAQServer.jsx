import FAQClient from "./FAQClient";
import { connectDB } from "@/lib/mongodb";
import FAQModel from "@/models/FAQModel";

export default async function FAQServer() {
  await connectDB();
const faqData = await FAQModel.findOne().lean();

if (!faqData) return null;

const faqs = [{
  _id: faqData._id.toString(),
  sectionHeading: faqData.sectionHeading,
  sectionSubHeading: faqData.sectionSubHeading,
  sectionParagraph: faqData.sectionParagraph,
  questions: faqData.questions.map(q => ({
    question: q.question,
    answer: q.answer,
  })),
}];

return <FAQClient initialFAQs={faqs} />;

}
