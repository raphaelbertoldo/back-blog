const db = require("../database");

const personSchema = () => {
  console.log("Person.js");
  db.run(
    "CREATE CONSTRAINT Person FOR (person:Person) REQUIRE (person.name, person.age), person.email IS UNIQUE"
    // "CREATE CONSTRAINT ON (a:Person) ASSERT a.email IS UNIQUE"
  )
    .then((result) => {
      console.log("ok");
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = personSchema;
