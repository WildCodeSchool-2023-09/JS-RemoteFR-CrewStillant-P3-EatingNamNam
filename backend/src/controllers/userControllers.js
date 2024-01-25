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
    const { isAdmin } = req.auth;

    if (isAdmin === "admin") {
      const users = await tables.user.readAll();

      if (users == null) {
        res.sendStatus(404);
      } else {
        users.forEach((e) => {
          delete e.password;
        });

        // cette ligne de code pour pouvoir générer une lecture propre avec Excel des données utilisateurs
        const test = [{ "sep=,": "" }];

        // je transforme mes 2 données JSON en CSV
        const initFile = Papa.unparse(test);
        const parsUsers = Papa.unparse(users);

        // j'écris dans un nouveau fichier les données CSV
        await fs.writeFile("./public/assets/users_informations.csv", initFile);
        await fs.writeFile(
          "./public/assets/users_informations.csv",
          parsUsers,
          {
            flag: "a",
          }
        );

        // Download function provided by express, je télécharge ce nouveau fichier vers le front
        res
          .status(200)
          .download("./public/assets/users_informations.csv", (err) => {
            if (err) {
              console.error(err);
            }
          });
      }
    } else {
      res.sendStatus(403);
    }
  } catch (err) {
    next(err);
  }
};

// The R of BREAD - Read operation

const read = async (req, res, next) => {
  try {
    const { mail } = req.auth;
    const user = await tables.user.readByEmail(mail);

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

const readRecipe = async (req, res, next) => {
  try {
    const { sub } = req.auth;

    const recipes = await tables.recipe_user.readByUserID(Number(sub));

    if (recipes == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(recipes);
    }
  } catch (error) {
    next(error);
  }
};

const readComment = async (req, res, next) => {
  try {
    const { sub } = req.auth;

    const recipes = await tables.recipe_comment.readByUserID(Number(sub));

    if (recipes == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(recipes);
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
    const user = await tables.user.readByEmail(mail);

    if (user == null) {
      res.sendStatus(422);
      return;
    }
    const verified = await argon2.verify(user.password, req.body.password);
    if (verified) {
      delete req.body.password;
      const id = parseInt(user.id, 10);
      const userUpdated = await tables.user.update(
        firstname,
        lastname,
        mail,
        pseudo,
        hashedPassword,
        birthdate.split("T")[0],
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

const editRole = async (req, res, next) => {
  try {
    const { isAdmin } = req.auth;

    if (isAdmin === "admin") {
      const { id, role_id: roleID } = req.body;

      const newUserRole = await tables.user.updateRole(
        Number(id),
        Number(roleID)
      );

      if (newUserRole === 0) {
        res.sendStatus(404);
      } else {
        res.status(200).json({ message: "Role updated" });
      }
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    next(error);
  }
};

const editAnonymous = async (req, res, next) => {
  try {
    const { isAdmin } = req.auth;

    if (isAdmin === "admin") {
      const { id } = req.params;
      const anonymousUser = await tables.user.updateAnonymous(Number(id));
      if (anonymousUser === 0) {
        res.sendStatus(404);
      } else {
        res.status(200).json({ message: "Role updated" });
      }
    } else {
      res.sendStatus(403);
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
  readRecipe,
  readComment,
  edit,
  editRole,
  editAnonymous,
  add,
  destroy,
  download,
};
