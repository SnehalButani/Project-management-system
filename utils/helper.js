const { saltRounds } = require("../config/config");
const {  Role, Permission } = require("../models");
const bcrypt = require('bcrypt');

async function getRole(rolename, permission) {
    return async (req, res, next) => {
        const data = await Role.findAll({
            attributes: ["id","name"],
            include: [
                {
                    model: Permission,
                    attributes: ['permission']
                }
            ],
            where: {
                id: rolename
            }
        });

        const jsonData = data.map(instance => instance.toJSON());

        const permissions = jsonData[0].Permissions.map(permission => permission.permission);

        if (permission) {
            console.log("if")
            return permissions.includes(permission);
        } else {
            console.log("else")
            return jsonData.some(role => (role.name === 'owner'));
        }
    }
}

function hashPassword(password) {
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    return hashedPassword;
}

module.exports = { getRole, hashPassword }