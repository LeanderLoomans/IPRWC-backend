const pool = require("../../config/database");

module.exports = {

    create: (data, callback) => {
        pool.query(
            `insert into user(email, password, info)
                values(?, ?, ?);`,
            [
                data.email,
                data.password,
                data.info,
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    getUsers: callback => {
        pool.query(
            `select id, email, info
            from user`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    getUserById: (id, callback) => {
        pool.query(
            `select id, email, info
            from user
            where id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    console.log(error)
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        )
    },

    getUserByEmail: (email, callback) => {
        pool.query(
            `select *
            from user
            where email = ?`,
            [email],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        );
    },

    updateUser: (data, callback) => {
        pool.query(
            `update user set email=?, password=?, info=?
            where id = ?`,
            [
                data.email,
                data.password,
                data.info,
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

    updateCart: (cart, id, callback) => {
        pool.query(
            `update user set info=?
            where id = ?`,
            [
                cart,
                id
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    // updateRole: (id, newRole, callback) => {
    //     pool.query(
    //         `update Account set role=? where userId = ?`,
    //         [newRole, id],
    //         (error, results, fields) => {
    //             if (error) {
    //                 return callback(error);
    //             }
    //             return callback(null, results[0]);
    //         }
    //     );
    // },
    //
    // updatePassword: (data, callback) => {
    //     pool.query(
    //         `update Account set password = ? where email = ? `,
    //         [
    //             data.newpassword,
    //             data.email
    //         ],
    //         (error, results, fields) => {
    //             if (error) {
    //                 return callback(error);
    //             }
    //             return callback(null, results);
    //         }
    //     );
    // },
    //
    deleteUser: (id, callback) => {
        pool.query(
            `delete from user
            where id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    }
};


