# README

A simple notes service which stores notes and sends an hourly digest email of the latest notes.

This is forked from the [Express](https://expressjs.com) [Hello world](https://expressjs.com/en/starter/hello-world.html) example on [Render](https://render.com).

Deployed at https://simple-notes-server.onrender.com/notes

## Deployment
Signup for a free [mailjet](https://www.mailjet.com/) account

### On Render...
Create a new PostgreSQL 13 DB

Create a new web service with the following values:
  * Build Command: `yarn`
  * Start Command: `node app.js`
  * Environment Variables:
    * `CONNECTION_STRING`: Internal connection string from your DB

Create a new cron job with the following values:
  * Environment: Docker
  * Region: Oregon, USA
  * Schedule: `* 0 0 0 0` (every hour)
  * Environment Variables:
    * `DB_NAME`, `DB_USER`, `PGPASSWORD`: DB name, username, and password - can all be found on DB info page
    * `MAILJET_APIKEY`, `MAILJET_SECRET`: Mailjet API and secret keys - can be found [here](https://app.mailjet.com/account/api_keys) if you're logged in
    * `MY_EMAIL`, `MY_NAME`: The email you registered with your Mailjet account, and your name

## DB setup
In `node` REPL:
```javascript
const { Pool } = require('pg');
const pool = new Pool({connectionString: '<DB External Connection String>?ssl=true'});
pool.query('CREATE TABLE notes (text text, created timestamp);', console.log);
```

## Create note
Unix (curl):
`curl -X POST <Your web service URL>/notes -H 'Content-Type: application/json' -d '{"note": "<note text>"}'`

Windows (powershell/Invoke-WebRequest):
`Invoke-WebRequest -Uri <Your web service URL>/notes -Method POST -ContentType application/json -Body '{"note": "<note text>"}'`
