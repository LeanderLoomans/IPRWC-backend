const {create, getUsers, getUserById, getUserByEmail, updateUser, updateCart, updateRole, updatePassword, deleteUser} = require("./user.service");
const {genSaltSync, hashSync, compareSync} = require("bcrypt");
const {getUserIdFromToken} = require("../../auth/token_validation");
const {sign} = require("jsonwebtoken");
const {updateProduct} = require("../product/product.service");

module.exports = {

    createUser: (req, res) => {
        let body = req.body;
        body.info = '{ "products": [], "quantity": [] }';
        getUserByEmail(body.email, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            if (!results) {
                const salt = genSaltSync(10);
                body.password = hashSync(body.password, salt);
                create(body, (err, results) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            success: 0,
                            message: "Database connection error"
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        data: results
                    })
                });
            }
            if (results) {
                return res.status(400).json({
                    success: 0,
                    data: "this email is already in use"
                });
            }
        });
    },

    getUsers: (req, res) => {
        getUsers((err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    getUserById: (req, res) => {
        const id = req.params.id;
        getUserById(id, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            if (!results) {
                return res.status(404).json({
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    changeRole: (req, res) => {
        const id = req.params.id;
        const newRole = req.params.newRole;
        updateRole(id, newRole, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1
            });
        });
    },

    updateUsers: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            if (!results) {
                return res.status(404).json({
                    success: 0,
                    message: "User not found"
                })
            }
            return res.status(200).json({
                success: 1,
                message: "updated successfully"
            });
        });
    },

    updateCart: (req, res) => {
        let id = getUserIdFromToken(req.get("authorization"))
        updateCart(req.body.cart, id, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            if (!results) {
                return res.status(404).json({
                    success: 0,
                    message: "Record not found"
                })
            }
            return res.status(200).json({
                success: 1,
                message: "record updated successfully"
            });
        })
    },

    deleteUser: (req, res) => {
        const id = req.params.id;
        deleteUser(id, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            if (!results) {
                return res.status(404).json({
                    success: 0,
                    Message: "Record not found"
                });
            }
            return res.status(200).json({
                success: 1,
                Message: "Record deleted successfully"
            });
        });
    },

    login: (req, res) => {
        const body = req.body;

        getUserByEmail(body.email, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            if (!results) {
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                });
            }
            let result = false;
            if (body.password.length !== 0 && body.email.length !== 0) {
                result = compareSync(body.password, results.password);
            } else result = false;
            if (result) {
                results.password = undefined; // Don't send passwords unnecessarily
                const jsontoken = sign({result: results}, process.env.SECRET_KEY, {
                    expiresIn: "5h"
                });
                return res.status(200).json({
                    success: 1,
                    message: "Login successful",
                    token: jsontoken,
                    user: results,
                });
            } else {
                return res.status(401).json({
                    success: 0,
                    data: "Invalid email or password"
                });
            }
        });
    }
};
