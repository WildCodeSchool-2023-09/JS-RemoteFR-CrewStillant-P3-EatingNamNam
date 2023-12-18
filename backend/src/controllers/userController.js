// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation

const browse = async (req, res) => {
  try {
    const users = await tables.user.readAll();

    if (users == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(users);
    }
  } catch (error) {
    console.error(error);
  }
};

// The R of BREAD - Read operation

const read = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await tables.user.read(parseInt(id, 10));

    if (user == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    console.error(error);
  }
};

// The E of BREAD - Edit (Update) operation

const edit = async (req, res) => {
  try {
    const updatedUser = req.body;
    const user = await tables.user.update(updatedUser);

    if (user === 0) {
      res.sendStatus(404);
    } else {
      res.status(200).json({ message: "User updated" });
    }
  } catch (error) {
    console.error(error);
  }
};

// The A of BREAD - Add (Create) operation

const add = async (req, res) => {
  try {
    const newUser = req.body;
    const user = await tables.user.update(newUser);
    if (user == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json({ message: "User created" });
    }
  } catch (error) {
    console.error(error);
  }
};

// The D of BREAD - Destroy (Delete) operation

const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await tables.user.delete(parseInt(id, 10));

    if (user === 0) {
      res.sendStatus(404);
    } else {
      res.status(200).json({ message: "User deleted" });
    }
  } catch (error) {
    console.error(error);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
