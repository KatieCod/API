const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'katya',
    database: 'shop'
});

async function addReview(text, user_id, user_name, ranking, product_id, approved, date, product_name, product_photo) {
    try {
        const newReview = await new Promise((resolve, reject) => {
            const insertQuery = `INSERT INTO reviews 
            (text, user_id, user_name, ranking, product_id, approved, date, product_name, product_photo) 
            VALUES (?, ?, ?, ?, ?, ?, STR_TO_DATE(?, '%d.%m.%Y'), ?, ?)`;
            connection.query(insertQuery, [text, user_id, user_name, ranking, product_id, approved, date, product_name, product_photo], (err, result) => {
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

module.exports = addReview;