const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const pool = require("../db/pool.js")
const queries = require('../db/queries.js')
const { comparePasswords } = require('./password.js')

passport.use(
    new LocalStrategy (async (username, password, done) => {
        try {
            queries.getUser(username).then((user) => {
                if(!user){
                    return done(null,false)
                }

                const match = comparePasswords(user.password,password)
                if(match) {
                    return done(null,user)
                }
                else {
                    return done(null,false)
                }
            }).catch(error => {
                done(error)
            })
             

        } catch(error) {
            console.log(error)
        }
    })
)

