const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

const port = process.env.PORT || 8080;
const apiRoot = "/api";
const app = express();

//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let db = {
  articles: [
    {
      id: "6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b",
      title: "My article",
      content: "Content of the article.",
      date: "04/10/2022",
      author: "Liz Gringer",
    },
    // ...
  ],
  comments: [
    {
      id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
      timestamp: 1664835049,
      content: "Content of the comment.",
      articleId: "6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b",
      author: "Bob McLaren",
    },
    // ...
  ],
};
app.use(apiRoot, router);
console.log(uuidv4());

app.listen(port, () => {
  console.log("serveur allumé !");
});

// define get article route
router.get("/articles", (req, res) => {
  const resultat = [];
  for (var i = 0; i < db.articles.length; i++) {
    resultat.push(db.articles[i]);
  }
  res.send(resultat);
});

// define post article route
router.post("/articles", (req, res) => {
  console.log(req.body);
  db.articles.push(req.body);
  res.sendStatus(201);
});

// define articlesID route
router.get("/articles/:articleId", (req, res) => {
  res.send(db.articles.find((article) => article.id === req.params.articleId));
});

// define comments route
router.get("/articles/:articleId/comments", (req, res) => {
  const article = db.articles.find(
    (article) => article.id === req.params.articleId
  );
  const comments = [];
  const resultat = [];

  for (var i = 0; i < db.comments.length; i++) {
    if (article.id === db.comments[i].articleId) {
      comments.push(db.comments[i].content);
    }
  }

  for (var i = 0; i < comments.length; i++) {
    resultat.push(comments[i]);
  }
  res.send(resultat);
});

// define post comments route
router.post("/articles/:articleId/comments", (req, res) => {
  console.log(req.body);
  db.comments.push(req.body);
  res.sendStatus(201);
});

// define comments route
router.get("/articles/:articleId/comments/:commentId", (req, res) => {
  const article = db.articles.find(
    (article) => article.id === req.params.articleId
  );
  const comment = db.comments.find(
    (comment) => comment.id === req.params.commentId
  );
  const comments = [];
  const resultat = [];

  for (var i = 0; i < db.comments.length; i++) {
    if (article.id === db.comments[i].articleId) {
      comments.push(db.comments[i]);
    }
  }

  for (var i = 0; i < comments.length; i++) {
    if (comment.id === comments[i].id) {
      resultat.push(comments[i].content);
      break;
    }
  }
  res.send(resultat);
});

module.exports = router;
