const { User } = require("../models");
const { jwtToken } = require('../utils/jwtTokenHandler');
const _ = require("lodash");
const { generateOTP } = require("../utils/randomNo");
const { TokenExpiredError } = require("jsonwebtoken");

module.exports = {
    signUp
}

async function signUp(req, res, next) {
    try {

        const otp = generateOTP();

        const user = await User.create({ ...req.body, otp: otp, otpExpire: new Date(Date.now() + 10 * 60 + 1000) });

        const token = await jwtToken({ id: user.id, role: role.role_id });

        res.status(200).json({
            error: true,
            message: "user create successfully",
            data: _.pick(user, ["password"]),
            token: token
        })

    } catch (error) {
        next(error)
    }
} 