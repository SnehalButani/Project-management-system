const express = require('express');
const { signUp, signIn, verifyOtp, editUser, removeUser, createRole, getPermissionViseRole, getUservisePermission } = require('../controllers/user.controller');
const { signUpvalidation, signInvalidation } = require('../validations/user.validate');
const { upload } = require('../middlewares/uploadImage');
const { verifyjwt } = require('../middlewares/jwtVerify');

const router = express.Router();

router.get("/getpermissionviserole", verifyjwt, getPermissionViseRole);
router.get("/getuservisepermission", verifyjwt, getUservisePermission);

router.post("/signup", upload.fields([{ name: 'avatar', maxCount: 1 }]), signUpvalidation, signUp);
router.post("/createrole", verifyjwt, createRole);
router.post("/signin", signInvalidation, signIn);
router.post("/verifyotp", verifyOtp);

router.put("/edituser", upload.fields([{ name: 'avatar', maxCount: 1 }]), verifyjwt, editUser);
router.delete("/rmuser", verifyjwt, removeUser);

module.exports = router;