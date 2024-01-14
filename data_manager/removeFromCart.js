const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'katya',
    database: 'shop'
});

async function removeFromCart(product_id, user_id) {
    try {
        const result = await new Promise((resolve, reject) => {
            const sqlQuery = `DELETE FROM cart WHERE product_id=? AND user_id=?`;
            connection.query(
                sqlQuery, [product_id, user_id], (err, results, fields) => {
                    if (err) {
                        console.error('Error fetching cart item:', err);
                        reject(err);
                        return;
                    }
                    resolve(results);
                });
        })
        return result;
    } catch (erorr) {
        throw erorr
    }
}

module.exports = removeFromCart;