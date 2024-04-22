const user = require("../models/user");
const { getRole } = require("../utils/helper");

const checkPermission = (permission) => {
    return async (req, res, next) => {
        const userRole = req.user ? req.user.role : null;
        const userPermissions = await getRole(userRole, permission);
        if (await userPermissions()) {
            return next();
        } else {
            return res.status(403).json({ error: true, message: 'You do not have permission to perform this action.' });
        }
    }
}

const checkRole = (role) => {
    return async (req, res, next) => {
        const userRole = req.user ? req.user.role : null;
        const checkRole = await getRole(userRole);
        if (await checkRole()) {
            return next();
        } else {
            return res.status(403).json({ error: true, message: 'That Role create only owner. ' });
        }
    }
}

module.exports = {
    checkPermission,
    checkRole
}