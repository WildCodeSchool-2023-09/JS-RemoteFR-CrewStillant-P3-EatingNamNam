const express = require("express");

const router = express.Router();

const userRouter = require("./routers/userRouter");
const commentRouter = require("./routers/commentRouter");
const recipeRouter = require("./routers/recipeRouter");
const ingredientRouter = require("./routers/ingredientRouter");
const successRouter = require("./routers/successRouter");
const roleRouter = require("./routers/roleRouter");
const unitRouter = require("./routers/unitRouter");
const stepRouter = require("./routers/stepRouter");

router.use("/user", userRouter);
router.use("/comment", commentRouter);
router.use("/recipe", recipeRouter);
router.use("/ingredient", ingredientRouter);
router.use("/success", successRouter);
router.use("/role", roleRouter);
router.use("/unit", unitRouter);
router.use("/step", stepRouter);

module.exports = router;
