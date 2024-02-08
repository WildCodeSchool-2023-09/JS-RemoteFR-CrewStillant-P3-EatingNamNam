const express = require("express");

const router = express.Router();

const { userValidation } = require("../middlewares/userValidation");
const { hash } = require("../middlewares/hashPassword");
const { verifyToken } = require("../services/verifyToken");

const {
  browse,
  read,
  readRecipe,
  readComment,
  readFavorite,
  edit,
  editRole,
  editAnonymous,
  add,
  destroy,
  download,
} = require("../controllers/userControllers");

router.get("/", browse);

router.post("/", userValidation, hash, add);

router.use(verifyToken);

router.get("/dl", download);

router.get("/recipe", readRecipe);

router.get("/comment", readComment);

router.get("/favorite", readFavorite);

router.get("/account", read);

router.put("/account", userValidation, hash, edit);

router.put("/role/", editRole);

router.put("/anonymous/:id", editAnonymous);

router.delete("/:id", destroy);

module.exports = router;
