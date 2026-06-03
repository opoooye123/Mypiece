require('dotenv').config();

console.log(process.env.MONGO_URI);

const express = require("express");

const authRoutes = require("./routes/authRoutes");

const cors = require("cors");

const connectDB = require("./config/db")

const dns = require("node:dns/promises"); dns.setServers(["1.1.1.1", "1.0.0.1"]);

const app = express();

const User = require("./models/User");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes")
connectDB()


app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);


app.get("/", (req,res) => {
    res.send("API running...");
})


const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})