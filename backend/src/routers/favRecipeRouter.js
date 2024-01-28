const express = require("express");

const router = express.Router();

const { verifyToken } = require("../services/verifyToken");

const { add, destroy, read } = require("../controllers/favRecipeControllers");

router.post("/", verifyToken, add);
router.delete("/:id", verifyToken, destroy);
router.get("/:id", verifyToken, read);

module.exports = router;
