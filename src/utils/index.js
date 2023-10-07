"use strict";

const _ = require("lodash");
const { Types } = require("mongoose");
const { off } = require("../models/apikey.model");
const { default: mongoose } = require("mongoose");

const convertToObjectIdMongodb = (id) => new Types.ObjectId(id);
const getInfoData = ({ fields = [], object = {} }) => {
  return _.pick(object, fields);
};
const getSelectData = (select = []) => {
  return Object.fromEntries(select.map((el) => [el, 1]));
};
const getUnselectData = (select = []) => {
  return Object.fromEntries(select.map((el) => [el, 0]));
};
const removeUndefinedObject = (obj) => {
  return _.omitBy(obj, _.isNil);
};

const updateNestedObjectParser = (obj) => {
  const final = {};
  Object.keys(obj).forEach((k) => {
    if (typeof obj[k] === "object" && !Array.isArray(obj[k])) {
      const response = updateNestedObjectParser(obj[k]);
      Object.keys(response).forEach((a) => {
        final[`${k}.${a}`] = response[a];
      });
    } else {
      final[k] = obj[k];
    }
  });
  console.log(final);
  return final;
};
module.exports = {
  getInfoData,
  getSelectData,
  getUnselectData,
  removeUndefinedObject,
  updateNestedObjectParser,
  convertToObjectIdMongodb,
};
