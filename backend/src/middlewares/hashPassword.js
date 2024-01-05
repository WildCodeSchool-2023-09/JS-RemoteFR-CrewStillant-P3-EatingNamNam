const argon2 = require("argon2");

const hash = async (req, res, next) => {
  try {
    const hashed = await argon2.hash(req.body.password);

    req.body.password = hashed;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { hash };
