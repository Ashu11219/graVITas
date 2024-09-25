const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
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
    const query = `SELECT name FROM users WHERE id = ? AND password = ?`;
    connection.query(query, [id, password], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }

        if (results.length > 0) {
            // On successful login, fetch the user's expenses
            const queryExpenses = `SELECT name_of_expense, type_of_expense, category_of_expense, amount 
                                   FROM expenses WHERE user_id = ? ORDER BY date DESC LIMIT 10`;
            connection.query(queryExpenses, [id], (err, expenseResults) => {
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
