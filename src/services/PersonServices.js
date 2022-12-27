const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

class PersonService {
  constructor(db) {
    this.db = db;
  }

  async store(name, age, email, username, picture, password) {
    try {
      const id = uuidv4();
      const hash = await bcrypt.hash(password, 10);
      await this.db.run(
        `Create (u:Person {_id: "${id}", name: "${name}", age: "${age}", email: "${email}", username: "${username}", picture: "${picture}", password: "${hash}", createdAt: "datetime(${new Date()})"} ) return u`
      );
      return await this.findById(id);
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async findById(id) {
    try {
      const result = await this.db.run(
        `MATCH (u:Person {_id: '${id}'}) RETURN u`
      );

      return result.records[0].get("u").properties;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async findAll() {
    try {
      const result = await this.db.run(`MATCH (u:Person) RETURN u`);
      return result.records.map((record) => record.get(0).properties);
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async delete(id) {
    try {
      const result = await this.db.run(
        `MATCH (u:Person {_id: '${id}'}) DELETE u`
      );
      return "Person deleted";
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async update(id, name, age, email) {
    try {
      const result = await this.db.run(
        `MATCH (u:Person {_id: '${id}'}) SET u.name = '${name}', u.age = '${age}', u.email = '${email}' RETURN u`
      );
      return result.records[0].get(0).properties;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  //   async follow(id1, follow) {
  //     try {
  //       if (id1 === follow) {
  //         return "Error follow self";
  //       }
  //       console.log(id1, follow);
  //       const result = await this.db.run(`
  //           MATCH (u1:Person {_id: "${id1}"}),
  // (u2:Person {_id: "${follow}"})
  // CREATE (u1)-[r:FOLLOWS]->(u2)
  // RETURN u1, r, u2`);
  //       return `Person ${id1} following ${follow}`;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
}

module.exports = PersonService;
