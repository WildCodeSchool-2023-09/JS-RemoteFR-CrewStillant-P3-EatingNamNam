const express = require("express");

const router = express.Router();

const { add } = require("../controllers/contactControllers");

router.post("/", add);

module.exports = router;
