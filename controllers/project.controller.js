const { Project, User, Permission, Role, ProjectMember } = require("../models");
const _ = require("lodash");
const { sendInvitePeople } = require("../utils/nodemailer");
const { generatePassword } = require("../utils/helper");

module.exports = {
    addProject,
    editProject,
    removeProject,
    invitePeople,
    getAllProject,
    projectViseMember
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
        const data = await Project.destroy({ where: { id: req.body.id } });

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

        const password = generatePassword();

        const user = await User.create({ email: email, password: password, role_id: roleId });

        await ProjectMember.create({ ...req.body, projectId: projectId, userId: user.id });

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
        const data = await Project.findAll();
        res.status(200).json({
            error: false,
            data: data
        })
    } catch (error) {
        next(error)
    }
}

async function projectViseMember(req,res,next) {
    try {
        const data = await ProjectMember.findAll({
            include: [
                {
                    model: Project,
                    attributes: ["Pro_name"]
                },
                {
                    model: User,
                    attributes: ["firstName", "lastName"]
                },
                {
                    model: Role,
                    attributes: ['name'],
                    include: [
                        {
                            model: Permission,
                            attributes: ["permission"]
                        }
                    ]
                }
            ],
            attributes: [],
            where:{
                projectId: req.params.projectId
            }
        });

        const jsonData = data.map(instance => instance.toJSON());

        const finalData = jsonData.map(ele => {
            return {
                firstName: ele.User.firstName,
                lastName: ele.User.lastName,
                role: ele.Role.name,
                projectName: ele.Project.Pro_name,
                permission: ele.Role.Permissions.map(per => per.permission)
            }
        })

        res.status(200).json({ error: false, data: finalData })
    } catch (error) {
        next(error)
    }
}