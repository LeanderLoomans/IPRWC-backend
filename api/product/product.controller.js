const {createProduct, getProducts, getProductById, getSelectProducts, updateProduct, deleteProduct} = require("./product.service");

module.exports = {

    createProduct: (req, res) => {
        createProduct(req.body, (err, results) => {
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
    },

    getProducts: (req, res) => {
        getProducts((err, results) => {
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
        })
    },

    getProduct: (req, res) => {
        const id = req.params.id;
        getProductById(id, (err, results) => {
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

    getSelectProducts: (req, res) => {
        console.log("body: " + JSON.stringify(req.body))
        cart = req.body.cart;
        cart.push(-1);
        req.body.cart = cart;

        getSelectProducts(req.body, (err, results) => {
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
        })
    },

    updateProduct: (req, res) => {
        updateProduct(req.body, (err, results) => {
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

    deleteProduct: (req, res) => {
        const id = req.params.id;
        deleteProduct(id, (err, results) => {
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
        })
    }
}
