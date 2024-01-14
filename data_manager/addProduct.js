const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'katya',
    database: 'shop'
});

async function addProduct(name, stock, unit_price, volume, expiration_date, 
    origin_country, ingredients, ranking, brand, description, main_photo,
    featured, category) {
    try {
        const newProduct = await new Promise((resolve, reject) => {
            const insertQuery = `INSERT INTO products (name, stock, unit_price, volume, expiration_date, 
                origin_country, ingredients, ranking, brand, description, main_photo,
                featured, category) VALUES (?, ?, ?, ?, STR_TO_DATE(?, '%d.%m.%Y'), ?, ?, ?, ?, ?, ?, ?, ?)`;
            connection.query(insertQuery, [name, stock, unit_price, volume, expiration_date, 
                origin_country, ingredients, ranking, brand, description, main_photo,
                featured, category], (err, result) => {
                if (err) {
                    console.error('Error inserting user:', err);
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
        return newProduct;
    } catch (erorr) {
        throw erorr
    }
}

module.exports = addProduct;