require("dotenv").config()
const port = process.env.PORT||8000
const express = require("express");
const dbConnect = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const productsRoutes = require("./routes/products.routes");
const cors = require("cors")

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

// <<<<<<<<<<<<<<<<--- ROUTES --->>>>>>>>>>>>>>>
app.get("/", (req, res) => res.send("server running"));
app.use("/auth", authRoutes);
app.use("/products", productsRoutes);


app.listen(port, async () => {
  await dbConnect();
  console.log(`server started on port ${port}`);
});