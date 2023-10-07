"use strict";

const { SuccessResponse } = require("../core/success.response");
const CommentService = require("../services/comment.service");

class CommentController {
  createComment = async (req, res, next) => {
    new SuccessResponse({
      message: "Create a new comment!",
      metadata: await CommentService.createComment(req.body),
    }).send(res);
  };
  getCommentsByParentId = async (req, res, next) => {
    new SuccessResponse({
      message: "Get comments!",
      metadata: await CommentService.getCommentsByParentId(req.body),
    }).send(res);
  };
  deleteComment = async (req, res, next) => {
    new SuccessResponse({
      message: "Get comments!",
      metadata: await CommentService.deleteComment(req.body),
    }).send(res);
  };
}
module.exports = new CommentController();
