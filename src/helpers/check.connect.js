"use strict";
const mongoose = require("mongoose");
const _SECONDS = 5000;
const os = require("os");
const process = require("process");
//count Connect
const countConnect = () => {
  const numConnection = mongoose.connections.length;
  console.log(`Number of connections::${numConnection}`);
  return numConnection;
};

//check over load
const checkOverload = () => {
  setInterval(() => {
    const numConnections = mongoose.connections.length;
    const numCores = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;
    //Example maximum number of connections based on number of cores
    const maxConnection = numCores * 5;
    console.log(`Memory usage:: ${memoryUsage / 1024 / 1024} MB`);
    if (numConnections > maxConnection) {
      console.log("Connection overload detected");
    }
  }, _SECONDS);
};
module.exports = {
  countConnect,
  checkOverload,
};