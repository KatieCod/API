const mysql = require('mysql2');
const { use } = require('../routes');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'katya',
    database: 'shop'
});

async function addToCart(product_id, product_name, product_unit_price, product_main_photo, quantity, user_id) {
    try {
        const result = await new Promise((resolve, reject) => {
            const sqlQuery = `SELECT * FROM cart WHERE product_id = ? AND user_id = ?`;
            connection.query(
                sqlQuery, [product_id, user_id], (err, results, fields)=>{
                    if (err) {
                        console.error('Error fetching cart item:', err);
                        reject(err);
                        return;
                    }
                    resolve(results);
                });
        })
        if (result[0]){
            const changeQuantity = await new Promise((resolve, reject) => {
                const changeQuantityQuery = `UPDATE cart SET quantity = quantity + 1 WHERE product_id = ? AND user_id = ? `
                connection.query(
                    changeQuantityQuery, [product_id, user_id], (err, results, fields)=>{
                        if (err) {
                            console.error('Error changing quantity:', err);
                            reject(err);
                            return;
                        }
                        resolve(results);
                    });
            })
            return changeQuantity;
        } else {
            const newCartItem = await new Promise((resolve, reject) => {
                const insertQuery = `INSERT INTO cart (product_id, product_name, product_unit_price, product_main_photo, quantity, user_id) VALUES (?, ?, ?, ?, ?, ?)`;
                connection.query(insertQuery, [product_id, product_name, product_unit_price, product_main_photo, quantity, user_id], (err, result) => {
                    if (err) {
                        console.error('Error creating a new cart item:', err);
                        reject(err);
                        return;
                    }
                    resolve(result);
                });
            });
            return newCartItem;
        }
    } catch (erorr) {
        throw erorr
    }
}

module.exports = addToCart;