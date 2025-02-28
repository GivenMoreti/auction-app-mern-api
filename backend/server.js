require("dotenv").config();
const port = process.env.PORT || 3200;
const path = require("path");
const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const connectToDb = require("./database/db");
const itemRoutes = require("./routes/item-routes");
const auctionRoutes = require("./routes/auction-routes");
const authRoutes = require("./routes/auth-routes");
const homeRoutes = require("./routes/auth/home-routes");
const bidRoutes = require("./routes/bid-routes");
const paymentsRoutes = require("./routes/payment-routes");
const addressRoutes = require("./routes/address-routes");
const transactionRoutes = require("./routes/transaction-routes");
const deliveryRoutes = require("./routes/delivery-routes");
const profileRoutes = require("./routes/profile-routes");

const app = express();

const Stripe = require("stripe");

const stripe = Stripe("stripesecretkey");

//connect tp database
connectToDb();
//middlewares express.json()
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true,
  })
);

//routes

app.use("/api/items", itemRoutes);
app.use("/api/auctions", auctionRoutes);
app.use("/api/bids", bidRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/payments", paymentsRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/deliveries", deliveryRoutes);
app.use("/api/profiles", profileRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
