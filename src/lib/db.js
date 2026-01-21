import { MongoClient } from "mongodb";

let client;
let clientPromise;

const uri = process.env.MONGODB_URI;

if (!uri) throw new Error("MONGODB_URI missing");

export async function connectDB() {
  if (clientPromise) return clientPromise;
  client = new MongoClient(uri, {});
  clientPromise = client.connect();
  return clientPromise;
}
