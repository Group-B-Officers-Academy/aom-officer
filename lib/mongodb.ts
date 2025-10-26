import { MongoClient, Db } from "mongodb";

let client: MongoClient;
let db: Db;

export async function connectToDatabase() {
  if (db) {
    return { client, db };
  }

  const uri =
    process.env.MONGODB_URI || "mongodb://localhost:27017/officers-academy";

  try {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db("officers-academy");
    console.log("Connected to MongoDB successfully");
    return { client, db };
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    // In production, you might want to throw the error
    // For now, we'll allow the app to continue without database
    throw new Error(`MongoDB connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function getDatabase() {
  if (!db) {
    await connectToDatabase();
  }
  return db;
}
