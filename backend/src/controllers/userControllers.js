// Import access to database tables
const argon2 = require("argon2");
const Papa = require("papaparse");
const fs = require("node:fs/promises");
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation

const browse = async (req, res, next) => {
  try {
    const users = await tables.user.readAll();

    if (users == null) {
      res.sendStatus(404);
    } else {
      users.forEach((e) => {
        delete e.password;
      });
      res.status(200).json(users);
    }
  } catch (error) {
    next(error);
  }
};

const download = async (req, res, next) => {
  try {
    const users = await tables.user.readAll();

    if (users == null) {
      res.sendStatus(404);
    } else {
      users.forEach((e) => {
        delete e.password;
      });
      const test = [{ "sep=,": "" }];
      const initFile = Papa.unparse(test);
      const parsUsers = Papa.unparse(users);
      await fs.writeFile("./public/assets/users_informations.csv", initFile);
      await fs.writeFile("./public/assets/users_informations.csv", parsUsers, {
        flag: "a",
      });
      // Download function provided by express
      res
        .status(200)
        .download("./public/assets/users_informations.csv", (err) => {
          if (err) {
            console.error(err);
          }
        });
    }
  } catch (err) {
    next(err);
  }
};

// The R of BREAD - Read operation

const read = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await tables.user.read(parseInt(id, 10));

    if (user == null) {
      res.sendStatus(404);
    } else {
      delete user.password;
      res.status(200).json(user);
    }
  } catch (error) {
    next(error);
  }
};

// The E of BREAD - Edit (Update) operation

const edit = async (req, res, next) => {
  const {
    firstname,
    lastname,
    pseudo,
    birthdate,
    week_time_kitchen: weekTimeKitchen,
    weight,
    hashedPassword,
    mail,
  } = req.body;

  try {
    const user = await tables.user.readByEmail(req.body.mail);

    if (user == null) {
      res.sendStatus(422);
      return;
    }
    const verified = await argon2.verify(user.password, req.body.password);
    if (verified) {
      delete req.body.password;
      const id = parseInt(req.params.id, 10);
      const userUpdated = await tables.user.update(
        firstname,
        lastname,
        mail,
        pseudo,
        hashedPassword,
        birthdate,
        weight,
        weekTimeKitchen,
        id
      );
      if (userUpdated === 0) {
        res.sendStatus(404);
      } else {
        res.status(200).json({ message: "User updated" });
      }
    } else {
      res.sendStatus(422);
    }
  } catch (error) {
    next(error);
  }
};

// The A of BREAD - Add (Create) operation

const add = async (req, res, next) => {
  try {
    delete req.body.password;
    const user = await tables.user.create(req.body);
    if (user == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json({ message: "User created" });
    }
  } catch (error) {
    next(error);
  }
};

// The D of BREAD - Destroy (Delete) operation

const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await tables.user.delete(parseInt(id, 10));

    if (user === 0) {
      res.sendStatus(404);
    } else {
      res.status(200).json({ message: "User deleted" });
    }
  } catch (error) {
    next(error);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  download,
};
