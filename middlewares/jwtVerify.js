const { verify } = require("jsonwebtoken");
const { PrivateKey } = require("../config/config");

function verifyjwt(req, res, next) {
    let token = req.headers['authorization']
    if (!token) return res.status(401).json({ error: true, message: 'Unauthorize user' })

    try {
        token = token.split(" ")[1];
        const decoded = verify(token, PrivateKey);
        req.user = decoded

        next()
    } catch (error) {
        error.message = "invalid token";
        next(error)
    }
}

module.exports = { verifyjwt };