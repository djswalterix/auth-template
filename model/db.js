const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.DB_URI);
mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected ");
});
mongoose.connection.on("error", (err) => {
  console.log("Mongoose connection error: " + err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose is disconnected");
});
