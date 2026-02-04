import { connectDB } from "@/lib/mongodb";
import ContactPage from "@/models/ContactPage";
import ContactClient from "./ContactClient";

export default async function ContactServer() {
  await connectDB();

  const data = await ContactPage.findOne().lean();

  if (!data) {
    return <ContactClient data={null} />;
  }

  const plainData = {
    ...data,
    _id: data._id.toString(),
  };

  return <ContactClient data={plainData} />;
}
