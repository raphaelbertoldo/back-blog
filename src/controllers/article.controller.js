const db = require("../database");
const ArticleService = require("../services/ArticleService");

module.exports = {
  async findAll(req, res) {
    const articleService = new ArticleService(db);

    const articles = await articleService.findAll();
    if (!articles) {
      return res.status(400).json({ error: "Error finding articles" });
    }
    return res.status(200).json(articles);
  },
  async store(req, res) {
    const id = req.params.id;
    const { title, description } = req.body;
    const articleService = new ArticleService(db);

    const article = await articleService.store(id, title, description);
    if (!article) {
      return res.status(400).json({ error: "Error creating article" });
    } else {
      return res.status(200).json(article);
    }
  },
  async findById(req, res) {
    const { id } = req.params;
    const articleService = new ArticleService(db);

    const article = await articleService.findById(id);
    if (!article) {
      return res.status(400).json({ error: "Error finding article" });
    }
    return res.status(200).json(article);
  },
  async update(req, res) {
    const { id } = req.params;
    const { name, age } = req.body;
    const articleService = new ArticleService(db);

    const result = await articleService.update(id, name, age);
    if (!result) {
      return res.status(400).json({ error: "Error updating article" });
    }
    return res.status(200).json(result);
  },
  async delete(req, res) {
    const { id } = req.params;
    const articleService = new ArticleService(db);

    const result = await articleService.delete(id);
    if (!result) {
      return res.status(400).json({ error: "Error deleting article" });
    }
    return res.status(200).json(result);
  },
};
