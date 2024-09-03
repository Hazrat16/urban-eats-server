const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/jwt", (req, res) => {
  const user = req.body;

  try {
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });
    res.send({ token });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
