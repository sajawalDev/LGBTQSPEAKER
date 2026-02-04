import Newsletter from "@/models/Newsletter";
import { connectDB } from "@/lib/mongodb";
import NewsLetterClient from "./NewsLetterClient";

export default async function NewsLetterServer() {
  await connectDB();
  const data = await Newsletter.find().lean();

  const plainData = data.map(item => ({
    ...item,
    _id: item._id.toString(),
    fields: item.fields.map(f => ({
      ...f,
      _id: f._id.toString(),
    })),
  }));

  return <NewsLetterClient data={plainData[0] || null} />;
}
