const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
  process.env.NODE_ENV === "production"
    ? `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.t04cp.mongodb.net/?retryWrites=true&w=majority`
    : "mongodb://127.0.0.1:27017/urban-eats";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const connectDB = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
};

const db = client.db("urban-eats");

module.exports = { connectDB, db };
