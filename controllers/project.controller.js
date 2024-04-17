const { Project } = require("../models");
const _ = require("lodash");

module.exports = {
    addProject,
    editProject,
    removeProject
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