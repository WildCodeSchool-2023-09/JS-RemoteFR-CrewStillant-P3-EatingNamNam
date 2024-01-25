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
  edit,
  editRole,
  editAnonymous,
  add,
  destroy,
  download,
} = require("../controllers/userControllers");

router.get("/", browse);

router.post("/", userValidation, hash, add);

router.get("/dl", userValidation, download);

router.get("/recipe", verifyToken, readRecipe);

router.get("/comment", verifyToken, readComment);

router.get("/account", verifyToken, read);

router.put("/account", verifyToken, userValidation, hash, edit);

router.put("/role/", verifyToken, editRole);

router.put("/anonymous/:id", verifyToken, editAnonymous);

router.delete("/:id", destroy);

module.exports = router;
