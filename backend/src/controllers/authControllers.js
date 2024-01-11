// Import access to database tables
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const tables = require("../tables");

const login = async (req, res, next) => {
  try {
    const { mail, password } = req.body;

    const user = await tables.user.readByEmail(mail);

    if (user == null) {
      res.status(200).json({
        error: 422,
        message: "Combinaison e-mail / mot-de-passe invalide",
      });
    }

    const verified = await argon2.verify(user.password, password);

    const userVerified = {
      id: user.id,
      pseudo: user.pseudo,
      role: user.role_id,
    };

    if (!verified) {
      res.status(200).json({
        error: 422,
        message: "Combinaison e-mail / mot-de-passe invalide",
      });
    } else {
      const token = await jwt.sign(
        { sub: user.id, isAdmin: user.isAdmin },
        process.env.APP_SECRET,
        {
          expiresIn: "2h",
        }
      );
      res.status(200).json({ token, userVerified });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { login };
