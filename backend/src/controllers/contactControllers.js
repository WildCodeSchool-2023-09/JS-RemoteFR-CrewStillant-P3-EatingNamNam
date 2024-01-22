const tables = require("../tables");

const add = async (req, res, next) => {
  try {
    const newMessage = req.body;
    const message = await tables.contact.create(newMessage);

    if (message == null) {
      res.sendStatus(404);
    } else {
      res
        .status(201)
        .json({ message: "Votre message a été envoyé avec succès!" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { add };
