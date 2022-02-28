const { Pool } = require('pg');
const mailjet = require ('node-mailjet')
   .connect(process.env.MAILJET_APIKEY, process.env.MAILJET_SECRET);
const connectionString = process.env.CONNECTION_STRING;
const pool = new Pool({connectionString});

(async () => {
    const timestamp = new Date();
    timestamp.setHour(timestamp.getHours() - 1);
    const query = {
        text: 'SELECT * FROM notes WHERE created >= $1;',
        values: [timestamp],
    };
    const result = await pool.query(query);

    if (result.rows.length === 0) {
        console.log('No latest notes');
        process.exit();
    }
})();