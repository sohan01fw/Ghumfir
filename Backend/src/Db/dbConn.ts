import { MongoClient, ServerApiVersion } from "mongodb";
const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectToDb(): Promise<void> {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    console.log("You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
connectToDb().catch(console.dir);
