const { getRoleFromToken } = require("./token_validation");


const roles = Object.freeze({
    user: '1',
    admin: '2'
});

module.exports = {
    checkRole(role){
        return (req, res, next) => {
            let userRole = getRoleFromToken(req.get("authorization"));

            if (roles[userRole] < roles[role]) {
                return res.status(401).json({
                    success: 0,
                    message: "Access denied: unauthorized user"
                });
            }
            return next();
        }
    }
};
