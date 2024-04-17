const express = require("express");
const router = express.Router();
const userRouter = require('../routes/user.routes');
const projectRouter = require('../routes/project.routes')

router.use("/",userRouter);
router.use("/project",projectRouter);

module.exports = router;