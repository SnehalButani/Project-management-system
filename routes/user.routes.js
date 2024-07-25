const express = require('express');
const { signUp, signIn, verifyOtp, editUser, removeUser, createRole, getPermissionViseRole, getUservisePermission, getAllProjectViseMember } = require('../controllers/user.controller');
const { signUpvalidation, signInvalidation, verifyValidation } = require('../validations/user.validate');
const { upload } = require('../middlewares/uploadImage');
const { verifyjwt } = require('../middlewares/jwtVerify');
const { checkRole, checkPermission } = require('../middlewares/checkPermission');

const router = express.Router();

router.get("/getpermissionviserole", verifyjwt, checkPermission('select'), getPermissionViseRole);
router.get("/getuservisepermission", verifyjwt, checkPermission('select'), getUservisePermission);
router.get("/getallprojectvisemember", verifyjwt, checkPermission('select'), getAllProjectViseMember);

router.post("/signup", upload.fields([{ name: 'avatar', maxCount: 1 }]), signUpvalidation, signUp);
router.post("/createrole", verifyjwt, checkRole('owner'), createRole);
router.post("/signin", signInvalidation, signIn);
router.post("/verifyotp", verifyValidation, verifyOtp);

router.put("/edituser", upload.fields([{ name: 'avatar', maxCount: 1 }]), verifyjwt, editUser);
router.delete("/rmuser", verifyjwt, removeUser);

module.exports = router;