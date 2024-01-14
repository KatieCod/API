const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'katya',
    database: 'shop'
});

async function removeFromWishList(product_id, user_id) {
    try {
        if (product_id === null) {
            const result = await new Promise((resolve, reject) => {
                const sqlQuery = `DELETE FROM wishlist WHERE user_id=?`;
                connection.query(
                    sqlQuery, [user_id], (err, results, fields) => {
                        if (err) {
                            console.error('Error fetching cart item:', err);
                            reject(err);
                            return;
                        }
                        resolve(results);
                    });
                return result;
            })
        } else {
            const result = await new Promise((resolve, reject) => {
                const sqlQuery = `DELETE FROM wishlist WHERE product_id = ? AND user_id=?`;
                connection.query(
                    sqlQuery, [product_id, user_id], (err, results, fields) => {
                        if (err) {
                            console.error('Error fetching cart item:', err);
                            reject(err);
                            return;
                        }
                        resolve(results);
                    });
                return result;
            })
        }
    } catch (erorr) {
        throw erorr
    }
}

module.exports = removeFromWishList;