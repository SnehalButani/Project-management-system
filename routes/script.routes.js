const express = require('express');
const { verifyjwt } = require('../middlewares/jwtVerify');
const { addScript, editScript, removeScript } = require('../controllers/script.controller');
const { scriptValidate, editScriptValidate } = require('../validations/script.validate');
const router = express.Router();


router.post("/addscript", verifyjwt, scriptValidate, addScript);
router.put("/editscript", verifyjwt, editScriptValidate, editScript);
router.delete("/rmscript", verifyjwt, removeScript);

module.exports = router;    