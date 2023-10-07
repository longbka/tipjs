"use strict";
const express = require("express");
const { asyncHandler } = require("../../auth/checkAuth");
const { authentication } = require("../../auth/authUtils");
const commentController = require("../../controllers/comment.controller");

const router = express.Router();

//authentication
router.use(authentication);
////////////////
router.post("", asyncHandler(commentController.createComment));
router.get("", asyncHandler(commentController.getCommentsByParentId));
router.delete("", asyncHandler(commentController.deleteComment));
module.exports = router;
