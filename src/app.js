require("dotenv");
const express = require("express");
const compression = require("compression");

const morgan = require("morgan");
const { default: helmet } = require("helmet");
const { checkOverload } = require("./helpers/check.connect");
const router = require("./routes");
const app = express();

//init middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded());

//test pub,sub redis
require("./tests/inventory.test");
const productTest = require("./tests/product.test");
productTest.purchaseProduct("product:001", 10);

//init db
require("./dbs/init.mongodb");
// checkOverload();

//init routes
app.use("/", router);

//handling error
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message: error.message || "Internal Server Erorr",
  });
});
module.exports = app;
