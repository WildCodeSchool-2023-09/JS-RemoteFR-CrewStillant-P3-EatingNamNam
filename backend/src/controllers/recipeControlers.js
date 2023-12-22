const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation

const browse = async (req, res, next) => {
  try {
    const recipes = await tables.recipe.readAll();
    if (recipes == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(recipes);
    }
  } catch (error) {
    next(error);
  }
};

// The R of BREAD - Read operation

const read = async (req, res, next) => {
  try {
    const recipe = await tables.recipe.read(parseInt(req.params.id, 10));

    if (recipe == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(recipe);
    }
  } catch (error) {
    next(error);
  }
};

// The E of BREAD - Edit (Update) operation

const edit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedRecipe = req.body;
    const recipe = await tables.recipe.update(updatedRecipe, parseInt(id, 10));
    if (recipe == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json({ message: `Recipe #${id} updated` });
    }
  } catch (error) {
    next(error);
  }
};

// The A of BREAD - Add (Create) operation

const add = async (req, res, next) => {
  try {
    const newRecipe = await tables.recipe.create(req.body);

    if (newRecipe == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json({ message: "Recipe created" });
    }
  } catch (error) {
    next(error);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  try {
    const recipe = await tables.recipe.delete(parseInt(req.params.id, 10));
    if (recipe == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json({ message: "Recipe deleted" });
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
};
