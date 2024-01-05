// Import access to database tables
const tables = require("../tables");

// BREAD
const browse = async (req, res, next) => {
  try {
    const roles = await tables.role.readAll();

    if (roles == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(roles);
    }
  } catch (error) {
    next(error);
  }
};

const read = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const role = await tables.role.read(id);

    if (role == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(role);
    }
  } catch (error) {
    next(error);
  }
};

const edit = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { type } = req.body;
    const updateRole = await tables.role.update(type, id);

    if (updateRole == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json({ message: `Role #${id} updated` });
    }
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  try {
    const { type } = req.body;
    const role = await tables.role.create(type);

    if (role == null) {
      res.sendStatus(404);
    } else {
      res.status(201).json({ message: `Role created` });
    }
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const role = await tables.role.delete(id);

    if (role == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json({ message: `Role #${id} deleted` });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
