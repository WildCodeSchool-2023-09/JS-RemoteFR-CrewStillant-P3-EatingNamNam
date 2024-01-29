const express = require("express");

const router = express.Router();
const { verifyToken } = require("../services/verifyToken");

const {
  browse,
  read,
  edit,
  add,
  destroy,
} = require("../controllers/recipeControllers");

const {
  tableIngredientRecipeValidation,
} = require("../middlewares/postRecipeValidation");

router.get("/", browse);

router.get("/:id", read);

router.use(verifyToken);

router.post("/", tableIngredientRecipeValidation, add);

router.put("/:id", edit);

router.delete("/:id", destroy);

module.exports = router;
