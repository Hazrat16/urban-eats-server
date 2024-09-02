const express = require("express");
const { db } = require("../config/dbConnection");
const { verifyToken, verifyAdmin } = require("../middleware/Auth");
const router = express.Router();

router.get("/admin-stats", verifyToken, verifyAdmin, async (req, res) => {
  const users = await db.collection('users').estimatedDocumentCount();
  const menuItems = await db.collection('menu').estimatedDocumentCount();
  const orders = await db.collection('carts').estimatedDocumentCount();

  // this is not the best way
  // const payments = await cartCollection.find().toArray();
  // const revenue = payments.reduce((total, payment) => total + payment.price, 0);

  const result = await  db.collection('carts')
    .aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$price",
          },
        },
      },
    ])
    .toArray();

  const revenue = result.length > 0 ? result[0].totalRevenue : 0;

  res.send({
    users,
    menuItems,
    orders,
    revenue,
  });
});

router.get("/order-stats", verifyToken, verifyAdmin, async (req, res) => {
  const result = await db.collection('carts')
    .aggregate([
      {
        $unwind: "$menuItemIds",
      },
      {
        $lookup: {
          from: "menu",
          localField: "menuItemIds",
          foreignField: "_id",
          as: "menuItems",
        },
      },
      {
        $unwind: "$menuItems",
      },
      {
        $group: {
          _id: "$menuItems.category",
          quantity: { $sum: 1 },
          revenue: { $sum: "$menuItems.price" },
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          quantity: "$quantity",
          revenue: "$revenue",
        },
      },
    ])
    .toArray();

  res.send(result);
});

module.exports = router;
