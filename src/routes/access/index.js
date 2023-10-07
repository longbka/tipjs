"use strict";
const express = require("express");
const accessController = require("../../controllers/access.controller");
const { asyncHandler } = require("../../auth/checkAuth");
const { authentication } = require("../../auth/authUtils");
const router = express.Router();

//signUp
router.post("/shop/login", asyncHandler(accessController.login));
router.post("/shop/signUp", asyncHandler(accessController.signUp));

//authentication
router.use(authentication);

//logout
router.post("/shop/logout", asyncHandler(accessController.logout));
router.post("/shop/handleRefreshToken", asyncHandler(accessController.handleRefreshToken));
module.exports = router;
