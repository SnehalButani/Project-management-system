const express = require('express');
const { addProject, editProject, removeProject, invitePeople, getAllProject } = require('../controllers/project.controller');
const { projectValidate, editProjectvalidate } = require('../validations/project.validate');
const { verifyjwt } = require('../middlewares/jwtVerify');
const { checkPermission } = require('../middlewares/checkPermission');
const router = express.Router();

router.get("/allproject", verifyjwt, getAllProject)
router.post("/addproject", verifyjwt, projectValidate, checkPermission('create'), addProject);
router.post("/invitepeople", verifyjwt, invitePeople);
router.put("/editproject", verifyjwt, editProjectvalidate, checkPermission('edit'), editProject);
router.delete("/rmproject", verifyjwt, checkPermission('delete'), removeProject);

module.exports = router;    