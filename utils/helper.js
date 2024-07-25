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

function generatePassword() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}


module.exports = { getRole, hashPassword, generatePassword }