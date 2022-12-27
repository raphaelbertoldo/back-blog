const db = require("../database");
const PersonService = require("../services/PersonServices");

module.exports = {
  async findAll(req, res) {
    const personService = new PersonService(db);
    const persons = await personService.findAll();
    if (!persons) {
      return res.status(400).json({ error: "Error finding persons" });
    }
    return res.status(200).json(persons);
  },
  async store(req, res) {
    const { name, age, email, username, picture, password } = req.body;
    const personService = new PersonService(db);
    const person = await personService.store(name, age, email, password);
    if (!person) {
      return res.status(400).json({ error: "Error creating person" });
    } else {
      return res.status(200).json(person);
    }
  },
  async findById(req, res) {
    const { id } = req.params;
    const personService = new PersonService(db);
    const person = await personService.findById(id);
    if (!person) {
      return res.status(400).json({ error: "Error finding person" });
    }
    return res.status(200).json(person);
  },
  async update(req, res) {
    const { id } = req.params;
    const { name, age } = req.body;
    const personService = new PersonService(db);
    const result = await personService.update(id, name, age);
    if (!result) {
      return res.status(400).json({ error: "Error updating person" });
    }
    return res.status(200).json(result);
  },
  async delete(req, res) {
    const { id } = req.params;
    const personService = new PersonService(db);
    const result = await personService.delete(id);
    if (!result) {
      return res.status(400).json({ error: "Error deleting person" });
    }
    return res.status(200).json(result);
  },
};
