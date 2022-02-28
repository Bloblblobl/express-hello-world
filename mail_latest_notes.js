const { Pool } = require('pg');
const mailjet = require ('node-mailjet')
   .connect(process.env.MAILJET_APIKEY, process.env.MAILJET_SECRET);
const connectionString = process.env.CONNECTION_STRING;
const pool = new Pool({connectionString});

(async () => {
    const timestamp = new Date();
    timestamp.setHours(timestamp.getHours() - 1);
    const query = {
        text: 'SELECT * FROM notes WHERE created >= $1;',
        values: [timestamp],
    };
    const result = await pool.query(query);

    if (result.rows.length === 0) {
        console.log('No latest notes');
        process.exit();
    }

    const emailMessage = result.rows.map(note => note.text).join('<br>');
    const mailjetResponse = await mailjet
        .post('send', {'version': 'v3.1'})
        .request({
            'Messages':[{
                'From': {
                    'Email': process.env.USER_EMAIL,
                    'Name': process.env.USER_NAME
                },
                'To': [{
                    'Email': process.env.USER_EMAIL,
                    'Name': process.env.USER_NAME
                }],
                'Subject': 'Latest Notes',
                'HTMLPart': `<p>${emailMessage}</p>`
            }]
        });

    console.log(mailjetResponse);
})();