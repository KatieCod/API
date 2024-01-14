const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'katya',
    database: 'shop'
});

async function decreaseQunatity(product_id) {
    try {
        const result = await new Promise((resolve, reject) => {
            const sqlQuery = `SELECT * FROM cart WHERE product_id = ?`;
            connection.query(
                sqlQuery, [product_id], (err, results, fields) => {
                    if (err) {
                        console.error('Error fetching cart item:', err);
                        reject(err);
                        return;
                    }
                    resolve(results);
                });
        })
        if (result[0]) {
            const newQuantity = result[0].quantity - 1;
            if (newQuantity === 0) {
                const deleteQuery = `DELETE FROM cart WHERE product_id = ?`
                await new Promise((resolve, reject) => {
                    connection.query(deleteQuery, [product_id], (err, results, fields) => {
                        if (err) {
                            console.error('Error deleting row:', err);
                            reject(err);
                            return;
                        }
                        resolve(results);
                    });
                });
            } else {
                const changeQuantity = await new Promise((resolve, reject) => {
                    const changeQuantityQuery = `UPDATE cart SET quantity = quantity - 1 WHERE product_id = ?`
                    connection.query(
                        changeQuantityQuery, [product_id], (err, results, fields) => {
                            if (err) {
                                console.error('Error changing quantity:', err);
                                reject(err);
                                return;
                            }
                            resolve(results);
                        });
                })
                return changeQuantity;
            }
        }
    } catch (erorr) {
        throw erorr
    }
}

module.exports = decreaseQunatity;