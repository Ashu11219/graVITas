CREATE DATABASE IF NOT EXISTS FinancialTracker;

USE FinancialTracker;

CREATE TABLE IF NOT EXISTS Users (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100),
    password VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS Transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(50),
    name_of_expense VARCHAR(100),
    type_of_expense ENUM('income', 'outcome'),
    category ENUM('dining', 'bills', 'entertainment', 'transit', 'gifts'),
    amount DECIMAL(10, 2),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);
