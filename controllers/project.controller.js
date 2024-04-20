const { Project, User, Permission } = require("../models");
const _ = require("lodash");
const { sendInvitePeople } = require("../utils/nodemailer");

module.exports = {
    addProject,
    editProject,
    removeProject,
    invitePeople
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

        const { email, roleId } = req.body;

        const password = generateOTP();

        const user = await User.create({ ...req.body, password: password, role_id: roleId });

        await sendInvitePeople({ email, password: password }, res)
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

