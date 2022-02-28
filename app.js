const express = require('express');
const { Pool } = require('pg');
const asyncHandler = require('express-async-handler');

const app = express();
const port = process.env.PORT || 3001;
const connectionString = process.env.CONNECTION_STRING;
const pool = new Pool({connectionString});

app.use(express.json());

app.listen(port, () => console.log(`Example app listening on port ${port}!`));