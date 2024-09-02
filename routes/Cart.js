const express = require("express");
const { db } = require("../config/dbConnection");
const { ObjectId } = require("mongodb");
const router = express.Router();

router.get("/", async (req, res) => {
  const email = req.query.email;
  const query = { email: email };
  const result = await db.collection("carts").find(query).toArray();
  res.send(result);
});

router.post("/", async (req, res) => {
  const cartItem = req.body;
  const result = await db.collection("carts").insertOne(cartItem);
  res.send(result);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await db.collection("carts").deleteOne(query);
  res.send(result);
});

module.exports = router;
