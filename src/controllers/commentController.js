const {db} = require("../content/dbArticles");
const { v4: uuidv4 } = require("uuid");

const showComments = async (req, res) => {
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
};

const createComment = async (req, res) => {
  console.log(req.body);
  const comment = {
    id: uuidv4(),
    timestamp: Date.now(),
    content: req.body.content,
    articleId: req.body.articleId,
    author: req.body.author,
  };
  db.comments.push(comment);
  res.sendStatus(201);
};

const showCommentsById = async (req, res) => {
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
};

module.exports = {
  showComments,
  showCommentsById,
  createComment,
};
