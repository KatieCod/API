const mysql = require('mysql2');
const { use } = require('../routes');
// fs = require('fs');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'katya',
    database: 'shop'
});

async function addToWishList(product_id, product_name, product_unit_price, product_main_photo, quantity, user_id) {
    try {
        const result = await new Promise((resolve, reject) => {
            const sqlQuery = `SELECT * FROM wishlist WHERE product_id = ? AND user_id = ?`;
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
        if (!result[0]){
            const newWishListItem = await new Promise((resolve, reject) => {
                // var img = fs.readFileSync('./public/images/KO_01779.jpg');
                const insertQuery = `INSERT INTO wishlist (product_id, product_name, product_unit_price, product_main_photo, quantity, user_id) VALUES (?, ?, ?, ?, ?, ?)`;
                // const insertPhoto = `INSERT INTO trial (id, picture) VALUES (?, ?)`;
                connection.query(insertQuery, [product_id, product_name, product_unit_price, product_main_photo, quantity, user_id], (err, result) => {
                    if (err) {
                        console.error('Error creating a new cart item:', err);
                        reject(err);
                        return;
                    }
                    resolve(result);
                });
                connection.query(insertPhoto, [10, img], (err, result) => {
                    if (err) {
                        console.error('Error creating a new cart item:', err);
                        reject(err);
                        return;
                    }
                    resolve(result);
                });
            });
            return newWishListItem;
        }
    } catch (erorr) {
        throw erorr
    }
}

module.exports = addToWishList;