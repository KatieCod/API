const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'katya',
    database: 'shop'
});

async function changeProduct(id, name, stock, unit_price, volume, expiration_date,
    origin_country, ingredients, ranking, brand, description, main_photo,
    featured, category) {
    try {
        const newProduct = await new Promise((resolve, reject) => {
            const insertQuery =
                `UPDATE products
            SET 
            name =?, 
            stock =?, 
            unit_price =?, 
            volume =?, 
            expiration_date = STR_TO_DATE(?, '%Y-%m-%dT%H:%i:%s.%fZ'), 
            origin_country =?,
            ingredients =?, 
            ranking =?, 
            brand =?, 
            description =?, 
            main_photo =?,
            featured =?, 
            category = ?
            WHERE id = ?` ;
            connection.query(insertQuery, [name, stock, unit_price, volume, expiration_date,
                origin_country, ingredients, ranking, brand, description, main_photo,
                featured, category, id], (err, result) => {
                    if (err) {
                        console.error('Error inserting user:', err);
                        reject(err);
                        return;
                    }
                    resolve(result);
                });
        });
        return newProduct;
    } catch (error) {
        throw error
    }
}

module.exports = changeProduct;