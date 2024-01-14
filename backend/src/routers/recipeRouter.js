const express = require("express");

const router = express.Router();
const { verifyToken } = require("../services/verifyToken");

const {
  browse,
  read,
  edit,
  add,
  destroy,
} = require("../controllers/recipeControlers");

router.get("/", browse);

router.get("/:id", read);

router.use(verifyToken);

router.post("/", add);

router.put("/:id", edit);

router.delete("/:id", destroy);

module.exports = router;
