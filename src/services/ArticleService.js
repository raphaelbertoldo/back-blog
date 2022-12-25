const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

class ArticleService {
  constructor(db) {
    this.db = db;
  }

  async store(author, title, description) {
    try {
      const id = uuidv4();
      const result = await this.db.run(`
        MATCH (person:Person {_id: "${author}"})
        CREATE (article:Article {_id: "${id}", title: "${title}", description: "${description}", author: person.name, createdAt: "datetime(${new Date()})"} )
        CREATE (person)-[r:BELONG]->(article)
        RETURN article`);
      return result.records[0].get(0).properties;
    } catch (err) {
      console.log(err);
      console.log(err);
      return null;
    }
  }

  async findById(id) {
    try {
      const result = await this.db.run(
        `MATCH (u:Article {_id: '${id}'}) RETURN u`
      );

      return result.records[0].get("u").properties;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async findAll() {
    try {
      const result = await this.db.run(`MATCH (u:Article) RETURN u`);
      return result.records.map((record) => record.get(0).properties);
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async delete(id) {
    try {
      const result = await this.db.run(
        `MATCH (u1:Article {_id: "9c75f87c-691b-4365-98f2-d0de6d35cd51"})-[r:BELONG]-(u2) DELETE u1, r`
      );
      return "Article deleted";
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

module.exports = ArticleService;
