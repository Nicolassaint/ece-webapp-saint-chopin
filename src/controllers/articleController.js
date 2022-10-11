const { db } = require("../content/dbArticles");
const { v4: uuidv4 } = require("uuid");

const showArticles = async (req, res) => {
  const resultat = [];

  for (var i = 0; i < db.articles.length; i++) {
    resultat.push(db.articles[i]);
  }
  res.send(resultat);
};

const createArticle = async (req, res) => {
  console.log(req.body);
  const article = {
    id: uuidv4(),
    title: req.body.title,
    content: req.body.content,
    date: req.body.date,
    author: req.body.author,
  };
  db.articles.push(article);
  res.sendStatus(201);
};

const showArticlesById = async (req, res) => {
  res.send(db.articles.find((article) => article.id === req.params.articleId));
};

module.exports = {
  showArticles,
  showArticlesById,
  createArticle,
};
