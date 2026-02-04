import { connectDB } from "@/lib/mongodb";
import Page from "@/models/Page";
import WhyChooseUsClient from "./WhyChooseUsClient";

export default async function WhyChooseUsServer() {
  await connectDB();

  const page = await Page.findOne().lean();
  const wcuSection = page?.sections?.find(s => s.type === "whyChooseUs");
  const data = wcuSection ? wcuSection.data : null;

  return <WhyChooseUsClient data={data} />;
}
