const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
    database: 'members_only',
    user: 'abdirahman',
    host: 'localhost',
    port: 5432
})

module.exports = pool