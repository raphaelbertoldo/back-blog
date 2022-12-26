const express = require("express");
const routes = express.Router();

const FollowController = require("./controllers/follow.controller");
const PersonController = require("./controllers/person.controller");
const AuthController = require("./controllers/auth.controller");
const verifyToken = require("./middlewares/authJWT");
const verifyJWT = require("./middlewares/authJWT");
const ArticleController = require("./controllers/article.controller");

routes.get("/", () => {
  return `Api Ok`;
});

routes.get("/api/v1/person", verifyToken, PersonController.findAll);
routes.post("/api/v1/person", PersonController.store);
routes.get("/api/v1/person/:id", verifyToken, PersonController.findById);
routes.put("/api/v1/person/:id", verifyToken, PersonController.update);
routes.delete("/api/v1/person/:id", verifyToken, PersonController.delete);

routes.get(
  "/api/v1/person/followers/:id",
  verifyToken,
  FollowController.followers
);
routes.post("/api/v1/:id/follow/:id2", verifyToken, FollowController.follow);
routes.delete(
  "/api/v1/:id/unfollow/:id2",
  verifyToken,
  FollowController.unfollow
);

routes.post("/api/v1/login", AuthController.signin);
routes.get("/get", AuthController.signin);

routes.get("/api/v1/articles", verifyToken, ArticleController.findAll);
routes.post("/api/v1/article/:id", verifyToken, ArticleController.store);
routes.get("/api/v1/article/:id", verifyToken, ArticleController.findById);
routes.delete("/api/v1/article/:id", verifyToken, ArticleController.delete);

module.exports = routes;
