const { Project, User, Permission, sequelize,ProjectMember } = require("../models");
const { QueryTypes } = require('sequelize');
const _ = require("lodash");
const { sendInvitePeople } = require("../utils/nodemailer");
const { generateOTP } = require("../utils/randomNo");
const { getFirstNameFromEmail } = require("../utils/helper");

module.exports = {
    addProject,
    editProject,
    removeProject,
    invitePeople,
    getAllProject
}

async function addProject(req, res, next) {
    try {

        const addProject = await Project.create({ ...req.body, user_id: req.user.id });

        res.status(200).json({
            error: false,
            message: "Project create successfully",
            data: _.omit(addProject.toJSON(), ["user_id"]),
        });

    } catch (error) {
        console.log("add project api :", error.message)
        next(error)
    }
}

async function editProject(req, res, next) {
    try {
        const editData = await Project.update({ ...req.body }, { where: { id: req.body.id } });

        res.status(200).json({
            error: false,
            message: "Project edit successfully"
        });

    } catch (error) {
        console.log("edit project api :", error.message)
        next(error)
    }
}

async function removeProject(req, res, next) {
    try {
        const removeproject = await Project.destroy({ where: { id: req.body.id } });

        res.status(200).json({
            error: false,
            message: "Project delete successfully"
        });

    } catch (error) {
        next(error)
    }
}

async function invitePeople(req, res, next) {
    try {

        const { email, roleId, projectId } = req.body;

        const password = generateOTP();


        const user = await User.create({ email: email, password: password, role_id: roleId });

        await ProjectMember.create({ ...req.body, userId: user.id });

        await sendInvitePeople({ email, password }, res)
            .then(() => {
                return res.status(200).json({
                    error: false,
                    message: "send invite email successfully"
                })
            }).catch(() => {
                res.status(400).json({
                    error: false,
                    message: "Invitation sending email is failed"
                })
            })

    } catch (error) {
        next(error)
    }
}

async function getAllProject(req, res, next) {
    try {
        const data = await sequelize.query(`SELECT * FROM "Projects"`, {
            type: QueryTypes.SELECT
        });

        res.status(200).json({
            error: false,
            data: data
        })
    } catch (error) {
        next(error)
    }
}
