const { checkSchema, oneOf, body } = require("express-validator");
const chechSchemaRouter = require("../utils/checkSchema");

const signUpvalidation = checkSchema({
    "firstName": {
        in: ["body"],
        isString: {
            bail: true,
            errorMessage: "fname is required"
        }
    },
    "lastName": {
        in: ["body"],
        isString: {
            bail: true,
            errorMessage: "lname is required"
        }
    },
    "email": {
        in: ["body"],
        isEmpty: false,
        isEmail: {
            bail: true,
            errorMessage: "Invalid email value"
        }
    },
    "password": {
        in: ["body"],
        isEmpty: false,
        isStrongPassword: {
            bail: true,
            errorMessage: "This is not a strong password"
        }
    },
    "country": {
        in: ["body"],
        isString: {
            bail: true,
            errorMessage: "country is required"
        }
    },
    "city": {
        in: ["body"],
        isString: {
            bail: true,
            errorMessage: "city is required"
        }
    },
    "address": {
        in: ["body"],
        isString: {
            bail: true,
            errorMessage: "address is required"
        }
    },
    "role_id": {
        in: ["body"],
        isString: {
            bail: true,
            errorMessage: "role is required"
        }
    }
});

const signInvalidation = [
    body('email', 'email is required').notEmpty(),
    body('email', 'Invalid email').isEmail().bail(),
    body('password', 'password does not Empty').notEmpty(),
]

const verifyValidation = [
    body('email', 'email is required').notEmpty(),
    body('email', 'Invalid email').isEmail().bail(),
    body('otp', 'otp does not Empty').notEmpty(),
]


module.exports = {
    signUpvalidation: [signUpvalidation, chechSchemaRouter],
    signInvalidation: [signInvalidation, chechSchemaRouter],
    verifyValidation: [verifyValidation, chechSchemaRouter]
}