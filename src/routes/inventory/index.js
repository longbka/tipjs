"use strict";
const express = require("express");
const { asyncHandler } = require("../../auth/checkAuth");
const { authentication } = require("../../auth/authUtils");
const inventoryController = require("../../controllers/inventory.controller");

const router = express.Router();

//authentication
router.use(authentication);
////////////////
router.post("/review", asyncHandler(inventoryController.addStockToInventory));

module.exports = router;
