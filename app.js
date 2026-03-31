const path = require('node:path');
const express = require('express');
const expressSession = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('./db/pool.js')
const pgSession = require('connect-pg-simple')(expressSession)
require('dotenv').config()

const app = express();

app.set("views", path.join(__dirname,"views"));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use(expressSession({
    store: new pgSession({
        pool: pool,
        tableName: 'user_sessions',
        createTableIfMissing: true
    }),
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true, secure: true},
}))

app.get("/", (req,res) => {
    if(!req.session.viewCount){
        req.session.viewCount = 1;
    }
    else {req.session.viewCount++}
    console.log(req.session.viewCount)
    res.render("index")
})

const PORT= 3000

app.listen(PORT, () =>{
    console.log(`http://localhost:${PORT}`)
})
