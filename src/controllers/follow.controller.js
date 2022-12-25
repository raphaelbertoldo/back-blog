const db = require("../database");
const FollowService = require("../services/FollowService");

module.exports = {
  async follow(req, res) {
    const { id, id2 } = req.params;
    const follow = id2;
    const followService = new FollowService(db);
    const result = await followService.follow(id, follow);
    if (!result) {
      return res.status(400).json({ error: "Error follow person" });
    }
    return res.status(200).json(result);
  },

  async unfollow(req, res) {
    const { id, id2 } = req.params;
    const follow = id2;
    const followService = new FollowService(db);
    const result = await followService.unfollow(id, follow);
    if (!result) {
      return res.status(400).json({ error: "Error unfollow person" });
    }
    return res.status(200).json(result);
  },

  async followers(req, res) {
    const { id } = req.params;
    const followService = new FollowService(db);
    const result = await followService.followers(id);
    if (!result) {
      return res.status(400).json({ error: "Error find followers" });
    }
    return res.status(200).json(result);
  },
};
