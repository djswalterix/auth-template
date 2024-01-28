const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://walter:123456789.@kaizen.jt4py0i.mongodb.net/");
mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected ");
});
mongoose.connection.on("error", (err) => {
  console.log("Mongoose connection error: " + err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose is disconnected");
});
