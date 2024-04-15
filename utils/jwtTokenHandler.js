const jwt = require("jsonwebtoken");
const { PrivateKey } = require("../config/config");

async function jwtToken(data) {
    const accessToken = jwt.sign(data, PrivateKey);
    return accessToken;
}

module.exports = { jwtToken }