require("dotenv").config();
const express = require("express");
const port = process.env.PORT || 3200;
const connectToDb = require("./database/db");
const itemRoutes = require("./routes/item-routes");

const app = express();

//connect tp database
connectToDb();
//middlewares express.json()
app.use(express.json());

//routes
//my url => http://localhost:3000/api/items/
app.use("/api/items", itemRoutes);

app.get("/", (req, res) => {
  res.json("hello world");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
