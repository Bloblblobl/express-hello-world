const { Pool } = require('pg');
const mailjet = require ('node-mailjet')
   .connect(process.env.MAILJET_APIKEY, process.env.MAILJET_SECRET);
const connectionString = process.env.CONNECTION_STRING;
const pool = new Pool({connectionString});

(async () => {
    // the rest of the script goes here
})();