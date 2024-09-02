const express = require("express");
const { db } = require("../config/dbConnection");
const router = express.Router();

router.get("/", async (req, res) => {
  const result = await db.collection("reviews").find().toArray();
  res.send(result);
});

module.exports = router;
