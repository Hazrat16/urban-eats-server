const express = require("express");
const { verifyToken, verifyAdmin } = require("../middleware/Auth");
const { db } = require("../config/dbConnection");
const { ObjectId } = require("mongodb");
const router = express.Router();

router.get("/", async (req, res) => {
  const result = await db.collection("menu").find().toArray();
  res.send(result);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await db.collection("menu").findOne(query);
  res.send(result);
});

router.post("/", verifyToken, verifyAdmin, async (req, res) => {
  const item = req.body;
  const result = await db.collection("menu").insertOne(item);
  res.send(result);
});

router.delete("/:id", verifyToken, verifyAdmin, async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await db.collection("menu").deleteOne(query);
  res.send(result);
});

router.patch("/:id", verifyToken, verifyAdmin, async (req, res) => {
  const item = req.body;
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const updatedDoc = {
    $set: {
      name: item.name,
      category: item.category,
      price: item.price,
      recipe: item.recipe,
      image: item.image,
    },
  };
  const result = await db.collection("menu").updateOne(query, updatedDoc);
  res.send(result);
});

module.exports = router;
