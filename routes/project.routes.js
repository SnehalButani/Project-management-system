const express = require('express');
const { addProject, editProject, removeProject } = require('../controllers/project.controller');
const { projectValidate, editProjectvalidate } = require('../validations/project.validate');
const { verifyjwt } = require('../middlewares/jwtVerify');
const router = express.Router();


router.post("/addproject", verifyjwt, projectValidate, addProject);
router.put("/editproject", verifyjwt, editProjectvalidate, editProject);
router.delete("/rmproject", verifyjwt, removeProject);

module.exports = router;    