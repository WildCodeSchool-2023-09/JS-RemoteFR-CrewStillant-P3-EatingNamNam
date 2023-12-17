// Import access to database tables
const tables = require("../tables");

// BREAD
const browse = async (req, res) => {
  try {
    const roles = await tables.role.readAll();

    if (roles == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(roles);
    }
  } catch (error) {
    console.error(error);
  }
};

const read = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const role = await tables.role.read(id);

    if (role == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(role);
    }
  } catch (error) {
    console.error(error);
  }
};

const edit = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { name } = req.body;
    const updateRole = await tables.role.update(name, id);

    if (updateRole == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json({ message: `Role #${id} updated` });
    }
  } catch (error) {
    console.error(error);
  }
};

const add = async (req, res) => {
  try {
    const { name } = req.body;
    const role = await tables.role.create(name);

    if (role == null) {
      res.sendStatus(404);
    } else {
      res.status(201).json({ message: `Role created` });
    }
  } catch (error) {
    console.error(error);
  }
};

const destroy = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const role = await tables.role.delete(id);

    if (role == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json({ message: `Role #${id} deleted` });
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
