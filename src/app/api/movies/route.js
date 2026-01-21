import { connectDB } from "../../../lib/db";

export async function GET(req, context) {
  try {
  const client = await connectDB();
  const db = client.db("sample_mflix");
  const moviesCollection = db.collection("movies");

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") ?? "1", 10);
  const limit = parseInt(searchParams.get("limit") ?? "21", 10);
  const skip = (page - 1) * limit;

  const movies = await moviesCollection
    .find({ poster: { $exists: true, $ne: null, $ne: "" } })
    .project({ title: 1, poster: 1, plot: 1 })
    .skip(skip)
    .limit(limit)
    .toArray();

  return Response.json(movies, { status: 200 });
}
 catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}