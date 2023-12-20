// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation

const browse = async (req, res, next) => {
  try {
    const step = await tables.step.readAll();

    if (step == null) {
      res.sendStatus(404);
    } else {
      res.send(200).json(step);
    }
  } catch (err) {
    next(err);
  }
};

// The R of BREAD - Read operation

const read = async (req, res, next) => {
  try {
    const steps = await tables.step.read(parseInt(req.params.id, 10));

    if (steps == null) {
      res.sendStatus(404);
    } else {
      res.send(200).json(steps);
    }
  } catch (err) {
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation

const edit = async (req, res, next) => {
  try {
    const { text } = req.body;
    const step = await tables.step.update(text, parseInt(req.params.id, 10));

    if (step == null) {
      res.sendStatus(404);
    } else {
      res.send(200).json({ message: "step edited successfully" });
    }
  } catch (err) {
    next(err);
  }
};

// The A of BREAD - Add (Create) operation

const add = async (req, res) => {
  try {
    const newStep = req.body;
    const step = await tables.step.create(newStep);

    if (step == null) {
      res.sendStatus(404);
    } else {
      res.send(201).json({ message: "step created successfully" });
    }
  } catch (err) {
    console.error(err);
  }
};

// The D of BREAD - Destroy (Delete) operation

const destroy = async (req, res) => {
  try {
    const deletedStep = await tables.step.delete(parseInt(req.params.id, 10));

    if (deletedStep == null) {
      res.sendStatus(404);
    } else {
      res.send(200).json({ message: "step deleted successfully" });
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
