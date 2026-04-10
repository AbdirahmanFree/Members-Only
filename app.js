const path = require('node:path');
const express = require('express');
const session = require('express-session');
const pool = require('./db/pool.js');
require('./db/db.js');
const pgSession = require('connect-pg-simple')(session);
const indexRouter = require("./routes/index.js")
const passport = require('./auth/passport.js')
require('dotenv').config();


const app = express();

app.set("views", path.join(__dirname,"views"));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use(session({
    store: new pgSession({
        pool: pool,
        tableName: 'user_sessions',
        createTableIfMissing: true
    }),
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true, secure: false},
}));

app.use(passport.initialize())
app.use(passport.session())

app.use(indexRouter)

const PORT= 3000;

app.listen(PORT, () =>{
    console.log(`http://localhost:${PORT}`)
})
