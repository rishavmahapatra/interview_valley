import { connectDB } from "../../../lib/db";

export async function GET(req, context) {
  try {
    const client = await connectDB(); 
    const db = client.db("sample_mflix");
    const moviesCollection = db.collection("movies");

  const movies = await moviesCollection
  .find({ poster: { $exists: true, $ne: null } })
  .project({
    title: 1,
    poster: 1,
    plot: 1
  })
  .limit(20)
  .toArray();


    return Response.json(movies, { status: 200 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}