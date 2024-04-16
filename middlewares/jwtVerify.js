const { verify } = require("jsonwebtoken");
const { PrivateKey } = require("../config/config");

function verifyjwt(req, res, next) {
    const token = req.headers['authorization'].split(" ")[1];
   
    if (!token) return res.status(401).json({ error: true, message: 'Unauthorize user' })

    try {
        const decoded = verify(token, PrivateKey);
        req.user = decoded
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = { verifyjwt };