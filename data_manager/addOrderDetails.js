const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'katya',
    database: 'shop'
});

async function addOrderDetails(order_id, product_id, unit_price, quantity, total_price, product_photo, product_name) {
    try {
        const newOrder = await new Promise((resolve, reject) => {
            const insertQuery = `INSERT INTO order_details (order_id, product_id, unit_price, quantity, total_price, product_photo, product_name) VALUES (?, ?, ?, ?, ?, ?, ?)`;
            connection.query(insertQuery, [order_id, product_id, unit_price, quantity, total_price, product_photo, product_name], (err, result) => {
                if (err) {
                    console.error('Error inserting user:', err);
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
        return newOrder;
    } catch (erorr) {
        throw erorr
    }
}

module.exports = addOrderDetails;