// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation

const browse = async (req, res) => {
  try {
    const comments = await tables.comment.readAll();
    if (comments == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(comments);
    }
  } catch (err) {
    console.error(err);
  }
};

// The R of BREAD - Read operation

const read = async (req, res) => {
  try {
    const comment = await tables.comment.read(parseInt(req.params.id, 10));

    if (comment == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(comment);
    }
  } catch (err) {
    console.error(err);
  }
};

// The E of BREAD - Edit (Update) operation

const edit = async (req, res) => {
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
    console.error(err);
  }
};

// The A of BREAD - Add (Create) operation

const add = async (req, res) => {
  try {
    const comment = req.body;
    const newComment = await tables.comment.create(comment);

    if (newComment == null) {
      res.sendStatus(404);
    } else {
      res.status(201).json({ message: "comment created successfully" });
    }
  } catch (err) {
    console.error(err);
  }
};

// The D of BREAD - Destroy (Delete) operation

const destroy = async (req, res) => {
  try {
    const comment = await tables.comment.destroy(parseInt(req.params.id, 10));

    if (comment == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json({ message: "comment deleted successfully" });
    }
  } catch (err) {
    console.error(err);
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
