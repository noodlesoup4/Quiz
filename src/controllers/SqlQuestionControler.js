const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'your_database_name'
});

app.get('/questions', (req, res) => {
    const query = "SELECT * FROM quiz_questions";
    db.query(query, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});