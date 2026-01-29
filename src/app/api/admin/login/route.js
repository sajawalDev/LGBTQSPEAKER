import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

export async function POST(request) {
  try {
    await connectDB();
    const { email, password } = await request.json();

    const user = await Admin.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return Response.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, isAdmin: true },
      SECRET,
      { expiresIn: "1d" }
    );

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: {
          "Set-Cookie": `admin_token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict`,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
