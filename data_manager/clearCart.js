const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'katya',
    database: 'shop'
});

async function clearCart() {
    try {
        const result = await new Promise((resolve, reject) => {
            const sqlQuery = `DELETE FROM cart`;
            connection.query(
                sqlQuery, (err, results, fields)=>{
                    if (err) {
                        console.error('Error fetching cart item:', err);
                        reject(err);
                        return;
                    }
                    resolve(results);
                });
        })
    } catch (erorr) {
        throw erorr
    }
}

module.exports = clearCart;