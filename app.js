const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the CORS middleware

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

// MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ashu',
    database: 'FinancialTracker'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// API to handle login and fetch user data
app.post('/login', (req, res) => {
    const { id, password } = req.body;
    
    // Query to verify the user
    const query = `SELECT id, name FROM users WHERE id = ? AND password = ?`;
    connection.query(query, [id, password], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }

        // Check if user was found
        if (results.length > 0) {
            const userId = results[0].id;
            console.log("User ID:", userId);

            // On successful login, fetch the user's expenses
            const queryExpenses = `SELECT name_of_expense, type_of_expense, category, amount FROM transactions WHERE user_id = ?`;
            connection.query(queryExpenses, [userId], (err, expenseResults) => {
                if (err) {
                    return res.status(500).json({ error: 'Failed to fetch expenses' });
                }
                return res.json({ user: results[0].name, expenses: expenseResults });
            });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    });
});



// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
