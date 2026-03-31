const path = require('node:path');
const { Pool } = require('pg');
const express = require('express');
const expressSession = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('./db/pool.js')
const pgSession = require('connect-pg-simple')(expressSession)
require('dotenv').config()

const app = express();

app.use("views", path.join(__dirname,"views"));
app.use('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use(expressSession({
    store: new pgSession({
        pool: pool,
        tableName: 'user_sessions'
    }),
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30}
}))
