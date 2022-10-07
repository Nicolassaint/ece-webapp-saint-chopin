const { db } = require("../content/dbArticles");

const showArticles = async (req, res) => {
  const resultat = [];

  for (var i = 0; i < db.articles.length; i++) {
    resultat.push(db.articles[i]);
  }
  res.send(resultat);
};

const createArticle = async (req, res) => {
  console.log(req.body);
  db.articles.push(req.body);
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
