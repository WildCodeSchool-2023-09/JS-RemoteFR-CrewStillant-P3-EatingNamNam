// Import access to database tables
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const tables = require("../tables");

const login = async (req, res, next) => {
  try {
    const { mail, password } = req.body;

    const user = await tables.user.readByEmail(mail);

    if (user == null) {
      res.status(404).json({
        message: "Combinaison e-mail / mot-de-passe invalide",
      });
    }
    const verified = await argon2.verify(user.password, password);

    const { id, pseudo, role, mail: email } = user;

    if (!verified) {
      res.status(403).json({
        message: "Combinaison e-mail / mot-de-passe invalide",
      });
    } else {
      const token = await jwt.sign(
        { sub: id, mail: email, isAdmin: role },
        process.env.APP_SECRET,
        {
          expiresIn: "2h",
        }
      );
      res.status(200).json({ token, email, role, pseudo });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { login };
