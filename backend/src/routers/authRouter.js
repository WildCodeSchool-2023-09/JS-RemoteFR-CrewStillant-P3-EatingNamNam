const express = require("express");

const router = express.Router();

const { login } = require("../controllers/authControllers");

router.post("/", login);

module.exports = router;
