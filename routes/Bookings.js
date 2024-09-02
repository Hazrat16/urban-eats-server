const express = require("express");
const { verifyToken, verifyAdmin } = require("../middleware/Auth");
const { db } = require("../config/dbConnection");
const { ObjectId } = require("mongodb");
const router = express.Router();

router.get("/", async (req, res) => {
  const result = await db.collection("bookings").find().toArray();
  res.send(result);
});

router.post("/", async (req, res) => {
  const bookingsInfo = req.body;
  const result = await db.collection("bookings").insertOne(bookingsInfo);
  res.send(result);
});

router.delete("/:id", verifyToken, verifyAdmin, async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await db.collection("bookings").deleteOne(query);
  res.send(result);
});

module.exports = router;
