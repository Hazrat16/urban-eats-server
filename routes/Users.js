const express = require("express");
const { verifyToken, verifyAdmin } = require("../middleware/Auth");
const { db } = require("../config/dbConnection");
const { ObjectId } = require("mongodb");
const router = express.Router();

router.get("/", verifyToken, verifyAdmin, async (req, res) => {
  const result = await db.collection("users").find().toArray();
  res.send(result);
});

router.get("/admin/:email", verifyToken, async (req, res) => {
  const email = req.params.email;
  if (email !== req.decoded.email) {
    return res.status(403).send({ message: "forbidden access" });
  }
  const query = { email: email };
  const user = await db.collection("users").findOne(query);
  let admin = false;
  if (user) {
    admin = user?.role === "admin";
  }
  res.send({ admin });
});

router.post("/", async (req, res) => {
  const user = req.body;
  const query = { email: user.email };
  const existingUser = await db.collection("users").findOne(query);
  if (existingUser) {
    return res.send({ message: "user already exists", insertedId: null });
  }
  const result = await db.collection("users").insertOne(user);
  res.send(result);
});

router.patch("/admin/:id", verifyToken, verifyAdmin, async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const updatedDoc = {
    $set: { role: "admin" },
  };
  const result = await db.collection("users").updateOne(filter, updatedDoc);
  res.send(result);
});

router.delete("/:id", verifyToken, verifyAdmin, async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await db.collection("users").deleteOne(query);
  res.send(result);
});

module.exports = router;
