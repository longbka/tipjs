"use strict";

const apiKeyModel = require("../models/apikey.model");
const crypto = require("crypto");
const findById = async (key) => {
  try {
    // const newKey = await apikeyModel.create({
    //   key: crypto.randomBytes(64).toString("hex"),
    //   permissions: ["0000"],
    // });
    // console.log(newKey);
    const objKey = await apiKeyModel.findOne({ key, status: true }).lean();
    console.log("objKey::", objKey);
    return objKey;
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  findById,
};
