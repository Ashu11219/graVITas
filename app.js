const mysql = require('mysql');

// Create MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',  // Database host (usually localhost)
    user: 'yourUsername', // Your MySQL username
    password: 'yourPassword', // Your MySQL password
    database: 'FinancialTracker' // The name of the database you created
});

// Connect to the MySQL database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

module.exports = connection;
