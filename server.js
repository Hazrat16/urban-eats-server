const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { connectDB } = require('./config/dbConnection');
const authRoutes = require('./routes/Auth');
const userRoutes = require('./routes/Users');
const menuRoutes = require('./routes/Menu');
const reviewRoutes = require('./routes/Review');
const cartRoutes = require('./routes/Cart');
const bookingRoutes = require('./routes/Bookings');
const adminRoutes = require('./routes/Admin');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to database
connectDB();

// Routes
app.use('/', authRoutes);
app.use('/users', userRoutes);
app.use('/menu', menuRoutes);
app.use('/reviews', reviewRoutes);
app.use('/carts', cartRoutes);
app.use('/bookings', bookingRoutes);
app.use('', adminRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("here we go");
});

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
