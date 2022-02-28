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

app.listen(port, () => console.log(`Example app listening on port ${port}!`));