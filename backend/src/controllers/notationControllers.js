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
    const note = await tables.notation.readByRecipe(
      parseInt(req.params.id, 10)
    );

    if (note == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(note);
    }
  } catch (err) {
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation

const edit = async (req, res, next) => {
  try {
    const note = req.body;
    const updatedNote = await tables.notation.update(
      note,
      parseInt(req.params.id, 10)
    );

    if (updatedNote == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json({ message: "comment updated successfully" });
    }
  } catch (err) {
    next(err);
  }
};

// The A of BREAD - Add (Create) operation

const add = async (req, res, next) => {
  try {
    const { recipe_id: recipeID, user_id: userID, content } = req.body;

    const newCommentID = await tables.comment.create(content);

    if (newCommentID == null) {
      res.sendStatus(404);
    }

    const newRefComment = await tables.recipe_comment.create(
      newCommentID,
      userID,
      recipeID
    );

    if (newRefComment == null) {
      res.sendStatus(404);
    } else {
      res.status(201).json({ message: "comment created successfully" });
    }
  } catch (err) {
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation

const destroy = async (req, res, next) => {
  try {
    const comment = await tables.comment.destroy(parseInt(req.params.id, 10));

    if (comment == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json({ message: "comment deleted successfully" });
    }
  } catch (err) {
    next(err);
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
