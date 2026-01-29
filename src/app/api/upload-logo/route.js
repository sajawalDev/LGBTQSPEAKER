import { uploadToCloudinary } from "@/lib/cloudinary";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return new Response(JSON.stringify({ error: "No file uploaded" }), { status: 400 });
    }

    // Convert File object to a Buffer (Node can handle this)
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary using data URI
    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;
    const result = await uploadToCloudinary(base64);

    return new Response(JSON.stringify({ url: result.secure_url }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
