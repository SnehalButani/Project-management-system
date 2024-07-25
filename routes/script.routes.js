const express = require('express');
const { verifyjwt } = require('../middlewares/jwtVerify');
const { addScript, editScript, removeScript, getAllScript } = require('../controllers/script.controller');
const { scriptValidate, editScriptValidate } = require('../validations/script.validate');
const { checkRole, checkPermission } = require('../middlewares/checkPermission');
const router = express.Router();

router.get("/allscript", verifyjwt, checkPermission('select'), getAllScript);
router.post("/addscript", verifyjwt, scriptValidate, checkPermission('insert'), addScript);
router.put("/editscript", verifyjwt, editScriptValidate, checkPermission('update'), editScript);
router.delete("/rmscript", verifyjwt, checkPermission('delete'), removeScript);

module.exports = router;    