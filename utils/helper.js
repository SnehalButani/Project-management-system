const { sequelize } = require("../models");

async function getRole(rolename, permission) {
    return async (req, res, next) => {
        const data = await sequelize.query(`
            SELECT r.name, p.permission
            FROM "RolePermission"
            JOIN "Roles" AS r ON "RolePermission"."RoleId" = r.id
            JOIN "Permissions" AS p ON "RolePermission"."PermissionId" = p.id where r.id = ${rolename}`);

        const roles = {};

        data[0].forEach(entry => {
            if (!roles[entry.name]) {
                roles[entry.name] = { name: entry.name, permissions: [entry.permission] };
            } else {
                roles[entry.name].permissions.push(entry.permission);
            }
        });

        const rolesArray = Object.values(roles);

        if (permission) {
            return rolesArray.some(role => role.permissions.includes(permission));
        } else {
            return rolesArray.some(role => role.name === rolename);
        }
    }
}


function reduceData(data) {
    return Object.values(data.reduce((acc, curr) => {
        const key = `${curr.firstName}_${curr.lastName}_${curr.role}`;
        if (!acc[key]) {
            acc[key] = { firstName: curr.firstName, lastName: curr.lastName, role: curr.role, permission: [curr.permission] };
        } else {
            acc[key].permission.push(curr.permission);
        }
        return acc;
    }, {}));
}

module.exports = { getRole, reduceData }