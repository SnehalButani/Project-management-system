const { Script } = require("../models");
const _ = require("lodash");

module.exports = {
    addScript,
    editScript,
    removeScript
}

async function addScript(req, res, next) {
    try {
        const addScript = await Script.create({ ...req.body });

        res.status(200).json({
            error: false,
            message: "Script create successfully",
            data: _.omit(addScript.toJSON(), ["project_id"]),
        });

    } catch (error) {
        next(error)
    }
}

async function editScript(req, res, next) {
    try {
        const editData = await Script.update({ ...req.body }, { where: { id: req.body.id } });

        res.status(200).json({
            error: false,
            message: "Script edit successfully"
        });

    } catch (error) {
        next(error)
    }
}

async function removeScript(req, res, next) {
    try {
        const removeproject = await Script.destroy({ where: { id: req.body.id } });

        res.status(200).json({
            error: false,
            message: "Script delete successfully"
        });

    } catch (error) {
        next(error)
    }
}