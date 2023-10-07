"use strict";

const { getUnselectData, getSelectData } = require("../../utils");

const findAllDiscountCodesUnselect = async ({
  limit = 50,
  page = 1,
  sort = "ctime",
  filter,
  unselect,
  model,
}) => {
  const skip = (page - 1) * limit;
  const sortBy = sort === "ctime" ? { _id: -1 } : { _id: 1 };
  const discountCodes = await model
    .find(filter)
    .sort(sortBy)
    .skip(skip)
    .limit(limit)
    .select(getUnselectData(unselect))
    .lean();
  return discountCodes;
};

const findAllDiscountCodesSelect = async ({
  limit = 50,
  page = 1,
  sort = "ctime",
  filter,
  select,
  model,
}) => {
  const skip = (page - 1) * limit;
  const sortBy = sort === "ctime" ? { _id: -1 } : { _id: 1 };
  const discountCodes = await model
    .find(filter)
    .sort(sortBy)
    .skip(skip)
    .limit(limit)
    .select(getSelectData(select))
    .lean();
  return discountCodes;
};
const checkDiscountExisted = async ({model, filter}) => {
  return await model.findOne(filter).lean();
};
module.exports = {
  findAllDiscountCodesUnselect,
  findAllDiscountCodesSelect,
  checkDiscountExisted,
};
