require('dotenv').config({path: "./.env"});

console.log(process.env.MONGO_URI);

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db")

 const dns = require("node:dns/promises"); dns.setServers(["1.1.1.1", "1.0.0.1"]);

const app = express();

const User = require("./models/User");

connectDB().then(async () => {
  await User.create({
    name: "Test User",
    email: "test@example.com",
    password: "123456",
  });

  console.log("Test user inserted");
});


app.use(cors());
app.use(express.json());

app.get("/", (req,res) => {
    res.send("API running...");
})


const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})