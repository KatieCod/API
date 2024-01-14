const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'katya',
    database: 'shop'
});

async function checkUserID(id) {
    try {
        const result = await new Promise((resolve, reject) => {
            const sqlQuery = `SELECT * FROM users WHERE id = ?`;
            connection.query(
                sqlQuery, [id], (err, results, fields) => {
                    if (err) {
                        console.error('Error fetching user:', err);
                        reject(err);
                        return;
                    }
                    resolve(results);
                });
        })
        return result[0];
    } catch (erorr) {
        throw erorr
    }
}

module.exports = checkUserID;