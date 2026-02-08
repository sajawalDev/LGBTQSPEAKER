import { connectDB } from "@/lib/mongodb";
import Service from "@/models/Service";
import ServicesClient from "./ServicesClient";

export default async function ServicesServer() {
  await connectDB();

  const services = await Service.find().lean();

  const plainServices = services.map((s) => ({
    ...s,
    _id: s._id.toString(),
    blocks: s.blocks?.map((b) => ({
      ...b,
      _id: b._id?.toString(),
    })),
  }));

  return <ServicesClient services={plainServices} />;
}
