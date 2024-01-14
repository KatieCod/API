const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'katya',
    database: 'shop'
});

async function approveReview(approved, id) {
    try {
        const newReview = await new Promise((resolve, reject) => {
            const insertQuery = `
            UPDATE reviews 
            SET approved = ? 
            WHERE id = ?`;
            connection.query(insertQuery, [approved, id], (err, result) => {
                if (err) {
                    console.error('Error inserting user:', err);
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
        return newReview;
    } catch (erorr) {
        throw erorr
    }
}

module.exports = approveReview;