const {getProducts, getProduct, getSelectProducts, createProduct, updateProduct, deleteProduct, addToCart} = require("./product.controller");
const router = require("express").Router();

const {checkToken} = require("../../auth/token_validation");
const {checkRole} = require("../../auth/role_validation");

router.get("/", checkToken, getProducts);
router.get("/:id", checkToken, getProduct);

router.post("/", checkToken, checkRole('admin'), createProduct);
router.post("/cart", checkToken, getSelectProducts);

router.put("/", checkToken, checkRole('admin'), updateProduct);

router.delete("/:id", checkToken, checkRole('admin'), deleteProduct);

module.exports = router;
