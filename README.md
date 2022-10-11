# Lab 3 : Web API with Node.js

It is a basic NodeJS web application exposing REST API that creates and stores articles data in express
## Functionality

1. Start a web server
2. Create or get articles and comments 

## Installation

This application is written on NodeJS and it uses Express server.

1. [Install NodeJS](https://nodejs.org/en/download/)

2. Install application

Go to the root directory of the application (where `package.json` file located) and run:
```
 npm install
```
## Usage

1. Start a web server

From the root directory of the project run:

```
npm run develop
```

It will start a web server available in your browser at http://localhost:8080.

# API Routes

## 1. `GET /articles`
​
 - Sur cette route, vous pouvez observer le contenu de tous les articles.


## 2. `POST /articles`
​
- Sur cette route, on peut rajouter un article, via un moyen adéquat, dans le cadre de ce TP, nous avons utliisés Postman pour check les routes.

## 3. `GET /articles/:articleId`
​
-  Cette route sert à afficher le contenu d'un article unique en donnant son id.

## 4. `GET /articles/:articleId/comments`
​
-  Cette route sert à afficher tous les commentaires liés à un article qu'on chosira par son id.
 

​
## 5. ` POST /articles/:articleId/comments`

​
-  Avec cette route, on peut rajouter un commentaire, sur un article dont on donnera l'id.

## 6. ` GET /articles/:articleId/comments/:commentId`

​
- Enfin, avec cette route, nous pouvons afficher un unique commentaire choisi avec son id sur un article donné, lui également par son id.
​

​
## Crédits
​
> Nicolas SAINT & Thomas CHOPIN