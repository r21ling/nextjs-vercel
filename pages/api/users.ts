import { VercelRequest, VercelResponse } from "@vercel/node";
import { MongoClient } from "mongodb";
require("dotenv").config();

const { DB_USER, DB_PASSWORD } = process.env;
const CONNECTION_STRING = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.bj1hi.mongodb.net`;

module.exports = async (req: VercelRequest, res: VercelResponse) => {
  const client = await MongoClient.connect(CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = await client.db("vercel");
  const result = await db.collection("users").find().toArray();
  res.status(200).json(result);
};
