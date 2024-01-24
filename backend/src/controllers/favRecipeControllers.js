// Import database

const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation

const browse = async (req, res, next) => {
  try {
    const favorite = await tables.favorite.readAll();
    if (favorite == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(favorite);
    }
  } catch (err) {
    next(err);
  }
};

// The R of BREAD - Read operation

const read = async (req, res, next) => {
  try {
    const { id } = req.params;
    const favorite = await tables.favoriteRecipe_user.readById(
      parseInt(id, 10)
    );

    if (favorite == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(favorite);
    }
  } catch (err) {
    next(err);
  }
};

// The A of BREAD - Add operation

const add = async (req, res, next) => {
  try {
    const { userID, recipeID } = req.body;
    const favorite = await tables.favoriteRecipe_user.create(
      parseInt(userID, 10),
      parseInt(recipeID, 10)
    );
    if (favorite === null) {
      res.sendStatus(404);
    } else {
      res.status(201).json({ message: "add favorite succesfully" });
    }
  } catch (error) {
    next(error);
  }
};

// The E of BREAD - Edit (Update) operation

const edit = async (req, res, next) => {
  try {
    const favorite = req.body;
    const updatedFavorite = await tables.favorite.update(
      favorite,
      parseInt(req.params.id, 10)
    );

    if (updatedFavorite == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json({ message: "favorite updated successfully" });
    }
  } catch (err) {
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation

const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const favorite = await tables.favoriteRecipe_user.delete(parseInt(id, 10));

    if (favorite == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json({ message: "delete favorite successfully" });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
  read,
  add,
  edit,
  destroy,
};
