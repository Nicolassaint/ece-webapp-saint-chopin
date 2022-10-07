const express = require("express");

// Controllers
const {
  showArticles,
  showArticlesById,
  createArticle,
} = require("../controllers/articleController");

const router = express.Router();

// get all the articles route
router.get("/articles", showArticles);

// add an article route
router.post("/articles", createArticle);

// get an article by id route
router.get("/articles/:articleId", showArticlesById);

module.exports = router;
