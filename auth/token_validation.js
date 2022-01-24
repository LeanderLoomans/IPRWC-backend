const { verify, decode } = require("jsonwebtoken");

module.exports = {

    checkToken: (req, res, next) => {
        let token = req.get("authorization");
        if (token) {
            token = token.slice(7); // remove 'bearer: ' from token
            verify(token, process.env.SECRET_KEY, (err, decoded) => {
                if (err) {
                    return res.status(401).json({
                        success: 0,
                        message: "Invalid token"
                    });
                }
                else {
                    next();
                }
            })
        }
        else {
            res.status(401).json({
                success: 0,
                message: "Access denied: unauthorized user"
            });
        }
    },

    getRoleFromToken: (token) => {
        token = token.slice(7); // remove 'bearer: ' from token
        return decode(token).result.role;
    },

    getUserIdFromToken: (token) => {
        token = token.slice(7); // remove 'bearer: ' from token
        return decode(token).result.id;
    }
};
