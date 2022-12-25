class FollowService {
  constructor(db) {
    this.db = db;
  }
  async follow(id, follow) {
    try {
      if (id === follow) {
        return "Error follow self";
      }
      const result = await this.db.run(`
        MATCH (u1:Person {_id: "${id}"}), 
        (u2:Person {_id: "${follow}"})
        CREATE (u1)-[r:FOLLOWS]->(u2)
        RETURN u1, r, u2`);
      return `Person ${id} following ${follow}`;
    } catch (error) {
      console.log(error);
    }
  }

  async unfollow(id, follow) {
    try {
      const result = await this.db.run(`
        MATCH (u1:Person {_id: "${id}"})-[r:FOLLOWS]- 
        (u2:Person {_id: "${follow}"}) DELETE r
        `);
      //Como colocar a prop createdAt em relações ??
      return `Person ${id} unfollowing ${follow}`;
    } catch (error) {
      console.log(error);
    }
  }

  async followers(id) {
    const result = await this.db.run(`
     MATCH (: Person)-[r:FOLLOWS]->(u2)
     RETURN u2`);
    return result.records.map((record) => record.get(0).properties);
  }
}
module.exports = FollowService;
