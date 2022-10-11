// Create a new express application instance
const express = require("express");
const bodyParser = require("body-parser");
const articleRoutes = require("./src/routes/articles");
const commentRoutes = require("./src/routes/comment");

const port = process.env.PORT || 8080;
const app = express();

//middleware
const apiRoot = "/api";
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log("serveur allumé ! au port :",port);
});


app.use((req, res, next) => {
    console.log("Route : ", req.path, req.method);
    next();
});

//Routes
app.use(apiRoot, articleRoutes);
app.use(apiRoot, commentRoutes);
