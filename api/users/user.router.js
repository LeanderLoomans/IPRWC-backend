const { createUser, getUserById, getUsers, updateUsers, updateCart, deleteUser, login } = require("./user.controller");
const router = require("express").Router();

const { checkToken } = require("../../auth/token_validation");
const { checkRole } = require("../../auth/role_validation");

router.post("/login", login);
router.post("/register", createUser);

router.get("/", checkToken, checkRole('admin'), getUsers);
router.get("/:id", checkToken, getUserById);

router.put("/", checkToken, checkRole, updateUsers);
router.put("/cart", checkToken, updateCart)

router.delete("/:id", checkToken, checkRole('admin'), deleteUser);

module.exports = router;
