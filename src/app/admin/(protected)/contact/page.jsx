// admin/contact/page.jsx
import Contact from "@/models/Contact";
import { connectDB } from "@/lib/mongodb";
import { format } from "date-fns";

export const metadata = {
  title: "Admin - Contact Messages",
  description: "View all contact messages submitted by users",
};

export default async function ContactAdminPage() {
  await connectDB();
  const contacts = await Contact.find().sort({ createdAt: -1 }).lean();

  return (
    <div className="min-h-screen p-4 md:p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Contact Messages</h1>

      {contacts.length === 0 ? (
        <p className="text-gray-600">No contact messages yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {contacts.map((contact) => (
            <div
              key={contact._id}
              className="bg-white shadow-md rounded-lg p-4 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4"
            >
              <div className="flex flex-col md:flex-row md:gap-4 flex-1">
                <p className="font-semibold text-gray-800 md:w-32">
                  Name: <span className="font-normal">{contact.name || "-"}</span>
                </p>
                <p className="font-semibold text-gray-800 md:w-48">
                  Email:{" "}
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-blue-600 hover:underline font-normal"
                  >
                    {contact.email}
                  </a>
                </p>
                <p className="font-semibold text-gray-800 md:flex-1">
                  Message: <span className="font-normal">{contact.message}</span>
                </p>
              </div>
              <p className="text-gray-500 text-sm mt-2 md:mt-0">
                {format(new Date(contact.createdAt), "dd MMM yyyy HH:mm")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
