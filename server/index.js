const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const User = mongoose.model("User", new mongoose.Schema({
  name: String
}));

app.get("/", (req, res) => {
  res.send("API Running");
});

app.post("/add-user", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send("User Added");
});

app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.listen(5000, () => console.log("Server running on port 5000"));
