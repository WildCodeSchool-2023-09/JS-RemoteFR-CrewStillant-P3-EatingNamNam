// BREAD

// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    const ingredients = await tables.ingredient.readAll();
    if (ingredients == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(ingredients);
    }
  } catch (error) {
    next(error);
  }
};

const read = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const ingredient = await tables.ingredient.read(id);

    if (ingredient == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(ingredient);
    }
  } catch (error) {
    next(error);
  }
};

const edit = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    // const updatedIngredient = req.body;
    const ingredient = await tables.ingredient.update(
      parseInt(req.params.id, 10),
      req.body
    );

    if (ingredient == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json({ message: `Ingredient #${id} modified` });
    }
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  try {
    const newIngredient = req.body;
    const ingredient = await tables.ingredient.create(newIngredient);

    if (ingredient == null) {
      res.sendStatus(404);
    } else {
      res.status(201).json({ message: "Ingredient created successfully!" });
    }
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const ingredient = await tables.ingredient.delete(id);

    if (ingredient == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json({ message: `Ingredient #${id} deleted` });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { browse, read, edit, add, destroy };
