const express = require('express');
const { Pool } = require('pg');
const asyncHandler = require('express-async-handler');

const app = express();
const port = process.env.PORT || 3001;
const connectionString = process.env.CONNECTION_STRING;
const pool = new Pool({connectionString});

app.use(express.json());

app.get('/notes', asyncHandler(async (req, res) => {
    const result = await pool.query('SELECT * FROM notes;');
    res.json({ notes: result.rows });
}));

app.post('/notes', asyncHandler(async (req, res) => {
    const query = {
        text: 'INSERT INTO notes VALUES ($1, $2);',
        values: [req.body.note, new Date()],
    };
    await pool.query(query);
    res.sendStatus(200);
}));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));