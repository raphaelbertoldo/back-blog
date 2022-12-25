var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
const db = require("../database");

module.exports = {
  async signin(req, res) {
    const { API_SECRET } = process.env;
    try {
      const find = await db.run(
        `MATCH (u:Person {email: '${req.body.email}'}) RETURN u`
      );
      const user = find.records[0].get("u").properties;
      console.log("🚀 ~ file: auth.controller.js:41 ~ signin ~ user", user);
      if (!user) {
        return res.status(404).send({
          message: "User Not found.",
        });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }
      var token = jwt.sign(
        {
          id: user.id,
        },
        API_SECRET,
        {
          expiresIn: 86400,
        }
      );

      res.status(200).send({
        user: {
          id: user._id,
          email: user.email,
          fullName: user.fullName,
        },
        message: "Login successfull",
        accessToken: token,
      });
    } catch (error) {
      res.status(500).send({
        message: error,
      });
      console.log("🚀 ~ file: auth.controller.js:41 ~ signin ~ error", error);
    }
  },
};
