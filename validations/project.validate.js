const { checkSchema, oneOf, body } = require("express-validator");
const chechSchemaRouter = require("../utils/checkSchema");

const projectValidate = checkSchema({
    "Pro_name": {
        in: ["body"],
        isString: {
            bail: true,
            errorMessage: "project name is required"
        }
    },
    "start_date": {
        in: ["body"],
        isString: {
            bail: true,
            errorMessage: "start date is required"
        }
    },
    "end_date": {
        in: ["body"],
        isString: {
            bail: true,
            errorMessage: "end date is required"
        }
    },
    "desc": {
        in: ["body"],
        isString: {
            bail: true,
            errorMessage: "desc is required"
        }
    },
    "budget": {
        in: ["body"],
        isString: {
            bail: true,
            errorMessage: "budget is required"
        }
    },
    "priority": {
        in: ["body"],
        isString: {
            bail: true,
            errorMessage: "priority is required"
        }
    }
}, body("status").isIn(['accepted', 'cancel', 'pending'])
    .withMessage('Invalid status value'));


const editProjectvalidate = [
    body("Pro_name").optional().notEmpty().withMessage("project name is required"),
    body("start_date").optional().notEmpty().withMessage("start_date is required"),
    body("end_date").optional().notEmpty().withMessage("end date is required"),
    body("desc").optional().notEmpty().withMessage("desc is required"),
    body("budget").optional().notEmpty().withMessage("budget is required"),
    body("priority").optional().notEmpty().withMessage("priority is required"),
    body("status").isIn(['accepted', 'cancel', 'pending']).withMessage('Invalid status value')
]

module.exports = {
    projectValidate: [projectValidate, chechSchemaRouter],
    editProjectvalidate: [editProjectvalidate, chechSchemaRouter]
}