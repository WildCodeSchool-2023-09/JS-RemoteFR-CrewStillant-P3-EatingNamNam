const express = require("express");

const router = express.Router();

const {
  browse,
  read,
  edit,
  add,
  destroy,
} = require("../controllers/commentControllers");
const { verifyToken } = require("../services/verifyToken");

router.get("/", browse);

router.post("/", verifyToken, add);

router.get("/:id", read);

router.put("/:id", edit);

router.delete("/:id", destroy);

module.exports = router;
