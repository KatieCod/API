const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'katya',
    database: 'shop'
});

async function changePassword(password, email) {
    try {
        const user = await new Promise((resolve, reject) => {
            const insertQuery = 
            `UPDATE users
            SET password = ?
            WHERE email = ?` ;
            console.log(password, email)
            connection.query(insertQuery, [password, email], (err, result) => {
                if (err) {
                    console.error('Error changing password', err);
                    reject(err);
                    return;
                }
                resolve(console.log(result));
            });
        });
        return user;
    } catch (erorr) {
        throw erorr
    }
}


module.exports = changePassword;