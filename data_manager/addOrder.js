const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'katya',
    database: 'shop'
});

async function addOrder(user_id, order_date) {
    let orderId;
    try {
        const newOrder = await new Promise((resolve, reject) => {
            const insertQuery = `INSERT INTO orders (user_id, order_date) VALUES (?, ?)`;
            connection.query(insertQuery, [user_id, order_date], (err, result) => {
                if (err) {
                    console.error('Error inserting user:', err);
                    reject(err);
                    return;
                }
                resolve(result);
                orderId = result.insertId;
            });
        });
        return orderId;
    } catch (erorr) {
        throw erorr
    }
}

module.exports = addOrder;