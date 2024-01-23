const express = require("express");

const router = express.Router();

const { userValidation } = require("../middlewares/userValidation");
const { hash } = require("../middlewares/hashPassword");

const {
  browse,
  read,
  edit,
  editRole,
  add,
  destroy,
  download,
} = require("../controllers/userControllers");

router.get("/", browse);

router.post("/", userValidation, hash, add);

router.get("/dl", download);

router.get("/:id", read);

router.put("/role/", editRole);

router.put("/:id", userValidation, hash, edit);

router.delete("/:id", destroy);

module.exports = router;
