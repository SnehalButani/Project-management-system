const express = require('express');
const { addProject, editProject, removeProject, invitePeople } = require('../controllers/project.controller');
const { projectValidate, editProjectvalidate } = require('../validations/project.validate');
const { verifyjwt } = require('../middlewares/jwtVerify');
const router = express.Router();


router.post("/addproject", verifyjwt, projectValidate, addProject);
router.post("/invitepeople", verifyjwt, invitePeople);
router.put("/editproject", verifyjwt, editProjectvalidate, editProject);
router.delete("/rmproject", verifyjwt, removeProject);

module.exports = router;    