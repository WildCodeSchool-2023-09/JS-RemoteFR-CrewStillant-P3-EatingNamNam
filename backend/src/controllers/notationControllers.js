// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation

const browse = async (req, res, next) => {
  try {
    const notes = await tables.notation.readAll();
    if (notes == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(notes);
    }
  } catch (err) {
    next(err);
  }
};

// The R of BREAD - Read operation

const read = async (req, res, next) => {
  try {
    const recipeID = parseInt(req.params.id, 10);
    const averageNote = await tables.notation.readByRecipe(recipeID);

    if (averageNote == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(averageNote);
    }
  } catch (err) {
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation

// const edit = async (req, res, next) => {};

// The A of BREAD - Add (Create) operation

const add = async (req, res, next) => {
  try {
    const { note, recipeID, userID } = req.body;

    const newNoteID = await tables.notation.create(
      Number(note),
      Number(recipeID),
      Number(userID)
    );

    if (newNoteID == null) {
      res.sendStatus(404);
    } else {
      res.status(201).json({ message: "note created successfully" });
    }
  } catch (err) {
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation

// const destroy = async (req, res, next) => {

// };

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  // edit,
  add,
  // destroy,
};
