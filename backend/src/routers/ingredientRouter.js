const express = require("express");

const router = express.Router();

const {
  browse,
  read,
  edit,
  add,
  destroy,
} = require("../controllers/ingredientController");

router.get("/", browse);

router.post(
  "/",
  (req, res, next) => {
    const { name } = req.body;
    if (name !== "") {
      next();
    } else {
      res.status(404).json({ message: "name must be not null" });
    }
  },
  add
);

router.get("/:id", read);

router.put("/:id", edit);

router.delete("/:id", destroy);

module.exports = router;
