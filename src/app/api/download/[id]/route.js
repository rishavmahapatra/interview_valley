import { ObjectId } from "mongodb";
import { connectDB } from "../../../../lib/db";

export async function GET(req, context) {
  const { id } = await context.params;

  try {
    const db = await connectDB();
    const resumes = db.db().collection("resumes");

    const file = await resumes.findOne({ _id: new ObjectId(id) });

    if (!file) return Response.json({ error: "Not found" }, { status: 404 });

    const buffer = file.data.buffer instanceof ArrayBuffer
      ? file.data.buffer
      : file.data.buffer.buffer;

    return new Response(buffer, {
      headers: {
        "Content-Type": file.mimetype,
        "Content-Disposition": `attachment; filename="${file.filename}"`
      }
    });

  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
