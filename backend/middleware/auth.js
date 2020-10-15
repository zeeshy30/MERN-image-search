const keys = require("../config/keys");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    let token = req.header('authorization')

    if (!token) res.status(401).json({msg: 'No token, authorization denied' });

    token = token.split(' ')[1];

    try {
        const decoded = jwt.verify(token, keys.secretOrKey);
        next();
    } catch (e) {
        res.status(400).json({msg: 'Token is not valid'});
    }
}

module.exports = auth;