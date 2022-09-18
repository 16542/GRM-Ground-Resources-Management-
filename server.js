const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const port = process.env.PORT || 8000;
const ContactRoutes = require("./server/routes/ContactsRoutes");
const AlertsRoutes = require("./server/routes/Alerts")
const UserRoutes = require("./server/routes/auth")
const cors = require("cors");
app.use(express.json());
mongoose.connect(process.env.MONGO_URI, (err) => {
  if (err) console.log(err);
  console.log("DB connected...");
});

app.use(cors());
app.use("/contact", ContactRoutes);
app.use("/alerts" , AlertsRoutes)
app.use("/user" , UserRoutes)
app.listen(port, () => {
  console.log("server running successfully...");
});
