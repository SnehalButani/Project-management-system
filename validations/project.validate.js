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
    },
    "status": {
        in: ["body"],
        isString: {
            bail: true,
            errorMessage: "status is required"
        }
    }
});


module.exports = {
    projectValidate: [projectValidate, chechSchemaRouter]
}