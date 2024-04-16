const { User } = require("../models");
const { jwtToken } = require('../utils/jwtTokenHandler');
const { sendOTPVerificationEmail } = require("../utils/nodemailer");
const _ = require("lodash");
const { generateOTP } = require("../utils/randomNo");
const { compare } = require("bcrypt");
const fs = require("fs");



module.exports = {
    signUp, signIn, verifyOtp, editUser, removeUser
}


async function signUp(req, res, next) {
    try {

        const otp = generateOTP();

        console.log("otp", otp);

        let avatar = req.files && req.files.avatar && req.files.avatar[0] ? req.files.avatar[0].filename : "empty";

        const user = await User.create({ ...req.body, otp: otp, otpExpire: new Date(Date.now() + 10 * 60 + 1000), avatar: avatar });

        const token = await jwtToken({ id: user.id, role: user.role_id });

        await sendOTPVerificationEmail({ email: user.email, otp: otp }).catch((error) => res.status(400).json({
            error: true,
            message: "otp not send"
        }));

        res.status(200).json({
            error: false,
            message: "user create successfully",
            data: _.omit(user.toJSON(), ["password", "otp", "otpExpire"]),
            token: token
        });

    } catch (error) {
        next(error)
    }
}

async function signIn(req, res, next) {
    try {
        const { email, password } = req.body;

        const findUser = await User.findOne({ where: { email: email } });
        if (!findUser) return res.status(404).json({ error: true, message: "email and password does not match our records" });

        const matchPassword = await compare(password, findUser.password);
        if (!matchPassword) return res.status(404).json({ error: true, message: "email and password does not match our records" });

        const token = await jwtToken({ id: findUser.id, role: findUser.role_id });

        if (findUser.verify == false) {

            const otp = generateOTP();
            console.log("otp", otp)
            await User.update({ otp: otp, otpExpire: new Date(Date.now() + 10 * 60 + 1000) }, { where: { email: findUser.email } });
            await sendOTPVerificationEmail({ email: findUser.email, otp: otp }).catch((error) => res.status(400).json({
                error: true,
                message: "otp not send beacuse something is wrong"
            }));

            return res.status(200).json({
                error: false,
                message: "please verify email and otp send on email",
                token: token
            })

        }

        res.status(200).json({
            error: false,
            message: "login successfully",
            data: _.omit(findUser.toJSON(), ["password", "otp", "otpExpire"]),
            token: token
        })

    } catch (error) {
        next(error)
    }
}

async function verifyOtp(req, res, next) {
    try {

        const { email, otp } = req.body;

        const findUser = await User.findOne({ where: { email: email } });
        if (!findUser) return res.status(404).json({ error: true, message: "email and password does not match our records" });

        if (new Date() > findUser.otpExpire) {

            const matchOtp = await compare(otp, findUser.otp);
            if (!matchOtp) return res.status(404).json({ error: true, message: "otp is invaild" })

            await User.update({ verify: true, otp: 'null' }, { where: { email: email } })

            const token = await jwtToken({ id: findUser.id, role: findUser.role_id });

            return res.status(200).json({
                error: false,
                message: "email is verify successfully",
                token: token
            })

        } else {

            return res.status(400).json({
                error: true,
                message: "otp is expire"
            })

        }

    } catch (error) {
        next(error)
    }
}

async function editUser(req, res, next) {
    try {

        const getUser = await User.findOne({ where: req.user.id });

        const avatar = req.files && req.files.avatar && req.files.avatar[0] ? req.files.avatar[0].filename : getUser.avatar;

        const editUser = await User.update({ ...req.body, avatar: avatar }, { where: { id: req.user.id } });
        if (!editUser[0]) return res.status(400).json({ error: true, message: "user not found because something is went wrong" });

        if (avatar !== getUser.avatar && getUser.avatar && fs.existsSync("uploads/images/" + getUser.avatar)) {
            fs.unlinkSync('uploads/images/' + getUser.avatar);
        }

        return res.status(200).json({
            error: false,
            message: "edit user successfully"
        })

    } catch (error) {
        next(error)
    }
}

async function removeUser(req, res, next) {
    try {
        const user = await User.findOne({ where: { id: req.user.id } });

        fs.unlink("uploads/images/" + user.avatar, (err) => {
            if (err) throw err
        });

        await User.destroy({ where: { email: user.email } });

        res.status(200).json({
            error: false,
            message: "remove user successfully"
        })
    } catch (error) {
        next(error)
    }
}