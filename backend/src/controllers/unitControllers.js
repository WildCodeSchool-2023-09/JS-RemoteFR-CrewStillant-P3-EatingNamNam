// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation

const browse = async (req, res, next) => {
  try {
    const units = await tables.unit.readAll();

    if (units == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(units);
    }
  } catch (err) {
    next(err);
  }
};

// The R of BREAD - Read operation

const read = async (req, res, next) => {
  try {
    const unit = await tables.unit.read(parseInt(req.params.id, 10));

    if (unit == null) {
      res.sendStatus(404);
    } else {
      res.send(200).json(unit);
    }
  } catch (err) {
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation

const edit = async (req, res, next) => {
  try {
    const updateUnit = req.body;
    const unit = await tables.unit.update(
      updateUnit,
      parseInt(req.params.id, 10)
    );

    if (unit == null) {
      res.sendStatus(404);
    } else {
      res.send(200).json({ message: "unit edited successfully" });
    }
  } catch (err) {
    next(err);
  }
};

// The A of BREAD - Add (Create) operation

const add = async (req, res, next) => {
  try {
    const newUnit = req.body;
    const unit = await tables.unit.create(newUnit);

    if (unit == null) {
      res.sendStatus(404);
    } else {
      res.send(201).json({ message: "unit created successfully" });
    }
  } catch (err) {
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation

const destroy = async (req, res, next) => {
  try {
    const deletedUnit = await tables.unit.delete(parseInt(req.params.id, 10));

    if (deletedUnit == null) {
      res.sendStatus(404);
    } else {
      res.send(200).json({ message: "unit deleted successfully" });
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
