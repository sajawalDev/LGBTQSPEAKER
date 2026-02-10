import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/auth";
import AdminShell from "./AdminShell";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }) {
  const session = await getServerSession();

  if (!session || !session.isAdmin) {
    redirect("/admin/login");
  }

  return <AdminShell session={session}>{children}</AdminShell>;
}
