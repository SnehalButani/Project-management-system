const express = require("express");
const router = express.Router();
const userRouter = require('./user.routes');
const projectRouter = require('./project.routes');
const scriptRouter = require("./script.routes");

router.use("/",userRouter);
router.use("/project",projectRouter);
router.use("/script",scriptRouter);

module.exports = router;