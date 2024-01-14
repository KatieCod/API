const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'katya',
  database: 'shop'
});

async function getProductCategory(name) {
    try {
      const result = await new Promise((resolve, reject) => {
        connection.query(
            `SELECT * 
            FROM products
            WHERE category = ?
            `, [name],
          function (err, results, fields) {
            if (err) {
              console.error('Error fetching products:', err);
              reject(err);
              return;
            }
            resolve(results);
            
          });
      })
      return result;
      
    } catch(erorr) {
      throw erorr
    }
  }


module.exports = getProductCategory;