// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation

const browse = async (req, res, next) => {
  try {
    const success = await tables.success.readAll();

    if (success == null) {
      res.sendStatus(404);
    } else {
      res.send(200).json(success);
    }
  } catch (err) {
    next(err);
  }
};

// The R of BREAD - Read operation

const read = async (req, res, next) => {
  try {
    const success = await tables.success.read(parseInt(req.params.id, 10));

    if (success == null) {
      res.sendStatus(404);
    } else {
      res.send(200).json(success);
    }
  } catch (err) {
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation

const edit = async (req, res, next) => {
  try {
    const updateSuccess = req.body;
    const success = await tables.success.update(
      updateSuccess,
      parseInt(req.params.id, 10)
    );

    if (success == null) {
      res.sendStatus(404);
    } else {
      res.send(200).json({ message: "success edited successfully" });
    }
  } catch (err) {
    next(err);
  }
};

// The A of BREAD - Add (Create) operation

const add = async (req, res, next) => {
  try {
    const newSuccess = req.body;
    const success = await tables.success.create(newSuccess);

    if (success == null) {
      res.sendStatus(404);
    } else {
      res.send(201).json({ message: "success created successfully" });
    }
  } catch (err) {
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation

const destroy = async (req, res, next) => {
  try {
    const deletedSuccess = await tables.success.delete(
      parseInt(req.params.id, 10)
    );

    if (deletedSuccess == null) {
      res.sendStatus(404);
    } else {
      res.send(200).json({ message: "success deleted successfully" });
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
