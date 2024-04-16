const express = require('express');
const { addProject } = require('../controllers/project.controller');
const router = express.Router();


router.post("/addproject",projectValidate, addProject);


module.exports = router;