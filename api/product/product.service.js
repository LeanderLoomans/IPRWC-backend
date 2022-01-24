const pool = require("../../config/database");

module.exports = {

    createProduct: (data, callback) => {
        pool.query(
            `insert into products(title, description, price)
                values(?, ?, ?);`,
            [
                data.title,
                data.description,
                data.price
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    getProducts: callback => {
        pool.query(
            `select * from products;`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    getProductById: (id, callback) => {
        pool.query(
            `select *
            from products
            where id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    console.log(error);
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        )
    },

    getSelectProducts: (data, callback) => {
        pool.query(
            `select * from products
                where id in (?);`,
            [data.cart],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    updateProduct: (data, callback) => {
        pool.query(
            `update products set title=?, description=?, price=?
            where id = ?`,
            [
                data.title,
                data.description,
                data.price,
                data.id
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    deleteProduct: (id, callback) => {
        pool.query(
            `delete from products
            where id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
}
