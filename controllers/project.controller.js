const { Project } = require("../models");


module.exports = {
    addProject
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
        next(error)
    }
}   