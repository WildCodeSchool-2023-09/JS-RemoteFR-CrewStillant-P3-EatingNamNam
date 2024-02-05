// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation

const browse = async (req, res, next) => {
  try {
    const comments = await tables.comment.readAll();
    if (comments == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(comments);
    }
  } catch (err) {
    next(err);
  }
};

// The R of BREAD - Read operation

const read = async (req, res, next) => {
  try {
    const comment = await tables.comment.readByRecipe(
      parseInt(req.params.id, 10)
    );

    if (comment == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(comment);
    }
  } catch (err) {
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation

const edit = async (req, res, next) => {
  try {
    const comment = req.body;
    const updatedComment = await tables.comment.update(
      comment,
      parseInt(req.params.id, 10)
    );

    if (updatedComment == null) {
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
    const { recipe_id: recipeID, content } = req.body;
    const { sub } = req.auth;
    const newCommentID = await tables.comment.create(content);

    if (newCommentID == null) {
      res.sendStatus(404);
    }

    const newRefComment = await tables.recipe_comment.create(
      newCommentID,
      Number(sub),
      recipeID
    );

    if (newRefComment == null) {
      res.sendStatus(404);
    } else {
      res.status(201).json({ message: "Commentaire posté" });
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
