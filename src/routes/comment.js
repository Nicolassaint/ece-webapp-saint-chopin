const express = require("express");

// Controllers
const {
  showComments,
  showCommentsById,
  createComment,
} = require("../controllers/commentController");

const router = express.Router();

// get all the comments of an article by ID route
router.get("/articles/:articleId/comments", showComments);

// add a comment on an article by ID route
router.post("/articles/:articleId/comments", createComment);

// get the comment by id of an article also got by ID route
router.get("/articles/:articleId/comments/:commentId", showCommentsById);

module.exports = router;
