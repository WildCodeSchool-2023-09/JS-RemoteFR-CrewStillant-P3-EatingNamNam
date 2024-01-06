const express = require("express");

const router = express.Router();

const { userValidation } = require("../middlewares/userValidation");
const { hash } = require("../middlewares/hashPassword");

const {
  browse,
  read,
  edit,
  add,
  destroy,
} = require("../controllers/userControllers");

router.get("/", browse);

router.post("/", userValidation, hash, add);

router.get("/:id", read);

router.put("/:id", userValidation, edit);

router.delete("/:id", destroy);

module.exports = router;
