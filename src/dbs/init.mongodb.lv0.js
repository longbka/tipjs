"use strict";

const { default: mongoose } = require("mongoose");
const {
  db: { host, name, port },
} = require("../configs/config.mongodb");
const connectString = `mongodb://${host}:${port}/${name}`;
console.log("connect::", connectString);
mongoose
  .connect(connectString)
  .then((_) => console.log("Connect Mongodb Success"))
  .catch((err) => console.log(`Error Connect`));
if (1 === 0) {
  mongoose.set("debug", true);
  mongoose.set("debug", { color: true });
}
module.exports = mongoose;
