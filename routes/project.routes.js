const express = require('express');
const { addProject, editProject, removeProject, invitePeople, getAllProject, projectViseMember } = require('../controllers/project.controller');
const { projectValidate, editProjectvalidate } = require('../validations/project.validate');
const { verifyjwt } = require('../middlewares/jwtVerify');
const { checkPermission, checkRole } = require('../middlewares/checkPermission');
const router = express.Router();

router.get("/allproject", verifyjwt, checkPermission('select'), getAllProject);
router.get("/projectvisemember/:projectId", verifyjwt, checkPermission('select'), projectViseMember);

router.post("/addproject", verifyjwt, projectValidate, checkPermission('insert'), addProject);
router.post("/invitepeople", verifyjwt, checkRole('owner'), invitePeople);

router.put("/editproject", verifyjwt, editProjectvalidate, checkPermission('update'), editProject);
router.delete("/rmproject", verifyjwt, checkPermission('delete'), removeProject);

module.exports = router;    