import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET = process.env.JWT_SECRET;

export async function getServerSession() {
  const cookieStore = await cookies(); // ✅ AWAIT (Next 16)
  const token = cookieStore.get("admin_token")?.value;

  if (!token) return null;

  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}
