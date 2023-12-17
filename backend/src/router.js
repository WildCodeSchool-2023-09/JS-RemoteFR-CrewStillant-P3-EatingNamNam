const express = require("express");

const router = express.Router();

const userRouter = require("./routers/userRouter");
const commentRouter = require("./routers/commentRouter");
const recipeRouter = require("./routers/recipeRouter");
const ingredientRouter = require("./routers/userRouter");
const successRouter = require("./routers/successRouter");
const roleRouter = require("./routers/roleRouter");

router.use("/user", userRouter);
router.use("/comment", commentRouter);
router.use("/recipe", recipeRouter);
router.use("/ingredient", ingredientRouter);
router.use("/success", successRouter);
router.use("/role", roleRouter);

module.exports = router;
