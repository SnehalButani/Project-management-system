const express = require('express');
const { signUp, signIn, verifyOtp, editUser, removeUser } = require('../controllers/user.controller');
const { signUpvalidation, signInvalidation } = require('../validations/user.validate');
const { upload } = require('../middlewares/uploadImage');
const { verifyjwt } = require('../middlewares/jwtVerify');

const router = express.Router();


router.post("/signup", upload.fields([{ name: 'avatar', maxCount: 1 }]), signUpvalidation, signUp);
router.post("/signin", signInvalidation, signIn);
router.post("/verifyotp", verifyOtp);
router.put("/edituser", upload.fields([{ name: 'avatar', maxCount: 1 }]), verifyjwt, editUser);
router.delete("/rmuser", verifyjwt, removeUser);



module.exports = router;