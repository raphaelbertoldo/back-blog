const jwt = require("jsonwebtoken");
const db = require("../database");

const verifyToken = (req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.API_SECRET,
      async function (err, decode) {
        console.log("🚀 ~ file: authJWT.js:14 ~ decode", decode);
        if (err) req.user = undefined;
        const find = await db.run(
          `MATCH (u:Person {_id: '${decode.id}'}) RETURN u`
        );
        console.log("🚀 ~ file: authJWT.js:20 ~ find", find);
        const user = find.records[0].get("u").properties;
        req.user = user;
        next();

        // const find = await db
        //   .run(`MATCH (u:Person {_id: '${decode._id}'}) RETURN u`)
        //   .then((err, user) => {

        //     if (err) {
        //       res.status(500).send({
        //         message: err,
        //       });
        //     } else {
        //     }
        //   });
      }
    );
  } else {
    req.user = undefined;
    next();
  }
};
module.exports = verifyToken;

const verifyJWT = (req, res, next) => {
  var token = req.headers["x-access-token"];
  if (!token)
    return res.status(401).send({ auth: false, message: "No token provided." });

  const payload = jwt.verify(token, process.env.API_SECRET);

  if (!payload) {
    return res
      .status(500)
      .send({ auth: false, message: "Failed to authenticate token." });
  } else {
    next();
  }
};
module.exports = verifyJWT;
