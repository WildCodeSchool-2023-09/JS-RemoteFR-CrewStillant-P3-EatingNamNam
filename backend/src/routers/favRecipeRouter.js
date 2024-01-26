const express = require("express");

const router = express.Router();

const { add, destroy, read } = require("../controllers/favRecipeControllers");

router.post("/", add);
router.delete("/:id", destroy);
router.get("/:id", read);

module.exports = router;
