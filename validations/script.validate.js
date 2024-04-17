const { body } = require("express-validator");
const chechSchemaRouter = require("../utils/checkSchema");

const scriptValidate = [
    body("title").notEmpty().withMessage("title is required"),
    body("desc").notEmpty().withMessage("desc is required"),
    body("start_date").notEmpty().withMessage("start date is required"),
    body("end_date").notEmpty().withMessage("end date is required"),
    body("status").isIn(['accepted', 'cancel', 'pending']).withMessage('Invalid status value')
]

const editScriptValidate = [
    body("title").optional().notEmpty().withMessage("title is required"),
    body("desc").optional().notEmpty().withMessage("desc is required"),
    body("start_date").optional().notEmpty().withMessage("start_date is required"),
    body("end_date").optional().notEmpty().withMessage("end date is required")
]

module.exports = {
    scriptValidate: [scriptValidate, chechSchemaRouter],
    editScriptValidate: [editScriptValidate, chechSchemaRouter]
}